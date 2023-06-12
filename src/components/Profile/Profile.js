import React, { useState, useEffect, useRef } from 'react';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select'; 
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ProfileForm from './ProfileForm';
import FriendsList from './FriendsList';
import Feed from './Feed';


const Profile = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const userId = Cookies.get('userId');
  const navigate = useNavigate();
  const ws = useRef(null);

  useEffect(() => {
    loadMessages();
    ws.current = new WebSocket('ws://localhost:8083/chat');
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

  let loadMessages = async () => {
    const response = await fetch(
      `http://localhost:8083/api/getMessages?userId=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      setMessages(data);
    }
  };

  return (
    <>
      <div className="contents">
        
        <div className="top-section">

          <ProfileForm userId={userId} />
        </div><br/><br/><br/><br/>
       
      </div>
    </>
  );
};

export default Profile;