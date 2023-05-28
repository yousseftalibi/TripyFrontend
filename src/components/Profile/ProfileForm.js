import React, { useState, useEffect } from 'react';
const ProfileForm = ({ userId }) => {
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [nationality, setNationality] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  let loadProfile = async () => {

    const response = await fetch(
      `http://localhost:8083/api/getProfileByUserId?userId=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      setProfileData(data);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.emailAddress);
      setNationality(data.nationality);
    }
    setLoading(false);
  };

  let submit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8083/api/addProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          id: userId,
        },
        firstName: firstName,
        lastName: lastName,
        emailAddress: email,
        nationality: nationality,
      }),
    });
    if (response.status === 200) {
      loadProfile();
    }
  };

  let selectNationality = () => {
    return (
      <select
        className="form-control"
        name="nationality"
        id="nationality"
        value={nationality}
        onChange={(e) => {
          setNationality(e.target.value);
        }}
      >
        //only allowed two nationalities for now
        <option value="">-- select one --</option>
        <option value="afghan">Afghan</option>
        <option value="albanian">Albanian</option>
      </select>
    );
  };

  let form = () => {
    return (
      <form onSubmit={submit}>
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <label htmlFor="fname">First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              id="fname"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="lname">Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              id="lname"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="email">E-mail</label>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="email@trippy.com"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label htmlFor="nationality">Nationality</label>
            {selectNationality()}
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    );
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : profileData ? (
        <>
          <h1 className="fnameLname">{`${firstName} ${lastName}`}</h1>
          <div className="profile-section">
            <h6 className="card-subtitle mb-2 text-muted">
              {email} {nationality}{' '}
            </h6>
            {!editing && (
              <button
                className="btn btn-primary"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            )}
            {editing && form()}
          </div>
        </>
      ) : (
        <>
          <h3>Create your profile here</h3>
          {form()}
        </>
      )}
    </>
  );
};

export default ProfileForm;