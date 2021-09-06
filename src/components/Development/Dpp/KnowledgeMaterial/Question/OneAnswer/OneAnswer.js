import React from 'react';
import './OneAnswer.css';
import TextareaAutosize from 'react-textarea-autosize';

function OneAnswer({ onDelete, answer, onChangeAnswer, onChangeAnswerText }) {

  function handleChangeAnswerText(e) {
    onChangeAnswerText(e.target.value, answer.id);
  }

  function handleClickDelete() {
    onDelete(answer.id);
  }

  return (
    <li className="one-answer" id={answer.id}>
      <label className="radio one-answer__radio">
        <input
          className="radio"
          id={`one-answer-radio ${answer.id}`}
          name="one-answer-radio"
          type="radio"
          checked={answer.isCorrect ? true : false}
          onChange={() => {onChangeAnswer(answer.id)}}
        >
        </input>
        <span></span>
      </label>
      <TextareaAutosize
        className="one-answer__textarea"
        id={`one-answer-text ${answer.id}`}
        name={`one-answer-text ${answer.id}`}
        placeholder="Введите ответ..."
        defaultValue={answer.text || ''}
        onChange={handleChangeAnswerText}
        required
      >
      </TextareaAutosize>
      
      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
    </li>
  );
}


export default OneAnswer;