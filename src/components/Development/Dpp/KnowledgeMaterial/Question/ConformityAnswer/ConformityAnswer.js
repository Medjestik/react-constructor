import React from 'react';
import './ConformityAnswer.css';

function ConformityAnswer({ questionAnswers, onDelete, answer, index }) {

  const [firstPartText, setFirstPartText] = React.useState(answer.firstPart);
  const [secondPartText, setSecondPartText] = React.useState(answer.secondPart);

  function handleChangeFirstPartText(e) {
    setFirstPartText(e.target.value);
  }

  function handleChangeSecondPartText(e) {
    setSecondPartText(e.target.value);
  }

  function handleClickDelete() {
    onDelete(answer);
  }

  React.useEffect(() => {
    setFirstPartText(answer.firstPart);
    setSecondPartText(answer.secondPart);
  }, [answer, questionAnswers]);


  return (
    <li className="conformity-answer">
      <span className="conformity-answer__count">{`${index + 1}.`}</span>
      <input
        className="conformity-answer__input"
        placeholder="Введите ответ"
        value={firstPartText || ''}
        onChange={handleChangeFirstPartText}
        type="text"
        id={`firstPartText ${index}`}
        name={`firstPartText ${index}`}
      >
      </input>
      <input
        className="conformity-answer__input"
        placeholder="Введите ответ"
        value={secondPartText || ''}
        onChange={handleChangeSecondPartText}
        type="text"
        id={`secondPartText ${index}`}
        name={`secondPartText ${index}`}
      >
      </input>
      <button className="questions__btn_type_delete" type="button" onClick={handleClickDelete}></button>
    </li>
  );
}


export default ConformityAnswer;