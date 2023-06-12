import React, { useState, useEffect } from 'react';
import './Social.css';
const FriendsList = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch(
          `http://localhost:8083/api/getFriends?id=${userId}`
        );
        if (!response.ok) {
          throw new Error(`something went wrong: ${response.statusText}`);
        }
        const data = await response.json();
        setFriends(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  return (
    <div className="friends-list">
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      {friends && (
        <>
          <h4>Friends</h4>
          <ul>
            {friends.map((friend) => (
              <li key={friend.id}>{friend.username}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default FriendsList;