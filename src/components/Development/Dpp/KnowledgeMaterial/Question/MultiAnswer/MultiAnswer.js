import React from 'react';
import './MultiAnswer.css';

function MultiAnswer({ onDelete, answerText, answerId, isCorrect, onChangeAnswer, onChangeAnswerText }) {

  function handleChangeAnswerText(e) {
    onChangeAnswerText(e.target.value, answerId);
  }

  function handleClickDelete() {
    onDelete(answerId);
  }

  return (
    <li className="multi-answer" id={answerId}>
      <label className="checkbox multi-answer__checkbox">
        <input name="checkbox" type="checkbox" value="" defaultChecked={isCorrect ? true : false} onChange={() => {onChangeAnswer(answerId)}}></input>
        <span className="test"></span>
      </label>
      <input
        className="multi-answer__input"
        placeholder="Введите ответ"
        value={answerText || ''}
        onChange={handleChangeAnswerText}
        type="text"
        id={answerId}
        name={`multi-answer ${answerId}`}
      >
      </input>
      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
    </li>
  );
}


export default MultiAnswer;