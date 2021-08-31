import React from 'react';
import DefineNsiImg from '../../../../Define/DefineNsiImg/DefineNsiImg.js';

function NsiTaskItem({ elem, unSelectNsi }) { 

  return (
    <li className="reference-information__item">
      <button className="reference-information__btn-delete" type="button" onClick={() => unSelectNsi(elem)}></button>
      <DefineNsiImg nsiId={elem.type_id} />
      <div className="reference-information__item-info">
        <h4 className="reference-information__item-name">{elem.typeName || "Название"}</h4>
        <p className="reference-information__item-description">{elem.nsiFullName || ""}</p>
      </div>
    </li>
  );
}

export default NsiTaskItem;