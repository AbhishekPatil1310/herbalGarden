import React, { useRef, useEffect } from 'react';
import { Html } from '@react-three/drei';
import EmbeddedModel from './EmbeddedModel';
import { trackPlantVisit } from '../api/auth'; // Adjust path as necessary

const ObjectPopup = ({
  Cube,
  position,
  CommonName,
  ScientificName,
  uses,
  EnvironmentNeededForCultivation,
  onClose,
}) => {
  const modelPath = `/Models/${Cube}.glb`;
  const utteranceRef = useRef(null);
  const hasTrackedRef = useRef(false);

  // Track plant visit only once per popup mount
  useEffect(() => {
    if (hasTrackedRef.current) return;

    hasTrackedRef.current = true;

    const track = async () => {
      try {
        console.log('✅ Visit tracked:', Cube);
        await trackPlantVisit(Cube);
      } catch (error) {
        console.error('❌ Failed to track plant visit:', error.message);
      }
    };

    track();
  }, [Cube]);

  // Close popup on Escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        window.speechSynthesis.cancel();
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent multiple popups by disabling clicks outside this popup:
  // You should handle this at parent component level.
  // Here just ensure popup is modal-like by stopping click propagation:
  const handleClickOutside = (e) => {
    e.stopPropagation(); // Prevent clicks from bubbling up and triggering new popup
  };

  const handleSpeak = () => {
    window.speechSynthesis.cancel();

    const text = `
      Common Name: ${CommonName || Cube}.
      Scientific Name: ${ScientificName}.
      Uses: ${uses}.
      Environment Needed For Cultivation: ${EnvironmentNeededForCultivation}.
    `;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utteranceRef.current = utterance;

    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
  };

  const handleResume = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  };

  return (
    <Html position={position} style={{ pointerEvents: 'auto' }}>
      <div
        id="popup"
        onClick={handleClickOutside}
        className="bg-white p-4 rounded shadow-lg w-72 text-sm max-h-[30rem] overflow-y-auto"
      >
        <h3 className="text-lg font-bold mb-2 text-center">
          {CommonName || Cube}
        </h3>

        <div className="w-full h-40 mb-4 rounded overflow-hidden border">
          <EmbeddedModel path={modelPath} />
        </div>

        <p>
          <strong>Common Name:</strong> {CommonName}
        </p>
        <p>
          <strong>Scientific Name:</strong> <em>{ScientificName}</em>
        </p>
        <p>
          <strong>Uses:</strong> {uses}
        </p>
        <p>
          <strong>Environment Needed For Cultivation:</strong>{' '}
          {EnvironmentNeededForCultivation}
        </p>

        <div className="flex justify-between mt-3 space-x-2">
          <button
            onClick={handleSpeak}
            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 w-full"
          >
            🔊 Speak
          </button>
          <button
            onClick={handlePause}
            className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 w-full"
          >
            ⏸ Pause
          </button>
          <button
            onClick={handleResume}
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
          >
            ▶ Resume
          </button>
        </div>

        <button
          onClick={() => {
            window.speechSynthesis.cancel();
            onClose();
          }}
          className="mt-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 w-full"
        >
          Close
        </button>
      </div>
    </Html>
  );
};

export default ObjectPopup;
