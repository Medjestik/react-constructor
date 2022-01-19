import React from 'react';
import Popup from '../../Popup/Popup.js';

function ControlStructureAddPartPopup({ isOpen, onClose, onAdd, isLoading, isShowError }) { 

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);
  const [name, setName] = React.useState("");
  
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({ name: name, id: parseInt(new Date().getTime()), });
  }

  React.useEffect(() => {
    setIsBlockSubmitButton(true);
    setName("");
    return () => {
      setName("");
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (name.length < 1) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [name]);

  return(
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="control-program-add-participant-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Добавление нового раздел</h3>
        <ul className="initial-popup__list-input">
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Название раздела</h5>
            <textarea 
              className="initial-data__item-qualification-text" 
              name="control-structure-part-name" 
              placeholder="Введите название раздела"
              value={name}
              onChange={handleChangeName}
              minLength="1"
              required
            >
            </textarea>
            
          </li>
        </ul>
       
        <span className={`popup__submit-error ${isShowError.isShow ? "popup__submit-error_type_show" : "popup__submit-error_type_hide"}`}>{isShowError.isShow ? isShowError.text : ""}</span>
        <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Добавление.." : "Добавить"}</button>

      </form>
    </Popup>
  )
}

export default ControlStructureAddPartPopup;