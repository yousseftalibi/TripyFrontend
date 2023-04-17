
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import React from 'react';
import { useLoggedIn } from '../../shared/stateStore/stateStore';

let Navbar = (props) => {

  const { handleButtonClick } = props;
  const { loggedIn } = useLoggedIn((state) => ({ loggedIn: state.loggedIn }));

  return (
    <>
      {loggedIn &&
        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
          <a className="navbar-brand" href="#" type='button'>Trippy</a>
          <div className="collapse navbar-collapse" >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => handleButtonClick("Trips")} type='button'>Trips</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => handleButtonClick("Social")} type='button'>Social</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => handleButtonClick("Gallery")} type='button'>
                  Gallery
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => handleButtonClick("Account")} type='button'>
                  Account
                </a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <button className="btn btn-outline-secondary my-2 my-sm-0" type='button' id="logout" onClick={() => handleButtonClick("Logout")}>Log out</button>
            </form>
          </div>
        </nav>
      }
    </>
  );
}
export default Navbar;

