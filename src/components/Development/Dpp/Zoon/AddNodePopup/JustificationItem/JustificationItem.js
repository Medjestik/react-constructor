import React from 'react';

function JustificationItem({ elem, i, onChooseNsi, onRemoveNsi }) {

  const [isShowMenu, setIsShowMenu] = React.useState(false);

  function toggleMenu() {
    setIsShowMenu(!isShowMenu);
  }

  function deleteElement() {
    setIsShowMenu(false);
    onRemoveNsi(elem);
  }

  return (
    <li className="justification-source__item" key={i}>
      <label className="checkbox justification-source__item-checkbox">
        <input 
          name="prof-standard"
          type="checkbox"
          id={i}
          //defaultChecked={selectedProfStandart.some(elem => elem.id === item.id)}
          onChange={() => onChooseNsi(elem.id)}
          >
        </input>
        <span></span>
      </label>
      <div className="justification-source__item-info">
        <h4 className="justification-source__item-name">{elem.type.name || "Название"}</h4>
        <p className="justification-source__item-description">{elem.nsiFullName || ""}</p>
      </div>
      <div className={`justification-source___buttons ${isShowMenu ? "justification-source___buttons_type_show" : ""}`}>
        <button className={`justification-source___btn-menu ${isShowMenu ? "justification-source___btn-menu_type_show" : ""}`} type="button" onClick={toggleMenu}></button>
        <button className="justification-source___btn justification-source___btn-edit" type="button">Редактировать</button>
        <button className="justification-source___btn justification-source___btn-delete" type="button" onClick={deleteElement}>Удалить</button>
      </div>
    </li>
  )
}

export default JustificationItem;