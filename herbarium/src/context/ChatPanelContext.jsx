// src/context/ChatPanelContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ChatPanelContext = createContext(null);

export const ChatPanelProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const togglePanel = () => setIsOpen((prev) => !prev);
  const closePanel = () => setIsOpen(false);

  useEffect(() => {
    closePanel();
  }, [location]);

  return (
    <ChatPanelContext.Provider value={{ isOpen, togglePanel, closePanel }}>
      {children}
    </ChatPanelContext.Provider>
  );
};

export const useChatPanel = () => {
  const context = useContext(ChatPanelContext);
  if (!context) {
    throw new Error('useChatPanel must be used within a ChatPanelProvider');
  }
  return context;
};
