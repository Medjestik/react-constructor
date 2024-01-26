import React from 'react';
import Popup from '../../../Popup/Popup.js';
import ControlProgramAddParticipantPopup from '../ControlProgramAddParticipantPopup/ControlProgramAddParticipantPopup.js';
import Select from 'react-select';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext.js';

function ControlProgramAddPopup({ isOpen, onClose, users, roles, onAdd, isLoading, isShowError }) { 
  
  const user = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [errorName, setErrorName] = React.useState(false);
  const [hours, setHours] = React.useState("");
  const [errorHours, setErrorHours] = React.useState(false);
  const [isAddProgramParticipantPopupOpen, setIsAddProgramParticipantPopupOpen] = React.useState(false);
  const [participants, setParticipants] = React.useState([{ userId: user.id, userFullname: user.fullname, roleId: roles[0].value, roleName: roles[0].label, }]);
  const [type, setType] = React.useState({ label: '', value: 0 });
  const [isDigital, setIsDigital] = React.useState(false);

  const types = [ { label: 'Повышение квалификации', value: 1 }, { label: 'Профессиональная переподготовка', value: 2 } ];

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    const newProgram = {
      name: name,
      totalHours: hours,
      participants: participants,
      type: type.value,
      isDigital: isDigital,
    }

    onAdd(newProgram, onClose);
  }

  function handleChangeType(selectedOption) {
    setType(selectedOption);
    setIsDigital(false);
  }

  function openAddProgramParticipantPopup() {
    setIsAddProgramParticipantPopupOpen(true);
  }

  function closeAddProgramParticipantPopup() {
    setIsAddProgramParticipantPopupOpen(false);
  }

  function handleAddName(e) {
    setName(e.target.value);
    if (e.target.checkValidity()) {
      setErrorName(false);
    } else {
      setErrorName(true);
    }
  }

  function handleAddHours(e) {
    setHours(e.target.value);
    if (e.target.checkValidity()) {
      setErrorHours(false);
    } else {
      setErrorHours(true);
    }
  }

  function handleAddParticipant(user) {
    setParticipants([...participants, user]);
    closeAddProgramParticipantPopup();
  }


  React.useEffect(() => {
    setName('');
    setErrorName(false);
    setHours('');
    setErrorHours(false);
    setType({ label: '', value: 0 });
    setIsBlockSubmitButton(true);
    return () => {
      setParticipants([]);
      setType({});
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (
      errorName || 
      name.length < 2 ||
      errorHours || 
      hours.length < 1 
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [name, hours])

  return (
    <>
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="control-program-add-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Создание новой программы</h3>
        <ul className="initial-popup__list-input">
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Название*</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите название программы"
            type="text"
            id="add-new-program-name"
            name="add-new-program-name"
            autoComplete="off"
            minLength="2"
            value={name}
            onChange={handleAddName}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${errorName ? "initial-popup__input-error_type_show" : ""}`}>Название должно быть не короче 2 символов</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Тип*</h5>
          <Select 
            className="select" 
            options={types}
            placeholder="Выберите тип.."
            onChange={handleChangeType}
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
          {
            type.value === 2 &&
            <li className="">
              <label className="checkbox">
              <input 
                name="prof-levels"
                type="checkbox"
                id='add-program-is-digital'
                value={isDigital}
                defaultChecked={isDigital}
                onChange={() => setIsDigital(!isDigital)}
                >
              </input>
                <span>Разрабатывается в рамках проекта «Цифровые кафедры»</span>
              </label>
            </li>
          }

          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Количество часов*</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите количество часов"
            type="number"
            id="add-new-program-hours"
            name="add-new-program-hours"
            autoComplete="off"
            value={hours}
            onChange={handleAddHours}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${errorHours ? "initial-popup__input-error_type_show" : ""}`}>Поле не может быть пустым</span>
          </li> 
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Список участников</h5>
            {
              participants.length < 1 
              ?
              <span className="control-program__participant-caption">Участинки пока не добавлены!</span>
              :
              <ul className="control-program__participant-list">
                {
                  participants.map((elem, index) => (
                    <li key={elem.userId} className="control-program__item" >
                      <span className="control-program__item-count">{`${index+ 1}.`}</span>
                      <div className="control-program__item-info">
                        <h4 className="control-program__item-name">{elem.userFullname} ({elem.roleName})</h4>
                      </div>
                    </li>
                  ))
                }
              </ul>
            }
            
          </li>
        </ul>

        <span className={`popup__submit-error ${isShowError.isShow ? "popup__submit-error_type_show" : "popup__submit-error_type_hide"}`}>{isShowError.isShow ? isShowError.text : ""}</span>
        <div className="control-program__popup-buttons">
          <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Сохранение.." : "Сохранить"}</button>
          <button className="btn btn_type_add control-program__participant-btn-add" type="button" onClick={openAddProgramParticipantPopup}>Добавить участника</button>
        </div>

      </form>
    </Popup>

    {
      isAddProgramParticipantPopupOpen &&
      <ControlProgramAddParticipantPopup
        isOpen={isAddProgramParticipantPopupOpen}
        onClose={closeAddProgramParticipantPopup}
        users={users}
        roles={roles}
        onAdd={handleAddParticipant}
        isLoading={isLoading}
        isShowError={isShowError}
      />
    }
    </>
  )
}

export default ControlProgramAddPopup;