import React from 'react';

function ControlProgramItem({ program, index, onEdit, onRemove }) {

  const [isShowMenu, setIsShowMenu] = React.useState(false);

  function toggleMenu() {
    setIsShowMenu(!isShowMenu);
  }

  function removeElement() {
    setIsShowMenu(false);
    onRemove(program);
  }

  return (
    <li className="control-program__item" >
      <span className="control-program__item-count">{`${index+ 1}.`}</span>
      <div className="control-program__item-info">
        <h4 className="control-program__item-name">{program.name}</h4>
        <div className="control-program__contacts">
          <p className="control-program__stage">{program.isArchieved ? "В архиве" : "В работе"}</p>
          <p className="control-program__hours">{program.totalHours}</p>
          <p className="control-program__participants">{program.participants.length}</p>
        </div>
      </div>
      <div className={`${program.isArchieved ? "control-program__status" : ""}`}></div>
      <div className={`control-program__item___buttons ${isShowMenu ? "control-program__item___buttons_type_show" : ""}`}>
        <button className={`control-program__item___btn-menu ${isShowMenu ? "control-program__item___btn-menu_type_show" : ""}`} type="button" onClick={toggleMenu}></button>
        <button className="control-program__item___btn control-program__item___btn-edit" type="button" onClick={() => onEdit(program)}>Редактировать</button>
        <button className="control-program__item___btn control-program__item___btn-delete" type="button" onClick={removeElement}>Удалить</button>
      </div> 
    </li>
  )
}

export default ControlProgramItem;