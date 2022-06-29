import React from 'react';
import Popup from '../../../Popup/Popup.js';
import confirmIcon from '../../../../images/confirm.png';

function ControlNoticeRemovePopup({ isOpen, onClose, currentNotice, onRemove, isLoading, isShowError }) {

  function handleSubmit(e) {
    e.preventDefault();
    onRemove(currentNotice);
  }

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_small" name="control-notice-remove-form" action="#" noValidate onSubmit={handleSubmit}>
        <img className="popup__icon" src={confirmIcon} alt="Иконка подтверждения"></img>
        <h3 className="popup__title">Вы действительно хотите удалить объявление?</h3>
        <p className="popup__subtitle"></p>
        <span className={`popup__submit-error control-user__submit-error ${isShowError.isShow ? "popup__submit-error_type_show" : "popup__submit-error_type_hide"}`}>{isShowError.isShow ? isShowError.text : ""}</span>
        <button className={`btn btn_type_delete ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Удаление.." : "Удалить"}</button>
      </form>
    </Popup>
    )
}

export default ControlNoticeRemovePopup; 