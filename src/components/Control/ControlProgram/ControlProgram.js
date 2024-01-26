import React from 'react';
import './ControlProgram.css';
import * as controlApi from '../../../utils/controlApi/controlApi.js';
import Preloader from '../../Preloader/Preloader.js';
import ControlProgramItem from './ControlProgramItem/ControlProgramItem.js';
import ControlProgramAddPopup from './ControlProgramAddPopup/ControlProgramAddPopup.js';
import ControlProgramEditPopup from './ControlProgramEditPopup/ControlProgramEditPopup.js';
import ControlProgramRemovePopup from './ControlProgramRemovePopup/ControlProgramRemovePopup.js';

function ControlProgram({ loggedIn }) {

  const [isRendering, setIsRendering] = React.useState(true);
  const [programs, setPrograms] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [roles, setRoles] = React.useState([]);
  const [filteredPrograms, setFilteredPrograms] = React.useState([]);
  const [searchProgramName, setSearchProgramName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAddProgramPopupOpen, setIsAddProgramPopupOpen] = React.useState(false);
  const [isEditProgramPopupOpen, setIsEditProgramPopupOpen] = React.useState(false);
  const [isRemoveProgramPopupOpen, setIsRemoveProgramPopupOpen] = React.useState(false);
  const [currentProgram, setCurrentProgram] = React.useState({});
  const [isActiveProgram, setIsActiveProgram] = React.useState(false);
  const [isShowError, setIsShowError] = React.useState({ isShow: false, text: "" });
  
  function openAddProgramPopup() {
    setIsAddProgramPopupOpen(true);
  }

  function handleAddProgram(program) {
    setIsShowError({ isShow: false, text: "" });
    setIsLoading(true);
    
    const token = localStorage.getItem("token");
    controlApi.addControlProgram({ token: token, dpp: program })
    .then((res) => {
      setPrograms([...programs, res.data]);
      closeControlProgramsPopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function openEditProgramPopup(program) {
    setCurrentProgram(program);
    setIsEditProgramPopupOpen(true);
  }

  function handleEditProgram(program) {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    controlApi.editControlProgram({ token: token, dpp: program })
    .then((res) => {
      const programIndex = programs.indexOf(programs.find((elem) => (elem.id === res.data.id)));
      setPrograms([...programs.slice(0, programIndex), res.data, ...programs.slice(programIndex + 1)]);
      closeControlProgramsPopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function openRemoveProgramPopup(program) {
    setCurrentProgram(program);
    setIsRemoveProgramPopupOpen(true);
  }

  function handleRemoveProgram(program) {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    controlApi.deleteControlProgram({ token: token, dpp: program })
    .then((res) => {
      const newPrograms = programs.filter((elem) => elem.id !== res);
      setPrograms(newPrograms);
      closeControlProgramsPopups();
    })
    .catch((err) => {
      if (err.status === 409) {
        setIsShowError({ isShow: true, text: "Невозможно удалить данную программу" });
      }
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }
  

  function closeControlProgramsPopups() {
    setIsShowError({ isShow: false, text: "" });
    setIsAddProgramPopupOpen(false);
    setIsEditProgramPopupOpen(false);
    setIsRemoveProgramPopupOpen(false);
  }

  function handleSearchProgramByName(e) {
    setSearchProgramName(e.target.value);
  }

  React.useEffect(() => {
    const changePrograms = programs.filter((item) => {
      if (isActiveProgram) {
        return item.name.toLowerCase().includes(searchProgramName.toLowerCase());
      } else {
        // eslint-disable-next-line
        return item.name.toLowerCase().includes(searchProgramName.toLowerCase()) && item.isArchieved != true;
      }
    })
    setFilteredPrograms(changePrograms);
  }, [programs, searchProgramName, isActiveProgram]);

  React.useEffect(() => {
    if (loggedIn) {
        const token = localStorage.getItem("token");
        Promise.all([
          controlApi.getControlPrograms({ token: token }), 
          controlApi.getControlUsers({ token: token }),
          controlApi.getControlRoles({ token: token }),
        ])
        .then(([ programs, users, roles ]) => {
          setPrograms(programs.data);
          const activeUsers = users.data.filter((elem) => elem.isActive == 1);
          const chooseUsers = activeUsers.map((elem) => {
            return { value: elem.id, label: elem.fullname }
          })
          const chooseRoles = roles.data.map((elem) => {
            return { value: elem.id, label: elem.name }
          })
          setUsers(chooseUsers);
          setRoles(chooseRoles);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setIsRendering(false));
    }
    return () => {
      setPrograms([]);
      setCurrentProgram({});
      setFilteredPrograms([]);
      setSearchProgramName("");
      setRoles([]);
    }
  }, [loggedIn]);

  return (
    isRendering 
    ?
    <Preloader /> 
    :
    <>
      <div className="control">
       <h3 className="main__title control-user__title">Количество созданных программ: {programs.length}</h3>
      <button className="btn btn_type_add control-user__btn-add" type="button" onClick={openAddProgramPopup}>Создать программу</button>
      <p className="main__subtitle control-user__subtitle">Ниже представлен список всех созданных программ</p>

        <div className="">
          <label className="checkbox">
            <input 
              name="define-user-active"
              type="checkbox"
              id="define-user-active"
              value={isActiveProgram}
              defaultChecked={isActiveProgram}
              onChange={() => setIsActiveProgram(!isActiveProgram)}
              >
            </input>
              <span>Неактивные программы</span>
          </label>
          <div className="search">
            <input
            className="input-search"
            placeholder="поиск по названию"
            type="text"
            id="search-program-input-name"
            name="search-program-input-name"
            autoComplete="off"
            onChange={handleSearchProgramByName}
            value={searchProgramName}
            >
            </input>
          </div>
        </div>

        <ul className="task__list">
          {
            filteredPrograms.map((elem, i) => (
              <ControlProgramItem 
              key={elem.id}
              program={elem}
              index={i}
              onEdit={openEditProgramPopup}
              onRemove={openRemoveProgramPopup}
              />
            ))
          }
        </ul>

      </div>

      {
        isAddProgramPopupOpen &&
        <ControlProgramAddPopup
          isOpen={isAddProgramPopupOpen}
          onClose={closeControlProgramsPopups}
          users={users}
          roles={roles}
          onAdd={handleAddProgram}
          isLoading={isLoading}
          isShowError={isShowError}
        />
      }

      {
        isEditProgramPopupOpen &&
        <ControlProgramEditPopup
          isOpen={isEditProgramPopupOpen}
          onClose={closeControlProgramsPopups}
          users={users}
          roles={roles}
          program={currentProgram}
          onEdit={handleEditProgram}
          isLoading={isLoading}
          isShowError={isShowError}
        />
      }

      {
        isRemoveProgramPopupOpen && 
        <ControlProgramRemovePopup
          isOpen={isRemoveProgramPopupOpen}
          onClose={closeControlProgramsPopups}
          program={currentProgram}
          onRemove={handleRemoveProgram}
          isLoading={isLoading}
          isShowError={isShowError}
        />
      }     
      </>
  );
}

export default ControlProgram;