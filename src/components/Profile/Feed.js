import React from 'react';
import './Feed.css';
const Feed = ({messages}) => {
    return (
        
      <div className="posts-section">
        {messages.length != 0 && 
        <>
          <h4>Posts </h4>  
            <br></br>
          {messages.map((message, index) => (
            <p key={index}>
              {message.message}
            </p>
          ))}
          </>
  }
      </div>
    );
  };

  export default Feed;
