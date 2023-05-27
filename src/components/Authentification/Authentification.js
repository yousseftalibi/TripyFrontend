import { useState } from 'react';
import './Authentification.css';
import { useLoggedIn } from '../../shared/stateStore/stateStore';
import Cookies from 'js-cookie';

function Authentification() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [nationality, setNationality] = useState("");
  const [city, setCity] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [validateSuccess, setValidateSuccess] = useState(false);
  const [showLogin, setShowLogin] = useState(false);


  let validate = async (event) => {
    event.preventDefault();
    let response;

    if (!showLogin) {
      response = await fetch('http://localhost:8083/api/registerUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        })
      });

      if (response.ok) {
        setValidateSuccess(true);
          setTimeout(() => {
            useLoggedIn.setState({loggedIn: true});
          }
            , 1400);
            
      }
      else {
        alert("Username already taken");
      }

    }
    else {
      response = await fetch('http://localhost:8083/api/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      }
      );
      if (response.ok) {
        const user = await response.json();
        setValidateSuccess(true);
        useLoggedIn.setState({loggedIn: true});
        Cookies.set('loggedIn', 'true', { expires: 1 });
        Cookies.set('userId', user.id, { expires: 1 });
      }
      else {
        alert("Wrong username or password");
      }
    }
  }

  let handleLogin = () => {
    setShowLogin(true);
    setValidateSuccess(false);
  }

  let handleSignup = () => {
    setShowLogin(false);
    setValidateSuccess(false);
  }

  return (
    <>
      <form onSubmit={validate} className="centered">
        <div className="d-flex  mb-4 justify-content-center">
          <a type="button" className="btn btn-info   btn-lg" onClick={handleSignup}>Register</a>
          <a type="button" className="btn btn-info btn-lg  ml-3" onClick={handleLogin}>Login</a>
        </div>
        <>
          <div className="d-flex  mb-4 justify-content-center">

            <div className="form-outline ">
              <label className="form-label font-weight-bold" htmlFor="username">Username</label>
              <input type="text" id="username" className="form-control mt-2" onChange={(e) => setUsername(e.target.value)} required />
            </div>
          </div>
          {!showLogin &&
            <div className="d-flex mb-4 justify-content-center">
              <div className="form-outline">
                <label className="form-label font-weight-bold " htmlFor="email">Email</label>
                <input type="email" id="email" className="form-control mt-2" onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>
          }
          <div className="d-flex mb-4 justify-content-center">
            <div className="form-outline">
              <label className="form-label font-weight-bold" htmlFor="password">Password</label>
              <input type="password" id="password" className="form-control mt-2" onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            {!validateSuccess ?
              <>
                <button type="submit" className="btn btn-primary btn-lg mt-3 ml-3">Submit</button>
              </>
              :
              <button type="button" className="btn btn-success btn-lg mt-3">Success!</button>
            }      </div>
        </>
      </form>

    </>
  );
}

export default Authentification;
