// In App.jsx or wherever you want to show it
import React from "react";
import ForestModelViewer from "../Model/ForestModel";
import { HomeB } from "../Model/ForestModel";

function World() {
  return (
    <>
    <div>
      <HomeB/>
    </div>
    <div id="Forest" className="w-full h-screen">
      <ForestModelViewer modelPath="Models/onlyCubes.glb" />
      
    </div></>
  );
}

export default World;
