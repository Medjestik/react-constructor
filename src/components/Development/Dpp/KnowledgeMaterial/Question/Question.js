import React from 'react';
import './Question.css';
import OneAnswer from './OneAnswer/OneAnswer.js';
import MultiAnswer from './MultiAnswer/MultiAnswer.js';
import OpenAnswer from './OpenAnswer/OpenAnswer.js';
import SequenceAnswer from './SequenceAnswer/SequenceAnswer.js';
import ConformityAnswer from './ConformityAnswer/ConformityAnswer.js';
import TextareaAutosize from 'react-textarea-autosize';
import AddImgQuestionPopup from '../AddImgQuestionPopup/AddImgQuestionPopup.js';
import AddImgAnswerPopup from '../AddImgAnswerPopup/AddImgAnswerPopup.js';

function Question({ editQuestion, setEditQuestion, openChangeTypePopup }) {

  const [questionText, setQuestionText] = React.useState(editQuestion.text);
  const [questionImg, setQuestionImg] = React.useState(editQuestion.image);
  const [questionAnswers, setQuestionAnswers] = React.useState(editQuestion.answers);
  const [currentAnswerId, setCurrentAnswerId] = React.useState('');

  console.log(editQuestion);

  const [isAddImgQuestionPopupOpen, setIsAddImgQuestionPopupOpen] = React.useState(false);
  const [isAddImgAnswerPopupOpen, setIsAddImgAnswerPopupOpen] = React.useState(false);

  function openAddImgQuestionPopup() {
    setIsAddImgQuestionPopupOpen(true);
  }

  function openAddImgAnswerPopup(id) {
    setIsAddImgAnswerPopupOpen(true);
    setCurrentAnswerId(id);
  }

  function closeAddImgQuestionPopup() {
    setIsAddImgQuestionPopupOpen(false);
  }

  function closeAddImgAnswerPopup() {
    setIsAddImgAnswerPopupOpen(false);
  }

  function handleAddQuestionImg(data) {
    setEditQuestion({ ...editQuestion, image: data });
  }

  function handleAddAnswerImg(data, id) {
    let newAnswers = [];
    questionAnswers.forEach((elem) => {
      if (elem.id === id) {
        newAnswers.push({ ...elem, image: data });
      } else {
        newAnswers.push(elem);
      }
    })
    setQuestionAnswers(newAnswers);
    setEditQuestion({ ...editQuestion, answers: newAnswers });
  }

  function handleRemoveQuestionImg() {
    setEditQuestion({ ...editQuestion, image: null });
  }

  function handleRemoveAnswerImg(id) {
    let newAnswers = [];
    questionAnswers.forEach((elem) => {
      if (elem.id === id) {
        newAnswers.push({ ...elem, image: null });
      } else {
        newAnswers.push(elem);
      }
    })
    setQuestionAnswers(newAnswers);
    setEditQuestion({ ...editQuestion, answers: newAnswers });
  }
 
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
      image: null,
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

  function renderQuestionContainer(type) {
    return (
      <div className="question__text-container">
        <TextareaAutosize
          className="question__text"
          id={`question__text_type_${type}`}
          name={`question__text_type_${type}`}
          placeholder="Введите вопрос..."
          value={questionText || ""}
          onChange={handleChangeQuestionText}
          required
        >
        </TextareaAutosize>
        {
          editQuestion.image === null &&
          <div className="question__text-img" onClick={openAddImgQuestionPopup}></div>
        }
        {
          editQuestion.image !== null &&
          <div className='question__text-caption'>
            {
              !editQuestion.image.includes('base64') &&
              <a className='question__text-link' target='_blank' rel='noreferrer' href={`https://constructor-api.emiit.ru/storage/${editQuestion.image}`}> </a>
            }
            <div className='question__text-img-remove' onClick={handleRemoveQuestionImg}></div>
            Изображение загружено!
          </div>
        }
        <div></div>
      </div>
    )
  }

  React.useEffect(() => {
    setQuestionText(editQuestion.text);
    setQuestionImg(editQuestion.image);
    setQuestionAnswers(editQuestion.answers);
    return () => {
      setQuestionText('');
      setQuestionAnswers([]);
      setQuestionImg(null);
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
        {renderQuestionContainer(type)}
        <ul className="questions__answers">
          {
            questionAnswers.map((answer) => (
              <MultiAnswer
                onDelete={handleDeleteAnswer}
                key={answer.id}
                answer={answer}
                onChangeAnswer={handleChangeAnswer}
                onChangeAnswerText={handleChangeAnswerText}
                onOpenImg={openAddImgAnswerPopup}
                onRemoveImg={handleRemoveAnswerImg}
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
        {renderQuestionContainer(type)}
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
        {renderQuestionContainer(type)}
        <ul className="questions__answers">
          {
            questionAnswers.map((answer, i) => (
              <SequenceAnswer 
                onDelete={handleDeleteAnswer} 
                key={answer.id}
                answer={answer}
                index={i}
                onChangeAnswerText={handleChangeAnswerText}
                onOpenImg={openAddImgAnswerPopup}
                onRemoveImg={handleRemoveAnswerImg}
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
        {renderQuestionContainer(type)}
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
      {renderQuestionContainer(type)}
      <ul className="questions__answers">
        {
          questionAnswers.map((answer) => (
            <OneAnswer 
              onDelete={handleDeleteAnswer}
              key={answer.id}
              answer={answer}
              onChangeAnswer={handleChangeAnswer}
              onChangeAnswerText={handleChangeAnswerText}
              onOpenImg={openAddImgAnswerPopup}
              onRemoveImg={handleRemoveAnswerImg}
            />
          ))
        } 
      </ul>
      </>
    )
  }

  return (
    <>
    <div className="questions">
      {defineQuestionType(editQuestion.questionType)}
      <button className="questions__btn_type_add" type="button" onClick={handleAddAnswer}></button>
    </div>
    {
      isAddImgQuestionPopupOpen &&
      <AddImgQuestionPopup
        isOpen={isAddImgQuestionPopupOpen}
        onClose={closeAddImgQuestionPopup}
        onAdd={handleAddQuestionImg}
      />
    }
    {
      isAddImgAnswerPopupOpen &&
      <AddImgAnswerPopup
        isOpen={isAddImgAnswerPopupOpen}
        onClose={closeAddImgAnswerPopup}
        onAdd={handleAddAnswerImg}
        id={currentAnswerId}
      />
    }
    </>
  );
}

export default Question;