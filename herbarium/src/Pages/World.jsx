import React, { useState, useEffect } from "react";
import ForestModelViewer, { HomeB } from "../Model/ForestModel";
import Chidiya from "../Model/DoorScene";
import Loader from "../Components/loader";
import "../Style/World.css"; // Add this CSS file for styles

function World() {
  const [showInitialLoader, setShowInitialLoader] = useState(true);
  const [isModelLoading, setIsModelLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialLoader(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showInitialLoader) {
    return (
      <div className="loader-overlay">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {isModelLoading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}

      <div className="homeb-container">
        <HomeB />
      </div>

      <div id="Forest" className="forest-container">
        <ForestModelViewer
          modelPath="https://iljmqfsljqrxmmdwpsch.supabase.co/storage/v1/object/public/models//garden.glb"
          onModelLoaded={() => setIsModelLoading(false)}
        />
      </div>

      <Chidiya />
    </>
  );
}

export default World;
