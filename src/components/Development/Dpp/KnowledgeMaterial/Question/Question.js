import React from 'react';
import './Question.css';
import OneAnswer from './OneAnswer/OneAnswer.js';
import MultiAnswer from './MultiAnswer/MultiAnswer.js';
import OpenAnswer from './OpenAnswer/OpenAnswer.js';
import SequenceAnswer from './SequenceAnswer/SequenceAnswer.js';
import ConformityAnswer from './ConformityAnswer/ConformityAnswer.js';
import TextareaAutosize from 'react-textarea-autosize';


function Question({ editQuestion, setEditQuestion, openChangeTypePopup }) {

  const [questionText, setQuestionText] = React.useState(editQuestion.text);
  const [questionAnswers, setQuestionAnswers] = React.useState(editQuestion.answers);

  console.log(editQuestion);
 
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
    if (editQuestion.questionType === "one-answer") {
      questionAnswers.forEach((elem) => {
        if (elem.id === id) {
          newAnswers.push({ ...elem, isCorrect: 1 });
        } else {
          newAnswers.push({ ...elem, isCorrect: 0 });
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
  }, [editQuestion.answers, editQuestion.text]);

  const defineQuestionType = (type) => {
    if (type === 'multi-answer') {
      return (
        <>
        <div className="questions__type-info">
          {
            editQuestion.id !== "new" &&
            <button className="questions__type-img-popup" type="button" onClick={openChangeTypePopup}></button>
          }
          <p className="questions__type"><span className="questions__type_font_weight">Тип вопроса: </span>Вопрос с множественным выбором</p>
        </div>
        <TextareaAutosize
          className="question__text"
          id="question__text"
          name="question__text"
          placeholder="Введите вопрос..."
          value={questionText || ""}
          onChange={handleChangeQuestionText}
          required
        >
        </TextareaAutosize>
        <ul className="questions__answers">
          {
            questionAnswers.map((answer) => (
              <MultiAnswer
                onDelete={handleDeleteAnswer}
                key={answer.id}
                answer={answer}
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
        <div className="questions__type-info">
          <p className="questions__type"><span className="questions__type_font_weight">Тип вопроса: </span>Вопрос с открытым ответом</p>
        </div>
        <TextareaAutosize
          className="question__text"
          id="question__text"
          name="question__text"
          placeholder="Введите вопрос..."
          value={questionText || ""}
          onChange={handleChangeQuestionText}
          required
        >
        </TextareaAutosize>
        <ul className="questions__answers">
          {
            questionAnswers.map((answer, i) => (
              <OpenAnswer 
                onDelete={handleDeleteAnswer} 
                key={answer.id}
                answer={answer}
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
        <div className="questions__type-info">
          <p className="questions__type"><span className="questions__type_font_weight">Тип вопроса: </span>Вопрос с установлением последовательности</p>
        </div>
        <TextareaAutosize
          className="question__text"
          id="question__text"
          name="question__text"
          placeholder="Введите вопрос..."
          value={questionText || ""}
          onChange={handleChangeQuestionText}
          required
        >
        </TextareaAutosize>
        <ul className="questions__answers">
          {
            questionAnswers.map((answer, i) => (
              <SequenceAnswer 
                onDelete={handleDeleteAnswer} 
                key={answer.id}
                answer={answer}
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
        <div className="questions__type-info">
          {
            editQuestion.id !== "new" &&
            <button className="questions__type-img-popup" type="button" onClick={openChangeTypePopup}></button>
          }
          <p className="questions__type"><span className="questions__type_font_weight">Тип вопроса: </span>Вопрос с установлением соответствия</p>
        </div>
        <TextareaAutosize
          className="question__text"
          id="question__text"
          name="question__text"
          placeholder="Введите вопрос..."
          value={questionText || ""}
          onChange={handleChangeQuestionText}
          required
        >
        </TextareaAutosize>
        <ul className="questions__answers">
          {
            questionAnswers.map((answer, i) => (
              <ConformityAnswer
                onDelete={handleDeleteAnswer}
                key={answer.id}
                answer={answer}
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
      <div className="questions__type-info">
        {
          editQuestion.id !== "new" &&
          <button className="questions__type-img-popup" type="button" onClick={openChangeTypePopup}></button>
        }
        <p className="questions__type"><span className="questions__type_font_weight">Тип вопроса: </span>Вопрос с одним вариантом ответа</p>
      </div>
      <TextareaAutosize
          className="question__text"
          id="question__text"
          name="question__text"
          placeholder="Введите вопрос..."
          value={questionText || ""}
          onChange={handleChangeQuestionText}
          required
        >
        </TextareaAutosize>
      <ul className="questions__answers">
        {
          questionAnswers.map((answer) => (
            <OneAnswer 
              onDelete={handleDeleteAnswer}
              key={answer.id}
              answer={answer}
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