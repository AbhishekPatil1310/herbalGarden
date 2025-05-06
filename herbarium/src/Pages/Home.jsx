// src/pages/Home.jsx
import React from "react";
import DoorScene from "../Model/Door";
import Navbar from "../Components/navbar";
import Chidiya from "../Model/DoorScene"
const Home = () => {
  return (<>
    <div id="forestDoor" className="w-full h-screen">
          <DoorScene />
          <Chidiya />
          <Navbar/>
    </div>

  </>
  );
};

export default Home;
