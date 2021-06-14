import React from 'react';
import './HomePageFooter.css';
import logoWhite from '../../../images/logo-rut-white.png';

function HomePageFooter() {
  
  return (
    <footer className="footer" id="footer">

      <div className="container">
        <div className="footer__container">
          <div className="footer__info">
            <img className="footer__logo" src={logoWhite} alt="logo"></img>
          </div>

          <ul className="footer__columns">
        
            <li className="footer__column">
              <h4 className="footer__column-title">Ресурсы</h4>
              <ul className="footer__column-links">
                <li className="footer__column-item"><a className="footer__column-link" href="https://miit-ief.ru/" target="_blank" rel="noreferrer">Институт экономики и финансов</a></li>
                <li className="footer__column-item"><a className="footer__column-link" href="https://www.miit.ru/" target="_blank" rel="noreferrer">РУТ (МИИТ)</a></li>
              </ul>
            </li>
            <li className="footer__column">
              <h4 className="footer__column-title">Контакты</h4>
              <ul className="footer__column-links">
                <li className="footer__column-item">ief07@bk.ru</li>
                <li className="footer__column-item">+7 (499) 653-55-16</li>
              </ul>
            </li>
          </ul>
        </div>
        <span className="footer__copy">&copy;2021 Все права защищены, ИЭФ&nbsp;РУТ&nbsp;(МИИТ)</span>
      </div>
    </footer>
  );
}

export default HomePageFooter;