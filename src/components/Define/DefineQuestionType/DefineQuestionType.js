import React from 'react';
import './DefineQuestionType.css';
import oneAnswerIcon from '../../../images/quiz/one-answer-icon.png';
import multiAnswerIcon from '../../../images/quiz/multi-answer-icon.png';
import openAnswerIcon from '../../../images/quiz/open-answer-icon.png';
import sequenceAnswerIcon from '../../../images/quiz/sequence-answer-icon.png';
import conformityAnswerIcon from '../../../images/quiz/conformity-answer-icon.png';

function DefineQuestionType({ type }) {

  function defineQuestionType(type) 
  {
    switch (type) {
      case "one-answer":
        return (
          <img className="questions__nav-item-img" src={oneAnswerIcon} alt="иконка"></img>
        )
      case "multi-answer":
        return (
          <img className="questions__nav-item-img" src={multiAnswerIcon} alt="иконка"></img>
        )
      case "open-answer":
        return (
          <img className="questions__nav-item-img" src={openAnswerIcon} alt="иконка"></img>
        )
      case "sequence-answer":
        return (
          <img className="questions__nav-item-img" src={sequenceAnswerIcon} alt="иконка"></img>
        )
      case "conformity-answer":
        return (
          <img className="questions__nav-item-img" src={conformityAnswerIcon} alt="иконка"></img>
        ) 
        default:
        return (<div>Тип не загрузился</div>)
    }
  }

  return (
    defineQuestionType(type)
  );
}

export default DefineQuestionType;