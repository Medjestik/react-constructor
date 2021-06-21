import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Avatar from '../Avatar/Avatar.js';
import home from '../../images/header/home-white.png';
import person from '../../images/header/person-white.png';
import development from '../../images/header/development-white.png';
import control from '../../images/header/control-white.png';
import database from '../../images/header/database-white.png';
import discussion from '../../images/header/discussion-white.png';
import hide from '../../images/arrows/arrow-hide.png';
import show from '../../images/arrows/arrow-show.png';

function Header({ onLogout, showHeaderMenu, setShowHeaderMenu, onOpenAvatarPopup }) {

  const user = React.useContext(CurrentUserContext);

  const defineUserRights = (rights) => {
    if (rights === 'superadmin') {
      return 'Суперадминистратор'
    }
    if (rights === 'admin') {
      return 'Администратор'
    }
    if (rights === 'user') {
      return 'Пользователь'
    }
    return rights;
  }

  const menu = (
    <div className={`header__menu ${showHeaderMenu ? "header__menu_type_hide" : "header__menu_type_show"}`}>
      <div className="header__menu-container">
        <img className="header__arrow header__menu-arrow" src={show} alt="стрелка" onClick={() => {setShowHeaderMenu(true)}}></img>
        <nav className="header__menu-nav">
          <NavLink className="header__menu-link" activeClassName="header__menu-link_type_active" to="/main" exact>
            <img className="header__menu-img" alt="иконка" src={home}></img>
          </NavLink>
          <NavLink className="header__menu-link" activeClassName="header__menu-link_type_active" to="/main/person" exact>
            <img className="header__menu-img" alt="иконка" src={person}></img>
          </NavLink>
          <NavLink className="header__menu-link" activeClassName="header__menu-link_type_active" to="/main/development" exact>
            <img className="header__menu-img" alt="иконка" src={development}></img>
          </NavLink>
          <NavLink className="header__menu-link" activeClassName="header__menu-link_type_active" to="/main/method" exact>
            <img className="header__menu-img" alt="иконка" src={database}></img>
          </NavLink>
          <NavLink className="header__menu-link" activeClassName="header__menu-link_type_active" to="/main/discussion" exact>
            <img className="header__menu-img" alt="иконка" src={discussion}></img>
          </NavLink>
          <NavLink className="header__menu-link" activeClassName="header__menu-link_type_active" to="/main/control" exact>
            <img className="header__menu-img" alt="иконка" src={control}></img>
          </NavLink>
        </nav>
        <button className="header__menu-logout" type="button" onClick={onLogout}></button>
      </div>
    </div>
  )

  return (

    <>

    {menu}

    <header className={`header ${showHeaderMenu ? "header_type_show" : "header_type_hide"}`}>
      <div className="header__container">

        <img className="header__arrow" src={hide} alt="стрелка" onClick={() => {setShowHeaderMenu(false)}}></img>

        <div className="header__user-info">
          <Avatar
          onOpenAvatarPopup={onOpenAvatarPopup} 
          />
          <h3 className="header__user-name">{`${user.lastname} ${user.firstname} ${user.middlename}`}</h3>
          <p className="header__user-group">{defineUserRights(user.rights)}</p>
        </div>
        
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <NavLink className="header__nav-link" activeClassName="header__nav-link_type_active" to="/main" exact>
                <img className="header__nav-img" alt="иконка" src={home}></img>
                <p className="header__nav-text">Главная</p>
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink className="header__nav-link" activeClassName="header__nav-link_type_active" to="/main/person">
                <img className="header__nav-img" alt="иконка" src={person}></img>
                <p className="header__nav-text">Личный кабинет</p>
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink className="header__nav-link" activeClassName="header__nav-link_type_active" to="/main/development">
                <img className="header__nav-img" alt="иконка" src={development}></img>
                <p className="header__nav-text">Разработка ДПП</p>
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink className="header__nav-link" activeClassName="header__nav-link_type_active" to="/main/method">
                <img className="header__nav-img" alt="иконка" src={database}></img>
                <p className="header__nav-text">Методическая база</p>
              </NavLink>  
            </li>
            <li className="header__nav-item">
              <NavLink className="header__nav-link" activeClassName="header__nav-link_type_active" to="/main/discussion">
                <img className="header__nav-img" alt="иконка" src={discussion}></img>
                <p className="header__nav-text">Обсуждение</p>
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink className="header__nav-link" activeClassName="header__nav-link_type_active" to="/main/control">
                <img className="header__nav-img" alt="иконка" src={control}></img>
                <p className="header__nav-text">Управление</p>
              </NavLink>
            </li>
          </ul>
        </nav>

        <button className="header__button-logout" type="button" onClick={onLogout}>Выход</button>

      </div>
    </header>

    </>
  );
}

export default Header;