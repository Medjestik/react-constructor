import React from 'react';
import Popup from '../../Popup/Popup.js';

function ChangePasswordPopup({ isOpen, onClose, onChangePassword, user, isLoading, isShowError }) { 


  const [password, setPassword] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState(false);
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [errorRepeatPassword, setErrorRepeatPassword] = React.useState(false);
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    onChangePassword(password, user, onClose);
  }

  
  function handleAddPassword(e) {
    setPassword(e.target.value);
    if (e.target.checkValidity()) {
      setErrorPassword(false);
    } else {
      setErrorPassword(true);
    }
  }

  function handleAddRepeatPassword(e) {
    setRepeatPassword(e.target.value);
    if (e.target.value === password) {
      setErrorRepeatPassword(false);
    } else {
      setErrorRepeatPassword(true);
    }
  }

  React.useEffect(() => {
    setPassword('');
    setErrorPassword(false);
    setRepeatPassword('');
    setErrorRepeatPassword(false);
    setIsBlockSubmitButton(true);
    return () => {
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (
      errorPassword || 
      password.length < 6 ||
      errorRepeatPassword || 
      repeatPassword.length < 6 
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [password,repeatPassword]);

  return (
    <>
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="change-password" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Изменение пароля</h3>
        <ul className="initial-popup__list-input">
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Введите новый пароль</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите новый пароль.."
            type="text"
            id="create-new-password"
            name="create-new-password"
            autoComplete="off"
            minLength="6"
            value={password}
            onChange={handleAddPassword}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${errorPassword ? "initial-popup__input-error_type_show" : ""}`}>Пароль должен быть не короче 6 символов</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Повторите новый пароль</h5>
            <input 
            className="initial-popup__input"
            placeholder="повторите новый пароль.."
            type="number"
            id="create-new-password-repeat"
            name="create-new-password-repeat"
            autoComplete="off"
            minLength="6"
            value={repeatPassword}
            onChange={handleAddRepeatPassword}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${errorRepeatPassword ? "initial-popup__input-error_type_show" : ""}`}>Пароли не совпадают</span>
          </li> 
        </ul>

        <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Сохранение.." : "Сохранить"}</button>
      
      </form>
    </Popup>

    </>
  )
}

export default ChangePasswordPopup;