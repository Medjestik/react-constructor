import React from 'react';
import Popup from '../../Popup.js';
import confirmIcon from '../../../../images/confirm.png';

function RemoveProfStandartPopup({ isOpen, onClose, currentProfstandart, onRemove, isLoading, isErrorRequest }) {

  const [error, setError] = React.useState({})

  console.log(currentProfstandart)

  function handleSubmit(e) {
    e.preventDefault();
    onRemove(currentProfstandart.id, onClose);
  }

  React.useEffect(() => {
    setError(isErrorRequest);
    // eslint-disable-next-line
  }, [isErrorRequest]);

  React.useEffect(() => {
    setError({})
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_small" name="remove-pf-form" action="#" noValidate onSubmit={handleSubmit}>
        <img className="popup__icon" src={confirmIcon} alt="Иконка подтверждения"></img>
        <h3 className="popup__title">Вы действительно хотите удалить профстандарт?</h3>
        <button className={`btn btn_type_delete ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Удаление.." : "Удалить"}</button>
        <span className={`popup__error-request ${error.isShow ? "popup__error-request_visible_show" : "popup__error-request_visible_hide"}`}>{error.text}</span>
      </form>
    </Popup>
    )
}

export default RemoveProfStandartPopup;