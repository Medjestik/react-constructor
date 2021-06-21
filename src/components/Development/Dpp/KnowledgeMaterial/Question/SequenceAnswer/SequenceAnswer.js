import React from 'react';
import './SequenceAnswer.css';

function SequenceAnswer({ questionAnswers, onDelete, answerText, answerId, index, }) {

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
    <li className="sequence-answer" id={answerId}>
      <span className="sequence-answer__count">{`${index + 1}.`}</span>
      <input
        className="sequence-answer__input"
        placeholder="Введите ответ"
        value={isAnswerText || ''}
        onChange={handleChangeAnswerText}
        type="text"
        id={`sequence-answer ${answerId}`}
        name={`sequence-answer ${answerId}`}
      >
      </input>
      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
    </li>
  );
}


export default SequenceAnswer;