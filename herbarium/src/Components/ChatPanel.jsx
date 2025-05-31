import { useChatPanel } from '../context/ChatPanelContext';
import { motion } from 'framer-motion';
import { useState } from 'react';
import '../Style/ChatPanel.css';
import { getGeminiResponse } from '../api/gemini';

const ChatPanel = () => {
  const { isOpen, closePanel } = useChatPanel();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: 'user', text: message };
    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setLoading(true);

    try {
      const myDiv = document.querySelector('#popup ');
      console.log('Queried div:', myDiv);
      let preInfo = '';
      if (myDiv) {
        const commonName =
          myDiv.querySelector('strong')?.nextSibling?.nodeValue?.trim() || '';
        const paragraphs = myDiv.querySelectorAll('p');

        let data = `CommonName: ${commonName}\n`;
        console.log('data in ChatPanel.jsx : ', data);
        paragraphs.forEach((p) => {
          const key =
            p.querySelector('strong')?.textContent?.trim().replace(':', '') ||
            '';
          const value = p.textContent.replace(`${key}:`, '').trim();
          if (key && value !== undefined) {
            data += `${key}: ${value}\n\n`;
          }
        });

        preInfo = data.trim();
        console.log('Preinfo in chatPanel.jsx', preInfo);
      }
      const reply = await getGeminiResponse(preInfo, message);
      const botMessage = { sender: 'bot', text: reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Failed to get response.' },
      ]);
    } finally {
      setLoading(false);
    }
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
        <button className="chat-panel-close-btn" onClick={closePanel}>
          ✕
        </button>
      </div>

      <div className="chat-panel-body">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-panel-bubble ${
              msg.sender === 'user' ? 'user' : 'bot'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="chat-panel-bubble bot">
            <span className="thinking-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </div>
        )}
      </div>

      <div className="chat-panel-footer">
        <div className="chat-panel-input-wrapper">
          <input
            type="text"
            placeholder="Type a message..."
            className="chat-panel-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="chat-panel-send-icon" onClick={handleSend}>
            ➤
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatPanel;
