import React from 'react';
import './MultiAnswer.css';

function MultiAnswer({ questionAnswers, questionText, onDelete, answer, index }) {

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
    <li className="multi-answer">
      <label className="checkbox multi-answer__checkbox">
        <input name="checkbox" type="checkbox" value=""></input>
        <span className="test"></span>
      </label>
      <input
        className="multi-answer__input"
        placeholder="Введите ответ"
        value={answerText || ''}
        onChange={handleChangeAnswerText}
        type="text"
        id={`multi-answer ${index}`}
        name={`multi-answer ${index}`}
      >
      </input>
      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
    </li>
  );
}


export default MultiAnswer;