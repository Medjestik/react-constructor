import React from 'react';
import './Avatar.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import avatar from '../../images/avatar-default.png';

function Avatar({ onOpenAvatarPopup }) {

  const user = React.useContext(CurrentUserContext);
  
  return (
    <button className="avatar" type="button" onClick={onOpenAvatarPopup}>
      <img className="avatar__user-img" alt="аватар пользователя" src={user.img || avatar}></img>
    </button>
  );
}

export default Avatar;