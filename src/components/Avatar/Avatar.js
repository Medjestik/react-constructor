import React from 'react';
import './Avatar.css';
import avatar from '../../images/avatars/7.jpg';

function Avatar() {

  return (
    <div className="avatar">
      <img className="avatar__user-img" alt="аватар пользователя" src={avatar}></img>
    </div>
  );
}

export default Avatar;