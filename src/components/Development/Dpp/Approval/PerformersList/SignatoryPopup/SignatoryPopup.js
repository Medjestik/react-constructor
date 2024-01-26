import React from 'react';
import Popup from '../../../../../Popup/Popup.js';

function SignatoryPopup({ isOpen, onClose, onChange, signatory, isLoading, isShowError }) { 

  const [name, setName] = React.useState("");
  const [errorName, setErrorName] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [errorTitle, setErrorTitle] = React.useState(false);

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    onChange(name, title);
  }

  function handleChangeName(e) {
    setName(e.target.value);
    if (e.target.checkValidity()) {
      setErrorName(false);
    } else {
      setErrorName(true);
    }
  }

  function handleChangeTitle(e) {
    setTitle(e.target.value);
    if (e.target.checkValidity()) {
      setErrorTitle(false);
    } else {
      setErrorTitle(true);
    }
  }

  React.useEffect(() => {
    setName(signatory.signatoryFio);
    setErrorName(false);
    setTitle(signatory.signatoryJob);
    setErrorTitle(false);
    setIsBlockSubmitButton(true);
  }, [isOpen, signatory]);

  React.useEffect(() => {
    if (
      errorName || 
      name.length < 1 ||
      errorTitle || 
      title.length < 1
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [name, title]);

  return(
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="control-performer-add-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Добавление исполнителя</h3>
        <ul className="initial-popup__list-input">
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Фамилия и инициалы</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите фамилию и инициалы"
            type="text"
            id="change-signatory-name"
            name="change-signatory-name"
            autoComplete="off"
            minLength="1"
            value={name}
            onChange={handleChangeName}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${errorName ? "initial-popup__input-error_type_show" : ""}`}>Поле не может быть пустым</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Должность</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите должность"
            type="text"
            id="change-signatory-title"
            name="change-signatory-title"
            autoComplete="off"
            minLength="1"
            value={title}
            onChange={handleChangeTitle}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${errorTitle ? "initial-popup__input-error_type_show" : ""}`}>Поле не может быть пустым</span>
          </li>

        </ul>
       
        <span className={`popup__submit-error ${isShowError.isShow ? "popup__submit-error_type_show" : "popup__submit-error_type_hide"}`}>{isShowError.isShow ? isShowError.text : ""}</span>
        <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Сохранение.." : "Сохранить"}</button>

      </form>
    </Popup>
  )
}

export default SignatoryPopup;