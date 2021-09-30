import React from 'react';

function PerformersItem({ elem, i }) {

  const [isShowMenu, setIsShowMenu] = React.useState(false);

  function toggleMenu() {
    setIsShowMenu(!isShowMenu);
  }

  function editElement() {
    setIsShowMenu(false);
    //onEdit(elem);
  }

  function removeElement() {
    setIsShowMenu(false);
    //onRemove(elem);
  }

  return (
    <li className="performers-list__item" key={i}>
      <span className="performers-list__item-count">{i + 1}.</span>
      <div className="performers-list__item-img"></div>
      <div className="performers-list__item-info">
        <h5 className="performers-list__item-name">{`${elem.name} ${elem.rank.length > 0 ? elem.rank : ""}`}</h5>
        <p className="performers-list__item-text">{elem.text}</p>
      </div>
      <div className={`performers-list___buttons ${isShowMenu ? "performers-list___buttons_type_show" : ""}`}>
        <button className={`performers-list___btn-menu ${isShowMenu ? "performers-list___btn-menu_type_show" : ""}`} type="button" onClick={toggleMenu}></button>
        <button className="performers-list___btn performers-list___btn-edit" type="button" onClick={editElement}>Редактировать</button>
        <button className="performers-list___btn performers-list___btn-delete" type="button" onClick={removeElement}>Удалить</button>
      </div>
    </li>
  );
}

export default PerformersItem; 