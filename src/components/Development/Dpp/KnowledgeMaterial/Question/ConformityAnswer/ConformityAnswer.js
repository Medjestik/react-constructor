import React from 'react';
import './ConformityAnswer.css';

function ConformityAnswer({ onDelete, answer, index, onChangeFirstPartText, onChangeSecondPartText }) {

  function handleChangeFirstPartText(e) {
    onChangeFirstPartText(e.target.value, answer.id);
  }

  function handleChangeSecondPartText(e) {
    onChangeSecondPartText(e.target.value, answer.id);
  }

  function handleClickDelete() {
    onDelete(answer.id);
  }

  return (
    <li className="conformity-answer" id={answer.id}>
      <span className="conformity-answer__count">{`${index + 1}.`}</span>
      <input
        className="conformity-answer__input"
        placeholder="Введите ответ"
        value={answer.firstPart || ''}
        onChange={handleChangeFirstPartText}
        type="text"
        id={`conformity-answer-first-part ${answer.id}`}
        name={`conformity-answer-first-part ${answer.id}`}
      >
      </input>
      <input
        className="conformity-answer__input"
        placeholder="Введите ответ"
        value={answer.secondPart || ''}
        onChange={handleChangeSecondPartText}
        type="text"
        id={`conformity-answer-second-part ${answer.id}`}
        name={`conformity-answer-second-part ${answer.id}`}
      >
      </input>
      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
    </li>
  );
}


export default ConformityAnswer;