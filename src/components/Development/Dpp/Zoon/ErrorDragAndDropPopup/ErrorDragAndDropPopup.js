import React from 'react';
import './ErrorDragAndDropPopup.css';
import Popup from '../../../../Popup/Popup.js';
import errorIcon from '../../../../../images/cancel.png';

function ErrorDragAndDropPopup({ isOpen, onClose, onConfirm, errorDragAndDrop }) {

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm();
  }
  
  React.useEffect(() => {

    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form" name="error-zoon-form" action="#" noValidate onSubmit={handleSubmit}>
        <img className="popup__icon" src={errorIcon} alt="Иконка подтверждения"></img>
        <h3 className="popup__title error-zoon__title">Ошибка!</h3>
        <p className="popup__subtitle">{errorDragAndDrop}</p>
        <button className="btn btn_type_confirm">Понятно</button>
        <div>
        </div>
      </form>
    </Popup>
  )
}

export default ErrorDragAndDropPopup;