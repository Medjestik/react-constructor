import React from 'react';
import './KnowledgeItem.css';

function KnowledgeItem({ knowledges, chooseKnowledge }) {

  console.log(knowledges);
  
  return (
    <>
    <p className="main__subtitle">Для работы с оценочными материалами выберите знание</p>
    <ul className="knowledge-item__list">
    {
      knowledges.map((knowledge) => (
        <li key={knowledge.id} className="knowledge-item__item">
          <span 
          className={`
          knowledge-item__count
          ${knowledge.questions.length === 0 ? "knowledge-item__count_color_none" : ""}
          ${knowledge.questions.length > 0 ? "knowledge-item__count_color_progress" : ""}
          ${knowledge.questions.length > 4 ? "knowledge-item__count_color_success" : ""}
          `}
          >
            {knowledge.questions.length}
          </span>
          <h3 className="knowledge-item__name">{knowledge.name}</h3>
          <button className="knowledge-item__btn" onClick={() => chooseKnowledge(knowledge)}>Выбрать</button>
        </li>
      ))
    }
    </ul>
    </>
  );
}

export default KnowledgeItem;