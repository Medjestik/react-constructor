import React from 'react';
import './OneAnswer.css';

function OneAnswer({ onDelete, answerText, answerId, isCorrect, onChangeAnswer, onChangeAnswerText }) {

  function handleChangeAnswerText(e) {
    onChangeAnswerText(e.target.value, answerId);
  }

  function handleClickDelete() {
    onDelete(answerId);
  }

  console.log(isCorrect);

  
  return (
    <li className="one-answer" id={answerId}>
      <label className="radio one-answer__radio">
        <input
          className="radio"
          name="radio"
          type="radio"
          value=""
          defaultChecked={isCorrect ? true : false}
          onChange={() => {onChangeAnswer(answerId)}}
        >
        </input>
        <span></span>
      </label>
      <input
        className="one-answer__input"
        placeholder="Введите ответ"
        value={answerText || ''}
        onChange={handleChangeAnswerText}
        type="text"
        id={answerId}
        name={`one-answer ${answerId}`}
      >
      </input>
      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
    </li>
  );
}


export default OneAnswer;