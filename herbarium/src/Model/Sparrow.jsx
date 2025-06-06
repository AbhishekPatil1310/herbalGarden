// Sparrow.jsx
import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useChatPanel } from '../context/ChatPanelContext';

export default function Sparrow({ position = [0, 0, 0] }) {
  const group = useRef();
  const { scene, animations } = useGLTF('/Models/duolingo.glb'); // your sparrow .glb path
  const { actions } = useAnimations(animations, group);
  const { openPanel } = useChatPanel(); // Import openPanel

  // Play flying animation on mount
  useEffect(() => {
    actions['Animation']?.play();
  }, [actions]);

  // Lower Y position by 1 unit
  const loweredPosition = [position[0], position[1] - 1, position[2]];

  return (
    <primitive
      ref={group}
      object={scene}
      scale={5.0}
      position={loweredPosition}
      onClick={(e) => {
        e.stopPropagation(); // prevent bubbling in canvas
        openPanel(); // open chat panel
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer'; // Optional: show pointer on hover
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'default'; // Reset cursor
      }}
    />
  );
}
