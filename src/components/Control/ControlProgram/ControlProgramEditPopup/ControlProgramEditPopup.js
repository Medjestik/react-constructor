import React from 'react';
import Popup from '../../../Popup/Popup.js';
import ControlProgramAddParticipantPopup from '../ControlProgramAddParticipantPopup/ControlProgramAddParticipantPopup.js';
import ControlProgramRemoveParticipantPopup from '../ControlProgramRemoveParticipantPopup/ControlProgramRemoveParticipantPopup.js';

function ControlProgramEditPopup({ isOpen, onClose, users, roles, program, onEdit, isLoading, isShowError }) { 

  const [name, setName] = React.useState("");
  const [errorName, setErrorName] = React.useState(false);
  const [hours, setHours] = React.useState("");
  const [errorHours, setErrorHours] = React.useState(false);
  const [isAddProgramParticipantPopupOpen, setIsAddProgramParticipantPopupOpen] = React.useState(false);
  const [isRemoveProgramParticipantPopupOpen, setIsRemoveProgramParticipantPopupOpen] = React.useState(false);
  const [participants, setParticipants] = React.useState([]);
  const [isArchieved, setIsArchieved] = React.useState(program.isArchieved);
  const [currentUser, setCurrentUser] = React.useState({});  
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    const newProgram = {
      ...program,
      name: name,
      totalHours: hours,
      participants: participants,
      isArchieved: isArchieved,
    }

    onEdit(newProgram);
  }

  function openAddProgramParticipantPopup() {
    setIsAddProgramParticipantPopupOpen(true);
  }

  function handleAddParticipant(user) {
    setParticipants([...participants, user]);
    closeProgramParticipantPopup();
  }

  function openRemoveProgramParticipantPopup(user) {
    setIsRemoveProgramParticipantPopupOpen(true);
    setCurrentUser(user);
  }

  function handleRemoveParticipant(user) {
    const newParticipants = participants.filter((elem) => elem.userId !== user.userId);
    setParticipants(newParticipants);
    closeProgramParticipantPopup();
  }

  function closeProgramParticipantPopup() {
    setIsAddProgramParticipantPopupOpen(false);
    setIsRemoveProgramParticipantPopupOpen(false);
    setCurrentUser({});
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



  React.useEffect(() => {
    setName(program.name);
    setErrorName(false);
    setHours(program.totalHours);
    setErrorHours(false);
    setIsBlockSubmitButton(true);
    setParticipants(program.participants);
    return () => {
      setName("");
      setHours("");
      setParticipants([]);
      setCurrentUser({});
    }
  }, [isOpen, program]);

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
        <h3 className="initial-popup__title">???????????????????????????? ??????????????????</h3>
        <ul className="initial-popup__list-input">
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">????????????????*</h5>
            <input 
            className="initial-popup__input"
            placeholder="?????????????? ???????????????? ??????????????????"
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
            <span className={`initial-popup__input-error ${errorName ? "initial-popup__input-error_type_show" : ""}`}>???????????????? ???????????? ???????? ???? ???????????? 2 ????????????????</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">???????????????????? ??????????*</h5>
            <input 
            className="initial-popup__input"
            placeholder="?????????????? ???????????????????? ??????????"
            type="number"
            id="add-new-program-hours"
            name="add-new-program-hours"
            autoComplete="off"
            value={hours}
            onChange={handleAddHours}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${errorHours ? "initial-popup__input-error_type_show" : ""}`}>???????? ???? ?????????? ???????? ????????????</span>
          </li> 
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">???????????? ????????????????????</h5>
            {
              participants.length < 1 
              ?
              <span className="control-program__participant-caption">?????????????????? ???????? ???? ??????????????????!</span>
              :
              <ul className="control-program__participant-list">
                {
                  participants.map((elem, index) => (
                    <li key={elem.userId} className="control-program__item" >
                      <span className="control-program__item-count">{`${index+ 1}.`}</span>
                      <h4 className="control-program__participant-name">{elem.userFullname} ({elem.roleName})</h4>
                      <button className="control-program__participant-bth-delete" type="button" onClick={() => openRemoveProgramParticipantPopup(elem)}></button>
                    </li>
                  ))
                }
              </ul>
            }
          </li>
          <li>
            <label className="checkbox">
            <input 
              name="edit-program-active"
              type="checkbox"
              id={program.id}
              value={isArchieved}
              defaultChecked={program.isArchieved}
              onChange={() => setIsArchieved(!isArchieved)}
              >
            </input>
              <span>?????????????????? ?? ????????????</span>
            </label>
          </li>
        </ul>

        <span className={`popup__submit-error ${isShowError.isShow ? "popup__submit-error_type_show" : "popup__submit-error_type_hide"}`}>{isShowError.isShow ? isShowError.text : ""}</span>
        <div className="control-program__popup-buttons">
          <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "????????????????????.." : "??????????????????"}</button>
          <button className="btn btn_type_add control-program__participant-btn-add" type="button" onClick={openAddProgramParticipantPopup}>???????????????? ??????????????????</button>
        </div>

      </form>
    </Popup>

    {
      isAddProgramParticipantPopupOpen &&
      <ControlProgramAddParticipantPopup
        isOpen={isAddProgramParticipantPopupOpen}
        onClose={closeProgramParticipantPopup}
        users={users}
        roles={roles}
        onAdd={handleAddParticipant}
        isLoading={isLoading}
        isShowError={isShowError}
      />
    }

    {
      isRemoveProgramParticipantPopupOpen &&
      <ControlProgramRemoveParticipantPopup
        isOpen={isRemoveProgramParticipantPopupOpen}
        onClose={closeProgramParticipantPopup}
        user={currentUser}
        onRemove={handleRemoveParticipant}
        isLoading={isLoading}
        isShowError={isShowError}
      />
    }
    </>
  )
}

export default ControlProgramEditPopup;