import React from 'react';
import './KnowledgeMaterial.css';
import * as evaluationMaterialApi from '../../../../utils/evaluationMaterialApi/evaluationMaterialApi.js';
import Question from './Question/Question.js';
import AccordionChooseQuestionType from '../../../Accordion/AccordionChooseQuestionType/AccordionChooseQuestionType.js';
import DefineQuestionType from '../../../Define/DefineQuestionType/DefineQuestionType.js';

function KnowledgeMaterial({ dppDescription, currentKnowledge, questionTypes, loggedIn, isEditRights }) {

  const [currentQuestion, setCurrentQuestion] = React.useState({});
  const [currentQuestions, setCurrentQuestions] = React.useState(currentKnowledge.questions);
  const [editQuestion, setEditQuestion] = React.useState({});
  const [isRenderQuestion, setIsRenderQuestion] = React.useState(false);
  const [textQuestion, setTextQuestion] = React.useState('');
  const [isDefineTypeOfQuestion, setIsDefineTypeOfQuestion] = React.useState(false);
  const [isSaveLoading, setIsSaveLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState({
    isShow: false,
    text: "Данные успешно сохранены!"
  });
  const [errorMessage, setErrorMessage] = React.useState({
    isShow: false,
    text: ""
  });
  const [isCreateNewQuestion, setIsCreateNewQuestion] = React.useState(false);

  function chooseQuestion(question) {
    setCurrentQuestion(question);
    setEditQuestion(question);
    setIsRenderQuestion(true);
    setIsDefineTypeOfQuestion(false);
    setIsCreateNewQuestion(false);
  }

  function chooseNewQuestionType() {
    setIsDefineTypeOfQuestion(true);
    setIsRenderQuestion(false);
  }

  function addNewQuestion(type) {
    setIsDefineTypeOfQuestion(false);
    setIsRenderQuestion(true);
    setIsCreateNewQuestion(true);
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
    setSuccessMessage({ ...successMessage, isShow: false });
    let success = true; 
    let hasRight = false;
    if (editQuestion.questionType === "sequence-answer") (hasRight = true)
    if (editQuestion.questionType === "open-answer") (hasRight = true)
    if (editQuestion.questionType === "conformity-answer") (hasRight = true)
    if (editQuestion.text.length === 0) { 
      success = false;
      setErrorMessage({ text: "Не заполнен текст вопроса!", isShow: true });
    }
    editQuestion.answers.forEach((elem) => {
      if (editQuestion.questionType === "conformity-answer")
      {
        if (!elem.firstPart || !elem.secondPart) {
          success = false;
          setErrorMessage({ text: "Не заполнен текст ответа!", isShow: true });
        }
      }else{
        if (elem.text.length === 0) { 
          success = false;
          setErrorMessage({ text: "Не заполнен текст ответа!", isShow: true });
        }
        if ((elem.isCorrect === 1) || (elem.isCorrect === true)) { hasRight = true }
      }
    })
    if(!hasRight)
    {
      setErrorMessage({ text: "Не выбран правильный ответ!", isShow: true });
    }
    if (!success || !hasRight) {
    } else {
      setIsSaveLoading(true);
      const token = localStorage.getItem("token");
    if (editQuestion.id === "new") {
      if (loggedIn) {
        evaluationMaterialApi.createQuestion({ token: token, omId: dppDescription.om_version_id, questionData: editQuestion })
        .then((res) => {
          setCurrentQuestions([res, ...currentQuestions]);
          chooseQuestion(res);
          setIsCreateNewQuestion(false);
          setErrorMessage({ text: "", isShow: false });
          setSuccessMessage({ ...successMessage, isShow: true });
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsSaveLoading(false);
        });
      }
    } else {
        if (loggedIn) {
          evaluationMaterialApi.editQuestion({ token: token, omId: dppDescription.om_version_id, questionId: currentQuestion.id, questionData: editQuestion })
          .then((res) => {
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
            setErrorMessage({ text: "", isShow: false });
            setSuccessMessage({ ...successMessage, isShow: true });
          })
          .catch((err) => {
              console.error(err);
          })
          .finally(() => {
            setIsSaveLoading(false);
          });
      }
    }
    }
  }

  React.useEffect(() => {
    setSuccessMessage({ ...successMessage, isShow: false });
    setErrorMessage({ text: "", isShow: false });
    // eslint-disable-next-line
  }, [editQuestion]);

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
              (isRenderQuestion && isEditRights) &&
              <div className="questions__control-edit">
                <button 
                className={`btn btn_type_save questions__btn_type_save ${isSaveLoading ? "questions__btn_type_block" : ""}`}
                onClick={handleSaveQuestion} 
                type="button"
                >
                  Сохранить вопрос
                </button>
                <button className={`btn btn_type_delete ${isCreateNewQuestion ? "btn_type_block" : ""}`} onClick={handleDeleteQuestion} type="button">Удалить вопрос</button>
                <span className={`questions_save-caption questions_save-caption_type_error ${errorMessage.isShow ? "questions_save-caption_type_show" : "questions_save-caption_type_hide"}`} >{errorMessage.text}</span>
                <span className={`questions_save-caption questions_save-caption_type_success ${successMessage.isShow ? "questions_save-caption_type_show" : "questions_save-caption_type_hide"}`} >{successMessage.text}</span>
              </div>
            }
          </div>
          {
            isRenderQuestion &&
            <Question 
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
                <DefineQuestionType type={elem.questionType} />
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