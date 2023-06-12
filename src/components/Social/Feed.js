import React, { useState, useEffect } from "react";

const Feed = ({ messages }) => {
  
  const [likes, setLikes] = useState({});

  
  let handleLike = async (messageId) => {
    const response = await fetch(
      `http://localhost:8083/api/likePost/`+messageId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      await response.json();
    }
  };



  let loadLikes = async (messageId) => {
    const response = await fetch(
      `http://localhost:8083/api/getLikes?messageId=${messageId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      // Update the state variable with the new likes
      setLikes((prevLikes) => ({
        ...prevLikes,
        [messageId]: data,
      }));
    }
  };

  useEffect(() => {
    messages.forEach((message) => {
      loadLikes(message.id);
    });
  }, [messages, likes]);

  return (
    <div className="posts-section">

      <br/><br/><br/><br/>
      <h4>Posts</h4>
      <br></br>
      {messages.map((message) => (
      <>
        
        <p>
          {message.message} - {likes[message.id] || 0} likes
        </p>
        <button onClick={()=>handleLike(message.id)}>
          like
        </button>
      </>
      ))}
    </div>
  );
};

export default Feed;

