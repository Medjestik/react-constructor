import React from 'react';
import './OpenAnswer.css';

function OpenAnswer({ questionAnswers, onDelete, answer, index }) {

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
    <li className="open-answer">
      <span className="open-answer__count">{`${index + 1}.`}</span>
      <input
        className="open-answer__input"
        placeholder="Введите ответ"
        value={answerText || ''}
        onChange={handleChangeAnswerText}
        type="text"
        id={`open-answer ${index}`}
        name={`open-answer ${index}`}
      >
      </input>
      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
    </li>
  );
}


export default OpenAnswer;