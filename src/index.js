import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './shared/navbar/navbar';
import Footer from './shared/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ProfilePage from './components/Profile/ProfilePage';
import Places from './components/Places/Places';
import AddPlace from './components/AddPlace/AddPlace';
import Profile from './components/Profile/Profile';
import Authentification from './components/Authentification/Authentification';
import AccountSettings from './components/Profile/AccountSettings';
import {useLoggedIn} from './shared/stateStore/stateStore';
const root = ReactDOM.createRoot(document.getElementById('app'));

const ProtectedRoute = ({ children }) =>  {
  const loggedIn = useLoggedIn(state => state.loggedIn);
  if (!loggedIn) {
    return <Navigate to="/authentification" replace />;
  }
  return children;
}

 const ShowNavBar = () => {
  const loggedIn = useLoggedIn(state => state.loggedIn);
  return loggedIn ? (<div className="row header "><Navbar/></div> ) : null;
 }

 const ShowWhenLoggedIn = () => {
    const loggedIn = useLoggedIn(state => state.loggedIn);
    return loggedIn ?  (<>
              <div className="box-container">
              <div className="row header "><Navbar/></div>
              <div className="row content">
                <div className="items">
                  <Routes>
                    <Route path="/profile/:id" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                    <Route path="/places" element={<ProtectedRoute><Places /></ProtectedRoute>} />
                    <Route path="/addPlaces" element={<ProtectedRoute><AddPlace /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/authentification" element={<Places />} />
                    <Route path="/account" element={<AccountSettings />} />
                    <Route path="/" element={<Places />} />
                    </Routes> 
                </div>
              </div>
              <div className="row footer">
                <Footer />
              </div>
            </div>
      </>): (<> 
        <div className="box-container">
        <ShowNavBar />
        <div className="row content">
          <div className="items">
          <Authentification />
          </div>
        </div>
        <div className="row footer">
          <Footer />
        </div>
      </div>
      </>) ;
 }

root.render(
  <BrowserRouter>
    <div className="box">
      <ShowWhenLoggedIn />
    </div>
  </BrowserRouter>
);
