import React from 'react';
import './SequenceAnswer.css';
import TextareaAutosize from 'react-textarea-autosize';

function SequenceAnswer({ onDelete, answer, index, onChangeAnswerText, onOpenImg, onRemoveImg }) {

  function handleChangeAnswerText(e) {
    onChangeAnswerText(e.target.value, answer.id);
  }

  function handleClickDelete() {
    onDelete(answer.id);
  }

  return (
    <li className="sequence-answer" id={answer.id}>
      <span className="sequence-answer__count">{`${index + 1}.`}</span>
      <TextareaAutosize
        className="sequence-answer__textarea"
        id={`sequence-answer-text ${answer.id}`}
        name={`sequence-answer-text ${answer.id}`}
        placeholder="Введите ответ..."
        defaultValue={answer.text || ''}
        onChange={handleChangeAnswerText}
        required
      >
      </TextareaAutosize>

      { 
        answer.image === null 
        ?
        <div className="questions__btn_type_img" onClick={() => onOpenImg(answer.id)}></div>
        :
        <div className='question__text-caption question__answer-caption'>
          {
            !answer.image.includes('base64') &&
            <a className='question__text-link' target='_blank' rel='noreferrer' href={`https://constructor-api.emiit.ru/storage/${answer.image}`}> </a>
          }
          <div className='question__text-img-remove' onClick={() => onRemoveImg(answer.id)}></div>
          Изображение
        </div>
      }

      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
      
    </li>
  );
}


export default SequenceAnswer;