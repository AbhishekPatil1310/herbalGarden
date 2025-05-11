import React from 'react';
import { FaRobot } from 'react-icons/fa';
import { useChatPanel } from '../../context/ChatPanelContext';

const AiIcon = () => {
  const { togglePanel } = useChatPanel();

  return (
    <button
      onClick={togglePanel}
      className="ml-auto flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
    >
      <FaRobot />
      <span>AI</span>
    </button>
  );
};

export default AiIcon;
