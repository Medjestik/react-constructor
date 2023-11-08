import React from 'react';
import './Main.css';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header.js';
import Person from '../Person/Person.js';
import MainPage from '../MainPage/MainPage.js';
import Development from '../Development/Development.js';
import Dpp from '../Development/Dpp/Dpp.js';
import Control from '../Control/Control.js';
import Method from '../Method/Method.js';
import Discussion from '../Discussion/Discussion.js';
import ChangeAvatarPopup  from '../Popup/ChangeAvatarPopup/ChangeAvatarPopup.js';
import useOnClickOverlay from "../../hooks/useOnClickOverlay.js";
import useOnPushEsc from '../../hooks/useOnPushEsc.js';

function Main({ loggedIn, pathname, onLogout, history, onUpdateUser, onChangePassword, onFeedback, isLoadingRequest, isSavedPassword, requestMessage, feedbackMessage, setFeedbackMessage, clearRequestMessage }) {

  const [showHeaderMenu, setShowHeaderMenu] = React.useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.screen.width);
  
  function closeMainPopups() {
    setIsAvatarPopupOpen(false);
  }

  useOnClickOverlay(closeMainPopups);
  useOnPushEsc(closeMainPopups);

  function openAvatarPopup() {
    closeMainPopups();
    setIsAvatarPopupOpen(true);
  }

  React.useEffect(() => {
    function resizeWindow(evt) {
      setWindowWidth(evt.target.innerWidth);
    }

    window.addEventListener('resize', resizeWindow);

    return () => {
      window.removeEventListener('resize', resizeWindow);
    }
  }, []);

  return (
    <div className="main">

      <Header
        onLogout={onLogout}
        onOpenAvatarPopup={openAvatarPopup}
        showHeaderMenu={showHeaderMenu}
        setShowHeaderMenu={setShowHeaderMenu}
      />

      <div className={`main__translation ${showHeaderMenu ? "main__show-menu" : "main__hide-menu"}`}>
        <div className={`main__container ${showHeaderMenu ? "main__container_direction_left" : "main__container_direction_center"}`}>

        <Switch>    
          <Route path="/main" exact>
            <MainPage
            loggedIn={loggedIn} 
            onFeedback={onFeedback} 
            isLoading={isLoadingRequest} 
            feedbackMessage={feedbackMessage} 
            setFeedbackMessage={setFeedbackMessage} />
          </Route>
          <Route path="/main/person">
            <Person 
              onUpdateUser={onUpdateUser}
              onChangePassword={onChangePassword}
              isLoadingRequest={isLoadingRequest}
              isSavedPassword={isSavedPassword}
              requestMessage={requestMessage} 
              clearRequestMessage={clearRequestMessage}
            />
          </Route>
          <Route path="/main/development" exact >
            <Development history={history} windowWidth={windowWidth} />
          </Route>
          <Route path="/main/development/dpp" >
            <Dpp loggedIn={loggedIn} history={history} pathname={pathname} windowWidth={windowWidth} />
          </Route>
          <Route path="/main/method" exact>
            <Method />
          </Route>
          <Route path="/main/discussion" exact>
            <Discussion />
          </Route>
          <Route path="/main/control" exact>
            <Control loggedIn={loggedIn} />
          </Route>
        </Switch>

        <ChangeAvatarPopup
          isOpen={isAvatarPopupOpen}
          onClose={closeMainPopups}
        />

        </div>
      </div>
    </div>
  );
}

export default Main;
