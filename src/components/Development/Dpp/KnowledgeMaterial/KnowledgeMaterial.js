import React from 'react';
import './KnowledgeMaterial.css';
import Question from './Question/Question.js';
import AccordionChooseQuestionType from '../../../Accordion/AccordionChooseQuestionType/AccordionChooseQuestionType.js';
import oneAnswerIcon from '../../../../images/quiz/one-answer-icon.png';
import multiAnswerIcon from '../../../../images/quiz/multi-answer-icon.png';
import openAnswerIcon from '../../../../images/quiz/open-answer-icon.png';
import sequenceAnswerIcon from '../../../../images/quiz/sequence-answer-icon.png';
import conformityAnswerIcon from '../../../../images/quiz/conformity-answer-icon.png';

function KnowledgeMaterial({ currentKnowledge, currentKnowledgeQuestions, setCurrentKnowledge }) {

  const [currentQuestion, setCurrentQuestion] = React.useState({});
  const [currentQuestions, setCurrentQuestions] = React.useState(currentKnowledgeQuestions);
  const [editQuestion, setEditQuestion] = React.useState({});
  const [isRenderQuestion, setIsRenderQuestion] = React.useState(false);
  const [textQuestion, setTextQuestion] = React.useState('');
  const [isDefineTypeOfQuestion, setIsDefineTypeOfQuestion] = React.useState(false);

  const defineQuestionType = (type) => {
    if (type === 'multi-answer') {
      return (<img className="questions__nav-item-img" src={multiAnswerIcon} alt="иконка"></img>)
    }
    if (type === 'open-answer') {
      return (<img className="questions__nav-item-img" src={openAnswerIcon} alt="иконка"></img>)
    }
    if (type === 'sequence-answer') {
      return (<img className="questions__nav-item-img" src={sequenceAnswerIcon} alt="иконка"></img>)
    }
    if (type === 'conformity-answer') {
      return (<img className="questions__nav-item-img" src={conformityAnswerIcon} alt="иконка"></img>)
    }
    return (<img className="questions__nav-item-img" src={oneAnswerIcon} alt="иконка"></img>);
  }

  
  function chooseQuestion(question) {
    setCurrentQuestion(question);
    setEditQuestion(question);
    setIsRenderQuestion(true);
  }

  function chooseNewQuestionType() {
    setIsDefineTypeOfQuestion(true);
    setIsRenderQuestion(false);
  }

  function addNewQuestion(type) {
    setIsDefineTypeOfQuestion(false);
    setIsRenderQuestion(true);
    const newQuestion = {
      text: '',
      type: type,
      answers: [
        {
          id: parseInt(new Date().getTime()) + 1,
          answerText: '',
          isCorrect: false,
        },
        {
          id: parseInt(new Date().getTime()) + 2,
          answerText: '',
          isCorrect: false,
        },
        {
          id: parseInt(new Date().getTime()) + 3,
          answerText: '',
          isCorrect: false,
        },
        {
          id: parseInt(new Date().getTime()) + 4,
          answerText: '',
          isCorrect: false,
        },
      ],
      id: parseInt(new Date().getTime()),
    }
    
    const newQuestions = [newQuestion, ...currentQuestions];
    setEditQuestion(newQuestions[0]);
    setIsRenderQuestion(true);
  }

  function handleChangeTextQuestion(e) {
    setTextQuestion(e.target.value);
  }

  function handleDeleteQuestion() {
    const newQuestions = currentQuestions.filter((item) => item.id !== currentQuestion.id);
    setCurrentQuestions(newQuestions);
    setIsRenderQuestion(false);
  }

  function handleSaveQuestion() {
    const newQuestions = [];
    if (currentQuestions.find(elem => (elem.id === editQuestion.id)) === undefined) {
      newQuestions.unshift(editQuestion);
    }
    currentQuestions.forEach((elem) => {
      if (elem.id === editQuestion.id) {
        elem = editQuestion;
      }
      newQuestions.push(elem);
    })
    setCurrentQuestions(newQuestions);
  }

  React.useEffect(() => {
    setCurrentQuestions(currentKnowledge.questions);
    setTextQuestion('');
    setIsRenderQuestion(false);
  }, [currentKnowledge]);

  React.useEffect(() => {
    setEditQuestion(currentQuestion);
  }, [currentQuestion]);

  React.useEffect(() => {
    setCurrentQuestions(currentKnowledge.questions.filter((item) => item.text.toLowerCase().includes(textQuestion.toLowerCase())));
  }, [currentKnowledge, textQuestion]);

  return (
    <div className="knowledge-material">
      <div className="questions__container">
        <div className="questions__main">
          <div className="questions__control"> 
            <button className="btn btn_type_add" onClick={chooseNewQuestionType} type="button">Новый вопрос</button>
            {
              isRenderQuestion &&
              <div className="questions__control-edit">
                <button className="btn btn_type_save questions__btn_type_save" onClick={handleSaveQuestion} type="button">Сохранить вопрос</button>
                <button className="btn btn_type_delete" onClick={handleDeleteQuestion} type="button">Удалить вопрос</button>
              </div>
            }
          </div>
          {
            isRenderQuestion &&
            <Question 
              currentQuestion={currentQuestion}
              editQuestion={editQuestion}
              setEditQuestion={setEditQuestion}
            />
          }
          {
            isDefineTypeOfQuestion 
          ?
            <AccordionChooseQuestionType
              addNewQuestion={addNewQuestion}
            />
          :
            ""
          }
        </div>
        <nav className="questions__nav-menu">
          <div className="questions__info">
            <p className="questions__title">Вопросы</p>
            <span className="questions__count">{currentQuestions.length}</span>
          </div>
          <div className="search">
            <input 
            className="input-search" 
            placeholder="поиск по вопросу"
            type="email" 
            id="searchQuestion"
            name="searchQuestion" 
            value={textQuestion}
            onChange={handleChangeTextQuestion}
            >
            </input>
          </div>
          <ul className="questions__nav-list">
            {
            currentQuestions.map((elem, i) => (
              <li 
              key={i}
              className={`questions__nav-item ${editQuestion.id === elem.id ? "questions__nav-item_type_active" : ""}`}
              onClick={() => chooseQuestion(elem)}
              >
                {defineQuestionType(elem.type)}
                <h5 className="questions__nav-item-text">{elem.text}</h5>
              </li>
            ))
            }
          </ul>
        </nav>
      </div>
      

    </div>
  );
}

export default KnowledgeMaterial;