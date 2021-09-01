import React from 'react';
import Popup from '../Popup.js';
import confirmIcon from '../../../images/confirm.png';

function RemoveMTOPopup({ isOpen, onClose, onRemove, currentMTO, isLoadingRequest }) {

  function handleSubmit(e) {
    e.preventDefault();
    onRemove(currentMTO.id, onClose);
  }

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_small" name="remove-mto-form" action="#" noValidate onSubmit={handleSubmit}>
        <img className="popup__icon" src={confirmIcon} alt="Иконка подтверждения"></img>
        <h3 className="popup__title">Вы действительно хотите удалить МТО?</h3>
        <p className="popup__subtitle">{currentMTO.typeName || ""}</p>
        <button className={`btn btn_type_delete ${isLoadingRequest ? "btn_type_loading" : ""}`} type="submit">{isLoadingRequest ? "Удаление.." : "Удалить"}</button>
      </form>
    </Popup>
    )
}

export default RemoveMTOPopup; 