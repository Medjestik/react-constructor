import React from 'react';
import './App.css';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import Main from '../Main/Main.js';
import HomePage from '../HomePage/HomePage.js';
import * as api from '../../utils/api.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import Preloader from '../Preloader/Preloader.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loginError, setLoginError] = React.useState(false);
  const [isSavedPassword, setIsSavedPassword] = React.useState(false);
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [requestMessage, setRequestMessage] = React.useState({ text: '', isShow: false, type: '', action: '', });
  const [feedbackMessage, setFeedbackMessage] = React.useState({ text: '', isShow: false, });

  const { pathname } = useLocation();
  const history = useHistory();

  function handleLogin ({ email, password }) {

    api.login({ email, password })
      .then((res) => {
        localStorage.setItem("token", res.token);
        tokenCheck();
      })
      .catch((err) => {
        setLoginError(true);
      })
      .finally(() => {

      });
  }

  function tokenCheck () {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoadingPage(true);
      api.getMe({ token: token })
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res.data);
            if (pathname === "/") {
              history.push("/main");
            } else {
              history.push(pathname);
            }
          } else {
            localStorage.removeItem("token");
            setLoggedIn(false);
            setCurrentUser({});
          }
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingPage(false);
        });
    }
  }

  function handleLogout () {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setCurrentUser({});
    history.push('/');
  }

  function handleFeedback(feedback) {
    setFeedbackMessage({text: '', isShow: false,});
    setIsLoadingRequest(true);
    if (loggedIn) {
      api.sendFeedback(feedback, localStorage.token)
      .then(() => {
        setFeedbackMessage({text: 'Сообщение успешно отправлено!', isShow: true,});
      })
      .catch((err) => {
        console.error(err);
        setFeedbackMessage({text: 'К сожалению, произошла ошибка!', isShow: true,});
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
    }
  }

  function handleChangePassword(password, user, onClose) {
    if (loggedIn) {
      setIsSavedPassword(true);
      clearRequestMessage();
      api.changePassword(password, user, localStorage.token)
      .then(() => {
        onClose();
        setRequestMessage({ 
          text: 'Данные успешно сохранены!',
          isShow: true,
          type: 'success',
          action: 'password',
        })
      })
      .catch((err) => {
        setRequestMessage({ 
          text: 'К сожалению произошла ошибка, ваши данные не сохранены!',
          isShow: true,
          type: 'error',
          action: 'password',
        })
        console.log(err);
      })
      .finally(() => {
        setIsSavedPassword(false);
      });
    }
  }

  function handleUpdateUser ({ firstname, lastname, middlename, phone, email, }) {
    const userInfoUpdate = {
      firstname: firstname,
      lastname: lastname,
      middlename: middlename,
      phone: phone,
      email: email,
      id: currentUser.id,
    }
    if (loggedIn) {
      setIsLoadingRequest(true);
      clearRequestMessage();
      api.updateUserInfo(userInfoUpdate, localStorage.token)
      .then(() => {
        setCurrentUser({ ...currentUser, firstname, lastname, middlename, phone, email });
        setRequestMessage({ 
          text: 'Данные успешно сохранены!',
          isShow: true,
          type: 'success',
          action: 'userData',
        })
      })
      .catch((err) => {
        setRequestMessage({ 
          text: 'К сожалению произошла ошибка, ваши данные не сохранены!',
          isShow: true,
          type: 'error',
          action: 'userData',
        })
        console.log(err);
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
    }
  }

  function clearRequestMessage() {
    setRequestMessage({ text: '', isShow: false, type: '', action: '', })
  }

  React.useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {
          isLoadingPage ?
          <Preloader />
          :
          <Switch>
            <Route exact path="/">
              <HomePage
                onLogin={handleLogin}
                loginError={loginError}
                setLoginError={setLoginError}
              />
            </Route>
            <ProtectedRoute
              component={Main}
              path="/main"
              loggedIn={loggedIn}
              pathname={pathname}
              onLogout={handleLogout}
              onUpdateUser={handleUpdateUser}
              onChangePassword={handleChangePassword}
              onFeedback={handleFeedback}
              history={history}
              isLoadingRequest={isLoadingRequest}
              isSavedPassword={isSavedPassword}
              requestMessage={requestMessage}
              feedbackMessage={feedbackMessage}
              setFeedbackMessage={setFeedbackMessage}
              clearRequestMessage={clearRequestMessage}
            />
          </Switch> 
        }
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;