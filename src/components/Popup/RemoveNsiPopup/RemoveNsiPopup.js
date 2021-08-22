import React from 'react';
import Popup from '../Popup.js';
import confirmIcon from '../../../images/confirm.png';

function RemoveNsiPopup({ isOpen, onClose, nsi, onRemove, isLoading }) {

  function handleSubmit(e) {
    e.preventDefault();
    onRemove(nsi.id);
  }

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_small" name="remove-nsi-form" action="#" noValidate onSubmit={handleSubmit}>
        <img className="popup__icon" src={confirmIcon} alt="Иконка подтверждения"></img>
        <h3 className="popup__title">Вы действительно хотите удалить источник НСИ?</h3>
        <p className="popup__subtitle">{nsi.nsiFullName}</p>
        <button className={`btn btn_type_delete ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Удаление.." : "Удалить"}</button>
      </form>
    </Popup>
    )
}

export default RemoveNsiPopup;