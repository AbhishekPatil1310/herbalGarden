import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const RotatingModel = ({ path }) => {
  const ref = useRef();
  const { scene } = useGLTF(path);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return <primitive ref={ref} object={scene} scale={1.5} />;
};

const EmbeddedModel = ({ path }) => {
  return (
    <Canvas camera={{ position: [0, 0, 3] }} gl={{ alpha: true }}>
      <ambientLight />
      <directionalLight position={[2, 2, 2]} />
      <RotatingModel path={path} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </Canvas>
  );
};

export default EmbeddedModel;
