import React from 'react';
import Popup from '../../Popup.js';

function AddOrganizationRulesPopup({ isOpen, onClose, onAdd }) {

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [addText, setAddText] = React.useState('');
  const [addTextError, setAddTextError] = React.useState(false);
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    const newDocument = {
     name: addName,
     text: addText,
     fullName: addName + ". " + addText,
    }

    onAdd(newDocument, onClose);
  }

  function handleAddName(e) {
    setAddName(e.target.value);
    if (e.target.checkValidity()) {
      setAddNameError(false);
    } else {
      setAddNameError(true);
    }
  }

  function handleAddText(e) {
    setAddText(e.target.value);
    if (e.target.checkValidity()) {
      setAddTextError(false);
    } else {
      setAddTextError(true);
    }
  }

  React.useEffect(() => {
    setAddName('');
    setAddText('');
    setAddNameError(false);
    setAddTextError(false);
    setIsBlockSubmitButton(true);
  }, [isOpen]);

  React.useEffect(() => {
    if (
      addNameError || 
      addTextError || 
      addName.length < 1 ||
      addText.length < 1
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addName, addText])

  return(
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="add-or-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Добавление нового корпоративного требования</h3>
        <ul className="initial-popup__list-input">
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Название документа</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите название документа"
            type="text"
            id="add-or-input-name"
            name="add-or-input-name"
            autoComplete="off"
            value={addName}
            onChange={handleAddName}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${addNameError ? "initial-popup__input-error_type_show" : ""}`}>Заполните название документа</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Описание документа</h5>
            <textarea 
              className="initial-data__item-qualification-text" 
              id="add-or-input-text"
              name="add-or-input-text"
              placeholder="введите описание документа"
              defaultValue={addText}
              onChange={handleAddText}
              required
            >
            </textarea>
            <span className={`initial-popup__input-error ${addTextError ? "initial-popup__input-error_type_show" : ""}`}>Заполните описание документа</span>
          </li>
        </ul>
         
        <p className="initial-popup__result-name">
          <span className="initial-popup__result-name_weight_bold">Итоговое название: </span>
          {`${addName || "<Наименование документа>"}. ${addText || "<Описание документа>"}`}
        </p>
       
        <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""}`} type="submit">Добавить</button>

      </form>
    </Popup>
  )
}

export default AddOrganizationRulesPopup;