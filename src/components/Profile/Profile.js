import React, { useState, useEffect, useRef } from 'react';
import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Feed from './Feed';
import Select from 'react-select'; 
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ProfileForm from './ProfileForm';
import FriendsList from './FriendsList';
import Recommendations from './Recommendations';
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
          <ProfileForm userId={userId} />
          <FriendsList userId={userId} />
        </div>
        {feedForm()}
        <Recommendations/>
        <br/> <br/>
        <Feed messages={messages} />
      </div>
    </>
  );
};

export default Profile;