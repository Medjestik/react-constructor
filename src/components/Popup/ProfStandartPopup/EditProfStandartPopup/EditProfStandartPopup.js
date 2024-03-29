import React from 'react';
import Popup from '../../Popup.js';
import InputMask from "react-input-mask";

function EditProfStandartPopup({ isOpen, currentProfstandart, onClose, onEdit, printDate, isLoading }) {

  const [addNameText, setAddNameText] = React.useState('');
  const [addNameTextError, setAddNameTextError] = React.useState(false);
  const [addNameCode, setAddNameCode] = React.useState('');
  const [addNameCodeError, setAddNameCodeError] = React.useState(false);
  const [addOrderDate, setAddOrderDate] = React.useState('');
  const [addOrderDateError, setAddOrderDateError] = React.useState(false);
  const [addOrderNumber, setAddOrderNumber] = React.useState('');
  const [addOrderNumberError, setAddOrderNumberError] = React.useState(false);
  //const [addRegistrationDate, setAddRegistrationDate] = React.useState('');
  //const [addRegistrationDateError, setAddRegistrationDateError] = React.useState(false);
  //const [addRegistrationNumber, setAddRegistrationNumber] = React.useState('');
  //const [addRegistrationNumberError, setAddRegistrationNumberError] = React.useState('');
  const [addNameQual, setAddNameQual] = React.useState('');
  const [addLinkQual, setAddLinkQual] = React.useState('');
  const [addFullName, setAddFullName] = React.useState('');
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const newProfStandart = {
     nameText: addNameText,
     nameCode: addNameCode,
     orderDate: addOrderDate,
     orderNumber: addOrderNumber,
     registrationDate: "",
     registrationNumber: "",
     nameQual: addNameQual,
     linkQual: addLinkQual,
     fullName: addFullName,
    }

    onEdit(newProfStandart, currentProfstandart.id, onClose);
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
    if (e.target.value.length !== 10) {
      setAddOrderDateError(true);
    } else {
      setAddOrderDateError(false);
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

  /*function handleAddRegistrationDate(e) {
    setAddRegistrationDate(e.target.value);
    if (e.target.value.length !== 10) {
      setAddRegistrationDateError(true);
    } else {
      setAddRegistrationDateError(false);
    }
  }

  function handleAddRegistrationNumber(e) {
    setAddRegistrationNumber(e.target.value);
    if (e.target.checkValidity()) {
      setAddRegistrationNumberError(false);
    } else {
      setAddRegistrationNumberError(true);
    }
  }*/

  function handleAddQual(e) {
    setAddNameQual(e.target.value);
  }

  function handleLinkQual(e) {
    setAddLinkQual(e.target.value);
  }

  React.useEffect(() => {
    setAddNameText(currentProfstandart.nameText);
    setAddNameCode(currentProfstandart.nameCode);
    setAddOrderNumber(currentProfstandart.orderNumber);
    setAddOrderDate(currentProfstandart.orderDate);
    //setAddRegistrationDate(currentProfstandart.registrationDate || "");
    //setAddRegistrationNumber(currentProfstandart.registrationNumber || "");
    setAddNameQual(currentProfstandart.nameQual || "");
    setAddLinkQual(currentProfstandart.linkQual || "");
    setAddNameTextError(false);
    setAddNameCodeError(false);
    setAddOrderDateError(false);
    setAddOrderNumberError(false);
    //setAddRegistrationDateError(false);
    //setAddRegistrationNumberError(false);
    setIsBlockSubmitButton(true);
  }, [currentProfstandart, isOpen]);

  React.useEffect(() => {
    if (
      addNameTextError || 
      addNameCodeError || 
      addOrderDateError || 
      addOrderNumberError || 
      //addRegistrationDateError || 
      //addRegistrationNumberError ||
      addNameText.length < 1 ||
      addNameCode.length < 5 ||
      addOrderDate.length < 10 ||
      addOrderNumber.length < 1
      //addRegistrationDate.length < 10 ||
      //addRegistrationNumber.length < 1
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addNameText, addNameCode, addOrderDate, addOrderNumber]);

  React.useEffect(() => { 
    let code = addNameCode.length > 0 ? addNameCode : "xx.xxx";
    let name = addNameText.length > 0 ? addNameText : "<наименование профстандарта>";
    let orderDate = addOrderDate.length > 0 ? printDate(addOrderDate) : "xx.xx.xxxx";
    let orderNumber = addOrderNumber.length > 0 ? addOrderNumber : "xxxx";
    //let registrationDate = addRegistrationDate.length > 0 ? printDate(addRegistrationDate) : "xx.xx.xxxx";
    //let registrationNumber = addRegistrationNumber.length > 0 ? addRegistrationNumber : "xxx";
     
    setAddFullName(code + " " + name + ", приказ от " + orderDate + " г. № " + orderNumber + "н");


    // eslint-disable-next-line
  }, [addNameCode, addNameText, addOrderDate, addOrderNumber])
  

  return(
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="edit-pf-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Редактирование профессионального стандарта</h3>
        <ul className="initial-popup__list-input">
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Название профстандарта</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите название профстандарта"
            type="text"
            id="edit-pf-input-name"
            name="edit-pf-input-name"
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
            id="edit-pf-input-code"
            name="edit-pf-input-code"
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
          <li className="initial-popup__item-input initial-popup__item-input_margin_bottom">
            <h5 className="initial-popup__input-name">Реквизиты приказа Минтруда</h5>
            <ul className="initial-popup__list-input">
              <li className="initial-popup__item-input">
                <input 
                className="initial-popup__input"
                placeholder="введите дату приказа Минтруда России"
                type="date"
                id="edit-pf-input-order-date"
                name="edit-pf-input-order-date"
                autoComplete="off"
                value={addOrderDate}
                onChange={handleAddOrderDate}
                required
                >
                </input>
                <span className={`initial-popup__input-error ${addOrderDateError ? "initial-popup__input-error_type_show" : ""}`}>Заполните дату приказа Минтруда России</span>
              </li>
              <li className="initial-popup__item-input">
                <input 
                className="initial-popup__input"
                placeholder="введите номер приказа Минтруда России"
                type="number"
                id="edit-pf-input-order-number"
                name="edit-pf-input-order-number"
                autoComplete="off"
                value={addOrderNumber}
                onChange={handleAddOrderNumber}
                onWheel={(e) => e.target.blur()}
                required
                >
                </input>
                <span className={`initial-popup__input-error ${addOrderNumberError ? "initial-popup__input-error_type_show" : ""}`}>Заполните номер приказа Минтруда России</span>
              </li>
              {
                /*
              
              <li className="initial-popup__item-input">
                <input  
                className="initial-popup__input"
                placeholder="введите дату регистрации Минюста России"
                type="date"
                id="edit-pf-input-registration-date"
                name="edit-pf-input-registration-date"
                autoComplete="off"
                value={addRegistrationDate}
                onChange={handleAddRegistrationDate}
                required
                >
                </input>
                <span className={`initial-popup__input-error ${addRegistrationDateError ? "initial-popup__input-error_type_show" : ""}`}>Заполните дату регистрации Минюста России</span>
              </li>
              <li className="initial-popup__item-input">
                <input 
                className="initial-popup__input"
                placeholder="введите регистрационный номер Минюста России"
                type="number"
                id="edit-pf-input-registration-number"
                name="edit-pf-input-registration-number"
                autoComplete="off"
                pattern="[0-9]*"
                value={addRegistrationNumber}
                onChange={handleAddRegistrationNumber}
                required
                onWheel={(e) => e.target.blur()}
                >
                </input>
                <span className={`initial-popup__input-error ${addRegistrationNumberError ? "initial-popup__input-error_type_show" : ""}`}>Заполните регистрационный номер Минюста России</span>
              </li>
              */}
            </ul>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Наименование квалификации (если есть)</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите название квалификации"
            type="text"
            id="edit-pf-input-qual"
            name="edit-pf-input-qual"
            autoComplete="off"
            value={addNameQual}
            onChange={handleAddQual}
            >
            </input>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Ссылка на описание квалификации (если есть)</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите url ссылки"
            type="url"
            id="edit-pf-input-link"
            name="edit-pf-input-link"
            autoComplete="off"
            value={addLinkQual}
            onChange={handleLinkQual}
            >
            </input>
          </li>  
        </ul>
        <p className="initial-popup__result-name">
          <span className="initial-popup__result-name_weight_bold">Итоговое название: </span>
          {addFullName}
        </p>
       
        <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Сохранение.." : "Сохранить"}</button>

      </form>
    </Popup>
  )
}

export default EditProfStandartPopup;