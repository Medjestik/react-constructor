import React from 'react';
import './ConformityAnswer.css';
import TextareaAutosize from 'react-textarea-autosize';

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
      <TextareaAutosize
        className="one-answer__textarea"
        id={`conformity-answer-first-text ${answer.id}`}
        name={`conformity-answer-first-text ${answer.id}`}
        placeholder="Введите первую часть ответа..."
        defaultValue={answer.firstPart || ''}
        onChange={handleChangeFirstPartText}
        required
      >
      </TextareaAutosize>
      <TextareaAutosize
        className="one-answer__textarea"
        id={`conformity-answer-second-text ${answer.id}`}
        name={`conformity-answer-second-text ${answer.id}`}
        placeholder="Введите вторую часть ответа..."
        defaultValue={answer.secondPart || ''}
        onChange={handleChangeSecondPartText}
        required
      >
      </TextareaAutosize>
      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
    </li>
  );
}


export default ConformityAnswer;