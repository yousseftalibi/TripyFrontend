import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './shared/navbar/navbar';
import Body from './components/Body/Body';
import Footer from './shared/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { navbarClicked } from "./shared/stateStore/stateStore";
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('app'));
const handleButtonClick = (sectionClicked) => {
  navbarClicked.getState().setClickedNavBar(sectionClicked);
};

root.render(
  <>
    <div className="box">
      <div className="box-container">
        <div className="row header ">
          <Navbar handleButtonClick={handleButtonClick} />
        </div>
        <div className="row content">
          <div className="items">
            <Body />
          </div>
        </div>
        <div className="row footer">
          <Footer />
        </div>
      </div>
    </div>

  </>
);
