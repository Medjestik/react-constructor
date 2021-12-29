import React from 'react';
import Popup from '../../../../Popup/Popup.js';

function AddAssessmentObjectPopup({ isOpen, onClose, currentTask, currentSubject, onAddObject, isLoadingRequest }) {

  const [descriptionObject, setDescriptionObject] = React.useState("");
  const [descriptionObjectError, setDescriptionObjectError] = React.useState(true);
  const [modelAnswer, setModelAnswer] = React.useState("");
  const [modelAnswerError, setModelAnswerError] = React.useState(true);
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) { 
    e.preventDefault();
    onAddObject(currentTask.id, currentSubject.id, { name: descriptionObject, modelAnswer: modelAnswer }, onClose);
  }

  function handleAddDescriptionObject(e) {
    setDescriptionObject(e.target.value);
    if (e.target.checkValidity()) {
      setDescriptionObjectError(false);
    } else {
      setDescriptionObjectError(true);
    }
  }

  function handleAddModelAnswer(e) {
    setModelAnswer(e.target.value);
    if (e.target.checkValidity()) {
      setModelAnswerError(false);
    } else {
      setModelAnswerError(true);
    }
  }

  React.useEffect(() => {
    if (descriptionObjectError || modelAnswerError) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }

  }, [descriptionObjectError, modelAnswerError])

  React.useEffect(() => {
    setDescriptionObject("");
    setModelAnswer("");
    setIsBlockSubmitButton(true);
    return () => {

    }
  }, [isOpen]);
 

  return(
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="add-task-assessment-object-item-popup-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Добавление нового объекта оценки</h3>
        <ul className="practical-task__list">
          <li className="practical-task__item">
              <h5 className="practical-task__item-name">Введите описание объекта оценки</h5>
              <textarea 
              className="practical-task__textarea" 
              id="add-description-object"
              name="add-description-object"
              placeholder="введите описание объекта оценки"
              defaultValue={descriptionObject}
              onChange={handleAddDescriptionObject}
              spellCheck="true"
              required
            >
            </textarea>
            </li>
            <li className="practical-task__item">
              <h5 className="practical-task__item-name">Введите модельный ответ</h5>
              <textarea 
              className="practical-task__textarea" 
              id="add-model-answer"
              name="add-model-answer"
              placeholder="введите модельный объект"
              defaultValue={modelAnswer}
              onChange={handleAddModelAnswer}
              spellCheck="true"
              required
            >
            </textarea>
            </li>
        </ul>
        <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoadingRequest ? "btn_type_loading" : ""}`} type="submit">{isLoadingRequest ? "Сохранение.." : "Сохранить"}</button>

      </form>
    </Popup>
  )
}

export default AddAssessmentObjectPopup;