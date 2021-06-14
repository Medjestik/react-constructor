import React from 'react';
import './MainPage.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';


function MainPage() {

  const user = React.useContext(CurrentUserContext);

  return (
    <div className="main-page">
      <h1 className="main__title">Добро пожаловать, {user.fullname}</h1>
    </div>
  );
}

export default MainPage;