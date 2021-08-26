import React from 'react';
import './KnowledgeTypology.css';

function KnowledgeTypology({ typologyParts, currentNode, currentActionType, onChoose }) {

  function handleChangeTypologyPart(e) {
    onChoose(e.target.id)
  }

  return (
    <div className="knowledge-typology">
      <h5 className="popup__title add-node__title">Соответствие разделу типовой структуры</h5>
      <p className="popup__subtitle add-node__subtitle knowledge-typology__subtitle">Выберите раздел типовой структуры, которому соответсвует данное знание</p>

      <ul className="initial-data__item-target-list">
        {
          typologyParts.map((part, i) => (
            <li className="initial-data__item-target-item" key={i}>
              <label className="radio">
                <input 
                  className="radio"
                  name="developingResult"
                  type="radio"
                  id={part.id}
                  defaultChecked={(currentActionType === "edit" && currentNode.dtp) ? currentNode.dtp.id === part.id : false}
                  onChange={handleChangeTypologyPart}
                >
                </input>
                <span>{part.name}</span>
              </label>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default KnowledgeTypology;