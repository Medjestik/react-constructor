import React from 'react';
import './DraggableItem.css';
import { Draggable } from 'react-beautiful-dnd';


function DraggableItem ({ part, index, onEdit, onRemove }) {

  const [isShowMenu, setShowMenu] = React.useState(false);

  function toggleMenu() {
    setShowMenu(!isShowMenu);
  }

  function onClickEdit() {
    onEdit(part, index);
  }

  function onClickRemove() {
    onRemove(part);
  }

  return (
    <>
    <Draggable draggableId={part.stringIds} index={index}>
      {(provided, snapshot) => (
        <li className={`draggable-item ${snapshot.isDragging ? "draggable-item_type_dragging" : ""}`}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        >
          <span className="draggable-item__count">{`${index + 1}.`}</span>
          <h3 className={`draggable-item__text ${isShowMenu ? "draggable-item__text_type_short" : ""}`}>{part.name}</h3>
          <div className={`draggable-item__buttons ${isShowMenu ? "draggable-item__buttons_type_show" : ""}`}>
            <button className={`draggable-item__btn-menu ${isShowMenu ? "draggable-item__btn-menu_type_show" : ""}`} type="button" onClick={toggleMenu}></button>
            <button className="draggable-item__btn draggable-item__btn-edit" type="button" onClick={onClickEdit}>Редактировать</button>
            <button className="draggable-item__btn draggable-item__btn-delete" type="button" onClick={onClickRemove}>Удалить</button>
          </div>
        </li>
      )}
    </Draggable>
    </>
  )
}

export default DraggableItem;