import React from 'react';
import Navbar from '../Components/navbar/Navbar';
import ChatPanel from '../Components/ChatPanel';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>{children}</main>
      <ChatPanel />
    </div>
  );
};

export default MainLayout;
