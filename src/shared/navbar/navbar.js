
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
                <a className="nav-link" href="#" onClick={() => handleButtonClick("My-Trips")} type='button'>My Trips</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => handleButtonClick("Add-Trips")} type='button'>Add Trips</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => handleButtonClick("Souvenirs")} type='button'>
                  My Souvenirs
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#" type='button'>
                  Personal
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

