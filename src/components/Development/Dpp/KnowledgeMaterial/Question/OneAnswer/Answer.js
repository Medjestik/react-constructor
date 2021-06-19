import React from 'react';

function Answer({ currentQuestion, elem }) {

  const [answerText, setAnswerText] = React.useState(elem)

  function handleChangeAnswerText(e) {
    setAnswerText(e.target.value);
  }

  React.useEffect(() => {
    setAnswerText(elem);
  }, [elem, currentQuestion]);


  return (
    <div className="answer">
      <input
        placeholder="Введите ответ"
        value={answerText}
        onChange={handleChangeAnswerText}
      >
      </input>
    </div>
  );
}

export default Answer;