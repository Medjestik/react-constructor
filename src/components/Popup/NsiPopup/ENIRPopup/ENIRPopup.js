import React from 'react';
import Popup from '../../Popup.js';

function ENIRPopup({ isOpen, onClose, nsi, onSave, id, printDate, type, isLoading }) {

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [addCode, setAddCode] = React.useState('');
  const [addCodeError, setAddCodeError] = React.useState(false);
  const [addBasis, setAddBasis] = React.useState('');
  const [addProtocolNumber, setAddProtocolNumber] = React.useState('');
  const [addProtocolDate, setAddProtocolDate] = React.useState('');
  const [addFullName, setAddFullName] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const newNsi = { ...nsi, nsiName: addName, nsiBasis: addBasis, nsiProtocolNumber: addProtocolNumber, nsiProtocolDate: addProtocolDate, nsiCode: addCode, type_id: id, nsiFullName: addFullName };
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

  function handleAddCode(e) {
    setAddCode(e.target.value);
    if (e.target.checkValidity()) {
      setAddCodeError(false);
    } else {
      setAddCodeError(true);
    }
  }

  function handleAddBasis(e) {
    setAddBasis(e.target.value);
  }

  function handleAddProtocolNumber(e) {
    setAddProtocolNumber(e.target.value);
  }

  function handleAddProtocolDate(e) {
    setAddProtocolDate(e.target.value);
  }

  React.useEffect(() => {
    setAddName(nsi.nsiName);
    setAddCode(nsi.nsiCode);
    setAddBasis(nsi.nsiBasis || "");
    setAddProtocolNumber(nsi.nsiProtocolNumber || "");
    setAddProtocolDate(nsi.nsiProtocolDate || "");
    setAddFullName('');
    setAddNameError(false);
    setAddCodeError(false);
    setIsBlockSubmitButton(true);
  }, [nsi, isOpen]);

  React.useEffect(() => {
    if (
      addNameError || 
      addName.length < 1 ||
      addCodeError ||
      addCode.length < 1
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addName, addCode])

  React.useEffect(() => { 
    let code = addCode.length > 0 ? addCode : "<шифр>" 
    let name = addName.length > 0 ? addName : "<название>"
    let basis = addBasis.length > 0 ? addBasis : ""
    let number = addProtocolNumber.length > 0 ? addProtocolNumber : ""
    let date = addProtocolDate.length > 0 ? addProtocolDate : ""
    let res = addBasis.length > 0 ? "Издан на основании "+ basis + " от " + date + " г. № " + number : ""
    setAddFullName("ЕНИР "+ code + ". «" + name + "». " + res);

  // eslint-disable-next-line
  }, [addCode,addName,addBasis,addProtocolNumber,addProtocolDate])

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name={`${type}-nsi-form-${id}`} action="#" noValidate onSubmit={handleSubmit}>
          <h3 className="nsi-popup__title">{`${type === "edit" ? "Редактирование " : "Добавление "}`}ЕНИР</h3>
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
            <h5 className="nsi-popup__input-name">Шифр</h5>
            <input  
            className="nsi-popup__input"
            placeholder="введите шифр"
            type="text"
            id={`${type}-nsi-input-code-${id}`}
            name={`${type}-nsi-input-code-${id}`}
            autoComplete="off"
            value={addCode}
            onChange={handleAddCode}
            required
            >
            </input>
            <span className={`nsi-popup__input-error ${addCodeError ? "nsi-popup__input-error_type_show" : ""}`}>Заполните шифр</span>
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Издан на основании (если есть)</h5>
            <input 
            className="nsi-popup__input"
            placeholder="введите на основание чего издан"
            type="text"
            id={`${type}-nsi-input-basis-${id}`}
            name={`${type}-nsi-input-basis-${id}`}
            autoComplete="off"
            value={addBasis}
            onChange={handleAddBasis}
            >
            </input>
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Протокол № (если есть)</h5>
            <input 
            className="nsi-popup__input"
            placeholder="введите номер"
            type="text"
            id={`${type}-nsi-protocol-number-${id}`}
            name={`${type}-nsi-protocol-number-${id}`}
            autoComplete="off"
            value={addProtocolNumber}
            onChange={handleAddProtocolNumber}
            >
            </input>
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Протокол от (если есть)</h5>
            <input  
            className="nsi-popup__input"
            placeholder="введите редакцию"
            type="date"
            id={`${type}-nsi-protocol-date-${id}`}
            name={`${type}-nsi-protocol-date-${id}`}
            autoComplete="off"
            value={addProtocolDate}
            onChange={handleAddProtocolDate}
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

export default ENIRPopup;