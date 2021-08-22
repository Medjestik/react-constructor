import React from 'react';
import './MultiAnswer.css';

function MultiAnswer({ onDelete, answer, onChangeAnswer, onChangeAnswerText }) {

  function handleChangeAnswerText(e) {
    onChangeAnswerText(e.target.value, answer.id);
  }

  function handleClickDelete() {
    onDelete(answer.id);
  }

  return (
    <li className="multi-answer" id={answer.id}>
      <label className="checkbox multi-answer__checkbox">
        <input 
        id={`multi-answer-checkbox ${answer.id}`}
        name={`multi-answer-checkbox ${answer.id}`}
        type="checkbox" 
        checked={answer.isCorrect ? true : false} 
        onChange={() => {onChangeAnswer(answer.id)}}
        >
        </input>
        <span className="test"></span>
      </label>
      <input
        className="multi-answer__input"
        placeholder="Введите ответ"
        value={answer.text || ''}
        onChange={handleChangeAnswerText}
        type="text"
        id={`multi-answer-text ${answer.id}`}
        name={`multi-answer-text ${answer.id}`}
      >
      </input>
      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
    </li>
  );
}


export default MultiAnswer;