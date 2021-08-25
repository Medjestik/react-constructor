import React from 'react';
import './MainPage.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';


function MainPage() {

  const user = React.useContext(CurrentUserContext);

  return (
    <div className="main-page">
      <h1 className="main__title">Добро пожаловать, {user.fullname}</h1>
      <p className="main__subtitle">Версия программы v25.08.2021</p>
    </div>
  );
}

export default MainPage;