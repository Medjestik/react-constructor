import React from 'react';
import './OpenAnswer.css';

function OpenAnswer({ questionAnswers, onDelete, answerText, answerId, index, }) {

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
    <li className="open-answer" id={answerId}>
      <span className="open-answer__count">{`${index + 1}.`}</span>
      <input
        className="open-answer__input"
        placeholder="Введите ответ"
        value={isAnswerText || ''}
        onChange={handleChangeAnswerText}
        type="text"
        id={`open-answer ${answerId}`}
        name={`open-answer ${answerId}`}
      >
      </input>
      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
    </li>
  );
}


export default OpenAnswer;