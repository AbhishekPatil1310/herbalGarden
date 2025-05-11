import React from 'react';
import Navbar from '../components/navbar/Navbar';
import ChatPanel from '../components/ChatPanel';

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
