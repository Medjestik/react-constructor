import React from 'react';
import './Method.css';
import structure from '../../images/structure.png';
import profession from '../../images/profession.png';
import qualification from '../../images/qualification.png';
import fgos from '../../images/fgos.png';

function Method() {

  const hideMethod = true;

  return (
    <div className="method">
      <h1 className="main__title">Методическая база</h1>
      {
        hideMethod 
        ? 
        <p className="main__subtitle">Этап находится в разработке.</p>
        :
        <ul className="method__list">
          <li className="method__item">
            <img className="method__item-img" alt="иконка" src={structure}></img>
            <h3 className="method__item-title">Типовые структуры ДПП</h3>
            <button className="method__item-button" type="button">Просмотреть</button>
          </li>
          <li className="method__item">
            <img className="method__item-img" alt="иконка" src={profession}></img>
            <h3 className="method__item-title">Профессиональные стандарты</h3>
            <button className="method__item-button" type="button">Просмотреть</button>
          </li>
          <li className="method__item">
            <img className="method__item-img" alt="иконка" src={qualification}></img>
            <h3 className="method__item-title">Квалификационные требования по&nbsp;должностям</h3>
            <button className="method__item-button" type="button">Просмотреть</button>
          </li>
          <li className="method__item">
            <img className="method__item-img" alt="иконка" src={fgos}></img>
            <h3 className="method__item-title">Федеральные государственные образовательные стандарты</h3>
            <button className="method__item-button" type="button">Просмотреть</button>
          </li>
        </ul>
      }
      
    </div>
  );
}

export default Method;