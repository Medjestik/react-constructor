import React from 'react';
import Popup from '../../../Popup/Popup.js';

function ControlNoticeEditPopup({ isOpen, onClose, currentNotice, onAdd, isLoading, isShowError }) { 

  const [name, setName] = React.useState("");
  const [isHidden, setIsHidden] = React.useState(currentNotice.isHidden);
  const [isSticked, setIsSticked] = React.useState(currentNotice.isSticked);

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    onAdd({ ...currentNotice, text: name, isHidden: isHidden, isSticked: isSticked } , onClose);
  }

  function handleAddName(e) {
    setName(e.target.value);
  }

  React.useEffect(() => {
    setName(currentNotice.text);
    setIsBlockSubmitButton(true);
    return () => {
    }
  }, [isOpen, currentNotice]);

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
      <form className="popup__form popup__form_type_large" name="control-structure-edit-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Редактирование объявления</h3>
        <textarea 
          className="initial-data__item-qualification-text" 
          name="notice-text" 
          placeholder="Введите текст объявления"
          value={name}
          onChange={handleAddName}
          required
        >
        </textarea>

        <div className='control-notice__checkbox'>
          <label className="checkbox">
          <input 
            name="edit-notice-active"
            type="checkbox"
            id={'hidden' + currentNotice.id}
            value={isHidden}
            defaultChecked={currentNotice.isHidden}
            onChange={() => setIsHidden(!isHidden)}
            >
          </input>
            <span>Скрыть объявление</span>
          </label>
          <label className="checkbox">
          <input 
            name="edit-notice-active"
            type="checkbox"
            id={'sticked' + currentNotice.id}
            value={isSticked}
            defaultChecked={currentNotice.isSticked}
            onChange={() => setIsSticked(!isSticked)}
            >
          </input>
            <span>Закрепить объявление</span>
          </label>
        </div>


        <span className={`popup__submit-error ${isShowError.isShow ? "popup__submit-error_type_show" : "popup__submit-error_type_hide"}`}>{isShowError.isShow ? isShowError.text : ""}</span>
        <div className="control-program__popup-buttons">
          <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Сохранение.." : "Сохранить"}</button>
        </div>

      </form>
    </Popup>
  )
}

export default ControlNoticeEditPopup;