import React from 'react';

function TaskItem({ task, index, onEdit, onRemove, isEditRights }) {

  const [isShowMenu, setIsShowMenu] = React.useState(false);

  function toggleMenu() {
    setIsShowMenu(!isShowMenu);
  }

  function removeElement() {
    setIsShowMenu(false);
    onRemove(task);
  }

  return (
    <li className="task__item" >
      <span className="task__item-count">{`${index+ 1}.`}</span>
      <div className="task__item-info">
        <span className="task__item-tag">{task.type_name}</span> 
        <h4 className="task__item-name">{task.name}</h4>
        <p className="task__item-caption"></p>
      </div>
      {
        isEditRights &&
        <div className={`task__item___buttons ${isShowMenu ? "task__item___buttons_type_show" : ""}`}>
          <button className={`task__item___btn-menu ${isShowMenu ? "task__item___btn-menu_type_show" : ""}`} type="button" onClick={toggleMenu}></button>
          <button className="task__item___btn task__item___btn-edit" type="button" onClick={() => onEdit(task)}>Редактировать</button>
          <button className="task__item___btn task__item___btn-delete" type="button" onClick={removeElement}>Удалить</button>
        </div> 
      }
    </li>
  )
}

export default TaskItem;