import React from 'react';
import './Question.css';
import OneAnswer from './OneAnswer/OneAnswer';


function Question({ currentQuestion, setEditQuestion }) {

  const defineQuestionType = (type) => {
    if (type === 'multi-answer') {
      return (
        <>
        <p className="questions__type"><span className="questions__type_font_weight">Тип вопроса:</span> Вопрос с несколькими вариантами ответа</p>
        <OneAnswer 
          currentQuestion={currentQuestion}
          setEditQuestion={setEditQuestion}
        />
        </>
      )
    }
    if (type === 'open-answer') {
      return (
        <>
        <p className="questions__type"><span className="questions__type_font_weight">Тип вопроса:</span> Вопрос с открытым ответом</p>
        <OneAnswer 
          currentQuestion={currentQuestion}
          setEditQuestion={setEditQuestion}
        />
        </>
      ) 
    }
    if (type === 'sequence-answer') {
      return (
        <>
        <p className="questions__type"><span className="questions__type_font_weight">Тип вопроса:</span> Вопрос с установлением последовательности</p>
        <OneAnswer 
          currentQuestion={currentQuestion}
          setEditQuestion={setEditQuestion}
        />
        </>
      )
    }
    if (type === 'conformity-answer') {
      return (
        <>
        <p className="questions__type"><span className="questions__type_font_weight">Тип вопроса:</span> Вопрос с установлением соответсвия</p>
        <OneAnswer 
          currentQuestion={currentQuestion}
          setEditQuestion={setEditQuestion}
        />
        </>
      )
    }
    return (
      <>
      <p className="questions__type"><span className="questions__type_font_weight">Тип вопроса:</span> Вопрос с одним вариантом ответа</p>
      <OneAnswer 
          currentQuestion={currentQuestion}
          setEditQuestion={setEditQuestion}
        />
      </>
    )
  }

  return (
    <div className="question">
      {defineQuestionType(currentQuestion.type)}
    </div>
  );
}

export default Question;