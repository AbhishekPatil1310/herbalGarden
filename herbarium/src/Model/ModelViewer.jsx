// src/Model/DoorModel.jsx
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

const DoorModel = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  const { camera, gl, scene: threeScene } = useThree();
  const navigate = useNavigate();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  // Add clickable metadata
  scene.traverse((child) => {
    if (child.isMesh && (child.name === "Object_6" || child.name === "Door")) {
      child.userData.clickable = true;
    }
  });

  const handleClick = (event) => {
    const bounds = gl.domElement.getBoundingClientRect();
    mouse.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    mouse.current.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObjects(threeScene.children, true);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      if (hit.userData.clickable) {
        if (hit.name === "Object_6") {
          navigate("/World");
        } else if (hit.name === "Door") {
          navigate("/Quiz");
        }
      }
    }
  };

  // Attach click listener
  React.useEffect(() => {
    gl.domElement.addEventListener("click", handleClick);
    return () => {
      gl.domElement.removeEventListener("click", handleClick);
    };
  }, [gl]);

  return <primitive object={scene} scale={1.5} />;
};

export default DoorModel;
