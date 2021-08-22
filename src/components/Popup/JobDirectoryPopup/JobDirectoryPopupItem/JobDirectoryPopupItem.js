import React from 'react';

function JobDirectoryPopupItem({ item, i, selectedJobDirectory, onChange, printDate }) {

  const [isShowMenu, setIsShowMenu] = React.useState(false);

  function toggleMenu() {
    setIsShowMenu(!isShowMenu);
  }

  return(
    <li className="initial-popup__item" key={i}>
      <label className="checkbox initial-popup__checkbox">
        <input 
          name={`eks-item-${item.id}`}
          type="checkbox"
          id={`eks-item-${item.id}`}
          defaultChecked={selectedJobDirectory.some(elem => elem.id === item.id)}
          onChange={() => onChange(item.id)}
          >
        </input>
        <span></span>
      </label>
      <div className="initial-popup__info">
        <span className="initial-popup__code">{item.nameProfession || "xx.xxx"}</span>
        <h4 className="initial-popup__name">{item.chapterName || "название"}</h4>
        <p className="initial-popup__order">{`Дата редакции ${printDate(item.editionDate) || "xx.xx.20xx"} г.`}</p>
      </div>
      <div className={`initial-popup___buttons ${isShowMenu ? "initial-popup___buttons_type_show" : ""}`}>
        <button className={`initial-popup___btn-menu ${isShowMenu ? "initial-popup___btn-menu_type_show" : ""}`} type="button" onClick={toggleMenu}></button>
        <button className="initial-popup___btn initial-popup___btn-edit" type="button">Редактировать</button>
        <button className="initial-popup___btn initial-popup___btn-delete" type="button">Удалить</button>
      </div>
    </li>
  )
}

export default JobDirectoryPopupItem;