import React from 'react';
import './ErrorRemovePopup.css';
import Popup from '../../../../Popup/Popup.js';
import errorIcon from '../../../../../images/cancel.png';

function ErrorRemovePopup({ isOpen, onClose, onConfirm }) {

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
        <h3 className="popup__title error-zoon__title">Невозможно удалить компонент</h3>
        <p className="popup__subtitle">Невозможно удалить компонент, так как к нему привязаны другие элементы. Сначала необходимо удалить их или перенести.</p>
        <button className="btn btn_type_confirm">Понятно</button>
        <div>
        </div>
      </form>
    </Popup>
  )
}

export default ErrorRemovePopup;