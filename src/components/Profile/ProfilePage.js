import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import UserTrips from './UserTrips';
import Chat from '../Chat/Chat';
const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFriend, setIsFriend] = useState(false);
  const userId = Cookies.get('userId');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:8083/api/getProfileByProfileId?profileId=${id}`
        );
        if (!response.ok) {
          throw new Error(`something went wrong: ${response.statusText}`);
        }
        const data = await response.json();
        setProfile(data);
        checkFriendship(data.user.id);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const checkFriendship = async (profileId) => {
    const response = await fetch(
      `http://localhost:8083/api/getFriends?id=${userId}`
    );
    if (response.status === 200) {
      const data = await response.json();
      const friendIds = data.map((user) => user.id);
      setIsFriend(friendIds.includes(profileId));
    }
  };

  const addFriend = async () => {


    const response = await fetch(
      `http://localhost:8083/api/addFriend?userId=${userId}&friendId=${profile.user.id}`, {
        
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
      }
    );
    if (response.status === 200) {
      setIsFriend(true);
    }
  };

  return (
    <div className="profile-page">
      <br/> <br/>
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      {profile && (
        <>
          <h1>{`${profile.firstName} ${profile.lastName}`}</h1>
          <h2>{profile.emailAddress}</h2>
          <h3>{profile.nationality}</h3>
          {!isFriend && (
            <>
              <p>Is not your friend? </p>
              <button onClick={addFriend}>Add friend</button>
            </>
          )}
          {isFriend && (
            <>
            {console.log("userid", profile.user.id)}
              <UserTrips userId={profile.user.id} />
              <br/> <br/>       <h2>Your messages </h2><Chat />

            </>
          )}
        </>
      )}
      <br/> <br/>
    </div>
  );
};

export default ProfilePage;