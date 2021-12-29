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
  const [isLoadingPage, setIsLoadingPage] = React.useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [requestMessage, setRequestMessage] = React.useState({ text: '', isShow: false, type: '' });

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
      api.updateUserInfo(userInfoUpdate, localStorage.token)
      .then((res) => {
        setCurrentUser({ ...currentUser, firstname, lastname, middlename, phone, email });
        console.log(res);
        setRequestMessage({ 
          text: 'Данные успешно сохранены!',
          isShow: true,
          type: 'success',
        })
      })
      .catch((err) => {
        setRequestMessage({ 
          text: 'К сожалению произошла ошибка, ваши данные не сохранены!',
          isShow: true,
          type: 'error',
        })
        console.log(err);
      })
      .finally(() => {
        setIsLoadingRequest(false);
      });
    }
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
              history={history}
              isLoadingRequest={isLoadingRequest}
              requestMessage={requestMessage}
              setRequestMessage={setRequestMessage}
            />
          </Switch> 
        }
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;