import React from 'react';
import './HomePageHeader.css';
import logo from '../../../images/logo.png';

function HomePageHeader({ onOpenLoginPopup }) {

  return (
    <header className="header-homepage" id="homepage-header">
      <div className="container">
        <nav className="header-homepage__nav">
          <a className="header-homepage__logo-link" href="https://www.miit.ru/" target="_blank" rel="noreferrer"><img className="header-homepage__logo" src={logo} alt="logo"></img></a>
          <ul className="header-homepage__links">
            <li className="header-homepage__link">О конструкторе</li>
            <li className="header-homepage__link">Методология</li>
            <li className="header-homepage__link">Программы</li>
            <li className="header-homepage__link">Контакты</li>
          </ul>
          <button className="header-homepage__button" onClick={onOpenLoginPopup}>Вход в конструктор</button>
        </nav>
      </div>
    </header>
  )
}

export default HomePageHeader;