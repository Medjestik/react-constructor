import React from 'react';
import './ChangeQuestionTypePopup.css';
import Popup from '../../../../Popup/Popup.js';
import gearsIcon from '../../../../../images/quiz/question-type.png';
import oneAnswerIcon from '../../../../../images/quiz/one-answer-icon.png';
import multiAnswerIcon from '../../../../../images/quiz/multi-answer-icon.png';
import conformityAnswerIcon from '../../../../../images/quiz/conformity-answer-icon.png';
import oneAnswerColor from '../../../../../images/quiz/one-answer-color.png';
import multiAnswerColor from '../../../../../images/quiz/multi-answer-color.png';
import conformityAnswerColor from '../../../../../images/quiz/conformity-answer-color.png';

function ChangeQuestionTypePopup({ isOpen, onClose, onChangeType, editQuestion, isLoadingRequest, isEditRights }) {
  
  const [currentType, setCurrentType] = React.useState("");

  function handleChooseQuestionType(type) {
    setCurrentType(type);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onChangeType(currentType);
  }
  
  React.useEffect(() => {
    setCurrentType(editQuestion.questionType);
  }, [editQuestion, isOpen]);

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form" name="change-question-type-form" action="#" noValidate onSubmit={handleSubmit}>
        <img className="popup__icon" src={gearsIcon} alt="Иконка подтверждения"></img>
        <h3 className="popup__title">Выберите новый тип вопроса</h3>
        <ul className="question-type-popup__list">
          <li
          onClick={() => handleChooseQuestionType("one-answer")}
          className={`question-type-popup__item ${currentType === "one-answer" ? "question-type-popup__item_type_active" : "" }`}
          >
            {
              currentType === "one-answer" 
              ?
              <img className="question-type-popup__item-img" src={oneAnswerIcon} alt="question-type-icon"></img>
              :
              <img className="question-type-popup__item-img" src={oneAnswerColor} alt="question-type-icon"></img>
            }
            <p className={`question-type-popup__item-text ${currentType === "one-answer" ? "question-type-popup__item-text_type_active" : "" }`}>Вопрос с одним вариантом ответа</p>
          </li>
          <li
          onClick={() => handleChooseQuestionType("multi-answer")}
          className={`question-type-popup__item ${currentType === "multi-answer" ? "question-type-popup__item_type_active" : "" }`}
          >
            {
              currentType === "multi-answer" 
              ?
              <img className="question-type-popup__item-img" src={multiAnswerIcon} alt="question-type-icon"></img>
              :
              <img className="question-type-popup__item-img" src={multiAnswerColor} alt="question-type-icon"></img>
            }
            <p className={`question-type-popup__item-text ${currentType === "multi-answer" ? "question-type-popup__item-text_type_active" : "" }`}>Вопрос с множественным выбором</p>
          </li>
          <li
          onClick={() => handleChooseQuestionType("conformity-answer")}
          className={`question-type-popup__item ${currentType === "conformity-answer" ? "question-type-popup__item_type_active" : "" }`}
          >
            {
              currentType === "conformity-answer" 
              ?
              <img className="question-type-popup__item-img" src={conformityAnswerIcon} alt="question-type-icon"></img>
              :
              <img className="question-type-popup__item-img" src={conformityAnswerColor} alt="question-type-icon"></img>
            }
            <p className={`question-type-popup__item-text ${currentType === "conformity-answer" ? "question-type-popup__item-text_type_active" : "" }`}>Вопрос с установлением соответствия</p>
          </li>
        </ul>
        {
          isEditRights &&
          <button className={`btn btn_type_save ${isLoadingRequest ? "btn_type_loading" : ""}`} type="submit">{isLoadingRequest ? "Удаление.." : "Сохранить"}</button>
        }
        <div>
          <span></span>
        </div>
      </form>
    </Popup>
  )
}

export default ChangeQuestionTypePopup;