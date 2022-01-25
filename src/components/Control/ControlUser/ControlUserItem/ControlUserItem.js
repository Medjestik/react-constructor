import React from 'react';

function ControlUserItem({ user, index, onEdit, onRemove }) {

  const [isShowMenu, setIsShowMenu] = React.useState(false);

  function toggleMenu() {
    setIsShowMenu(!isShowMenu);
  }

  function removeElement() {
    setIsShowMenu(false);
    onRemove(user);
  }

  return (
    <li className="control-user__item" >
      <span className="control-user__item-count">{`${index+ 1}.`}</span>
      <div className="control-user__item-info">
        <h4 className="control-user__item-name">{`${user.lastname} ${user.firstname} ${user.middlename}`}</h4>
        <div className="control-user__contacts">
          <p className="control-user__mail">{user.email}</p>
          {
            user.phone &&
            <p className="control-user__phone">{user.phone}</p>
          }
          
        </div>
      </div>
      <div className={`${!user.isActive ? "control-user__status" : ""}`}></div>
      <div className={`control-user__item___buttons ${isShowMenu ? "control-user__item___buttons_type_show" : ""}`}>
        <button className={`control-user__item___btn-menu ${isShowMenu ? "control-user__item___btn-menu_type_show" : ""}`} type="button" onClick={toggleMenu}></button>
        <button className="control-user__item___btn control-user__item___btn-edit" type="button" onClick={() => onEdit(user)}>Редактировать</button>
        <button className="control-user__item___btn control-user__item___btn-delete" type="button" onClick={removeElement}>Удалить</button>
      </div> 
    </li>
  )
}

export default ControlUserItem;