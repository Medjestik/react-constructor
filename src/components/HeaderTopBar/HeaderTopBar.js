import React from 'react';
import './HeaderTopBar.css';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import logoRut from '../../images/logo-rut.png';

function HeaderTopBar({ onLogout }) {

  const user = React.useContext(CurrentUserContext);
  
  return (
    <header className="header-top-bar">
      <div className="container">
        <div className="header-top-bar__container">
          <img className="header-top-bar__logo" src={logoRut} alt="логотип РУТ (МИИТ)"></img>
          <div className="header-top-bar__info">
            <span className="header-top-bar__greeting">{`Добро пожаловать, ${user ? user.fullname : ""}`}</span>
            <NavLink className="header-top-bar__person" activeClassName="header-top-bar__person_type_active" to="/main/person">Личный кабинет</NavLink>
            <button className="header-top-bar__logout" onClick={onLogout}>Выход</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderTopBar;
