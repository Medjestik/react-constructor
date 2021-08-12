import React from 'react';
import './RemovePartPopup.css';
import Popup from '../Popup.js';
import confirmIcon from '../../../images/confirm.png';

function RemovePartPopup({ isOpen, onClose, part, onRemove }) {

  const isLoadingRequest = false;

  function handleSubmit(e) {
    e.preventDefault();
    onRemove(part.id);
  }

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_small" name="edit-part-form" action="#" noValidate onSubmit={handleSubmit}>
        <img className="popup__icon" src={confirmIcon} alt="Иконка подтверждения"></img>
        <h3 className="popup__title">Вы действительно хотите удалить типовой раздел?</h3>
        <p className="popup__subtitle">Знания, прикрепленные к данному разделу, будут отсоединены</p>
        <button className={`btn btn_type_delete ${isLoadingRequest ? "btn_type_loading" : ""}`} type="submit">{isLoadingRequest ? "Удаление.." : "Удалить"}</button>
      </form>
    </Popup>
    )
}

export default RemovePartPopup;