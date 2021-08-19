import React from 'react';
import './KnowledgeMaterial.css';
import * as evaluationMaterialApi from '../../../../utils/evaluationMaterialApi/evaluationMaterialApi.js';
import Question from './Question/Question.js';
import AccordionChooseQuestionType from '../../../Accordion/AccordionChooseQuestionType/AccordionChooseQuestionType.js';
import oneAnswerIcon from '../../../../images/quiz/one-answer-icon.png';
import multiAnswerIcon from '../../../../images/quiz/multi-answer-icon.png';
import openAnswerIcon from '../../../../images/quiz/open-answer-icon.png';
import sequenceAnswerIcon from '../../../../images/quiz/sequence-answer-icon.png';
import conformityAnswerIcon from '../../../../images/quiz/conformity-answer-icon.png';

function KnowledgeMaterial({ dppDescription, currentKnowledge, questionTypes, loggedIn }) {

  const [currentQuestion, setCurrentQuestion] = React.useState({});
  const [currentQuestions, setCurrentQuestions] = React.useState(currentKnowledge.questions);
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
      knowledgeId: currentKnowledge.id,
      questionType: type,
      id: 'new',
      text: '',
      answers: [
        {
          text: '',
          isCorrect: false,
          id: parseInt(new Date().getTime()) + 1,
        },
        {
          text: '',
          isCorrect: false,
          id: parseInt(new Date().getTime()) + 3,
        },
        {
          text: '',
          isCorrect: false,
          id: parseInt(new Date().getTime()) + 5,
        },
        {
          text: '',
          isCorrect: false,
          id: parseInt(new Date().getTime()) + 7,
        },
      ],
    }
    
    const newQuestions = [newQuestion, ...currentQuestions];
    setEditQuestion(newQuestions[0]);
  }

  function handleChangeTextQuestion(e) {
    setTextQuestion(e.target.value);
  }

  function handleDeleteQuestion() {
    /*const newQuestions = currentQuestions.filter((item) => item.id !== currentQuestion.id);
    setCurrentQuestions(newQuestions);
    setIsRenderQuestion(false);*/
    const token = localStorage.getItem("token");
    console.log(editQuestion);
    if (loggedIn) {
      evaluationMaterialApi.deleteQuestion({ token: token, omId: dppDescription.om_version_id, questionId: currentQuestion.id })
        .then(() => {
          const newQuestions = currentQuestions.filter((item) => item.id !== currentQuestion.id);
          setCurrentQuestions(newQuestions);
          setIsRenderQuestion(false);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {

        });
      }
  }

  function handleSaveQuestion() {
    const token = localStorage.getItem("token");
    
    /*const newQuestions = [];
    if (currentQuestions.find(elem => (elem.id === editQuestion.id)) === undefined) {
      newQuestions.unshift(editQuestion);
    }
    currentQuestions.forEach((elem) => {
      if (elem.id === editQuestion.id) {
        elem = editQuestion;
      }
      newQuestions.push(elem);
    })
    setCurrentQuestions(newQuestions);*/

    if (editQuestion.id === "new") {
      if (loggedIn) {
        evaluationMaterialApi.createQuestion({ token: token, omId: dppDescription.om_version_id, questionData: editQuestion })
        .then((res) => {
          setCurrentQuestions([res, ...currentQuestions]);
          chooseQuestion(res);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {

        });
      }
    } else  {
        
        if (loggedIn) {
          evaluationMaterialApi.editQuestion({ token: token, omId: dppDescription.om_version_id, questionId: currentQuestion.id, questionData: editQuestion })
          .then((res) => {
            console.log(res);
            const newQuestions = [];
            if (currentQuestions.find(elem => (elem.id === res.id)) === undefined) {
              newQuestions.unshift(editQuestion);
            }
            currentQuestions.forEach((elem) => {
              if (elem.id === res.id) {
                elem = res;
              }
              newQuestions.push(elem);
            })
            setCurrentQuestions(newQuestions);
          })
          .catch((err) => {
              console.error(err);
          })
          .finally(() => {
  
          });
        
      }
    }

    


  }

  React.useEffect(() => {
    setCurrentQuestions(currentKnowledge.questions);
    setTextQuestion('');
    setIsRenderQuestion(false);
  }, [currentKnowledge]);

  React.useEffect(() => {
    setEditQuestion(currentQuestion);
    return () => {
      setEditQuestion({});
    }
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
              questionTypes={questionTypes}
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
            type="text" 
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
                {defineQuestionType(elem.questionType)}
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