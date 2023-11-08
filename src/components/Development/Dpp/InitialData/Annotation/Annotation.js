import React from 'react';

function Annotation({ initialData, onSave, isLoading, requestMessage, clearRequestMessage, isEditRights }) {

  const [programDescription, setProgramDescription] = React.useState(initialData.annotationDescription);

  function handleChangeProgramDescription(e) {
    setProgramDescription(e.target.value);
    clearRequestMessage();
  }

  return (
    <>
    <h5 className="initial-data__item-title initial-data__item-title_margin_bottom">Аннотация программы</h5>

    <textarea 
      className="form__textarea"
      name="program-data-annotation"
      id="program-data-annotation"
      placeholder="Введите описание программы.."
      value={programDescription}
      onChange={handleChangeProgramDescription}
    >
    </textarea>

    {
      isEditRights &&
      <>
        <div className="form__btn-container form__btn-container_margin_top-20">
          <div className="form__btn-item">
            <button className={`btn btn_type_save ${isLoading && "btn_type_loading"}`} type="button" onClick={() => onSave(programDescription)}>Сохранить данные</button>
          </div>
        </div>

        <span className={`request-message ${(requestMessage.isShow && requestMessage.action === 'annotation') ? "request-message_type_show" : "request-message_type_hide"} ${requestMessage.type === 'error' ? "request-message_type_error" : "request-message_type_success"}`}>{requestMessage.text}</span>
      </>
    }

    </>
  );
}

export default Annotation;
