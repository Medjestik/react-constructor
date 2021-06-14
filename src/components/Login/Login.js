import React from 'react';
import './Login.css';
import Popup from '../Popup/Popup.js';

function Login({ onLogin, loginError, setLoginError, isOpen, onClose }) {

  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [blockSubmitButton, setBlockSubmitButton] = React.useState(true);
 
  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ login, password });
  }

  function handleChangeLogin(e) {
    setLogin(e.target.value);
    setLoginError(false);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    setLoginError(false);
  }

  React.useEffect(() => {
    setLogin('');
    setPassword('');
    setLoginError(false);
  }, [isOpen, setLoginError]);

  React.useEffect(() => {
    if (login.length > 0 && password.length > 0) {
      setBlockSubmitButton(false);
    } else {
      setBlockSubmitButton(true);
    }
  }, [login, password]);


  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="login__form" name="login-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="login__title">Для начала работы с конструктором введите полученные логин и&nbsp;пароль и&nbsp;нажмите кнопку &laquo;Войти&raquo;.</h3>
        <div className="login__form-line">
          <input 
            className="login__input"
            placeholder="Логин"
            type="text"
            id="login"
            name="login"
            value={login}
            onChange={handleChangeLogin}
            required
          >
          </input>
        </div>
        <div className="login__form-line">
          <input 
            className="login__input"
            placeholder="Пароль"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChangePassword}
            required
          >
          </input>
        </div>
        <div className="login__submit">
          <span className={`login__submit-error ${loginError ? "login__submit-error_type_show" : "login__submit-error_type_hide"}`}>
            Неправильный логин или пароль
          </span>
          <button 
            className={`login__submit-button ${blockSubmitButton ? "login__submit-button_type_block" : ""}`} 
            type="submit"
          >
            Войти
          </button>
        </div>
        <p className="login__forgot-password">Забыли пароль?</p>
      </form>
    </Popup>
  )
}

export default Login;