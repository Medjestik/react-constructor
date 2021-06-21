import React from 'react';
import './ConformityAnswer.css';

function ConformityAnswer({ questionAnswers, onDelete, firstPartText, secondPartText, answerId, index, }) {

  const [isFirstPartText, setIsFirstPartText] = React.useState(firstPartText);
  const [isSecondPartText, setIsSecondPartText] = React.useState(secondPartText);

  function handleChangeFirstPartText(e) {
    setIsFirstPartText(e.target.value);
  }

  function handleChangeSecondPartText(e) {
    setIsSecondPartText(e.target.value);
  }

  function handleClickDelete() {
    onDelete(answerId);
  }

  React.useEffect(() => {
    setIsFirstPartText(firstPartText);
    setIsSecondPartText(secondPartText);
  }, [firstPartText, secondPartText, questionAnswers]);


  return (
    <li className="conformity-answer" id={answerId}>
      <span className="conformity-answer__count">{`${index + 1}.`}</span>
      <input
        className="conformity-answer__input"
        placeholder="Введите ответ"
        value={isFirstPartText || ''}
        onChange={handleChangeFirstPartText}
        type="text"
        id={`firstPartText ${answerId}`}
        name={`firstPartText ${answerId}`}
      >
      </input>
      <input
        className="conformity-answer__input"
        placeholder="Введите ответ"
        value={isSecondPartText || ''}
        onChange={handleChangeSecondPartText}
        type="text"
        id={`secondPartText ${answerId}`}
        name={`secondPartText ${answerId}`}
      >
      </input>
      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
    </li>
  );
}


export default ConformityAnswer;