// App.jsx or YourScene.jsx
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Sparrow from './Sparrow';
import ChatPanel from '../Components/ChatPanel';

export default function Chidiya() {
  return (
    <>
      <div id="Chidiya">
        <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Sparrow />
          <OrbitControls enableZoom={false} /> {/* Optional to explore scene */}
        </Canvas>
      </div>
      <ChatPanel />
    </>
  );
}
