import React from 'react';
import Popup from '../../../../Popup/Popup.js';
import confirmIcon from '../../../../../images/confirm.png';

function RemoveAssessmentObjectPopup({ isOpen, onClose, currentTask, currentSubject, currentObject, onConfirm, isLoadingRequest }) {

  function handleSubmit(e) {
    e.preventDefault();
    onConfirm(currentTask.id, currentSubject.id, currentObject.id, onClose);
  }
  
  React.useEffect(() => {

    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form" name="confirm-remove-object-form" action="#" noValidate onSubmit={handleSubmit}>
        <img className="popup__icon" src={confirmIcon} alt="Иконка подтверждения"></img>
        <h3 className="popup__title">Вы действительно хотите удалить объект оценки?</h3>
        <button className={`btn btn_type_delete ${isLoadingRequest ? "btn_type_loading" : ""}`} type="submit">{isLoadingRequest ? "Удаление.." : "Удалить"}</button>
        <div>
          <span></span>
        </div>
      </form>
    </Popup>
  )
}

export default RemoveAssessmentObjectPopup;