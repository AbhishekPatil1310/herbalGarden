// components/chat/ChatPanel.jsx
import { useChatPanel } from '../context/ChatPanelContext';
import { motion } from 'framer-motion';
import '../Style/ChatPanel.css'; // Import the CSS file

const ChatPanel = () => {
  const { isOpen, closePanel } = useChatPanel();

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="chat-panel"
    >
      <div className="chat-panel-header">
        <h2 className="chat-panel-title">AI Assistant</h2>
        <button className="chat-panel-close-btn" onClick={closePanel}>✕</button>
      </div>
      <div className="chat-panel-body">
        <p className="chat-panel-message">Hello! How can I assist you today?</p>
      </div>
      <div className="chat-panel-footer">
        <input
          type="text"
          placeholder="Type a message..."
          className="chat-panel-input"
        />
      </div>
    </motion.div>
  );
};

export default ChatPanel;
