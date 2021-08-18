import React from 'react';
import Popup from '../../Popup.js';

function RequirementsPopup({ isOpen, onClose, emptyNsi, onAdd, id, printDate }) {

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [addApproveName, setAddApproveName] = React.useState('');
  const [addCode, setAddCode] = React.useState('');
  const [addProtocolNumber, setAddProtocolNumber] = React.useState('');
  const [addProtocolDate, setAddProtocolDate] = React.useState('');
  const [addFullName, setAddFullName] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const newNsi = { ...emptyNsi, nsiName: addName, nsiApproveName: addApproveName, nsiProtocolNumber: addProtocolNumber, nsiProtocolDate: addProtocolDate, nsiCode: addCode, type_id: id, nsiFullName: addFullName };
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
  }

  function handleAddProtocolNumber(e) {
    setAddProtocolNumber(e.target.value);
  }

  function handleAddProtocolDate(e) {
    setAddProtocolDate(e.target.value);
  }

  function handleAddCode(e) {
    setAddCode(e.target.value);
  }

  React.useEffect(() => {
    setAddName('');
    setAddApproveName('');
    setAddProtocolNumber('');
    setAddProtocolDate('');
    setAddFullName('');
    setAddCode('');
    setAddNameError(false);
    setIsBlockSubmitButton(true);
  }, [isOpen]);

  React.useEffect(() => {
    if (
      addNameError || 
      addName.length < 1
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addName, addProtocolDate, addProtocolNumber])

  React.useEffect(() => { 
    let name = addName.length > 0 ? addName: "<название>"
    let code = addCode.length > 0 ? ": " + addCode+" " : ""; 
    let approve = addApproveName.length > 0 ?  addApproveName  : "<чем и кем утверждены>";
    let date = addProtocolDate.length > 0 ? printDate(addProtocolDate) : "xx.xx.xxxx";
    let number = addProtocolNumber.length > 0 ? addProtocolNumber : "XX";
    let res = addApproveName.length > 0 ? "(утв. " + approve + " от " + date + " № " + number + ")" : "";

    setAddFullName("Требования "  + name + " " + code + "" + res);

  // eslint-disable-next-line
  }, [addApproveName,addCode, addProtocolDate, addProtocolNumber, addName])

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="add-nsi-form" action="#" noValidate onSubmit={handleSubmit}>
          <h3 className="nsi-popup__title">Добавление Требований</h3>
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
            <h5 className="nsi-popup__input-name">Шифр (если есть)</h5>
            <input  
            className="nsi-popup__input"
            placeholder="введите шифр"
            type="text"
            id="add-input-edit-code"
            name="add-input-edit-code"
            autoComplete="off"
            value={addCode}
            onChange={handleAddCode}
            >
            </input>
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Утвержден (если есть)</h5>
            <input 
            className="nsi-popup__input"
            placeholder="введите кем утвержден"
            type="text"
            id="add-input-approve"
            name="add-input-approve"
            autoComplete="off"
            value={addApproveName}
            onChange={handleAddApproveName}
            required
            >
            </input>
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Протокол № (если есть)</h5>
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
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Протокол от (если есть)</h5>
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

export default RequirementsPopup;