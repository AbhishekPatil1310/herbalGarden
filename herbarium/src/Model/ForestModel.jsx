import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { MapControls, useGLTF, Sky,Html} from "@react-three/drei";
import ObjectPopup from "./Popup";
import * as THREE from "three";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Model = ({ url }) => {
  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.userData.clickable = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={1.5} position={[0, 0, 0]} />;
};

const CameraController = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  const bounds = {
    minX: -300,
    maxX: 300,
    minZ: -300,
    maxZ: 300,
    minY: 5,
    maxY: 50,
  };

  useEffect(() => {
    camera.position.set(0, 1, 1);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame(() => {
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, bounds.minX, bounds.maxX);
    camera.position.y = THREE.MathUtils.clamp(camera.position.y, bounds.minY, bounds.maxY);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, bounds.minZ, bounds.maxZ);
  });

  return (
    <MapControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableRotate={false}
      enableZoom={true}
      enablePan={true}
      minDistance={1}
      maxDistance={150}
      zoomSpeed={1}
      panSpeed={2}
    />
  );
};

const ClickHandler = ({ setSelectedInfo }) => {
  const { camera, scene, gl } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const handleClick = async (event) => {
    const bounds = gl.domElement.getBoundingClientRect();
    mouse.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    mouse.current.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      if (hit.userData.clickable) {
        const cubeName = hit.name || "UnnamedObject";
        const worldPosition = hit.getWorldPosition(new THREE.Vector3());

        window.dispatchEvent(new CustomEvent("cube-clicked", { detail: { cubeName } }));

        if (cubeName === "Object_2") {
          return;
        }
        if (cubeName == "10450_Rectangular_Grass_Patch_v1_iterations-2"){
          return;
        }

        try {
          await axios.post("http://localhost:5000/api/v1/somthing", { cubeName }, { withCredentials: true });
        } catch (error) {
          console.error("Failed to send cube name to log endpoint:", error);
        }

        try {
          const res = await axios.get(`http://localhost:5000/api/v1/cube/${cubeName}`);
          const plant = res.data;

          setSelectedInfo({
            CommonName: plant.CommonName,
            Cube: plant.Cube,
            position: worldPosition,
            family: plant.Family,
            scientificName: plant.scientificName,
            collector: plant.Collector,
            country: plant.Country,
            uses: plant.Uses,
          });
        } catch (error) {
          console.error("Plant info not found:", error);
          setSelectedInfo({
            Cube: cubeName,
            position: worldPosition,
            description: "No info found in database.",
            CommonName: "",
            family: "",
            scientificName: "",
            collector: "",
            country: "",
            uses: "",
          });
        }
      }
    }
  };

  useEffect(() => {
    gl.domElement.addEventListener("click", handleClick);
    return () => gl.domElement.removeEventListener("click", handleClick);
  }, [gl]);

  return null;
};

export const HomeB = () => {
  const navigate = useNavigate();
  return (
    <button
      id="Ht"
      onClick={() => navigate('/home')}
      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
    >
      ⬅Go to Home
    </button>

  );
};

// Optional: If you want a texture on ground (grass, dirt, etc.)
const Ground = () => {
  // Example texture (skip if you don't want texture)
  // const texture = useLoader(TextureLoader, '/textures/grass.jpg');
  
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color="#228B22" />  {/* Greenish ground color */}
      {/* <meshStandardMaterial map={texture} /> */} {/* If you want a texture */}
    </mesh>
  );
};


const ForestModelViewer = ({ modelPath }) => {
  const [selectedInfo, setSelectedInfo] = useState(null);

  return (
    <div id="Forest" className="relative w-full h-screen overflow-hidden">

      <Canvas camera={{ position: [5, 1, 10], fov: 65 }}>
        <Sky sunPosition={[0, 5, 1]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[0, 20, 10]} />

        <Suspense fallback={null}>
          <Model url={modelPath} />
          {/* <Ground /> */}
        </Suspense>

        <CameraController />
        <ClickHandler setSelectedInfo={setSelectedInfo} />

        {selectedInfo && (
          <ObjectPopup
            Cube={selectedInfo.Cube}
            position={selectedInfo.position}
            CommonName={selectedInfo.CommonName}
            family={selectedInfo.family}
            scientificName={selectedInfo.scientificName}
            collector={selectedInfo.collector}
            country={selectedInfo.country}
            uses={selectedInfo.uses}
            onClose={() => setSelectedInfo(null)}
          />
        )}
      </Canvas>
      
    </div>
  );
};

export default ForestModelViewer;
