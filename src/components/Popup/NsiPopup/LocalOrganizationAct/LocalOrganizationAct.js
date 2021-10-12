import React from 'react';
import Popup from '../../Popup.js';

function LocalOrganizationAct({ isOpen, onClose, nsi, onSave, id, printDate, type, isLoading }) {

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [addOrganization, setAddOrganization] = React.useState('');
  const [addOrganizationError, setAddOrganizationError] = React.useState(false);
  const [addDate, setAddDate] = React.useState('');
  const [addDateError, setAddDateError] = React.useState(false);
  const [addNumber, setAddNumber] = React.useState('');
  const [addNumberError, setAddNumberError] = React.useState(false);
  const [addFullName, setAddFullName] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const newNsi = { ...nsi, nsiName: addName, nsiAuthors: addOrganization, nsiDate: addDate, nsiNumber: addNumber, type_id: id, nsiFullName: addFullName };
    onSave(newNsi, onClose);
  }

  function handleAddName(e) {
    setAddName(e.target.value);
    if (e.target.checkValidity()) {
      setAddNameError(false);
    } else {
      setAddNameError(true);
    }
  }

  function handleAddOrganization(e) {
    setAddOrganization(e.target.value);
    if (e.target.checkValidity()) {
      setAddOrganizationError(false);
    } else {
      setAddOrganizationError(true);
    }
  }

  function handleAddNumber(e) {
    setAddNumber(e.target.value);
    if (e.target.checkValidity()) {
      setAddNumberError(false);
    } else {
      setAddNumberError(true);
    }
  }

  function handleAddDate(e) {
    setAddDate(e.target.value);
    if (e.target.value.length !== 10) {
      setAddDateError(true);
    } else {
      setAddDateError(false);
    }
  }

  React.useEffect(() => {
    setAddName(nsi.nsiName);
    setAddOrganization(nsi.nsiAuthors);
    setAddDate(nsi.nsiDate);
    setAddNumber(nsi.nsiNumber);
    setAddFullName('');
    setAddNameError(false);
    setAddOrganizationError(false);
    setAddDateError(false);
    setAddNumberError(false)
    setIsBlockSubmitButton(true);
  }, [type, nsi, isOpen]);

  React.useEffect(() => {
    if (
      addNameError || 
      addOrganizationError ||
      addDateError ||
      addNumberError ||
      addName.length < 1 ||
      addOrganization.length < 1 ||
      addDate.length < 10 ||
      addNumber.length < 1 
      ) {
      setIsBlockSubmitButton(true); 
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addName, addOrganization, addDate, addNumber])

  React.useEffect(() => {
    let number = addNumber.length > 0 ? addNumber : "xxx"
    let organization = addOrganization.length > 0 ? addOrganization : "<Организация>"
    let date = addDate.length > 0 ? printDate(addDate) : "xx.xx.xxxx";
    let name = addName.length > 0 ? addName : "<Название>"
    
    setAddFullName(name + " " + organization + " от " + date + " г. №" + number);
    // eslint-disable-next-line
  }, [addName, addOrganization, addDate, addNumber])


  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name={`${type}-nsi-form-${id}`} action="#" noValidate onSubmit={handleSubmit}>
          <h3 className="nsi-popup__title">{`${type === "edit" ? "Редактирование " : "Добавление "}`}локального акта организации</h3>
          <ul className="nsi-popup__list-input">
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Наименование организации</h5>
            <input 
            className="nsi-popup__input"
            placeholder="введите наименование организации"
            type="text"
            id={`${type}-nsi-input-organization-${id}`}
            name={`${type}-nsi-input-organization-${id}`}
            autoComplete="off"
            value={addOrganization}
            onChange={handleAddOrganization}
            required
            >
            </input>
            <span className={`nsi-popup__input-error ${addOrganizationError ? "nsi-popup__input-error_type_show" : ""}`}>Заполните наименование организации</span>
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Название акта</h5>
            <input 
            className="nsi-popup__input"
            placeholder="введите название"
            type="text"
            id={`${type}-nsi-input-name-${id}`}
            name={`${type}-nsi-input-name-${id}`}
            autoComplete="off"
            value={addName}
            onChange={handleAddName}
            required
            >
            </input>
            <span className={`nsi-popup__input-error ${addNameError ? "nsi-popup__input-error_type_show" : ""}`}>Заполните название</span>
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Дата утверждения акта</h5>
            <input  
            className="nsi-popup__input"
            placeholder="введите дату"
            type="date"
            id={`${type}-nsi-input-date-${id}`}
            name={`${type}-nsi-input-date-${id}`}
            autoComplete="off"
            value={addDate}
            onChange={handleAddDate}
            required
            >
            </input>
            <span className={`nsi-popup__input-error ${addDateError ? "nsi-popup__input-error_type_show" : ""}`}>Заполните дату</span>
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Номер утверждения акта</h5>
            <input 
            className="nsi-popup__input"
            placeholder="введите номер"
            type="text"
            id={`${type}-nsi-input-number-${id}`}
            name={`${type}-nsi-input-number-${id}`}
            autoComplete="off"
            value={addNumber}
            onChange={handleAddNumber}
            required
            >
            </input>
            <span className={`nsi-popup__input-error ${addNumberError ? "nsi-popup__input-error_type_show" : ""}`}>Заполните номер</span>
          </li>
        </ul>

        <p className="initial-popup__result-name">
          <span className="initial-popup__result-name_weight_bold">Итоговое название: </span>
          {addFullName}
        </p>

        {
         type === "edit" ?
         <button 
         className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} 
         type="submit"
         >
           {isLoading ? "Сохранение.." : "Сохранить"}
         </button>
         :
         <button 
         className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} 
         type="submit"
         >
           {isLoading ? "Добавление.." : "Добавить"}
         </button>
       }

      </form>
    </Popup>
    )
}

export default LocalOrganizationAct;