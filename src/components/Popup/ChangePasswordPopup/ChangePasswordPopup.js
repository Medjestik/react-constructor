import React from 'react';
import Popup from '../../Popup/Popup.js';

function ChangePasswordPopup({ isOpen, onClose, onChangePassword, user, isLoading, requestMessage }) { 

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
      <form className="popup__form popup__form_type_medium" name="change-password" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="popup__title">Изменение пароля</h3>

        <div className="form__field">
          <span className="form__input-caption font_weight_bold">Введите новый пароль</span>
          <input 
            className={`form__input ${errorPassword && "form__input_type_error"}`}
            placeholder="Введите новый пароль.."
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
          <span className={`form__input-error ${errorPassword && "form__input-error_active"}`}>Пароль должен быть не короче 6 символов</span>
        </div>

        <div className="form__field form__field_margin_top-8">
          <span className="form__input-caption font_weight_bold">Повторите новый пароль</span>
          <input 
            className={`form__input ${errorRepeatPassword && "form__input_type_error"}`}
            placeholder="Повторите пароль.."
            type="text"
            id="create-new-password-repeat"
            name="create-new-password-repeat"
            autoComplete="off"
            minLength="6"
            value={repeatPassword}
            onChange={handleAddRepeatPassword}
            required
            >
            </input>
          <span className={`form__input-error ${errorRepeatPassword && "form__input-error_active"}`}>
            Пароли не совпадают
          </span>
        </div>

        <div className="form__btn-container form__btn-container_margin_top-20">
          <div className="form__btn-item">
            <button className={`btn btn_type_save ${isBlockSubmitButton && "btn_type_block"} ${isLoading && "btn_type_loading"}`} type="submit">Сохранить данные</button>
          </div>
        </div>

        <span className={`request-message ${(requestMessage.isShow && requestMessage.action === 'password') ? "request-message_type_show" : "request-message_type_hide"} ${requestMessage.type === 'error' ? "request-message_type_error" : "request-message_type_success"}`}>{requestMessage.text}</span>
      
      </form>
    </Popup>

    </>
  )
}

export default ChangePasswordPopup;