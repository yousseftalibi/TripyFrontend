import React, { useState, useEffect, useRef } from 'react';
import './Social.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Feed from './Feed';
import Select from 'react-select'; 
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import FriendsList from './FriendsList';

const Social = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [messages, setMessages] = useState([]);
  const [likes, setLikes] = useState();
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
      `http://localhost:8083/api/getAllMessages`,
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



  let sendMessage = () => {
    const newMessage = {
      id: userId,
      message: inputMessage,
    };
    ws.current.send(JSON.stringify(newMessage));
    setInputMessage('');
  };

  let searchForm = () => {
    return (
      <div className="search-section">
        <div>
          <Select
            placeholder="Search for users..."
            value={searchInput}
            onInputChange={(e) => {
              handleSearch(e);
            }}
            onChange={(selectedOption) => {
              navigate('/profile/' + selectedOption.value);
            }}
            options={searchResults}
          />
        </div>
      </div>
    );
  };

  let feedForm = () => {
    return (
      <div className="feed-section">
        <textarea
          className="form-control"
          placeholder="What's on your mind?"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <br />
        <button onClick={sendMessage}>Post</button>
      </div>
    );
  };

  let handleSearch = async (searchValue) => {
    setSearchInput(searchValue);
    const response = await fetch(
      `http://localhost:8083/api/searchProfiles?query=${searchValue}`
    );
    if (response.status === 200) {
      const data = await response.json();
      const options = data.map((item) => ({
        label: `${item.firstName} ${item.lastName}`,
        value: item.profileId,
      }));
      setSearchResults(options);
    }
  };

  return (
    <>
      <div className="contents">
        
        <div className="top-section">
          {searchForm()}
          <FriendsList userId={userId} />
        </div>
        {feedForm()}
        
        <br/> <br/>
        <Feed messages={messages}/>

        <br/> <br/>
      </div>
    </>
  );
};

export default Social;