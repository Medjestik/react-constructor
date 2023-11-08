import React from 'react';
import './ConfirmRemovePopup.css';
import Popup from '../Popup.js';
import confirmIcon from '../../../images/confirm.png';

function ConfirmRemovePopup({ isOpen, onClose, data, text, onRemove, isLoading, requestMessage }) {

  function handleSubmit(e) {
    e.preventDefault();
    onRemove(data, onClose);
  }

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_small" name="remove-part-form" action="#" noValidate onSubmit={handleSubmit}>

        <img className="popup__icon" src={confirmIcon} alt="Иконка подтверждения"></img>
        <h3 className="popup__title popup__title_align_center">Подтверждение удаления</h3>
        <p className="popup__subtitle">{text}</p>

        <div className="form__btn-container form__btn-container_margin_top-20">
          <div className="form__btn-item_margin_auto">
            <button className={`btn btn_type_delete ${isLoading && "btn_type_loading"}`} type="submit">Удалить</button>
          </div>
        </div>

        <span className={`request-message request-message_align_center ${(requestMessage.isShow && requestMessage.action === 'popup') ? "request-message_type_show" : "request-message_type_hide"} ${requestMessage.type === 'error' ? "request-message_type_error" : "request-message_type_success"}`}>{requestMessage.text}</span>

      </form>
    </Popup>
    )
}

export default ConfirmRemovePopup;