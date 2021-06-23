import React from 'react';
import './OpenAnswer.css';

function OpenAnswer({ onDelete, answerText, answerId, index, onChangeAnswerText }) {

  function handleChangeAnswerText(e) {
    onChangeAnswerText(e.target.value, answerId);
  }

  function handleClickDelete() {
    onDelete(answerId);
  }

  return (
    <li className="open-answer" id={answerId}>
      <span className="open-answer__count">{`${index + 1}.`}</span>
      <input
        className="open-answer__input"
        placeholder="Введите ответ"
        value={answerText || ''}
        onChange={handleChangeAnswerText}
        type="text"
        id={answerId}
        name={`open-answer ${answerId}`}
      >
      </input>
      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
    </li>
  );
}


export default OpenAnswer;