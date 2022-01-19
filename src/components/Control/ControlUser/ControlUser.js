import React from 'react';
import './ControlUser.css';
import * as controlApi from '../../../utils/controlApi/controlApi.js';
import Preloader from '../../Preloader/Preloader.js';
import ControlUserItem from '../ControlUserItem/ControlUserItem.js';
import ControlUserAddPopup from '../ControlUserAddPopup/ControlUserAddPopup.js';
import ControlUserEditPopup from '../ControlUserEditPopup/ControlUserEditPopup.js';
import ControlUserRemovePopup from '../ControlUserRemovePopup/ControlUserRemovePopup.js';

function ControlUser({ loggedIn }) {

  const [isRendering, setIsRendering] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  const [filteredUsers, setFilteredUsers] = React.useState([]);
  const [searchUserName, setSearchUserName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAddUserPopupOpen, setIsAddUserPopupOpen] = React.useState(false);
  const [isEditUserPopupOpen, setIsEditUserPopupOpen] = React.useState(false);
  const [isRemoveUserPopupOpen, setIsRemoveUserPopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isActiveUser, setIsActiveUser] = React.useState(false);
  const [isShowError, setIsShowError] = React.useState({ isShow: false, text: "" }); 
  
  function openAddUserPopup() {
    setIsAddUserPopupOpen(true);
  }

  function handleAddUser(user) {
    setIsShowError({ isShow: false, text: "" });
    setIsLoading(true);
    const token = localStorage.getItem("token");
    controlApi.addControlUser({ token: token, user: user })
    .then((res) => {
      setUsers([...users, res.data]);
      closeControlUsersPopups();
    })
    .catch((err) => {
      if (err.status === 409) {
        setIsShowError({ isShow: true, text: "Указанная почта уже зарегистрирована для другого пользователя" });
      }
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function openEditUserPopup(user) {
    setCurrentUser(user);
    setIsEditUserPopupOpen(true);
  }

  function handleEditUser(user) {
    console.log(user);
    setIsLoading(true);
    const token = localStorage.getItem("token");
    controlApi.editControlUser({ token: token, user: user })
    .then((res) => {
      const userIndex = users.indexOf(users.find((elem) => (elem.id === res.data.id)));
      setUsers([...users.slice(0, userIndex), res.data, ...users.slice(userIndex + 1)]);
      closeControlUsersPopups();
    })
    .catch((err) => {
      if (err.status === 409) {
        setIsShowError({ isShow: true, text: "Указанная почта уже зарегистрирована для другого пользователя" });
      }
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function openRemoveUserPopup(user) {
    setCurrentUser(user);
    setIsRemoveUserPopupOpen(true);
  }

  function handleRemoveUser(user) {
    console.log(user);
    setIsLoading(true);
    const token = localStorage.getItem("token");
    controlApi.deleteControlUser({ token: token, user: user })
    .then((res) => {
      const newUsers = users.filter((elem) => elem.id !== res);
      setUsers(newUsers);
      closeControlUsersPopups();
    })
    .catch((err) => {
      if (err.status === 409) {
        setIsShowError({ isShow: true, text: "Невозможно удалить данного пользователя" });
      }
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleResetUserPassword(user, onClose) {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    controlApi.resetPasswordControlUser({ token: token, user: user })
    .then(() => {
      setIsShowError({ isShow: true, text: "Пароль успешно сброшен, уведомление направлено пользователю на почту" });
      onClose();
    })
    .catch((err) => {
      if (err.status === 409) {
        setIsShowError({ isShow: true, text: "К сожалению, произошла ошибка!" });
      }
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function closeControlUsersPopups() {
    setIsShowError({ isShow: false, text: "" });
    setIsAddUserPopupOpen(false);
    setIsEditUserPopupOpen(false);
    setIsRemoveUserPopupOpen(false);
  }

  function handleSearchUserByName(e) {
    setSearchUserName(e.target.value);
  }

  React.useEffect(() => {
    const changeUsers = users.filter((item) => {
      if (isActiveUser) {
        return item.fullname.toLowerCase().includes(searchUserName.toLowerCase());
      } else {
        // eslint-disable-next-line
        return item.fullname.toLowerCase().includes(searchUserName.toLowerCase()) && item.isActive == true;
      }
    })
    setFilteredUsers(changeUsers);
  }, [users, searchUserName, isActiveUser]);

  React.useEffect(() => {
    if (loggedIn) {
        const token = localStorage.getItem("token");
        controlApi.getControlUsers({ token: token })
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setIsRendering(false));
    }
    return () => {
      setUsers([]);
      setCurrentUser({});
      setFilteredUsers([]);
      setSearchUserName("");
    }
  }, [loggedIn]);

  return (
    isRendering 
    ?
    <Preloader />
    :
    <>
      <div className="control">
        <h3 className="main__title control-user__title">Пользователей в системе: {users.length}</h3>
        <button className="btn btn_type_add control-user__btn-add" type="button" onClick={openAddUserPopup}>Добавить пользователя</button>
        <p className="main__subtitle control-user__subtitle">Ниже представлен список всех зарегистрированных в системе пользователей</p>

        <div className="">
        <label className="checkbox">
          <input 
            name="define-user-active"
            type="checkbox"
            id="define-user-active"
            value={isActiveUser}
            defaultChecked={isActiveUser}
            onChange={() => setIsActiveUser(!isActiveUser)}
            >
          </input>
            <span>Неактивные пользователи</span>
        </label>
          <div className="search">
            <input
            className="input-search"
            placeholder="поиск по имени"
            type="text"
            id="search-user-input-name"
            name="search-user-input-name"
            autoComplete="off"
            onChange={handleSearchUserByName}
            value={searchUserName}
            >
            </input>
          </div>
        </div>

        <ul className="task__list">
          {
            filteredUsers.map((elem, i) => (
              <ControlUserItem 
              key={elem.id}
              user={elem}
              index={i}
              onEdit={openEditUserPopup}
              onRemove={openRemoveUserPopup}
              />
            ))
          }
        </ul>

      </div>

      {
        isAddUserPopupOpen &&
        <ControlUserAddPopup
          isOpen={isAddUserPopupOpen}
          onClose={closeControlUsersPopups}
          onAdd={handleAddUser}
          isLoading={isLoading}
          isShowError={isShowError}
        />
      }

      {
        isEditUserPopupOpen && 
        <ControlUserEditPopup
          isOpen={isEditUserPopupOpen}
          onClose={closeControlUsersPopups}
          user={currentUser}
          onEdit={handleEditUser}
          onReset={handleResetUserPassword}
          isLoading={isLoading}
          isShowError={isShowError}
        />
      }

      {
        isRemoveUserPopupOpen &&
        <ControlUserRemovePopup
          isOpen={isRemoveUserPopupOpen}
          onClose={closeControlUsersPopups}
          user={currentUser}
          onRemove={handleRemoveUser}
          isLoading={isLoading}
          isShowError={isShowError}
        />
      }     
      </>
  );
}

export default ControlUser;