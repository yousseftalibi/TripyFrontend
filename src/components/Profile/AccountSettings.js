import React, { useState } from 'react';
import Cookies from 'js-cookie';
import './AccountSettings.css';
import { useEffect } from 'react';

const AccountSettings = () => {


  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('********');

  const [email, setEmail] = useState('johndoe@example.com');

  const [description, setDescription] = useState('I love traveling!');

  const [profilePicture, setProfilePicture] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [publishedPhotos, setPublishedPhotos] = useState([]);
  const userId = Cookies.get('userId');

  useEffect(() => {
    const fetchProfile = async () => {
        const response = await fetch(
          `http://localhost:8083/api/getProfileByUserId?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error(`something went wrong: ${response.statusText}`);
        }
        const data = await response.json();
        setProfile(data);
      } 
      
    fetchProfile();
  }, []);

  const handleUsernameChange = (e) => {

    setUsername(e.target.value);

  };




  const handlePasswordChange = (e) => {

    setPassword(e.target.value);

  };




  const handleEmailChange = (e) => {

    setEmail(e.target.value);

  };




  const handleDescriptionChange = (e) => {

    setDescription(e.target.value);

  };




  const handleProfilePictureChange = (e) => {

    const file = e.target.files[0];

    setProfilePicture(file);

  };




  const toggleEditMode = () => {

    setIsEditing(!isEditing);

  };




  const handleSubmit = (e) => {

    e.preventDefault();




    // Effectue ici les actions nécessaires pour mettre à jour les informations de l'utilisateur

    // (par exemple, envoi des données vers un serveur)




    setIsEditing(false);

  };




  const handleCancel = () => {

    setIsEditing(false);

  };




  const handlePublishPhoto = (e) => {

    // Ajoute la photo publiée à la liste des photos publiées par l'utilisateur

    const file = e.target.files[0];

    setPublishedPhotos((prevPhotos) => [...prevPhotos, file]);

  };

  const handleSave = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8083/api/modifyAccount/'+userId+'/'+username+'/'+password, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
  
    });
   
  }

  return (

    <div className="profile-container">

      <div className="profile-header">

        <div className="profile-picture">

          { /*<img src={profilePicture} alt="Profile" />} */}

          {isEditing && (

            <div className="edit-profile-picture">

              <input type="file" accept="image/*" onChange={handleProfilePictureChange} />

            </div>

          )}

        </div>

        <div className="profile-info">
        {profile && (
        <>
            <h1>{`Hello, ${profile.firstName} `}</h1>

          </>)}
          <h1>{isEditing ? 'Modifier le profil' : username}</h1>

          {isEditing ? (

            <div className="profile-edit-form">

              <label>

                Nom d'utilisateur

                <input type="text" value={profile.fName} onChange={handleUsernameChange} />

              </label>

        
              <label>

                Nouveau de passe

                <input type="password" value={password} onChange={handlePasswordChange} />

              </label>

              <label>

                Description

                <textarea value={description} onChange={handleDescriptionChange} />

              </label>

              <button onClick={handleSave}>Enregistrer</button>

              <button onClick={handleCancel}>Annuler</button>

            </div>

          ) : (

            <div className="profile-description">

              <p>{description}</p>

              <button onClick={toggleEditMode}>Modifier</button>

            </div>

          )}

        </div>

      </div>






    </div>

  );

};




export default AccountSettings;