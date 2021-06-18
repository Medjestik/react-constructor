import React from 'react';
import './Person.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Person({ onUpdateUser }) {

  const user = React.useContext(CurrentUserContext);

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
  

  function handleChangeFirstname(e) {
    setFirstname(e.target.value);
    setErrorFirstname(false);
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

  return (
    <div className="person">
      <h1 className="main__title">Личный кабинет</h1>
      <form className="form" name="person-form" action="#" noValidate onSubmit={handleSubmit}>

        <label className="form__field">
          <span className="form__input-caption">Имя</span>
          <div className="form__line">
            <input 
              className="popup__input"
              placeholder="Введите имя"
              minLength="2"
              type="text"
              id="personFirstname"
              name="personFirstname"
              value={firstname}
              onChange={handleChangeFirstname}
              required
            >
            </input>
            <span className={`form__input-error ${errorFirstname.error ? "form__input-error_active" : ""}`}>
            {errorFirstname.errorText}
            </span>
          </div>
        </label>

        <label className="form__field">
          <span className="form__input-caption">Фамилия</span>
          <div className="form__line">
            <input 
              className="popup__input"
              placeholder="Введите фамилию"
              minLength="2"
              type="text"
              id="personLastname"
              name="personLastname"
              value={lastname}
              onChange={handleChangeLastname}
              required
            >
            </input>
            <span className={`form__input-error ${errorLastname.error ? "form__input-error_active" : ""}`}>
            {errorLastname.errorText}
            </span>
          </div>
        </label>

        <label className="form__field">
          <span className="form__input-caption">Отчетсво</span>
          <div className="form__line">
            <input 
              className="popup__input"
              placeholder="Введите отчество"
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
        </label>

        <label className="form__field">
          <span className="form__input-caption">Телефон</span>
          <div className="form__line">
            <input 
              className="popup__input"
              placeholder="Введите номер телефона"
              type="text"
              id="personPhone"
              name="personPhone"
              value={phone}
              onChange={handleChangePhone}
            >
            </input>
            <span className={`form__input-error ${errorPhone.error ? "form__input-error_active" : ""}`}>
            {errorPhone.errorText}
            </span>
          </div>
        </label>

        <label className="form__field">
          <span className="form__input-caption">Электронная почта</span>
          <div className="form__line">
            <input 
              className="popup__input"
              placeholder="Введите электронную почту'"
              type="email"
              id="personEmail"
              name="personEmail"
              value={email}
              onChange={handleChangeEmail}
              required
            >
            </input>
            <span className={`form__input-error ${errorEmail.error ? "form__input-error_active" : ""}`}>
            {errorEmail.errorText}
            </span>
          </div>
        </label>
        
        
        <button className={`btn btn_type_save ${errorForm ? "btn_type_block" : ""}`} type="submit">Сохранить данные</button>
      </form>
      
    </div>
  );
}

export default Person;