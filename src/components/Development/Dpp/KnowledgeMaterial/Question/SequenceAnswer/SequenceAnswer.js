import React from 'react';
import './SequenceAnswer.css';

function SequenceAnswer({ onDelete, answer, index, onChangeAnswerText }) {

  function handleChangeAnswerText(e) {
    onChangeAnswerText(e.target.value, answer.id);
  }

  function handleClickDelete() {
    onDelete(answer.id);
  }

  return (
    <li className="sequence-answer" id={answer.id}>
      <span className="sequence-answer__count">{`${index + 1}.`}</span>
      <input
        className="sequence-answer__input"
        placeholder="Введите ответ"
        value={answer.text || ''}
        onChange={handleChangeAnswerText}
        type="text"
        id={`sequence-answer-text ${answer.id}`}
        name={`sequence-answer-text ${answer.id}`}
      >
      </input>
      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
    </li>
  );
}


export default SequenceAnswer;