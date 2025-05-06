// src/components/DoorScene.jsx
import React, { Suspense, useEffect } from "react";
import { Canvas, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import DoorModel from "./ModelViewer";

// Background image for the scene
const Background = ({ imageUrl }) => {
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  const { scene } = useThree();

  useEffect(() => {
    scene.background = texture;
  }, [scene, texture]);

  return null;
};

const DoorScene = () => {
  return (
    <Canvas camera={{ position: [-1, 2, 12], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} />

      <Suspense fallback={null}>
        {/* <Background imageUrl="public/Forest.jpg" /> */}
        <DoorModel modelPath="Models/TreeForest.glb" />
      </Suspense>

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default DoorScene;
