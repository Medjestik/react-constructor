import React from 'react';
import './SequenceAnswer.css';

function SequenceAnswer({ onDelete, answerText, answerId, index, onChangeAnswerText }) {

  function handleChangeAnswerText(e) {
    onChangeAnswerText(e.target.value, answerId);
  }

  function handleClickDelete() {
    onDelete(answerId);
  }

  return (
    <li className="sequence-answer" id={answerId}>
      <span className="sequence-answer__count">{`${index + 1}.`}</span>
      <input
        className="sequence-answer__input"
        placeholder="Введите ответ"
        value={answerText || ''}
        onChange={handleChangeAnswerText}
        type="text"
        id={`sequence-answer ${answerId}`}
        name={`sequence-answer ${answerId}`}
      >
      </input>
      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
    </li>
  );
}


export default SequenceAnswer;