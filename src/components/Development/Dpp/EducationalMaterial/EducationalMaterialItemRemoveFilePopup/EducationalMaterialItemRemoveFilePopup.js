import React from 'react';
import Popup from '../../../../Popup/Popup.js';
import confirmIcon from '../../../../../images/confirm.png';

function EducationalMaterialItemRemoveFilePopup({ isOpen, onClose, onRemove, themeId, type, isLoading }) {

  function handleSubmit(e) {
    e.preventDefault();
    onRemove(themeId, type);
  }

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_small" name="remove-content-file" action="#" noValidate onSubmit={handleSubmit}>
        <img className="popup__icon" src={confirmIcon} alt="Иконка подтверждения"></img>
        <h3 className="popup__title">Вы действительно хотите удалить загруженный документ?</h3>
        <button className={`btn btn_type_delete ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Удаление.." : "Удалить"}</button>
      </form>
    </Popup>
    )
}

export default EducationalMaterialItemRemoveFilePopup; 