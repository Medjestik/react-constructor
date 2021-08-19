import React from 'react';
import './Question.css';
import OneAnswer from './OneAnswer/OneAnswer.js';
import MultiAnswer from './MultiAnswer/MultiAnswer.js';
import OpenAnswer from './OpenAnswer/OpenAnswer.js';
import SequenceAnswer from './SequenceAnswer/SequenceAnswer.js';
import ConformityAnswer from './ConformityAnswer/ConformityAnswer.js';


function Question({ currentQuestion, editQuestion, setEditQuestion }) {

  const [questionText, setQuestionText] = React.useState(editQuestion.text);
  const [questionAnswers, setQuestionAnswers] = React.useState(editQuestion.answers);

  function handleChangeQuestionText(e) {
    setQuestionText(e.target.value);
    setEditQuestion({ ...editQuestion, text: e.target.value });
  }

  function handleChangeAnswerText(text, id) {
    let newAnswers = [];
    questionAnswers.forEach((elem) => {
      if (elem.id === id) {
        newAnswers.push({ ...elem, text: text });
      } else {
        newAnswers.push(elem);
      }
    })
    setQuestionAnswers(newAnswers);
    setEditQuestion({ ...editQuestion, answers: newAnswers });
  }

  function handleChangeFirstPartText(text, id) {
    let newAnswers = [];
    questionAnswers.forEach((elem) => {
      if (elem.id === id) {
        newAnswers.push({ ...elem, firstPart: text });
      } else {
        newAnswers.push(elem);
      }
    })
    setQuestionAnswers(newAnswers);
    setEditQuestion({ ...editQuestion, answers: newAnswers });
  }

  function handleChangeSecondPartText(text, id) {
    let newAnswers = [];
    questionAnswers.forEach((elem) => {
      if (elem.id === id) {
        newAnswers.push({ ...elem, secondPart: text });
      } else {
        newAnswers.push(elem);
      }
    })
    setQuestionAnswers(newAnswers);
    setEditQuestion({ ...editQuestion, answers: newAnswers });
  }

  function handleAddAnswer() {
    const newAnswers = [...questionAnswers, {
      id: parseInt(new Date().getTime()),
      text: '',
      isCorrect: false
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
      questionAnswers.forEach((elem) => {
        if (elem.id === id) {
          newAnswers.push({ ...elem, isCorrect: !elem.isCorrect });
        } else {
          newAnswers.push(elem);
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
    return () => {
      setQuestionText('');
      setQuestionAnswers([]);
    }
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
                onDelete={handleDeleteAnswer}
                key={answer.id}
                answerText={answer.text}
                answerId={answer.id}
                isCorrect={answer.isCorrect}
                onChangeAnswer={handleChangeAnswer}
                onChangeAnswerText={handleChangeAnswerText}
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
                onDelete={handleDeleteAnswer} 
                key={answer.id} 
                answerText={answer.text} 
                answerId={answer.id} 
                index={i}
                onChangeAnswerText={handleChangeAnswerText}
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
                onDelete={handleDeleteAnswer} 
                key={answer.id} 
                answerText={answer.text} 
                answerId={answer.id} 
                index={i}
                onChangeAnswerText={handleChangeAnswerText}
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
                onDelete={handleDeleteAnswer}
                key={answer.id}
                firstPartText={answer.firstPart}
                secondPartText={answer.secondPart}
                answerId={answer.id}
                index={i}
                onChangeFirstPartText={handleChangeFirstPartText}
                onChangeSecondPartText={handleChangeSecondPartText}
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
          questionAnswers.map((answer, i) => (
            <OneAnswer 
              onDelete={handleDeleteAnswer}
              key={i}
              answerText={answer.text}
              answerId={answer.id}
              isCorrect={answer.isCorrect}
              onChangeAnswer={handleChangeAnswer}
              onChangeAnswerText={handleChangeAnswerText}
            />
          ))
        } 
      </ul>
      </>
    )
  }

  return (
    <div className="questions">
      {defineQuestionType(editQuestion.questionType)}
      <button className="questions__btn_type_add" type="button" onClick={handleAddAnswer}></button>
    </div>
  );
}

export default Question;