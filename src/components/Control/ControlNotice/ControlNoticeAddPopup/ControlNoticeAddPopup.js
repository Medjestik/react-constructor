import React from 'react';
import Popup from '../../../Popup/Popup.js';

function ControlNoticeAddPopup({ isOpen, onClose, onAdd, isLoading, isShowError }) { 

  const [name, setName] = React.useState("");

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    onAdd({ text: name } , onClose);
  }

  function handleAddName(e) {
    setName(e.target.value);
  }

  React.useEffect(() => {
    setName('');
    setIsBlockSubmitButton(true);
    return () => {
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (name.length < 2) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [name]);

  return (
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="control-structure-add-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Создание нового объявления</h3>
        <textarea 
          className="initial-data__item-qualification-text" 
          name="notice-text" 
          placeholder="Введите текст объявления"
          value={name}
          onChange={handleAddName}
          required
        >
        </textarea>

        <span className={`popup__submit-error ${isShowError.isShow ? "popup__submit-error_type_show" : "popup__submit-error_type_hide"}`}>{isShowError.isShow ? isShowError.text : ""}</span>
        <div className="control-program__popup-buttons">
          <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Сохранение.." : "Сохранить"}</button>
        </div>

      </form>
    </Popup>
  )
}

export default ControlNoticeAddPopup;