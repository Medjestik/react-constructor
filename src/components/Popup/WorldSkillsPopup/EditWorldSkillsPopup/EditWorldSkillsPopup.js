import React from 'react';
import Popup from '../../Popup.js';

function EditWorldSkillsPopup({ isOpen, currentWorldSkills, onClose, onEdit, isLoading }) {

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [addCode, setAddCode] = React.useState('');
  const [addCodeError, setAddCodeError] = React.useState(false);
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    const newDocument = {
     name: addName,
     code: addCode,
     fullName: addCode + " " + addName,
    }

    onEdit(newDocument, currentWorldSkills.id, onClose);
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
    setAddName(currentWorldSkills.name);
    setAddCode(currentWorldSkills.code);
    setAddNameError(false);
    setAddCodeError(false);
    setIsBlockSubmitButton(true);
  }, [currentWorldSkills ,isOpen]);

  React.useEffect(() => {
    if (
      addNameError || 
      addCodeError || 
      addName.length < 1 ||
      addCode.length < 1
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addName, addCode])

  return(
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="edit-ws-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Добавление новой компетенции WorldSkills</h3>
        <ul className="initial-popup__list-input">
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Название компетенции</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите название компетенции"
            type="text"
            id="add-ws-input-name"
            name="add-ws-input-name"
            autoComplete="off"
            value={addName}
            onChange={handleAddName}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${addNameError ? "initial-popup__input-error_type_show" : ""}`}>Заполните название компетенции</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Код компетенции</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите наименование должности"
            type="text"
            id="add-ws-input-code"
            name="add-ws-input-code"
            autoComplete="off"
            value={addCode}
            onChange={handleAddCode}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${addCodeError ? "initial-popup__input-error_type_show" : ""}`}>Заполните наименование должности</span>
          </li>
        </ul>

              
        <p className="initial-popup__result-name">
          <span className="initial-popup__result-name_weight_bold">Итоговое название: </span>
          {`
            ${addCode || "xxx"}
            ${addName || "компетенция"} 
          `}
        </p>
       
        <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Сохранение.." : "Сохранить"}</button>

      </form>
    </Popup>
  )
}

export default EditWorldSkillsPopup;