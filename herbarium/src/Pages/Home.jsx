// src/pages/Home.jsx
import React from "react";
import DoorScene from "../Model/Door";
import Chidiya from "../Model/DoorScene"
const Home = () => {
  return (<>
    <div id="forestDoor" className="w-full h-screen">
          <DoorScene />
          <Chidiya />
    </div>

  </>
  );
};

export default Home;
