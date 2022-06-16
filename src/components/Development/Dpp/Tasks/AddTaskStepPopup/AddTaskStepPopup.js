import React from 'react';
import Popup from '../../../../Popup/Popup.js';
import TinyEditor from '../../../../TinyEditor/TinyEditor.js';

function AddTaskStepPopup({ isOpen, onClose, currentTask, currentStep, currentStepType, onAddStep, onEditStep, isLoadingRequest }) {

  const [text, setText] = React.useState("");
  const [object, setObject] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [advice, setAdvice] = React.useState("");
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) { 
    e.preventDefault();
    const newStep = {
      text: text,
      object: object,
      answer: answer,
      advice: advice,
    }
    if (currentStepType === "edit") {
      onEditStep({...currentStep, text: text, object: object, answer: answer, advice: advice}, onClose);
    } else {
      onAddStep(newStep, onClose);
    }
  }

  function handleChangeText(content) {
    setText(content);
  }
  
  function handleChangeObject(e) {
    setObject(e.target.value);
  }
  
  function handleChangeAnswer(content) {
    setAnswer(content);
  }

  function handleChangeAdvice(content) {
    setAdvice(content);
  }

  React.useEffect(() => {
    if (currentStepType === "edit") {
      setText(currentStep.text);
      setObject(currentStep.object);
      setAnswer(currentStep.answer);
      setAdvice(currentStep.advice);
    } else {
      setText("");
      setObject("");
      setAnswer("");
      setAdvice("");
    }
    return () => {
    }
  }, [isOpen, currentStepType, currentStep]);

  React.useEffect(() => {
    if (text.length < 1 || object.length < 1 || answer.length < 1) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  }, [text, object, answer, advice]);
 

  return(
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="add-task-step-popup-form" action="#" noValidate onSubmit={handleSubmit}>

        <h3 className="initial-popup__title">Добавление нового шага</h3>
        <ul className="practical-task__list">
          <li className="practical-task__item">
            <h5 className="practical-task__item-name">Введите текст задания*</h5>
            <TinyEditor 
              onChange={handleChangeText}
              currentTask={currentTask}
              currentTaskType={currentStepType}
              currentTaskValue={currentStep.text}
            />
          </li>
          <li className="practical-task__item">
            <h5 className="practical-task__item-name">Введите объект оценки*</h5>
            <input 
              className="practical-task__item-input"
              placeholder="введите объект оценки"
              type="text"
              id="add-task-by-step-text"
              name="add-task-by-step-text"
              autoComplete="off"
              value={object}
              onChange={handleChangeObject}
              required
              >
              </input>
          </li>
          <li className="practical-task__item">
            <h5 className="practical-task__item-name">Введите ответ*</h5>
            <TinyEditor 
              onChange={handleChangeAnswer}
              currentTask={currentTask}
              currentTaskType={currentStepType}
              currentTaskValue={currentStep.answer}
            />
          </li>
          <li className="practical-task__item">
            <h5 className="practical-task__item-name">Введите подсказку</h5>
            <TinyEditor 
              onChange={handleChangeAdvice}
              currentTask={currentTask}
              currentTaskType={currentStepType}
              currentTaskValue={currentStep.advice}
            />
          </li>
        </ul>
        <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoadingRequest ? "btn_type_loading" : ""}`} type="submit">{isLoadingRequest ? "Сохранение.." : "Сохранить"}</button>

      </form>
    </Popup>
  )
}

export default AddTaskStepPopup;