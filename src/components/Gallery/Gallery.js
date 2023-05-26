import { useState, useEffect, useRef } from 'react';
import React from 'react';
import './Gallery.css';

const Gallery = () => {

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8083/chat3");

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    const newMessage = {
      id: "user 1",
      message: inputMessage,
    };
      
      ws.current.send(JSON.stringify(newMessage));
      setInputMessage('');
    
  };

  return (
    <div className="contents">
      <p>Chat box, here you can send and receive messages to your friend!</p>
      <br />
      <div className="chatbox">
        <div className="chatbox__message">
          {messages.map((message, index) => (
            <div key={index}>
              {' '}
            {message.message}
            </div>
          ))}
        </div>
      </div>
      <br />
      <div>
        <input
          type="text"
          placeholder="Type your message here"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <br />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Gallery;
