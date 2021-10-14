import React from 'react';
import Popup from '../../../../Popup/Popup.js';

function EditAssessmentObjectPopup({ isOpen, onClose, currentTask, currentSubject, currentObject, onConfirm, isLoadingRequest }) {

  const [descriptionObject, setDescriptionObject] = React.useState("");
  const [modelAnswer, setModelAnswer] = React.useState("");
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) { 
    e.preventDefault();
    onConfirm(currentTask.id, currentSubject.id, {...currentObject, name: descriptionObject, modelAnswer: modelAnswer}, onClose);
  }

  function handleAddDescriptionObject(e) {
    setDescriptionObject(e.target.value);
  }

  function handleAddModelAnswer(e) {
    setModelAnswer(e.target.value);
  }

  React.useEffect(() => {
    if (descriptionObject.length < 1 || modelAnswer.length < 1) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  }, [descriptionObject, modelAnswer])

  React.useEffect(() => {
    setDescriptionObject(currentObject.name);
    setModelAnswer(currentObject.modelAnswer);
    setIsBlockSubmitButton(true);
    return () => {

    }
  }, [isOpen, currentObject]);
 

  return(
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="add-task-assessment-object-item-popup-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Редактирование объекта оценки</h3>
        <ul className="practical-task__list">
          <li className="practical-task__item">
              <h5 className="practical-task__item-name">Введите описание объекта оценки</h5>
              <textarea 
              className="practical-task__textarea" 
              id="add-description-object"
              name="add-description-object"
              placeholder="введите описание объекта оценки"
              defaultValue={descriptionObject || ""}
              onChange={handleAddDescriptionObject}
              spellCheck="true"
              required
            >
            </textarea>
            </li>
            <li className="practical-task__item">
              <h5 className="practical-task__item-name">Введите модельный объект</h5>
              <textarea 
              className="practical-task__textarea" 
              id="add-model-answer"
              name="add-model-answer"
              placeholder="введите модельный объект"
              defaultValue={modelAnswer || ""}
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

export default EditAssessmentObjectPopup;