import React from 'react';
import tehn from '../../../../../../images/nsi/tehn.png';

function ReferenceInformationItem({ elem, onRemove }) { 

  const [isShowMenu, setIsShowMenu] = React.useState(false);

  function toggleMenu() {
    setIsShowMenu(!isShowMenu);
  }

  function removeElement(id) {
    setIsShowMenu(false);
    onRemove(id);
  }

  return (
    <li className="reference-information__item">
      <img className="reference-information__item-img" src={tehn} alt="иконка"></img>
      <div className="reference-information__item-info">
        <h4 className="reference-information__item-name">{elem.type.name || "Название"}</h4>
        <p className="reference-information__item-description">{elem.nsiFullName || ""}</p>
      </div>
      <div className={`reference-information___buttons ${isShowMenu ? "reference-information___buttons_type_show" : ""}`}>
        <button className={`reference-information___btn-menu ${isShowMenu ? "reference-information___btn-menu_type_show" : ""}`} type="button" onClick={toggleMenu}></button>
        <button className="reference-information___btn reference-information___btn-edit" type="button">Редактировать</button>
        <button className="reference-information___btn reference-information___btn-delete" type="button" onClick={() => removeElement(elem.id)}>Удалить</button>
      </div>
    </li>
  );
}

export default ReferenceInformationItem;