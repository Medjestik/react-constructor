import React from 'react';
import './HomePage.css';
import HomePageHeader from './HomePageHeader/HomePageHeader.js';
import HomePageMain from './HomePageMain/HomePageMain.js';
import HomePageCapabilities from './HomePageCapabilities/HomePageCapabilities.js';
import HomePageMethodology from './HomePageMethodology/HomePageMethodology.js';
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

      <HomePageMain onOpenLoginPopup={openLoginPopup} />

      <HomePageCapabilities />

      <div className="homepage__wave">
        <svg className="homepage__wave-svg" viewBox="0 0 500 50" preserveAspectRatio="none">
          <path className="homepage__wave-path_color_background" d="M0.00,49.98 C214.73,14.30 286.39,10.36 500.00,49.98 L500.00,0.00 L0.00,0.00 Z"></path>
        </svg>
      </div>

      <HomePageMethodology /> 

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