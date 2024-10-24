import React from 'react';
import './HomePageMain.css';
import { Link } from "react-scroll";

function HomePageMain({ onOpenLoginPopup }) {

  return (
    <main className="homepage-main" id="homepage-main">
      <div className="container">
        <div className="homepage-main__container">
          <div className="homepage-main__info">
            <h1 className="homepage-main__title"><span className="homepage-main__title_font_color">Конструктор</span> дополнительных профессиональных программ</h1>
            <p className="homepage-main__subtitle">Продукт для&nbsp;проектирования программ повышения квалификации и&nbsp;профессиональной переподготовки <span className="homepage-main__title_font_weight">в&nbsp;методологии обратного дизайна ("от результата")</span></p>
            <div>
              <button className="homepage-main__btn" type="button" onClick={onOpenLoginPopup}>Вход</button>
              {
                /*
                <a className="homepage-main__link" rel='norefferer' target='_blanc' href='https://constructor-api.emiit.ru/promo'>Видео-ролик</a>
                */
              }
            </div>
          </div>
          <div className="homepage-main__img-container">
            <div className="homepage-main__img"></div>
            <div className="homepage-main__background"></div>
          </div>
        </div>
        
      </div>
      <Link to="homepage-capabilities" smooth={true} offset={0} duration= {500}><div className="homepage-main__arrow"></div></Link>
    </main>
  )
}

export default HomePageMain;