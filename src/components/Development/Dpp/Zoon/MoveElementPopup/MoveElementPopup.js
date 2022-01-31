import React from 'react';
import './MoveElementPopup.css';
import Popup from '../../../../Popup/Popup.js';

function MoveElementPopup({ isOpen, onClose, nodes, currentNode, onMove }) {

  const [availableNodes, setAvailableNodes] = React.useState([]);

  React.useEffect(() => {

    const enableNodes = nodes.filter((elem) => ((currentNode.id !== elem.id) && (elem.tags[0] !== "knowledge") && (elem.id !== currentNode.pid)));

    if (currentNode.tags[0] === "skill") {
      const nodes = enableNodes.filter((elem) => (elem.tags[0] === "competence"));
      setAvailableNodes(nodes);
    }

    if (currentNode.tags[0] === "ability") {
      const nodes = enableNodes.filter((elem) => ((elem.tags[0] === "competence") || (elem.tags[0] === "skill")));
      setAvailableNodes(nodes);
    }

    if (currentNode.tags[0] === "knowledge") {
      const nodes = enableNodes.filter((elem) => ((elem.tags[0] === "through") || (elem.tags[0] === "ability")));
      setAvailableNodes(nodes);
    }

    return (() => {
      setAvailableNodes([]);
    })

  }, [nodes, currentNode, isOpen]);


  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="popup__form popup__form_type_large">
        <h3 className="popup__title">Перемещение элемента</h3>
        <p className="popup__subtitle">Выберите к чему вы хотите присоединить данный элемент.</p>
        <ul className="available-nodes__list">
        {
          availableNodes.map((elem, index) => {
            if (elem.id !== "th") {
              return (
                <li className="available-nodes__item" key={elem.id} onClick={() => onMove(currentNode, elem)}>
                  <span className="available-nodes__count">{`${index + 1}.`}</span>
                  <h3 className="available-nodes__text">{elem.name}</h3>
                </li>
              )
            } else {
              return (
                <li className="available-nodes__item" key={elem.id} onClick={() => onMove(currentNode, elem)}>
                  <span className="available-nodes__count">{`${index + 1}.`}</span>
                  <h3 className="available-nodes__text">{elem.type}</h3>
                </li>
              )
            }
          })
        }
        </ul>
              
      </div>
    </Popup>
  )
}

export default MoveElementPopup