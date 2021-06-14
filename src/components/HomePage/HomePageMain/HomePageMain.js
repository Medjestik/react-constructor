import React from 'react';
import './HomePageMain.css';

function HomePageMain() {

  return (
    <main className="header-homepage" id="homepage-main">
      <div className="container">
        <div className="header-homepage__container">
          <h1 className="header-homepage__title">Добро пожаловать в&nbsp;<span className="header-homepage__title_font_color">конструктор</span> Дополнительных профессиональных программ РУТ&nbsp;(МИИТ)</h1>
          <p className="header-homepage__subtitle">На данном ресурсе проводится обсуждение и разработка Дополнительных&nbsp;образовательных&nbsp;программ&nbsp;(ДПП).</p>
        </div>
      </div>
    </main>
  )
}

export default HomePageMain;