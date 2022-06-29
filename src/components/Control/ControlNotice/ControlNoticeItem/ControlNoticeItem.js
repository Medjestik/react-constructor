import React from 'react';

function ControlNoticeItem({ notice, index, onEdit, onRemove }) {

  const [isShowMenu, setIsShowMenu] = React.useState(false);

  function toggleMenu() {
    setIsShowMenu(!isShowMenu);
  }

  function removeElement() {
    setIsShowMenu(false);
    onRemove(notice);
  }

  return (
    <li className="control-structure__item" >
      <span className="control-structure__item-count">{`${index+ 1}.`}</span>
      <div className="control-structure__item-info">
        <p className="control-notice__item-text">{notice.text}</p>
      </div>
      <div className={`control-structure__item___buttons ${isShowMenu ? "control-structure__item___buttons_type_show" : ""}`}>
        <button className={`control-structure__item___btn-menu ${isShowMenu ? "control-structure__item___btn-menu_type_show" : ""}`} type="button" onClick={toggleMenu}></button>
        <button className="control-structure__item___btn control-structure__item___btn-edit" type="button" onClick={() => onEdit(notice)}>Редактировать</button>
        <button className="control-structure__item___btn control-structure__item___btn-delete" type="button" onClick={removeElement}>Удалить</button>
      </div> 
    </li>
  )
}

export default ControlNoticeItem;