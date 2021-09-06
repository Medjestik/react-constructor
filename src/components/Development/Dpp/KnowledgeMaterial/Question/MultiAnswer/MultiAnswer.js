import React from 'react';
import './MultiAnswer.css';
import TextareaAutosize from 'react-textarea-autosize';

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
      <TextareaAutosize
        className="multi-answer__textarea"
        id={`multi-answer-text ${answer.id}`}
        name={`multi-answer-text ${answer.id}`}
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


export default MultiAnswer;