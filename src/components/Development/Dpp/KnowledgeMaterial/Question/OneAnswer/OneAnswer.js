import React from 'react';
import './OneAnswer.css';

function OneAnswer({ questionAnswers, onDelete, answerText, answerId, isCorrect, onChangeAnswer }) {

  const [isAnswerText, setIsAnswerText] = React.useState(answerText);

  function handleChangeAnswerText(e) {
    setIsAnswerText(e.target.value);
  }

  function handleClickDelete() {
    onDelete(answerId);
  }

  React.useEffect(() => {
    setIsAnswerText(answerText);
  }, [answerText, questionAnswers]);


  return (
    <li className="one-answer" id={answerId}>
      <label className="radio one-answer__radio">
        <input
          className="radio"
          name="radio"
          type="radio"
          defaultChecked={isCorrect ? true : false}
          onChange={() => {onChangeAnswer(answerId)}}
        >
        </input>
        <span></span>
      </label>
      <input
        className="one-answer__input"
        placeholder="Введите ответ"
        value={isAnswerText || ''}
        onChange={handleChangeAnswerText}
        type="text"
        id={`one-answer ${answerId}`}
        name={`one-answer ${answerId}`}
      >
      </input>
      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
    </li>
  );
}


export default OneAnswer;