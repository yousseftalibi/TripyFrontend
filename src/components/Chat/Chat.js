import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';
const Chat = () => {   
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8083/chatRoom");

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
      id: "3000",
      message: inputMessage,
    };
    ws.current.send(JSON.stringify(newMessage));
    setInputMessage('');
};
            
      const renderMessage = (message, index) => {

        return (
          <div key={index} className={`media media-chat`}>
              <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" />
            <div className="media-body">
              <p>{message.message}</p>
              
            </div>
          </div>
        );
      };
      
      
  return (

    <div className="chatbox">
      <p>Your messages </p>
            <div  class="messages">
                {messages.map((message, index) => renderMessage(message, index))}
            </div>

            <div className="publisher bt-1 border-light">
                <input id="chatInputBox" type="text" placeholder="Write something"  value={inputMessage} onChange={(e) => setInputMessage(e.target.value)}/>
                <button id="sendMessage" type="button" onClick={sendMessage}>Send</button>
            </div>

    </div>
          
  );
};

export default Chat;