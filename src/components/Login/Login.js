import React from 'react';
import './Login.css';
import Popup from '../Popup/Popup.js';

function Login({ onLogin, loginError, setLoginError, isOpen, onClose }) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [blockSubmitButton, setBlockSubmitButton] = React.useState(true);
  const [errorEmail, setErrorEmail] = React.useState({});
  const [errorPassword, setErrorPassword] = React.useState({});

  const errorForm = errorEmail.error || errorPassword.error;
 
  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setLoginError(false);
    if (e.target.checkValidity()) {
      setErrorEmail({
          errorText: '',
          error: false
      });
    }
    else {
      setErrorEmail({
          errorText: 'Неправильный формат email',
          error: true
      });
    }
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    setLoginError(false);
    if (e.target.checkValidity()) {
      setErrorPassword({
          errorText: '',
          error: false
      });
    }
    else {
        setErrorPassword({
            errorText: 'Пароль должен содержать более 6 символов',
            error: true
        });
    }  
  }

  React.useEffect(() => {
    setEmail('');
    setPassword('');
    setBlockSubmitButton(true);
    setErrorEmail({
      errorText: '',
      error: false
    });
    setErrorPassword({
      errorText: '',
      error: false
    });
  }, [isOpen]);

  React.useEffect(() => {
    if (!errorForm) {
      setBlockSubmitButton(false);
    } else {
      setBlockSubmitButton(true);

    }
  }, [errorForm]);


  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form" name="login-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="popup__title">Для начала работы с конструктором введите полученные логин и&nbsp;пароль и&nbsp;нажмите кнопку &laquo;Войти&raquo;.</h3>
        <div className="popup__form-line">
          <input 
            className="popup__input"
            placeholder="Введите электронную почту"
            type="email" 
            id="loginEmail"
            name="loginEmail" 
            value={email}
            onChange={handleChangeEmail}
            required
          >
          </input>
          <span className={`popup__input-error ${errorEmail.error ? "popup__input-error_active" : ""}`}>
            {errorEmail.errorText}
          </span>
        </div>
        <div className="popup__form-line">
          <input 
            className="popup__input"
            placeholder="Введите пароль"
            minLength="6"
            type="password"
            id="loginPassword"
            name="loginPassword"
            value={password}
            onChange={handleChangePassword}
            required
          >
          </input>
          <span className={`popup__input-error ${errorPassword.error ? "popup__input-error_active" : ""}`}>
            {errorPassword.errorText}
          </span>
        </div>
        <div className="popup__submit">
          <span className={`popup__submit-error ${loginError ? "popup__submit-error_type_show" : "popup__submit-error_type_hide"}`}>
            Неправильный логин или пароль
          </span>
          <button 
            className={`popup__submit-button ${blockSubmitButton ? "popup__submit-button_type_block" : ""}`} 
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