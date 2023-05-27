
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useLoggedIn } from '../stateStore/stateStore';
const Navbar = () => {

  const navigate = useNavigate();
  const setLoggedIn = useLoggedIn(state => state.setLoggedIn);

  const logout = () => {
    setLoggedIn(false); 
    Cookies.remove('loggedIn'); 
    navigate('/authentification'); 
  }
  
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
          <a className="navbar-brand" href="#" type='button'>Trippy</a>
          <div className="collapse navbar-collapse" >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => navigate("/trips")} type='button'>Trips</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => navigate("/social")} type='button'>Social</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => navigate("/gallery")} type='button'>Gallery</a>
              </li>

              <li className="nav-item">
           
                <a className="nav-link" href="#" onClick={() => navigate("/account")} type='button'>Account</a>

              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <button className="btn btn-outline-secondary my-2 my-sm-0" type='button' id="logout" onClick={() => logout("Logout")}>Log out</button>
            </form>
          </div>
        </nav>
      
    </>
  );
}
export default Navbar;

