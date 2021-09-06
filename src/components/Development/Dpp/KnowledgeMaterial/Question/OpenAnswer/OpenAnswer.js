import React from 'react';
import './OpenAnswer.css';
import TextareaAutosize from 'react-textarea-autosize';

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
      <TextareaAutosize
        className="open-answer__textarea"
        id={`open-answer-text ${answer.id}`}
        name={`open-answer-text ${answer.id}`}
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


export default OpenAnswer;