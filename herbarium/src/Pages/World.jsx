import React, { useState } from "react";
import ForestModelViewer, { HomeB } from "../Model/ForestModel";
import Chidiya from "../Model/DoorScene";
import Loader from "../Components/loader";

function World() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center">
          <Loader />
        </div>
      )}

      <div className="relative z-10">
        <HomeB />
      </div>

      <div id="Forest" className="w-full h-screen">
        <ForestModelViewer
          modelPath="Models/world1.glb"
          onModelLoaded={() => setIsLoading(false)}
        />
      </div>

      <Chidiya />
    </>
  );
}

export default World;
