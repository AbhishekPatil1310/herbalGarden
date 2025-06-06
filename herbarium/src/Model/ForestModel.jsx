import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Sky } from '@react-three/drei'; // Switched to OrbitControls
import ObjectPopup from './Popup';
import * as THREE from 'three';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Load and render GLB model as-is (like a 3D map)
const Model = ({ url, onLoaded }) => {
  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.userData.clickable = true;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (onLoaded) {
      onLoaded(); // Notify when model is fully loaded
    }
  }, [scene, onLoaded]);

  return <primitive object={scene} />;
};

// Full 3D control using OrbitControls (not restricted like MapControls)
const CameraController = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    camera.position.set(20, 20, 20); // Set an angled 3D view
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <OrbitControls
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.05}
      rotateSpeed={0.8}
      minPolarAngle={0} // Allow full top-down view
      maxPolarAngle={Math.PI / 2} // 🔒 Stop before camera goes underneath
      minDistance={5}
      maxDistance={70}
      enableZoom={false}
    />
  );
};

// Handles object click detection
const ClickHandler = ({ selectedInfo, setSelectedInfo }) => {
  const { camera, scene, gl } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const handleClick = async (event) => {
    // if (selectedInfo) return; // Block opening another popup if one is already open

    const bounds = gl.domElement.getBoundingClientRect();
    mouse.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    mouse.current.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      if (hit.userData.clickable) {
        const cubeName = hit.name || 'UnnamedObject';
        const worldPosition = hit.getWorldPosition(new THREE.Vector3());

        window.dispatchEvent(
          new CustomEvent('cube-clicked', { detail: { cubeName } })
        );

        // Skip some specific objects from opening popup
        if (
          cubeName === 'Object_2' ||
          cubeName === 'textures' ||
          cubeName === 'Mesh_0007' ||
          cubeName === 'Mesh_0007_4'
        ) {
          return;
        }

        // Skip if cubeName starts with "textures"
        if (cubeName.toLowerCase().startsWith('textures')) return;

        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/cube/${cubeName}`
          );
          const plant = res.data;

          setSelectedInfo({
            CommonName: plant.CommonName,
            Cube: plant.Cube,
            position: worldPosition,
            ScientificName: plant.ScientificName,
            uses: plant.Uses,
            EnvironmentNeededForCultivation:
              plant.EnvironmentNeededForCultivation,
          });
        } catch (error) {
          console.error('Plant info not found:', error);
          setSelectedInfo({
            Cube: cubeName,
            position: worldPosition,
            description: 'No info found in database.',
            CommonName: '',
            ScientificName: '',
            uses: '',
            EnvironmentNeededForCultivation: '',
          });
        }
      }
    }
  };

  useEffect(() => {
    gl.domElement.addEventListener('click', handleClick);
    return () => gl.domElement.removeEventListener('click', handleClick);
  }, [gl, selectedInfo]); // re-register listener if selectedInfo changes

  return null;
};

// Go Home Button
export const HomeB = () => {
  const navigate = useNavigate();
  return (
    <button
      id="Ht"
      onClick={() => navigate('/home')}
      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
    >
      ⬅ Go to Home
    </button>
  );
};

// Main 3D Viewer Component
const ForestModelViewer = ({ modelPath, onModelLoaded }) => {
  const [selectedInfo, setSelectedInfo] = useState(null);

  return (
    <div id="Forest" className="relative w-full h-screen overflow-hidden">
      <Canvas shadows camera={{ position: [20, 20, 20], fov: 60 }}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 50, 10]} intensity={1} castShadow />

        <Suspense fallback={null}>
          <Model url={modelPath} onLoaded={onModelLoaded} />
        </Suspense>

        <CameraController />
        <ClickHandler
          selectedInfo={selectedInfo}
          setSelectedInfo={setSelectedInfo}
        />

        {selectedInfo && (
          <ObjectPopup
            Cube={selectedInfo.Cube}
            position={selectedInfo.position}
            CommonName={selectedInfo.CommonName}
            ScientificName={selectedInfo.ScientificName}
            uses={selectedInfo.uses}
            EnvironmentNeededForCultivation={
              selectedInfo.EnvironmentNeededForCultivation
            }
            onClose={() => setSelectedInfo(null)}
          />
        )}
      </Canvas>
    </div>
  );
};

export default ForestModelViewer;
