import React from 'react';
import './OpenAnswer.css';

function OpenAnswer({ onDelete, answer, index, onChangeAnswerText }) {

  function handleChangeAnswerText(e) {
    onChangeAnswerText(e.target.value, answer.id);
  }

  function handleClickDelete() {
    onDelete(answer.id);
  }

  return (
    <li className="open-answer" id={answer.id}>
      <span className="open-answer__count">{`${index + 1}.`}</span>
      <input
        className="open-answer__input"
        placeholder="Введите ответ"
        value={answer.text || ''}
        onChange={handleChangeAnswerText}
        type="text"
        id={answer.id}
        name={`open-answer ${answer.id}`}
      >
      </input>
      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
    </li>
  );
}


export default OpenAnswer;