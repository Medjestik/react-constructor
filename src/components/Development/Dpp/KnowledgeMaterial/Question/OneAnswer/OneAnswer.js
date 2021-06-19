import React from 'react';
import './OneAnswer.css';
import Answer from './Answer';

function OneAnswer({ currentQuestion, setEditQuestion }) {

  const [questionText, setQuestionText] = React.useState(currentQuestion.text);

  function handleChangeQuestionText(e) {
    setQuestionText(e.target.value);
    setEditQuestion({ ...currentQuestion, text: questionText});
  }

  React.useEffect(() => {
    setQuestionText(currentQuestion.text);
  }, [currentQuestion]);

  return (
    <div className="one-answer">
      <textarea value={questionText} onChange={handleChangeQuestionText} className="question__text" name="question__text" placeholder="Введите текст вопроса"></textarea>
      {
        currentQuestion.answers.map((elem, i) => (
          <Answer currentQuestion={currentQuestion} key={i} elem={elem} />
        ))
      }
      <button className="btn btn_type_add" type="button">Добавить ответ</button>
    </div>
  );
}

export default OneAnswer;