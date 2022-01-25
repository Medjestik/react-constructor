import React from 'react';
import Popup from '../../../Popup/Popup.js';
import ControlUserResetPasswordPopup from '../ControlUserResetPasswordPopup/ControlUserResetPasswordPopup.js';

function ControlUserEditPopup({ isOpen, onClose, user, onEdit, onReset, isLoading, isShowError }) { 

  const [firstname, setFirstname] = React.useState("");
  const [errorFirstname, setErrorFirstname] = React.useState(false);
  const [lastname, setLastname] = React.useState("");
  const [errorLastname, setErrorLastname] = React.useState(false);
  const [middlename, setMiddlename] = React.useState("");
  const [errorMiddlename, setErrorMiddlename] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [errorPhone, setErrorPhone] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState(false);
  const [isActive, setIsActive] = React.useState(user.isActive);
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);
  const [isControlUserResetPasswordPopupOpen, setIsControlUserResetPasswordPopupOpen] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      ...user,
      firstname: firstname,
      lastname: lastname,
      middlename: middlename,
      email: email,
      phone: phone || "",
      fullname: lastname + " " + firstname + " " + middlename,
      isActive: isActive,
    }

    console.log(newUser);

    onEdit(newUser, onClose);
  }

  function handleAddFirstname(e) {
    setFirstname(e.target.value);
    if (e.target.checkValidity()) {
      setErrorFirstname(false);
    } else {
      setErrorFirstname(true);
    }
  }

  function handleAddLastname(e) {
    setLastname(e.target.value);
    if (e.target.checkValidity()) {
      setErrorLastname(false);
    } else {
      setErrorLastname(true);
    }
  }

  function handleAddMiddlename(e) {
    setMiddlename(e.target.value);
    if (e.target.checkValidity()) {
      setErrorMiddlename(false);
    } else {
      setErrorMiddlename(true);
    }
  }

  function handleAddEmail(e) {
    setEmail(e.target.value);
    if (e.target.checkValidity()) {
      setErrorEmail(false);
    } else {
      setErrorEmail(true);
    }
  }

  function handleAddPhone(e) {
    setPhone(e.target.value);
    if (e.target.checkValidity()) {
      setErrorPhone(false);
    } else {
      setErrorPhone(true);
    }
  }

  function openResetUserPasswordPopup() {
    setIsControlUserResetPasswordPopupOpen(true);
  }

  function closeResetUserPasswordPopup() {
    setIsControlUserResetPasswordPopupOpen(false);
  }

  React.useEffect(() => {
    setFirstname(user.firstname || "");
    setErrorFirstname(false);
    setLastname(user.lastname || "");
    setErrorLastname(false);
    setMiddlename(user.middlename || "");
    setErrorMiddlename(false);
    setEmail(user.email || "");
    setErrorEmail(false);
    setPhone(user.phone || "");
    setErrorPhone(false);
    setPhone(user.isActive || 1);
    setIsBlockSubmitButton(true);
  }, [isOpen, user]);

  React.useEffect(() => {
    if (
      errorFirstname || 
      firstname.length < 2 ||
      errorLastname || 
      lastname.length < 2 ||
      errorMiddlename || 
      middlename.length < 2 ||
      errorEmail || 
      email.length < 2
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [firstname, lastname, middlename, email, isActive]);

  return (
    <>
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="control-user-edit-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Редактирование пользователя</h3>
        <ul className="initial-popup__list-input">
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Фамилия*</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите фамилию пользователя"
            type="text"
            id="add-new-user-lastname"
            name="add-new-user-lastname"
            autoComplete="off"
            minLength="2"
            value={lastname}
            onChange={handleAddLastname}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${errorLastname ? "initial-popup__input-error_type_show" : ""}`}>Фамилия должна быть не короче 2 символов</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Имя*</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите имя пользователя"
            type="text"
            id="add-new-user-firstname"
            name="add-new-user-firstname"
            autoComplete="off"
            minLength="2"
            value={firstname}
            onChange={handleAddFirstname}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${errorFirstname ? "initial-popup__input-error_type_show" : ""}`}>Имя должно быть не короче 2 символов</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Отчество*</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите отчество пользователя"
            type="text"
            id="add-new-user-middlename"
            name="add-new-user-middlename"
            autoComplete="off"
            minLength="2"
            value={middlename}
            onChange={handleAddMiddlename}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${errorMiddlename ? "initial-popup__input-error_type_show" : ""}`}>Отчество должно быть не короче 2 символов</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Email*</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите адрес электронной почты'"
            type="email"
            id="add-new-user-email"
            name="add-new-user-email"
            autoComplete="off"
            minLength="2"
            value={email}
            onChange={handleAddEmail}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${errorEmail ? "initial-popup__input-error_type_show" : ""}`}>Введите корректный адрес электронной почты</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Телефон</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите номер телефона'"
            type="text"
            id="add-new-user-phone"
            name="add-new-user-phone"
            autoComplete="off"
            minLength="5"
            value={phone}
            onChange={handleAddPhone}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${errorPhone ? "initial-popup__input-error_type_show" : ""}`}>Введите корректный номер телефона</span>
          </li>
          <li>
            <label className="checkbox">
            <input 
              name="edit-user-active"
              type="checkbox"
              id={user.id}
              value={isActive}
              defaultChecked={user.isActive}
              onChange={() => setIsActive(!isActive)}
              >
            </input>
              <span>Активный пользователь</span>
            </label>
          </li>
        </ul>
       
        <span className={`popup__submit-error ${isShowError.isShow ? "popup__submit-error_type_show" : "popup__submit-error_type_hide"}`}>{isShowError.isShow ? isShowError.text : ""}</span>
        <div className="control-program__popup-buttons">
          <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Сохранение.." : "Сохранить"}</button>
          <button className="btn btn_type_password control-program__participant-btn-add" type="button" onClick={openResetUserPasswordPopup}>Сбросить пароль</button>
        </div>

      </form>
    </Popup>
    {
      isControlUserResetPasswordPopupOpen &&
      <ControlUserResetPasswordPopup
        isOpen={isControlUserResetPasswordPopupOpen}
        onClose={closeResetUserPasswordPopup}
        user={user}
        onReset={onReset}
        isLoading={isLoading}
        isShowError={isShowError}
      />
      }  
    </>
  )
}

export default ControlUserEditPopup;