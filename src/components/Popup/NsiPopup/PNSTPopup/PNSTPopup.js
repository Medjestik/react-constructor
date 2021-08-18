import React from 'react';
import Popup from '../../Popup.js';

function PNSTPopup({ isOpen, onClose, emptyNsi, onAdd, id, printDate }) {

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [addCode, setAddCode] = React.useState('');
  const [addCodeError, setAddCodeError] = React.useState(false);
  const [addLink, setAddLink] = React.useState('');
  const [addLinkError, setAddLinkError] = React.useState(false);
  const [addFullName, setAddFullName] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const newNsi = { ...emptyNsi, nsiName: addName, nsiCode: addCode, nsiLink: addLink, type_id: id, nsiFullName: addFullName };
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

  function handleAddLink(e) {
    setAddLink(e.target.value);
    if (e.target.checkValidity()) {
      setAddLinkError(false);
    } else {
      setAddLinkError(true);
    }
  }

  React.useEffect(() => {
    setAddName('');
    setAddFullName('');
    setAddCode('');
    setAddLink('');
    setAddNameError(false);
    setAddCodeError(false);
    setAddLinkError(false);
    setIsBlockSubmitButton(true);
  }, [isOpen]);

  React.useEffect(() => {
    if (
      addNameError || 
      addName.length < 1 ||
      addLinkError ||
      addLink.length < 1 ||
      addCodeError ||
      addCode.length < 1
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addName, addCode, addLink])

  React.useEffect(() => { 
    let name = addName.length > 0 ? addName : "<название>"
    let code = addCode.length > 0 ? addCode : "<шифр>"; 
    let link = addLink.length > 0 ? addLink : "<URL>"; 
    
    setAddFullName("ПНСТ " + code + ". Предварительный национальный стандарт РФ " + name + ".– " + link);

  // eslint-disable-next-line
  }, [addName,addCode,addLink])

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="add-nsi-form" action="#" noValidate onSubmit={handleSubmit}>
          <h3 className="nsi-popup__title">Добавление ПНСТ</h3>
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
            required
            >
            </input>
            <span className={`nsi-popup__input-error ${addCodeError ? "nsi-popup__input-error_type_show" : ""}`}>Заполните шифр</span>
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Адрес сайта, URL</h5>
            <input  
            className="nsi-popup__input"
            placeholder="введите url"
            type="url"
            id="add-input-link"
            name="add-input-link"
            autoComplete="off"
            value={addLink}
            onChange={handleAddLink}
            required
            >
            </input>
            <span className={`nsi-popup__input-error ${addLinkError ? "nsi-popup__input-error_type_show" : ""}`}>Введите корректный URL</span>
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

export default PNSTPopup;