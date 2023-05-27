import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
const ProfilePage = () => {

    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await fetch(
            `http://localhost:8083/api/getProfile?userId=${id}`
          );
  
          if (!response.ok) {
            throw new Error(`something went wrong: ${response.statusText}`);
          }
  
          const data = await response.json();
          setProfile(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProfile();
    }, []); 
  
    return (
      <div className="profile-page">
        {loading && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}
        {profile && (
          <>
            <h1>{`${profile.firstName} ${profile.lastName}`}</h1>
            <h2>{profile.emailAddress}</h2>
            <h3>{profile.nationality}</h3>
            <p>Is not your friend? </p><button>Add frined</button>
            <br/>
            <p>Is your friend? </p><button>See trips</button>
            <button>Send message</button>

          </>
        )}
      </div>
    );
  };
  
  export default ProfilePage;
  