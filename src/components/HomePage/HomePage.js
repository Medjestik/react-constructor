import React from 'react';
import './HomePage.css';
import HomePageHeader from './HomePageHeader/HomePageHeader.js';
import HomePageMain from './HomePageMain/HomePageMain.js';
import Login from '../Login/Login.js';
import useOnClickOverlay from "../../hooks/useOnClickOverlay.js";
import useOnPushEsc from '../../hooks/useOnPushEsc.js';
import HomePageFooter from './HomePageFooter/HomePageFooter.js';

function HomePage({ onLogin, loginError, setLoginError }) {

  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);

  function closeHomePagePopups() {
    setIsLoginPopupOpen(false);
  }

  useOnClickOverlay(closeHomePagePopups);
  useOnPushEsc(closeHomePagePopups);

  function openLoginPopup() {
    closeHomePagePopups();
    setIsLoginPopupOpen(true);
  }

  
  return (
    <div className="homepage">

      <HomePageHeader
        onOpenLoginPopup={openLoginPopup}
      />

      <HomePageMain />

      <HomePageFooter />
      
      <Login
        onLogin={onLogin}
        loginError={loginError}
        setLoginError={setLoginError}
        isOpen={isLoginPopupOpen}
        onClose={closeHomePagePopups}
      />

    </div>
  )
}

export default HomePage;