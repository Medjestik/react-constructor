import React from 'react';
import './JustificationPopup.css';

function JustificationPopup() {

  return (
    <div className="popup__justification">
      <h5 className="popup__title add-node__title">Обоснование</h5>
      <p className="popup__subtitle add-node__subtitle">Выберите на основе какой информации формируется навык</p>
      <ul>
        <li key="" className="">
          <label className="radio">
          <input 
            name="justification"
            type="radio"
            id="1"
            defaultChecked={false}
            //onChange={() => handleChangeProfLevels(level.id)}
            >
          </input>
            <span>На основе источников НСИ</span>
          </label>
        </li>
      </ul>
    </div>
  )
}

export default JustificationPopup;