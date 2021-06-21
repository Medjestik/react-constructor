import React from 'react';
import './Question.css';
import OneAnswer from './OneAnswer/OneAnswer.js';
import MultiAnswer from './MultiAnswer/MultiAnswer.js';
import OpenAnswer from './OpenAnswer/OpenAnswer.js';
import SequenceAnswer from './SequenceAnswer/SequenceAnswer.js';
import ConformityAnswer from './ConformityAnswer/ConformityAnswer.js';


function Question({ currentQuestion, editQuestion, setEditQuestion, }) {

  const [questionText, setQuestionText] = React.useState(editQuestion.text);
  const [questionAnswers, setQuestionAnswers] = React.useState(editQuestion.answers);

  function handleChangeQuestionText(e) {
    setQuestionText(e.target.value);
    setEditQuestion({ ...editQuestion, text: e.target.value });
  }

  function handleAddAnswer() {
    const newAnswers = [...questionAnswers, {
      id: parseInt(new Date().getTime()),
      answerText: '',
    }];
    setQuestionAnswers(newAnswers);
    setEditQuestion({ ...editQuestion, answers: newAnswers });
  }

  function handleChangeAnswer(id) {
    let newAnswers = [];
    if (editQuestion.type === "one-answer") {
      questionAnswers.forEach((elem) => {
        if (elem.id === id) {
          newAnswers.push({ ...elem, isCorrect: true });
        } else {
          newAnswers.push({ ...elem, isCorrect: false });
        }
      })
    } else {
      newAnswers.forEach((elem) => {
        if (elem.id === id) {
          elem.isCorrect = !elem.isCorrect;
        }
      })
    }
    setQuestionAnswers(newAnswers);
    setEditQuestion({ ...editQuestion, answers: newAnswers });
  }

  function handleDeleteAnswer(answerId) {
    const newAnswers = questionAnswers.filter(item => item.id !== answerId);
    setQuestionAnswers(newAnswers);
    setEditQuestion({ ...editQuestion, answers: newAnswers });
  }

  React.useEffect(() => {
    setQuestionText(editQuestion.text);
    setQuestionAnswers(editQuestion.answers);
    // eslint-disable-next-line
  }, [editQuestion.text, editQuestion.answers]);

  const defineQuestionType = (type) => {
    if (type === 'multi-answer') {
      return (
        <>
        <p className="questions__type"><span className="questions__type_font_weight">Тип вопроса:</span> Вопрос с несколькими вариантами ответа</p>
        <textarea value={questionText || ""} onChange={handleChangeQuestionText} className="question__text" name="question__text" placeholder="Введите текст вопроса"></textarea>
        <ul className="questions__answers">
          {
            questionAnswers.map((answer, i) => (
              <MultiAnswer
                questionAnswers={questionAnswers}
                onDelete={handleDeleteAnswer}
                key={answer.id}
                answerText={answer.answerText}
                answerId={answer.id}
                isCorrect={answer.isCorrect}
                onChangeAnswer={handleChangeAnswer}
              /> 
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
        <textarea value={questionText || ""} onChange={handleChangeQuestionText} className="question__text" name="question__text" placeholder="Введите текст вопроса"></textarea>
        <ul className="questions__answers">
          {
            questionAnswers.map((answer, i) => (
              <OpenAnswer 
                questionAnswers={questionAnswers} 
                onDelete={handleDeleteAnswer} 
                key={answer.id} 
                answerText={answer.answerText} 
                answerId={answer.id} 
                index={i}
              />
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
        <textarea value={questionText || ""} onChange={handleChangeQuestionText} className="question__text" name="question__text" placeholder="Введите текст вопроса"></textarea>
        <ul className="questions__answers">
          {
            questionAnswers.map((answer, i) => (
              <SequenceAnswer 
                questionAnswers={questionAnswers} 
                onDelete={handleDeleteAnswer} 
                key={answer.id} 
                answerText={answer.answerText} 
                answerId={answer.id} 
                index={i}
              />
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
        <textarea value={questionText || ""} onChange={handleChangeQuestionText} className="question__text" name="question__text" placeholder="Введите текст вопроса"></textarea>
        <ul className="questions__answers">
          {
            questionAnswers.map((answer, i) => (
              <ConformityAnswer
                questionAnswers={questionAnswers}
                onDelete={handleDeleteAnswer}
                key={answer.id}
                firstPartText={answer.firstPart}
                secondPartText={answer.secondPart}
                answerId={answer.id}
                index={i}
              />
            ))
          } 
        </ul>
        </>
      )
    }
    return (
      <>
      <p className="questions__type"><span className="questions__type_font_weight">Тип вопроса:</span> Вопрос с одним вариантом ответа</p>
      <textarea value={questionText || ""} onChange={handleChangeQuestionText} className="question__text" name="question__text" placeholder="Введите текст вопроса"></textarea>
      <ul className="questions__answers">
        {
          questionAnswers.map((answer) => (
            <OneAnswer 
              questionAnswers={questionAnswers}
              onDelete={handleDeleteAnswer}
              key={answer.id}
              answerText={answer.answerText}
              answerId={answer.id}
              isCorrect={answer.isCorrect}
              onChangeAnswer={handleChangeAnswer}
            />
          ))
        } 
      </ul>
      </>
    )
  }

  return (
    <div className="questions">
      {defineQuestionType(editQuestion.type)}
      <button className="questions__btn_type_add" type="button" onClick={handleAddAnswer}></button>
    </div>
  );
}

export default Question;