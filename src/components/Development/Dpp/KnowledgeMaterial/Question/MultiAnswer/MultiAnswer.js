import React from 'react';
import './MultiAnswer.css';

function MultiAnswer({ questionAnswers, onDelete, answerText, answerId, isCorrect, onChangeAnswer }) {

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
    <li className="multi-answer" id={answerId}>
      <label className="checkbox multi-answer__checkbox">
        <input name="checkbox" type="checkbox" value="" defaultChecked={isCorrect ? true : false} onChange={() => {onChangeAnswer(answerId)}}></input>
        <span className="test"></span>
      </label>
      <input
        className="multi-answer__input"
        placeholder="Введите ответ"
        value={isAnswerText || ''}
        onChange={handleChangeAnswerText}
        type="text"
        id={`multi-answer ${answerId}`}
        name={`multi-answer ${answerId}`}
      >
      </input>
      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
    </li>
  );
}


export default MultiAnswer;