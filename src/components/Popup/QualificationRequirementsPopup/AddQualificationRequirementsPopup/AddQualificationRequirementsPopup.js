import React from 'react';
import Popup from '../../Popup.js';

function AddQualificationRequirementsPopup({ isOpen, onClose, onAdd, isLoading, requestMessage, clearRequestMessage }) {

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
     text: addName,
    }

    onAdd(data, onClose);
  }

  function handleAddName(e) {
    setAddName(e.target.value);
    clearRequestMessage();
    if (e.target.checkValidity()) {
      setAddNameError(false);
    } else {
      setAddNameError(true);
    }
  }

  React.useEffect(() => {
    setAddName('');
    setAddNameError(false);
    setIsBlockSubmitButton(true);
  }, [isOpen]);

  React.useEffect(() => {
    if (
      addNameError || 
      addName.length < 1
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addName]);

  return(
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_medium" name="program-data-add-qualification-req-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="popup__title">Добавление нового требования</h3>

        <div className="form__field">
          <span className="form__input-caption font_weight_bold">Наименование требования</span>
          <input 
            className={`form__input ${addNameError && "form__input_type_error"}`}
            placeholder="Введите наименование.."
            type="text"
            id="program-data-add-qualification-req"
            name="program-data-add-qualification-req"
            autoComplete="off"
            value={addName}
            onChange={handleAddName}
            required
          >
          </input>
          <span className={`form__input-error ${addNameError && "form__input-error_active"}`}>Заполните наименование требования</span>
        </div>

        <div className="form__btn-container form__btn-container_margin_top-20">
          <div className="form__btn-item">
            <button className={`btn btn_type_save ${isBlockSubmitButton && "btn_type_block"} ${isLoading && "btn_type_loading"}`} type="submit">Сохранить данные</button>
          </div>
        </div>

        <span className={`request-message ${(requestMessage.isShow && requestMessage.action === 'popup') ? "request-message_type_show" : "request-message_type_hide"} ${requestMessage.type === 'error' ? "request-message_type_error" : "request-message_type_success"}`}>{requestMessage.text}</span>

      </form>
    </Popup>
  )
}

export default AddQualificationRequirementsPopup;