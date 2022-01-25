import React from 'react';
import Popup from '../../../Popup/Popup.js';
import Select from 'react-select';

function ControlProgramAddParticipantPopup({ isOpen, onClose, users, roles, onAdd, isLoading, isShowError }) { 

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);
  const [name, setName] = React.useState({ value: "", label: "", });
  const [role, setRole] = React.useState({ value: "", label: "", });
  
  function handleChangeName(selectedOption) {
    setName(selectedOption);
  }

  function handleChangeRole(selectedOption) {
    setRole(selectedOption);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newParticipant = {
      userId: name.value,
      userFullname: name.label,
      roleId: role.value,
      roleName: role.label,
    }

    onAdd(newParticipant);
  }


  React.useEffect(() => {
    setIsBlockSubmitButton(true);
    setName({ value: "", label: "", });
    setRole({ value: "", label: "", });
    return () => {
      setName({ value: "", label: "", });
      setRole({ value: "", label: "", });
    }
  }, [isOpen, roles]);

  React.useEffect(() => {
    console.log(name)
    console.log(role)
    
    if (name.label.length < 1 || role.label.length < 1) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [name, role]);

  return(
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="control-program-add-participant-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Добавление нового участника</h3>
        <ul className="initial-popup__list-input">
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Участник</h5>
            <Select 
            className="select" 
            options={users}
            placeholder="Выберите пользователя.."
            onChange={handleChangeName}
            theme={(theme) => ({
              ...theme,
              borderRadius: 5,
              colors: {
                ...theme.colors,
                primary25: '#DDDDDD',
                primary: '#5EB9AF',
              },
            })}
            />
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Роль</h5>
            <Select 
            className="select" 
            options={roles}
            onChange={handleChangeRole}
            placeholder="Выберите пользователя.."
            theme={(theme) => ({
              ...theme,
              borderRadius: 5,
              colors: {
                ...theme.colors,
                primary25: '#DDDDDD',
                primary: '#5EB9AF',
              },
            })}
            />
          </li>
        </ul>
       
        <span className={`popup__submit-error ${isShowError.isShow ? "popup__submit-error_type_show" : "popup__submit-error_type_hide"}`}>{isShowError.isShow ? isShowError.text : ""}</span>
        <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Добавление.." : "Добавить"}</button>

      </form>
    </Popup>
  )
}

export default ControlProgramAddParticipantPopup;