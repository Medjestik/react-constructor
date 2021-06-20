import React from 'react';
import './Question.css';
import OneAnswer from './OneAnswer/OneAnswer.js';
import MultiAnswer from './MultiAnswer/MultiAnswer.js';
import OpenAnswer from './OpenAnswer/OpenAnswer.js';
import SequenceAnswer from './SequenceAnswer/SequenceAnswer.js';
import ConformityAnswer from './ConformityAnswer/ConformityAnswer.js';


function Question({ currentQuestion, editQuestion, setEditQuestion }) {

  const [questionText, setQuestionText] = React.useState(currentQuestion.text);
  const [questionAnswers, setQuestionAnswers] = React.useState(currentQuestion.answers);

  function handleChangeQuestionText(e) {
    setQuestionText(e.target.value);
    setEditQuestion({ ...editQuestion, text: questionText});
  }

  function handleAddAnswer() {
    const newAnswers = [...questionAnswers, ""];
    setQuestionAnswers(newAnswers);
    setEditQuestion({ ...editQuestion, answers: newAnswers });
  }

  function handleDeleteAnswer(answer) {
    const newAnswers = questionAnswers.filter(item => item !== answer);
    setQuestionAnswers(newAnswers);
    setEditQuestion({ ...editQuestion, answers: newAnswers });
  }

  React.useEffect(() => {
    setQuestionText(currentQuestion.text);
    setQuestionAnswers(currentQuestion.answers);
  }, [currentQuestion]);

  const defineQuestionType = (type) => {
    if (type === 'multi-answer') {
      return (
        <>
        <p className="questions__type"><span className="questions__type_font_weight">Тип вопроса:</span> Вопрос с несколькими вариантами ответа</p>
        <textarea value={questionText} onChange={handleChangeQuestionText} className="question__text" name="question__text" placeholder="Введите текст вопроса"></textarea>
        <ul className="questions__answers">
          {
            questionAnswers.map((answer, i) => (
              <MultiAnswer questionAnswers={questionAnswers} onDelete={handleDeleteAnswer} key={i} answer={answer} index={i} /> 
            ))
          } 
        </ul>
        </>
      )
    }
    if (type === 'open-answer') {
      return (
        <>
        <p className="questions__type"><span className="questions__type_font_weight">Тип вопроса:</span> Вопрос с открытым ответом</p>
        <textarea value={questionText} onChange={handleChangeQuestionText} className="question__text" name="question__text" placeholder="Введите текст вопроса"></textarea>
        <ul className="questions__answers">
          {
            questionAnswers.map((answer, i) => (
              <OpenAnswer questionAnswers={questionAnswers} onDelete={handleDeleteAnswer} key={i} answer={answer} index={i} />
            ))
          }
        </ul>
        </>
      ) 
    }
    if (type === 'sequence-answer') {
      return (
        <>
        <p className="questions__type"><span className="questions__type_font_weight">Тип вопроса:</span> Вопрос с установлением последовательности</p>
        <textarea value={questionText} onChange={handleChangeQuestionText} className="question__text" name="question__text" placeholder="Введите текст вопроса"></textarea>
        <ul className="questions__answers">
          {
            questionAnswers.map((answer, i) => (
              <SequenceAnswer questionAnswers={questionAnswers} onDelete={handleDeleteAnswer} key={i} answer={answer} index={i} />
            ))
          } 
        </ul>
        </>
      )
    }
    if (type === 'conformity-answer') {
      return (
        <>
        <p className="questions__type"><span className="questions__type_font_weight">Тип вопроса:</span> Вопрос с установлением соответсвия</p>
        <textarea value={questionText} onChange={handleChangeQuestionText} className="question__text" name="question__text" placeholder="Введите текст вопроса"></textarea>
        <ul className="questions__answers">
          {
            questionAnswers.map((answer, i) => (
              <ConformityAnswer questionAnswers={questionAnswers} onDelete={handleDeleteAnswer} key={i} answer={answer} index={i} />
            ))
          } 
        </ul>
        </>
      )
    }
    return (
      <>
      <p className="questions__type"><span className="questions__type_font_weight">Тип вопроса:</span> Вопрос с одним вариантом ответа</p>
      <textarea value={questionText} onChange={handleChangeQuestionText} className="question__text" name="question__text" placeholder="Введите текст вопроса"></textarea>
      <ul className="questions__answers">
        {
          questionAnswers.map((answer, i) => (
            <OneAnswer questionAnswers={questionAnswers} onDelete={handleDeleteAnswer} key={i} answer={answer} index={i} />
          ))
        } 
      </ul>
      </>
    )
  }

  return (
    <div className="questions">
      {defineQuestionType(currentQuestion.type)}
      <button className="questions__btn_type_add" type="button" onClick={handleAddAnswer}></button>
    </div>
  );
}

export default Question;