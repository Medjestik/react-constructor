import React from 'react';
import './OneAnswer.css';

function OneAnswer({ questionAnswers, questionText, onDelete, answer, index }) {

  const [answerText, setAnswerText] = React.useState(answer);

  function handleChangeAnswerText(e) {
    setAnswerText(e.target.value);
  }

  function handleClickDelete() {
    onDelete(answer);
  }

  React.useEffect(() => {
    setAnswerText(answer);
  }, [answer, questionAnswers]);


  return (
    <li className="one-answer">
      <label className="radio one-answer__radio">
        <input className="radio" name="radio" type="radio" value="" defaultChecked={false}></input>
        <span></span>
      </label>
      <input
        className="one-answer__input"
        placeholder="Введите ответ"
        value={answerText || ''}
        onChange={handleChangeAnswerText}
        type="text"
        id={`one-answer ${index}`}
        name={`one-answer ${index}`}
      >
      </input>
      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
    </li>
  );
}


export default OneAnswer;