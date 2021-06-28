import React from 'react';
import './ReferenceInformation.css';
import tehn from '../../../../../images/nsi/tehn.png';
import book from '../../../../../images/nsi/book.png';
import website from '../../../../../images/nsi/website.png';
import library from '../../../../../images/nsi/library.png';
import act from '../../../../../images/nsi/act.png';
import document from '../../../../../images/nsi/document.png';

function ReferenceInformation() {

  return (
    <ul className="initial-data__info-list">
      <li className="initial-data__info-item">
        <div className="initial-data__info-top">
          <img className="initial-data__info-img" src={tehn} alt="иконка"></img>
          <h5 className="initial-data__info-name">Нормативно-техническая документация и ГОСТ</h5>
        </div>
        <div className="initial-data__info-bottom">
          <span className="initial-data__info-count">Добавлено источников: 5</span>
          <button className="initial-data__info-btn" type="button">Подробнее</button>
        </div>
      </li>
      <li className="initial-data__info-item">
        <div className="initial-data__info-top">
          <img className="initial-data__info-img" src={book} alt="иконка"></img>
          <h5 className="initial-data__info-name">Учебники и монографии</h5>
        </div>
        <div className="initial-data__info-bottom">
          <span className="initial-data__info-count">Добавлено источников: 5</span>
          <button className="initial-data__info-btn" type="button">Подробнее</button>
        </div>
      </li>
      <li className="initial-data__info-item">
        <div className="initial-data__info-top">
          <img className="initial-data__info-img" src={website} alt="иконка"></img>
          <h5 className="initial-data__info-name">Интернет ресурсы</h5>
        </div>
        <div className="initial-data__info-bottom">
          <span className="initial-data__info-count">Добавлено источников: 5</span>
          <button className="initial-data__info-btn" type="button">Подробнее</button>
        </div>
      </li>
      <li className="initial-data__info-item">
        <div className="initial-data__info-top">
          <img className="initial-data__info-img" src={library} alt="иконка"></img>
          <h5 className="initial-data__info-name">Электронно-библиотечная система</h5>
        </div>
        <div className="initial-data__info-bottom">
          <span className="initial-data__info-count">Добавлено источников: 5</span>
          <button className="initial-data__info-btn" type="button">Подробнее</button>
        </div>
      </li>
      <li className="initial-data__info-item">
        <div className="initial-data__info-top">
          <img className="initial-data__info-img" src={act} alt="иконка"></img>
          <h5 className="initial-data__info-name">Нормативно-правовые акты</h5>
        </div>
        <div className="initial-data__info-bottom">
          <span className="initial-data__info-count">Добавлено источников: 5</span>
          <button className="initial-data__info-btn" type="button">Подробнее</button>
        </div>
      </li>
      <li className="initial-data__info-item">
        <div className="initial-data__info-top">
          <img className="initial-data__info-img" src={document} alt="иконка"></img>
          <h5 className="initial-data__info-name">Отраслевые дорожные методические документы</h5>
        </div>
        <div className="initial-data__info-bottom">
          <span className="initial-data__info-count">Добавлено источников: 5</span>
          <button className="initial-data__info-btn" type="button">Подробнее</button>
        </div>
      </li>
    </ul>
  );
}

export default ReferenceInformation;


