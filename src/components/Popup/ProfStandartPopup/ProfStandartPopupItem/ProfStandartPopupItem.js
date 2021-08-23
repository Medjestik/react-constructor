import React from 'react';

function ProfStandartPopupItem({ item, i, selectedProfStandart, onChange, onEdit, onRemove, printDate }) {

  const [isShowMenu, setIsShowMenu] = React.useState(false);

  function toggleMenu() {
    setIsShowMenu(!isShowMenu);
  }

  function hideMenu() {
    setIsShowMenu(false);
  }

  return(
    <li className="initial-popup__item" key={i}>
      <label className="checkbox initial-popup__checkbox">
        <input 
          name={`pf-item-${item.id}`}
          type="checkbox"
          id={`pf-item-${item.id}`}
          defaultChecked={selectedProfStandart.some(elem => elem.id === item.id)}
          onChange={() => onChange(item.id)}
          >
        </input>
        <span></span>
      </label>
      <div className="initial-popup__info">
        <span className="initial-popup__code">{item.nameCode || "xx.xxx"}</span>
        <h4 className="initial-popup__name">{item.nameText || "название"}</h4>
        <p className="initial-popup__order">{`приказ Минтруда России от ${printDate(item.orderDate) || "xx.xx.20xx"} г. № ${item.orderNumber || "xxxx"}н (зарегистрирован Министерством юстиции Российской Федерации ${printDate(item.registrationDate) || "xx.xx.20xx"} г., регистрационный № ${item.registrationNumber || "xxxxx"}`}</p>
      </div>
      <div className={`initial-popup___buttons ${isShowMenu ? "initial-popup___buttons_type_show" : ""}`}>
        <button className={`initial-popup___btn-menu ${isShowMenu ? "initial-popup___btn-menu_type_show" : ""}`} type="button" onClick={toggleMenu}></button>
        <button className="initial-popup___btn initial-popup___btn-edit" type="button" onClick={() => onEdit(item, hideMenu)}>Редактировать</button>
        <button className="initial-popup___btn initial-popup___btn-delete" type="button" onClick={() => onRemove(item, hideMenu)}>Удалить</button>
      </div>
    </li>
  )
}

export default ProfStandartPopupItem;