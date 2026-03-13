import { useState, useEffect } from 'react';
import './App.css';

const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/api/messages';

function App() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!username.trim() || !message.trim()) return;

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: username, content: message }),
      });
      setMessage('');
      fetchMessages();
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="app">
      <h1>Mini Chat</h1>

      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <span className="message-author">{msg.author}:</span>
            <span className="message-content">{msg.content}</span>
            <span className="message-time">{formatTime(msg.timestamp)}</span>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="empty">No messages yet. Be the first to say something!</p>
        )}
      </div>

      <form onSubmit={sendMessage} className="form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input"
        />
        <button type="submit" className="send-btn">
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
