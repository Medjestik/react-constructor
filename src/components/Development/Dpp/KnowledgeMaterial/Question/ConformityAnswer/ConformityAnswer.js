import React from 'react';
import './ConformityAnswer.css';

function ConformityAnswer({ onDelete, firstPartText, secondPartText, answerId, index, onChangeFirstPartText, onChangeSecondPartText }) {

  function handleChangeFirstPartText(e) {
    onChangeFirstPartText(e.target.value, answerId);
  }

  function handleChangeSecondPartText(e) {
    onChangeSecondPartText(e.target.value, answerId);
  }

  function handleClickDelete() {
    onDelete(answerId);
  }

  return (
    <li className="conformity-answer" id={answerId}>
      <span className="conformity-answer__count">{`${index + 1}.`}</span>
      <input
        className="conformity-answer__input"
        placeholder="Введите ответ"
        value={firstPartText || ''}
        onChange={handleChangeFirstPartText}
        type="text"
        id={`firstPart ${answerId}`}
        name={`firstPartText ${answerId}`}
      >
      </input>
      <input
        className="conformity-answer__input"
        placeholder="Введите ответ"
        value={secondPartText || ''}
        onChange={handleChangeSecondPartText}
        type="text"
        id={`secondPart ${answerId}`}
        name={`secondPartText ${answerId}`}
      >
      </input>
      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
    </li>
  );
}


export default ConformityAnswer;