import { useChatPanel } from '../context/ChatPanelContext';
import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import '../Style/ChatPanel.css';
import { getGeminiResponse } from '../api/gemini'; // adjust the path to where your function is saved

const ChatPanel = () => {
  const { isOpen, closePanel } = useChatPanel();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // [{ sender: 'user' | 'bot', text: '...' }]

const handleSend = async () => {
  if (!message.trim()) return;

  const userMessage = { sender: 'user', text: message };
  setMessages((prev) => [...prev, userMessage]);

  try {
    const reply = await getGeminiResponse(message);

    const botMessage = {
      sender: 'bot',
      text: reply,
    };

    setMessages((prev) => [...prev, botMessage]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      { sender: 'bot', text: 'Failed to get response.' },
    ]);
  }

  setMessage('');
};


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
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-panel-bubble ${msg.sender === 'user' ? 'user' : 'bot'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-panel-footer">
        <input
          type="text"
          placeholder="Type a message..."
          className="chat-panel-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="chat-panel-send-btn" onClick={handleSend}>
          Send
        </button>
      </div>
    </motion.div>
  );
};

export default ChatPanel;
