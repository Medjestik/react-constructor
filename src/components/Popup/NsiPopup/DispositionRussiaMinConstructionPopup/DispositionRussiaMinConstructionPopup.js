import React from 'react';
import Popup from '../../Popup.js';

function DispositionRussiaMinConstructionPopup({ isOpen, onClose, nsi, onSave, id, printDate, type, isLoading }) {

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [addEdition, setAddEdition] = React.useState('');
  const [addProtocolNumber, setAddProtocolNumber] = React.useState('');
  const [addProtocolNumberError, setAddProtocolNumberError] = React.useState(false);
  const [addProtocolDate, setAddProtocolDate] = React.useState('');
  const [addProtocolDateError, setAddProtocolDateError] = React.useState(false);
  const [addFullName, setAddFullName] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const newNsi = { ...nsi, nsiName: addName, nsiProtocolNumber: addProtocolNumber, nsiProtocolDate: addProtocolDate, nsiEdit: addEdition, type_id: id, nsiFullName: addFullName };
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

  function handleAddProtocolNumber(e) {
    setAddProtocolNumber(e.target.value);
    if (e.target.checkValidity()) {
      setAddProtocolNumberError(false);
    } else {
      setAddProtocolNumberError(true);
    }
  }

  function handleAddProtocolDate(e) {
    setAddProtocolDate(e.target.value);
    if (e.target.value.length !== 10) {
      setAddProtocolDateError(true);
    } else {
      setAddProtocolDateError(false);
    }
  }

  function handleAddEdition(e) {
    setAddEdition(e.target.value);
  }

  React.useEffect(() => {
    setAddName(nsi.nsiName);
    setAddEdition(nsi.nsiEdit || "");
    setAddProtocolNumber(nsi.nsiProtocolNumber);
    setAddProtocolDate(nsi.nsiProtocolDate);
    setAddFullName('');
    setAddNameError(false);
    setAddProtocolNumberError(false);
    setAddProtocolDateError(false)
    setIsBlockSubmitButton(true);
  }, [nsi, isOpen]);

  React.useEffect(() => {
    if (
      addNameError || 
      addProtocolDateError ||
      addProtocolNumberError ||
      addName.length < 1 ||
      addProtocolDate.length < 10 ||
      addProtocolNumber.length < 1 
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addName, addProtocolDate, addProtocolNumber])

  React.useEffect(() => {  
  let edition = addEdition.length > 0 ? " (ред. от " + printDate(addEdition) + " г.) " : ""; 
	let date = addProtocolDate.length > 0 ? printDate(addProtocolDate) : "xx.xx.xxxx"
	let number = addProtocolNumber.length > 0 ? addProtocolNumber : "XX"  
  let name = addName.length > 0 ? addName: "<название>"
  setAddFullName("Распоряжение Минстроя России от " + date + " г. № " + number + "" + edition + " «" + name + "»");

 // eslint-disable-next-line
  }, [addEdition, addProtocolDate, addProtocolNumber, addName])

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name={`${type}-nsi-form-${id}`} action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="nsi-popup__title">{`${type === "edit" ? "Редактирование " : "Добавление "}`}Распоряжения Минстроя России</h3>
        <ul className="nsi-popup__list-input">
        <li className="nsi-popup__item-input">
          <h5 className="nsi-popup__input-name">Название</h5>
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
          <h5 className="nsi-popup__input-name">Протокол №</h5>
          <input 
          className="nsi-popup__input"
          placeholder="введите номер"
          type="text"
          id={`${type}-nsi-input-approve-number-${id}`}
          name={`${type}-nsi-input-approve-number-${id}`}
          autoComplete="off"
          value={addProtocolNumber}
          onChange={handleAddProtocolNumber}
          required
          >
          </input>
          <span className={`nsi-popup__input-error ${addProtocolNumberError ? "nsi-popup__input-error_type_show" : ""}`}>Заполните номер</span>
        </li>
        <li className="nsi-popup__item-input">
          <h5 className="nsi-popup__input-name">Протокол от</h5>
          <input  
          className="nsi-popup__input"
          placeholder="введите редакцию"
          type="date"
          id={`${type}-nsi-input-protocol-date-${id}`}
          name={`${type}-nsi-input-protocol-date-${id}`}
          autoComplete="off"
          value={addProtocolDate}
          onChange={handleAddProtocolDate}
          required
          >
          </input>
          <span className={`nsi-popup__input-error ${addProtocolDateError ? "nsi-popup__input-error_type_show" : ""}`}>Заполните дату</span>
        </li>
        <li className="nsi-popup__item-input">
          <h5 className="nsi-popup__input-name">Редакция (если есть)</h5>
          <input  
          className="nsi-popup__input"
          placeholder="введите редакцию"
          type="date"
          id={`${type}-nsi-input-edition-${id}`}
          name={`${type}-nsi-input-edition-${id}`}
          autoComplete="off"
          value={addEdition}
          onChange={handleAddEdition}
          >
          </input>
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

export default DispositionRussiaMinConstructionPopup;