import React from 'react';
import DefineMTOImg from '../../../../Define/DefineMTOImg/DefineMTOImg.js';
import './MTOTaskItem.css';

function MTOTaskItem({ elem, onUnSelectMTO, currentTask }) { 

  return (
    <li className="mto-item__item">
      <button className="mto-item__btn-delete" type="button" onClick={() => onUnSelectMTO(currentTask.id, elem.id)}></button>
      <DefineMTOImg mtoId={elem.parentId} />
      <div className="mto-item__item-info">
        <h4 className="mto-item__item-name">{elem.name || "Название"}</h4>
        <p className="mto-item__item-description">{elem.note || ""}</p>
        <p className="mto-item__item-description">{`Количество: ${elem.count} ${elem.unit}` || ""}</p>
      </div>
    </li>
  );
}

export default MTOTaskItem;