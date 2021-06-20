import React from 'react';
import './SequenceAnswer.css';

function SequenceAnswer({ questionAnswers, onDelete, answer, index }) {

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
    <li className="sequence-answer">
      <span className="sequence-answer__count">{`${index + 1}.`}</span>
      <input
        className="sequence-answer__input"
        placeholder="Введите ответ"
        value={answerText || ''}
        onChange={handleChangeAnswerText}
        type="text"
        id={`sequence-answer ${index}`}
        name={`sequence-answer ${index}`}
      >
      </input>
      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
    </li>
  );
}


export default SequenceAnswer;