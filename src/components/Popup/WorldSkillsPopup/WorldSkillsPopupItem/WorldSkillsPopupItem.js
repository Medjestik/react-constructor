import React from 'react';

function WorldSkillsPopupItem({ item, i, selectedWorldSkills, onChange }) {

  const [isShowMenu, setIsShowMenu] = React.useState(false);

  function toggleMenu() {
    setIsShowMenu(!isShowMenu);
  }

  return(
    <li className="initial-popup__item" key={i}>
      <label className="checkbox initial-popup__checkbox">
        <input 
          name="prof-standard"
          type="checkbox"
          id={i}
          defaultChecked={selectedWorldSkills.some(elem => elem.id === item.id)}
          onChange={() => onChange(item.id)}
          >
        </input>
        <span></span>
      </label>
      <div className="initial-popup__info">
        <span className="initial-popup__code">{item.code || "xxx"}</span>
        <h4 className="initial-popup__name">{item.name|| "название"}</h4>
      </div>
      <div className={`initial-popup___buttons ${isShowMenu ? "initial-popup___buttons_type_show" : ""}`}>
        <button className={`initial-popup___btn-menu ${isShowMenu ? "initial-popup___btn-menu_type_show" : ""}`} type="button" onClick={toggleMenu}></button>
        <button className="initial-popup___btn initial-popup___btn-edit" type="button">Редактировать</button>
        <button className="initial-popup___btn initial-popup___btn-delete" type="button">Удалить</button>
      </div>
    </li>
  )
}

export default WorldSkillsPopupItem;