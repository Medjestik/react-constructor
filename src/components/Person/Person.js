import React from 'react';
import './Person.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import ChangePasswordPopup from '../Popup/ChangePasswordPopup/ChangePasswordPopup.js';

function Person({ onUpdateUser, onChangePassword, isLoadingRequest, isSavedPassword, requestMessage, clearRequestMessage }) {

  const user = React.useContext(CurrentUserContext);

  const [isChangePasswordPopupOpen, setIsChangePasswordPopupOpen] = React.useState(false);

  const [firstname, setFirstname] = React.useState(user.firstname);
  const [errorFirstname, setErrorFirstname] = React.useState({});
  const [lastname, setLastname] = React.useState(user.lastname);
  const [errorLastname, setErrorLastname] = React.useState({});
  const [middlename, setMiddlename] = React.useState(user.middlename);
  const [errorMiddlename, setErrorMiddlename] = React.useState({});
  const [phone, setPhone] = React.useState(user.phone);
  const [errorPhone, setErrorPhone] = React.useState({});
  const [email, setEmail] = React.useState(user.email);
  const [errorEmail, setErrorEmail] = React.useState({});

  const errorForm = errorFirstname.error || errorLastname.error || errorMiddlename.error || errorPhone.error || errorEmail.error;

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ firstname, lastname, middlename, phone, email })
  }

  React.useEffect(() => {
    clearRequestMessage();
    // eslint-disable-next-line
  }, []);
  

  function handleChangeFirstname(e) {
    setFirstname(e.target.value);
    setErrorFirstname(false);
    clearRequestMessage();
    if (e.target.checkValidity()) {
      setErrorFirstname({
          errorText: '',
          error: false
      });
    }
    else {
      setErrorFirstname({
          errorText: 'Имя должно быть не короче 2 символов',
          error: true
      });
    }
  }

  function handleChangeLastname(e) {
    setLastname(e.target.value);
    setErrorLastname(false);
    clearRequestMessage();
    if (e.target.checkValidity()) {
      setErrorLastname({
          errorText: '',
          error: false
      });
    }
    else {
      setErrorLastname({
          errorText: 'Фамилия должна быть не короче 2 символов',
          error: true
      });
    }
  }

  function handleChangeMiddlename(e) {
    setMiddlename(e.target.value);
    setErrorMiddlename(false);
    clearRequestMessage();
    if (e.target.checkValidity()) {
      setErrorMiddlename({
          errorText: '',
          error: false
      });
    }
    else {
      setErrorMiddlename({
          errorText: 'Отчество должно быть не короче 2 символов',
          error: true
      });
    }
  }

  function handleChangePhone(e) {
    setPhone(e.target.value);
    setErrorPhone(false);
    clearRequestMessage();
    if (e.target.checkValidity()) {
      setErrorPhone({
          errorText: '',
          error: false
      });
    }
    else {
      setErrorPhone({
          errorText: 'Введите корректный номер телефона',
          error: true
      });
    }
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setErrorEmail(false);
    clearRequestMessage();
    if (e.target.checkValidity()) {
      setErrorEmail({
          errorText: '',
          error: false
      });
    }
    else {
      setErrorEmail({
          errorText: 'Введите корректный адрес электронной почты',
          error: true
      });
    }
  }

  function openChangePasswordPopup() {
    setIsChangePasswordPopupOpen(true);
    clearRequestMessage();
  }

  function closeChangePasswordPopup() {
    setIsChangePasswordPopupOpen(false);
    clearRequestMessage();
  }

  return (
    <>
    <div className="person">
      <h1 className="main__title">Личный кабинет</h1>
      <form className="form form_width-600 form_margin_top-20" name="person-form" action="#" noValidate onSubmit={handleSubmit}>

        <div className="form__field form__field_margin_top-8">
          <span className="form__input-caption font_weight_bold">Фамилия</span>
          <input 
            className={`form__input ${errorLastname.error && "form__input_type_error"}`}
            placeholder="Введите фамилию.."
            minLength="2"
            type="text"
            id="personLastname"
            name="personLastname"
            value={lastname}
            onChange={handleChangeLastname}
            required
          >
          </input>
          <span className={`form__input-error ${errorLastname.error && "form__input-error_active"}`}>
          {errorLastname.errorText}
          </span>
        </div>

        <div className="form__field form__field_margin_top-8">
          <span className="form__input-caption font_weight_bold">Имя</span>
          <input 
            className={`form__input ${errorLastname.error && "form__input_type_error"}`}
            placeholder="Введите имя.."
            minLength="2"
            type="text"
            id="personFirstname"
            name="personFirstname"
            value={firstname}
            onChange={handleChangeFirstname}
            required
          >
          </input>
          <span className={`form__input-error ${errorFirstname.error && "form__input-error_active"}`}>
          {errorFirstname.errorText}
          </span>
        </div>

        <div className="form__field form__field_margin_top-8">
          <span className="form__input-caption font_weight_bold">Отчетсво</span>
          <input 
            className={`form__input ${errorLastname.error && "form__input_type_error"}`}
            placeholder="Введите отчество.."
            minLength="2"
            type="text"
            id="personMiddlename"
            name="personMiddlename"
            value={middlename}
            onChange={handleChangeMiddlename}
            required
          >
          </input>
          <span className={`form__input-error ${errorMiddlename.error ? "form__input-error_active" : ""}`}>
          {errorMiddlename.errorText}
          </span>
        </div>

        <div className="form__field form__field_margin_top-8">
          <span className="form__input-caption font_weight_bold">Телефон</span>
          <input 
            className={`form__input ${errorLastname.error && "form__input-error_active"}`}
            placeholder="Введите номер телефона.."
            type="text"
            id="personPhone"
            name="personPhone"
            value={phone}
            onChange={handleChangePhone}
          >
          </input>
          <span className={`form__input-error ${errorPhone.error && "form__input-error_active"}`}>
          {errorPhone.errorText}
          </span>
        </div>

        <div className="form__field form__field_margin_top-8">
          <span className="form__input-caption font_weight_bold">Электронная почта</span>
          <input 
            className={`form__input ${errorLastname.error && "form__input_type_error"}`}
            placeholder="Введите электронную почту.."
            type="email"
            id="personEmail"
            name="personEmail"
            value={email}
            onChange={handleChangeEmail}
            required
          >
          </input>
          <span className={`form__input-error ${errorEmail.error && "form__input-error_active"}`}>
          {errorEmail.errorText}
          </span>
        </div>

        <div className="form__btn-container form__btn-container_margin_top-20">
          <div className="form__btn-item">
            <button className={`btn btn_type_save ${errorForm && "btn_type_block"} ${isLoadingRequest && "btn_type_loading"}`} type="submit">Сохранить данные</button>
          </div>
          <div className="form__btn-item">
            <button className="btn btn_type_password" type="button" onClick={openChangePasswordPopup}>Изменить пароль</button>
          </div>
        </div>
        
        <span className={`request-message ${(requestMessage.isShow && requestMessage.action === 'userData') ? "request-message_type_show" : "request-message_type_hide"} ${requestMessage.type === 'error' ? "request-message_type_error" : "request-message_type_success"}`}>{requestMessage.text}</span>

      </form> 
      
    </div>

    {
      isChangePasswordPopupOpen &&
      <ChangePasswordPopup 
        isOpen={isChangePasswordPopupOpen}
        onClose={closeChangePasswordPopup}
        onChangePassword={onChangePassword}
        user={user}
        isLoading={isSavedPassword}
        requestMessage={requestMessage}
      />
      }
    </>
  );
}

export default Person;