import React from 'react';
import Popup from '../../Popup.js';

function StandardPopup({ isOpen, onClose, emptyNsi, onAdd, id, printDate }) {

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [addCode, setAddCode] = React.useState('');
  const [addCodeError, setAddCodeError] = React.useState(false);
  const [addFullName, setAddFullName] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const newNsi = { ...emptyNsi, nsiName: addName, nsiCode: addCode, type_id: id, nsiFullName: addFullName };
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

  function handleAddCode(e) {
    setAddCode(e.target.value);
    if (e.target.checkValidity()) {
      setAddCodeError(false);
    } else {
      setAddCodeError(true);
    }
  }

  React.useEffect(() => {
    setAddName('');
    setAddFullName('');
    setAddCode('');
    setAddNameError(false);
    setAddCodeError(false);
    setIsBlockSubmitButton(true);
  }, [isOpen]);

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
    let name = addName.length > 0 ? addName : "<название>"
    let code = addCode.length > 0 ? addCode : "<шифр>";  
    
    setAddFullName("ГОСТ " + code + ". «" + name + "»");
    // eslint-disable-next-line
    }, [addName,addCode])

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="add-nsi-form" action="#" noValidate onSubmit={handleSubmit}>
          <h3 className="nsi-popup__title">Добавление ГОСТ</h3>
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
            <h5 className="nsi-popup__input-name">Шифр</h5>
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
            <span className={`nsi-popup__input-error ${addCodeError ? "nsi-popup__input-error_type_show" : ""}`}>Заполните шифр</span>
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

export default StandardPopup;