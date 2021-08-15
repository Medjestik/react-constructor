import React from 'react';
import './AddProfStandartPopup.css';
import Popup from '../../Popup.js';
import InputMask from "react-input-mask";


function AddProfStandartPopup({ isOpen, onClose, onAdd }) {

  const [addNameText, setAddNameText] = React.useState('');
  const [addNameTextError, setAddNameTextError] = React.useState(false);
  const [addNameCode, setAddNameCode] = React.useState('');
  const [addNameCodeError, setAddNameCodeError] = React.useState(false);
  const [addOrderDate, setAddOrderDate] = React.useState('');
  const [addOrderDateError, setAddOrderDateError] = React.useState(false);
  const [addOrderNumber, setAddOrderNumber] = React.useState('');
  const [addOrderNumberError, setAddOrderNumberError] = React.useState(false);
  const [addRegistrationDate, setAddRegistrationDate] = React.useState('');
  const [addRegistrationDateError, setAddRegistrationDateError] = React.useState(false);
  const [addRegistrationNumber, setAddRegistrationNumber] = React.useState('');
  const [addRegistrationNumberError, setAddRegistrationNumberError] = React.useState('');
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    const order = "приказ от " + addOrderDate + " г. № " + addOrderNumber + "н (зарегистрирован Министерством юстиции Российской Федерации " + addRegistrationDate + " г., регистрационный № " + addRegistrationNumber;

    const newProfStandart = {
     name: addNameText,
     code: addNameCode,
     order: order,
     id: parseInt(new Date().getTime()),
    }

    onAdd(newProfStandart);
  }

  function handleAddName(e) {
    setAddNameText(e.target.value);
    if (e.target.checkValidity()) {
      setAddNameTextError(false);
    } else {
      setAddNameTextError(true);
    }
  }

  function handleAddCode(e) {
    setAddNameCode(e.target.value);
    if (e.target.value.indexOf("x") === -1) {
      if (e.target.value.length === 0) {
        setAddNameCodeError(true);
      } else {
        setAddNameCodeError(false);
      }
    } else {
      setAddNameCodeError(true);
    }
  }

  function handleAddOrderDate(e) {
    setAddOrderDate(e.target.value);
    if (e.target.value.indexOf("x") === -1) {
      if (e.target.value.length === 0) {
        setAddOrderDateError(true);
      } else {
        setAddOrderDateError(false);
      }
    } else {
      setAddOrderDateError(true);
    }
  }

  function handleAddOrderNumber(e) {
    setAddOrderNumber(e.target.value);
    if (e.target.checkValidity()) {
      setAddOrderNumberError(false);
    } else {
      setAddOrderNumberError(true);
    }
  }

  function handleAddRegistrationDate(e) {
    setAddRegistrationDate(e.target.value);
    if (e.target.value.indexOf("x") === -1) {
      if (e.target.value.length === 0) {
        setAddRegistrationDateError(true);
      } else {
        setAddRegistrationDateError(false);
      }
    } else {
      setAddRegistrationDateError(true);
    }
  }

  function handleAddRegistrationNumber(e) {
    setAddRegistrationNumber(e.target.value);
    if (e.target.checkValidity()) {
      setAddRegistrationNumberError(false);
    } else {
      setAddRegistrationNumberError(true);
    }
  }

  React.useEffect(() => {
    setAddNameText('');
    setAddNameCode('');
    setAddOrderNumber('');
    setAddOrderDate('');
    setAddRegistrationDate('');
    setAddRegistrationNumber('');
    setAddNameTextError(false);
    setAddNameCodeError(false);
    setAddOrderDateError(false);
    setAddOrderNumberError(false);
    setAddRegistrationDateError(false);
    setAddRegistrationNumberError(false);
    setIsBlockSubmitButton(true);
  }, [isOpen]);

  React.useEffect(() => {
    if (
      addNameTextError || 
      addNameCodeError || 
      addOrderDateError || 
      addOrderNumberError || 
      addRegistrationDateError || 
      addRegistrationNumberError ||
      addNameText.length < 1 ||
      addNameCode.length < 5 ||
      addOrderDate.length < 8 ||
      addOrderNumber.length < 1 ||
      addRegistrationDate.length < 8 ||
      addRegistrationNumber.length < 1
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addNameText, addNameCode, addOrderDate, addOrderNumber, addRegistrationDate, addRegistrationNumber])

  return(
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="avatar-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Добавление нового профессионального стандарта</h3>
        <ul className="initial-popup__list-input">
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Название профстандарта</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите название профстандарта"
            type="text"
            id="add-input-name"
            name="add-input-name"
            autoComplete="off"
            value={addNameText}
            onChange={handleAddName}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${addNameTextError ? "initial-popup__input-error_type_show" : ""}`}>Заполните название профстандарта</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Код профстандарта</h5>
            <InputMask  
            className="initial-popup__input"
            placeholder="введите код профстандарта"
            type="text"
            id="add-input-code"
            name="add-input-code"
            autoComplete="off"
            value={addNameCode}
            onChange={handleAddCode}
            mask="99.999"
            maskPlaceholder="xx.xxx"
            required
            >
            </InputMask>
            <span className={`initial-popup__input-error ${addNameCodeError ? "initial-popup__input-error_type_show" : ""}`}>Заполните код профстандарта</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Реквизиты приказа Минтруда</h5>
            <ul className="initial-popup__list-input">
              <li className="initial-popup__item-input">
                <InputMask  
                className="initial-popup__input"
                placeholder="введите дату приказа Минтруда России"
                type="text"
                id="add-input-order-date"
                name="add-input-order-date"
                autoComplete="off"
                value={addOrderDate}
                onChange={handleAddOrderDate}
                mask="99.99.2099"
                maskPlaceholder="xx.xx.xxxx"
                required
                >
                </InputMask>
                <span className={`initial-popup__input-error ${addOrderDateError ? "initial-popup__input-error_type_show" : ""}`}>Заполните дату приказа Минтруда России</span>
              </li>
              <li className="initial-popup__item-input">
                <input 
                className="initial-popup__input"
                placeholder="введите номер приказа Минтруда России"
                type="number"
                id="add-input-order-number"
                name="add-input-order-number"
                autoComplete="off"
                value={addOrderNumber}
                onChange={handleAddOrderNumber}
                onWheel={(e) => e.target.blur()}
                required
                >
                </input>
                <span className={`initial-popup__input-error ${addOrderNumberError ? "initial-popup__input-error_type_show" : ""}`}>Заполните номер приказа Минтруда России</span>
              </li>
              <li className="initial-popup__item-input">
                <InputMask  
                className="initial-popup__input"
                placeholder="введите дату приказа Минюста России"
                type="text"
                id="add-input-registration-date"
                name="add-input-registration-date"
                autoComplete="off"
                value={addRegistrationDate}
                onChange={handleAddRegistrationDate}
                mask="99.99.2099"
                maskPlaceholder="xx.xx.xxxx"
                required
                >
                </InputMask>
                <span className={`initial-popup__input-error ${addRegistrationDateError ? "initial-popup__input-error_type_show" : ""}`}>Заполните дату приказа Минюста России</span>
              </li>
              <li className="initial-popup__item-input">
                <input 
                className="initial-popup__input"
                placeholder="введите регистрационный номер"
                type="number"
                id="add-input-registration-number"
                name="add-input-registration-number"
                autoComplete="off"
                pattern="[0-9]*"
                value={addRegistrationNumber}
                onChange={handleAddRegistrationNumber}
                required
                onWheel={(e) => e.target.blur()}
                >
                </input>
                <span className={`initial-popup__input-error ${addRegistrationNumberError ? "initial-popup__input-error_type_show" : ""}`}>Заполните регистрационный номер</span>
              </li>
            </ul>
          </li>
        </ul>
        <p className="initial-popup__result-name">
          <span className="initial-popup__result-name_weight_bold">Итоговое название: </span>
          {`
            ${addNameCode || "xx.xxx"} 
            ${addNameText || "название"}, приказ от 
            ${addOrderDate || "xx.xx.20xx"} г. № 
            ${addOrderNumber || "xxxx"}н (зарегистрирован Министерством юстиции Российской Федерации 
            ${addRegistrationDate || "xx.xx.20xx"} г., регистрационный № 
            ${addRegistrationNumber || "xxxxx"})
          `}
        </p>
       
        <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""}`} type="submit">Добавить</button>

      </form>
    </Popup>
  )
}

export default AddProfStandartPopup;