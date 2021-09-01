import React from 'react';

function ChooseMTOItem({ elem, i, onChooseMTO, onEditMTO, onRemoveMTO, currentTask }) {

  const [isShowMenu, setIsShowMenu] = React.useState(false);

  function toggleMenu() {
    setIsShowMenu(!isShowMenu);
  }

  function editElement() {
    setIsShowMenu(false);
    onEditMTO(elem);
  }

  function deleteElement() {
    setIsShowMenu(false);
    onRemoveMTO(elem);
  }

  return (
    <li className="choose-mto__item">
      <label className="checkbox choose-mto__item-checkbox">
        <input 
          name="mto-choose-item"
          type="checkbox"
          id={i}
          defaultChecked={currentTask.mtos.some(item => item.id === elem.id) ? true : false}
          onChange={() => onChooseMTO(elem.id)}
          >
        </input>
        <span></span>
      </label>
      <div className="choose-mto__item-info">
        <h4 className="choose-mto__item-name">{elem.name || "Название"}</h4>
        <p className="choose-mto__item-description">{elem.note || ""}</p>
      </div>
      <div className={`choose-mto___buttons ${isShowMenu ? "choose-mto___buttons_type_show" : ""}`}>
        <button className={`choose-mto___btn-menu ${isShowMenu ? "choose-mto___btn-menu_type_show" : ""}`} type="button" onClick={toggleMenu}></button>
        <button className="choose-mto___btn choose-mto___btn-edit" type="button" onClick={editElement}>Редактировать</button>
        <button className="choose-mto___btn choose-mto___btn-delete" type="button" onClick={deleteElement}>Удалить</button>
      </div>
    </li>
  )
}

export default ChooseMTOItem;