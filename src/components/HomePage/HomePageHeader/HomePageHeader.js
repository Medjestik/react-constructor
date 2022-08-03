import React from 'react';
import './HomePageHeader.css';
import { Link } from "react-scroll";
import logo from '../../../images/logo.png';

function HomePageHeader({ onOpenLoginPopup }) {

  return (
    <header className="header-homepage" id="homepage-header">
      <div className="container">
        <nav className="header-homepage__nav">
          <a className="header-homepage__logo-link" href="https://www.miit.ru/" target="_blank" rel="noreferrer"><img className="header-homepage__logo" src={logo} alt="logo"></img></a>
          <ul className="header-homepage__links">
            <li className="header-homepage__link"><Link to="homepage-capabilities" smooth={true} offset={0} duration= {500}>О конструкторе</Link></li>
            <li className="header-homepage__link"><Link to="homepage-methodology" smooth={true} offset={0} duration= {1000}>Методология</Link></li>
            <li className="header-homepage__link"><Link to="footer" smooth={true} offset={0} duration= {1500}>Контакты</Link></li>
          </ul>
          <button className="header-homepage__button" onClick={onOpenLoginPopup}>Вход в конструктор</button>
        </nav>
      </div>
    </header>
  )
}

export default HomePageHeader;