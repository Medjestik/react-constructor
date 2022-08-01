import React from 'react';
import './HomePageCapabilities.css';
import imgFirst from '../../../images/main-page/capabilities-first.png';
import imgSecond from '../../../images/main-page/capabilities-second.png';
import imgThird from '../../../images/main-page/capabilities-third.png';
import imgFourth from '../../../images/main-page/capabilities-fourth.png';

function HomePageCapabilities() { 

  return (
    <section className="homepage-capabilities" id="homepage-capabilities">
      <div className="container">
        <h3 className="homepage__title">Комплексный программный продукт для&nbsp;методистов и&nbsp;авторов</h3>
        <p className="homepage__subtitle">позволяет запроектировать:</p>

        <ul className="homepage-capabilities__list">
          <li className="homepage-capabilities__item">
            <img className="homepage-capabilities__item-img" src={imgFirst} alt="иконка"></img>
            <h5 className="homepage-capabilities__item-title">Компетентностный профиль</h5>
            <p className="homepage-capabilities__item-subtitle">Чему нужно научить?</p>
          </li>
          <li className="homepage-capabilities__item">
            <img className="homepage-capabilities__item-img" src={imgSecond} alt="иконка"></img>
            <h5 className="homepage-capabilities__item-title">Оценочные материалы</h5>
            <p className="homepage-capabilities__item-subtitle">Как проверить, что научили?</p>
          </li>
          <li className="homepage-capabilities__item">
            <img className="homepage-capabilities__item-img" src={imgThird} alt="иконка"></img>
            <h5 className="homepage-capabilities__item-title">Методические материалы</h5>
            <p className="homepage-capabilities__item-subtitle">Как научить?</p>
          </li>
          <li className="homepage-capabilities__item">
            <img className="homepage-capabilities__item-img" src={imgFourth} alt="иконка"></img>
            <h5 className="homepage-capabilities__item-title">Организационные аспекты</h5>
            <p className="homepage-capabilities__item-subtitle">Как организовать обучение?</p>
          </li>
        </ul>  
      </div>
    </section>
  )
}

export default HomePageCapabilities;