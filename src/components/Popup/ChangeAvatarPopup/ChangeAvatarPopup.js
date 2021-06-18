import React from 'react';
import './ChangeAvatarPopup.css';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';
import Popup from '../../Popup/Popup.js';
import avatar from '../../../images/avatar-default.png';

function ChangeAvatarPopup({ isOpen, onClose }) {

  const user = React.useContext(CurrentUserContext);

  const [avatarLink, setAvatarLink] = React.useState('');
  const [errorAvatarLink, setErrorAvatarLink] = React.useState({});
  const [blockSubmitButton, setBlockSubmitButton] = React.useState(true);
  const [avatarFile, setAvatarFile] = React.useState({
    file: null,
  })
  const [currentUserAvatar, setCurrentUserAvatar] = React.useState(user.image || avatar);
  const [isHideLinkContainer, setIsHideLinkContainer] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (avatarFile.file != null) {
      console.log(avatarFile.file);
    } else {
      console.log(avatarLink);
    }
  }

  function handleChangeFile(e) {
    if (e.target.files.length > 0) {
      setIsHideLinkContainer(true);
      setCurrentUserAvatar(URL.createObjectURL(e.target.files[0]));
      setAvatarFile({
        file: URL.createObjectURL(e.target.files[0])
      })
    } else {
      setCurrentUserAvatar(user.image || avatar);
      setIsHideLinkContainer(false);
      setAvatarFile({
        file: null,
      })
    }
  }

  function handleChangeEmail(e) {
    setAvatarLink(e.target.value);
    if (e.target.checkValidity()) {
      setErrorAvatarLink({
          errorText: '',
          error: false
      });
    }
    else {
      setErrorAvatarLink({
          errorText: 'Неправильный формат ссылки',
          error: true
      });
    }
  }

  React.useEffect(() => {
    setAvatarLink('');
    setBlockSubmitButton(true);
    setErrorAvatarLink({
      errorText: '',
      error: false
    });
    setCurrentUserAvatar(user.image || avatar);
    setIsHideLinkContainer(false);
    setAvatarFile({
      file: null,
    })
  }, [user.image, isOpen]);

  React.useEffect(() => {
    if (avatarFile.file != null) {
      setBlockSubmitButton(false);
    } else {
      if (errorAvatarLink.error || avatarLink.length < 1) {
        setBlockSubmitButton(true);
      } else {
        setBlockSubmitButton(false);
      }
    }
  }, [errorAvatarLink, avatarFile, avatarLink]);


  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form" name="avatar-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="popup__title">Изменение изображения</h3>
        <img className="popup__avatar" alt="аватар" src={currentUserAvatar}></img>
        <div className="input__choose-file">
          <label htmlFor="file-upload" className="btn btn_type_upload">Загрузите файл</label>
          <input onChange={handleChangeFile} id="file-upload" className="popup__file-input" type="file" />
        </div>
        <div className={`popup__avatar-link-container ${isHideLinkContainer ? "popup__avatar-link-container_type_hide" : ""}`}>
          <span className="popup__avatar-separator">или</span>
          <div className="popup__form-line">
            <input 
              className="popup__input"
              placeholder="Вставьте ссылку на изображение"
              type="url" 
              id="avatarLink"
              name="avatarLink" 
              value={avatarLink}
              onChange={handleChangeEmail}
              required
            >
            </input>
            <span className={`popup__input-error ${errorAvatarLink.error ? "popup__input-error_active" : ""}`}>
              {errorAvatarLink.errorText}
            </span>
          </div>
        </div>
        <div className="popup__submit">
          <button 
            className={`popup__submit-button ${blockSubmitButton ? "popup__submit-button_type_block" : ""}`} 
            type="submit"
          >
            Подтвердить
          </button>
        </div>
      </form>
    </Popup>
  )
}

export default ChangeAvatarPopup;