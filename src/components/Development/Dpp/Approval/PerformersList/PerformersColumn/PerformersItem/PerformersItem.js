import React from 'react';
import '../../../../../../DragAndDrop/DraggableItem/DraggableItem.js';
import { Draggable } from 'react-beautiful-dnd';


function PerformersItem ({ part, index, onEdit, onRemove, isEditRights }) {

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
          <div className="performers-list__item-info">
            <h3 className="performers-list__item-name">{part.lastname} {part.firstname} {part.middlename} ({part.title}, {part.degree})</h3>
            <p className="performers-list__item-text ">{part.task}</p>
          </div>
          
          {
            isEditRights &&
            <div className={`draggable-item__buttons ${isShowMenu ? "draggable-item__buttons_type_show" : ""}`}>
              <button className={`draggable-item__btn-menu ${isShowMenu ? "draggable-item__btn-menu_type_show" : ""}`} type="button" onClick={toggleMenu}></button>
              <button className="draggable-item__btn draggable-item__btn-edit" type="button" onClick={onClickEdit}>Редактировать</button>
              <button className="draggable-item__btn draggable-item__btn-delete" type="button" onClick={onClickRemove}>Удалить</button>
            </div>
          }
        </li>
      )}
    </Draggable>
    </>
  )
}

export default PerformersItem;