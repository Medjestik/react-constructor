import React from 'react';
import Popup from '../../Popup.js';

function OrderFederalServicePopup({ isOpen, onClose, emptyNsi, onAdd, id, printDate }) {

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [addApproveName, setAddApproveName] = React.useState('');
  const [addApproveNameError, setAddApproveNameError] = React.useState(false);
  const [addEdition, setAddEdition] = React.useState('');
  const [addProtocolNumber, setAddProtocolNumber] = React.useState('');
  const [addProtocolNumberError, setAddProtocolNumberError] = React.useState(false);
  const [addProtocolDate, setAddProtocolDate] = React.useState('');
  const [addProtocolDateError, setAddProtocolDateError] = React.useState(false);
  const [addFullName, setAddFullName] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const newNsi = { ...emptyNsi, nsiName: addName, nsiApproveName: addApproveName, nsiProtocolNumber: addProtocolNumber, nsiProtocolDate: addProtocolDate, nsiEdit: addEdition, type_id: id, nsiFullName: addFullName };
    onAdd(newNsi, onClose);
  }

  function handleAddName(e) {
    setAddName(e.target.value);
    if (e.target.checkValidity()) {
      setAddNameError(false);
    } else {
      setAddNameError(true);
    }
  }

  
  function handleAddApproveName(e) {
    setAddApproveName(e.target.value);
    if (e.target.checkValidity()) {
      setAddApproveNameError(false);
    } else {
      setAddApproveNameError(true);
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
    setAddName('');
    setAddApproveName('');
    setAddProtocolNumber('');
    setAddProtocolDate('');
    setAddFullName('');
    setAddEdition('');
    setAddNameError(false);
    setAddApproveNameError(false);
    setAddProtocolNumberError(false);
    setAddProtocolDateError(false)
    setIsBlockSubmitButton(true);
  }, [isOpen]);

  React.useEffect(() => {
    if (
      addNameError || 
      addApproveNameError || 
      addProtocolDateError ||
      addProtocolNumberError ||
      addName.length < 1 ||
      addApproveName.length < 1 ||
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
    let approve = addApproveName.length > 0 ?  addApproveName  : "<название Федеральной службы>"
    let edition = addEdition.length > 0 ? " (ред. от " + printDate(addEdition) + " г.) " : ""; 
    let date = addProtocolDate.length > 0 ? printDate(addProtocolDate) : "xx.xx.xxxx"
    let number = addProtocolNumber.length > 0 ? addProtocolNumber : "XX"  
    let name = addName.length > 0 ? addName: "<название>"
    setAddFullName("Приказ Федеральной службы " + approve + " Российской Федерации от " + date + " г. № " + number + "" + edition + " «" + name + "»");

    // eslint-disable-next-line
    }, [addApproveName, addEdition, addProtocolDate, addProtocolNumber, addName])


  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="add-nsi-form" action="#" noValidate onSubmit={handleSubmit}>
          <h3 className="nsi-popup__title">Добавление Приказа Федеральной службы</h3>
          <ul className="nsi-popup__list-input">
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Название</h5>
            <input 
            className="nsi-popup__input"
            placeholder="введите название"
            type="text"
            id="add-input-name"
            name="add-input-name"
            autoComplete="off"
            value={addName}
            onChange={handleAddName}
            required
            >
            </input>
            <span className={`nsi-popup__input-error ${addNameError ? "nsi-popup__input-error_type_show" : ""}`}>Заполните название</span>
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Наименование фед.службы</h5>
            <input 
            className="nsi-popup__input"
            placeholder="введите наименование фед.службы"
            type="text"
            id="add-input-approve"
            name="add-input-approve"
            autoComplete="off"
            value={addApproveName}
            onChange={handleAddApproveName}
            required
            >
            </input>
            <span className={`nsi-popup__input-error ${addApproveNameError ? "nsi-popup__input-error_type_show" : ""}`}>Заполните кем утвержден</span>
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Протокол №</h5>
            <input 
            className="nsi-popup__input"
            placeholder="введите номер"
            type="text"
            id="add-input-protocol-number"
            name="add-input-protocol-number"
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
            id="add-input-protocol-date"
            name="add-input-protocol-date"
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
            id="add-input-edit-date"
            name="add-input-edit-date"
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

        <button className={`btn btn_type_save nsi-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""}`} type="submit">Добавить</button>
      </form>
    </Popup>
    )
}

export default OrderFederalServicePopup;