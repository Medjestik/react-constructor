import React from 'react';
import Popup from '../../../../Popup/Popup.js';
import './DefineZoonOptionPopup.css';

function DefineZoonOption({ isOpen, onClose, currentNode, currentNodeType, nodes, onRemoveNode, onSortChildren }) {

  React.useEffect(() => {

    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="popup__form popup__form_type_large">
        <h3 className="popup__title">Выберите, что вы хотите сделать с данным элементом</h3>
        <h5 className="zoon-option-popup__title">{currentNodeType}</h5>
        <p className="zoon-option-popup__subtitle">{currentNode.name}</p>
        <button onClick={() => onSortChildren(currentNode.id, {})}>Сортировка</button>
        <button onClick={() => onRemoveNode(currentNode.id, {}, "")}>Удалить</button>
      </div>
    </Popup>
  )
}

export default DefineZoonOption;