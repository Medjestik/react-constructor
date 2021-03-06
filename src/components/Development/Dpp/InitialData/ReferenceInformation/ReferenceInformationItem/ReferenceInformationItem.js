import React from 'react';
import DefineNsiImg from '../../../../../Define/DefineNsiImg/DefineNsiImg.js';

function ReferenceInformationItem({ elem, onEdit, onRemove, isEditRights }) { 

  const [isShowMenu, setIsShowMenu] = React.useState(false);

  function toggleMenu() {
    setIsShowMenu(!isShowMenu);
  }

  function editElement() {
    setIsShowMenu(false);
    onEdit(elem);
  }

  function removeElement() {
    setIsShowMenu(false);
    onRemove(elem);
  }

  return (
    <li className="reference-information__item">
      <DefineNsiImg nsiId={elem.type_id} />
      <div className="reference-information__item-info">
        <h4 className="reference-information__item-name">{elem.typeName || "Название"}</h4>
        <p className="reference-information__item-description">{elem.nsiFullName || ""}</p>
      </div>
      {
        isEditRights &&
        <div className={`reference-information___buttons ${isShowMenu ? "reference-information___buttons_type_show" : ""}`}>
          <button className={`reference-information___btn-menu ${isShowMenu ? "reference-information___btn-menu_type_show" : ""}`} type="button" onClick={toggleMenu}></button>
          <button className="reference-information___btn reference-information___btn-edit" type="button" onClick={editElement}>Редактировать</button>
          <button className="reference-information___btn reference-information___btn-delete" type="button" onClick={removeElement}>Удалить</button>
        </div>
      }
    </li>
  );
}

export default ReferenceInformationItem;