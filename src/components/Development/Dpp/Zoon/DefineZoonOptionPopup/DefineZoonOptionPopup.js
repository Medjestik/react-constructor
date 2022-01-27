import React from 'react';
import Popup from '../../../../Popup/Popup.js';
import './DefineZoonOptionPopup.css';

function DefineZoonOption({ isOpen, onClose, currentNode, currentNodeType, nodes, onAddNode, onEditNode, onDisconnectNode, onRemoveNode, onSortChildren }) {

  console.log(currentNodeType);

  function defineAddType(type) {
    switch(type) {
      case 'Навык':
        return (
        <li className="zoon-option__btn zoon-option__btn_type_add" onClick={() => onAddNode(currentNode.id, {}, "ability")}>Добавить умение к элементу</li>
        )
      case 'Умение':
        return (
          <li className="zoon-option__btn zoon-option__btn_type_add" onClick={() => onAddNode(currentNode.id, {}, "knowledge")}>Добавить знание к элементу</li>
        )
      case 'Компетенция':
        return (
          <>
          <li className="zoon-option__btn zoon-option__btn_type_add" onClick={() => onAddNode(currentNode.id, {}, "skill")}>Добавить навык к элементу</li>
          <li className="zoon-option__btn zoon-option__btn_type_add" onClick={() => onAddNode(currentNode.id, {}, "ability")}>Добавить умение к элементу</li>
          </>
        )
      default:
        return false;
    }
  }

  function defineUnlinkElement(node) {
    if (node.pid) {
      if (node.pid.length > 1) {
        return (
          <li className="zoon-option__btn zoon-option__btn_type_unlink" onClick={() => onDisconnectNode(currentNode.id, {})}>Отсоединить элемент</li>
        )
      }
    }
  }

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
        <ul className="zoon-option__list">
          {
            defineAddType(currentNodeType)
          }
          <li className="zoon-option__btn zoon-option__btn_type_edit" onClick={() => onEditNode(currentNode.id, {})}>Редактировать элемент</li>
          {
            defineUnlinkElement(currentNode)
          }
          <li className="zoon-option__btn zoon-option__btn_type_sort" onClick={() => onSortChildren(currentNode.id, {})}>Отсортировать дочерние элементы</li>
          <li className="zoon-option__btn zoon-option__btn_type_remove" onClick={() => onRemoveNode(currentNode.id, {}, "")}>Удалить элемент</li>
        </ul>
      </div>
    </Popup>
  )
}

export default DefineZoonOption;