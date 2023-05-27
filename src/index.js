import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './shared/navbar/navbar';
import Footer from './shared/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ProfilePage from './components/Account/ProfilePage';
import Trips from './components/Trips/Trips';
import Social from './components/Social/Social';
import Gallery from './components/Gallery/Gallery';
import Account from './components/Account/Account';
import Authentification from './components/Authentification/Authentification';
import {useLoggedIn} from './shared/stateStore/stateStore';
const root = ReactDOM.createRoot(document.getElementById('app'));

const ProtectedRoute = ({ children }) =>  {
  const loggedIn = useLoggedIn(state => state.loggedIn);
  if (!loggedIn) {
    return <Navigate to="/authentification" replace />;
  }
  return children;
}


const AuthCheck = ()  => {
  const loggedIn = useLoggedIn(state => state.loggedIn);
  return loggedIn ? <Trips /> : <Authentification />;
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
                    <Route path="/trips" element={<ProtectedRoute><Trips /></ProtectedRoute>} />
                    <Route path="/social" element={<ProtectedRoute><Social /></ProtectedRoute>} />
                    <Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
                    <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                    <Route path="/authentification" element={<Trips />} />
                    <Route path="/" element={<Trips />} />
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
