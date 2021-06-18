import React from 'react';
import './KnowledgeMaterial.css';
import oneAnswerIcon from '../../../../images/quiz/one-answer-icon.png';

function KnowledgeMaterial({ knowledge }) {

  console.log(knowledge)

  return (
    <div className="knowledge-material">
      <div className="questions__container">
        <div>123</div>
        <nav className="questions__nav-menu">
          <div className="questions__info">
            <p className="questions__title">Вопросы</p>
            <span className="questions__count">{knowledge.questions.length}</span>
          </div>
          <div className="questions__nav-search">
            <input className="questions__nav-input" placeholder="поиск по вопросу"></input>
          </div>
          <ul className="questions__nav-list">
            {
            knowledge.questions.map((elem, i) => (
              <li key={i} className="questions__nav-item">
                  <img className="questions__nav-item-img" src={oneAnswerIcon} alt="иконка"></img>
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