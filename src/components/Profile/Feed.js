import React from 'react';

const Feed = ({messages}) => {
    return (
        
      <div className="posts-section">
          <h4>Posts </h4>  
            <br></br>
          {messages.map((message, index) => (
            <p key={index}>
              {message.message}
            </p>
          ))}
      </div>
    );
  };

  export default Feed;
