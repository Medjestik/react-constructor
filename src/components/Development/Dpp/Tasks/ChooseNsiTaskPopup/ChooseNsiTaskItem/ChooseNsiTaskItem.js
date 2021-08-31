import React from 'react';

function ChooseNsiTaskItem({ elem, i, onChooseNsi, onEditNsi, onRemoveNsi, currentTask }) {

  const [isShowMenu, setIsShowMenu] = React.useState(false);

  function toggleMenu() {
    setIsShowMenu(!isShowMenu);
  }

  function editElement() {
    setIsShowMenu(false);
    onEditNsi(elem);
  }

  function deleteElement() {
    setIsShowMenu(false);
    onRemoveNsi(elem);
  }

  return (
    <li className="choose-nsi__item">
      <label className="checkbox choose-nsi__item-checkbox">
        <input 
          name="nsi-choose-item"
          type="checkbox"
          id={i}
          defaultChecked={currentTask.nsis.some(item => item.id === elem.id) ? true : false}
          onChange={() => onChooseNsi(elem.id)}
          >
        </input>
        <span></span>
      </label>
      <div className="choose-nsi__item-info">
        <h4 className="choose-nsi__item-name">{elem.type.name || "Название"}</h4>
        <p className="choose-nsi__item-description">{elem.nsiFullName || ""}</p>
      </div>
      <div className={`choose-nsi___buttons ${isShowMenu ? "choose-nsi___buttons_type_show" : ""}`}>
        <button className={`choose-nsi___btn-menu ${isShowMenu ? "choose-nsi___btn-menu_type_show" : ""}`} type="button" onClick={toggleMenu}></button>
        <button className="choose-nsi___btn choose-nsi___btn-edit" type="button" onClick={editElement}>Редактировать</button>
        <button className="choose-nsi___btn choose-nsi___btn-delete" type="button" onClick={deleteElement}>Удалить</button>
      </div>
    </li>
  )
}

export default ChooseNsiTaskItem;