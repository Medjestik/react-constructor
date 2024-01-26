import React from 'react';
import './Development.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import * as api from '../../utils/api.js';
import * as controlApi from '../../utils/controlApi/controlApi.js';
import Program from './Dpp/Program/Program.js';
import Preloader from '../Preloader/Preloader.js';
import ControlProgramAddPopup from '../Control/ControlProgram/ControlProgramAddPopup/ControlProgramAddPopup.js';
import ControlProgramEditPopup from '../Control/ControlProgram/ControlProgramEditPopup/ControlProgramEditPopup.js';

function Development({ history, windowWidth }) {

  const user = React.useContext(CurrentUserContext);

  const [assignedPrograms, setAssignedPrograms] = React.useState([]);
  const [filteredPrograms, setFilteredPrograms] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [roles, setRoles] = React.useState([]);

  const [currentProgram, setCurrentProgram] = React.useState({});

  const [isAddProgramPopupOpen, setIsAddProgramPopupOpen] = React.useState(false);
  const [isEditProgramPopupOpen, setIsEditProgramPopupOpen] = React.useState(false);

  const [searchProgramName, setSearchProgramName] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);
  const [isShowError, setIsShowError] = React.useState({ isShow: false, text: "" });
  const [isLoadingProgram, setIsLoadingProgram] = React.useState(false);

  function openAddProgramPopup() {
    setIsAddProgramPopupOpen(true);
  }

  function openEditProgramPopup(program) {
    setCurrentProgram(program);
    setIsEditProgramPopupOpen(true);
  }

  function closePopups() {
    setIsShowError({ isShow: false, text: "" });
    setIsAddProgramPopupOpen(false);
    setIsEditProgramPopupOpen(false);
  }

  function handleAddProgram(program) {
    setIsShowError({ isShow: false, text: "" });
    setIsLoading(true);
    
    const token = localStorage.getItem("token");
    controlApi.addControlProgram({ token: token, dpp: program })
    .then((res) => {
      setAssignedPrograms([...assignedPrograms, res.data]);
      setFilteredPrograms([...assignedPrograms, res.data]);
      setSearchProgramName('');
      closePopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleEditProgram(program) {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    controlApi.editControlProgram({ token: token, dpp: program })
    .then((res) => {
      const programIndex = assignedPrograms.indexOf(assignedPrograms.find((elem) => (elem.id === res.data.id)));
      setAssignedPrograms([...assignedPrograms.slice(0, programIndex), res.data, ...assignedPrograms.slice(programIndex + 1)]);
      setFilteredPrograms([...assignedPrograms.slice(0, programIndex), res.data, ...assignedPrograms.slice(programIndex + 1)]);
      setSearchProgramName('');
      closePopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function getDpps () {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoadingProgram(true);
      Promise.all([
        api.getPrograms({ token: token }), 
        controlApi.getControlUsers({ token: token }),
        controlApi.getControlRoles({ token: token }),
      ])
      .then(([ programs, usersList, rolesList ]) => {
        programs.data.forEach((program) => {
          program.participants.find((performer) => {
            if (user.id === performer.user_id) {
              program.user_role = performer.rolename;
            }
            return false;
          })
        })
        setAssignedPrograms(programs.data);
        setFilteredPrograms(programs.data);
        const activeUsers = usersList.data.filter((elem) => elem.isActive == 1);
        const chooseUsers = activeUsers.map((elem) => {
          return { value: elem.id, label: elem.fullname }
        });
        const chooseRoles = rolesList.data.map((elem) => {
          return { value: elem.id, label: elem.name }
        });
        setUsers(chooseUsers);
        setRoles(chooseRoles);
      })
      .catch((err) => {
          console.error(err);
      })
      .finally(() => {
        setIsLoadingProgram(false);
      });
    }
  }

  React.useEffect(() => {
    getDpps();
    return () => {
      setAssignedPrograms([]);
    };
    // eslint-disable-next-line
  }, []);

  function handleSearchProgramByName(e) {
    setSearchProgramName(e.target.value);
  }

  React.useEffect(() => {
    const changePrograms = assignedPrograms.filter((item) => {
      return item.name.toLowerCase().includes(searchProgramName.toLowerCase());
    })
    setFilteredPrograms(changePrograms);
  }, [assignedPrograms, searchProgramName]);

  return (
    <div className="development">
      <h1 className="main__title">Разработка ДПП</h1>
      <p className="main__subtitle">Ниже отображаются все ДПП, где Вы назначены как исполнитель</p>
      <>
      {
        isLoadingProgram 
        ?
          <Preloader />
        :
        <>
        <div className="search">
          <input
          className="input-search"
          placeholder="поиск по названию программы"
          type="text"
          id="search-assigned-program-input-name"
          name="search-assigned-program-input-name"
          autoComplete="off"
          onChange={handleSearchProgramByName}
          value={searchProgramName}
          >
          </input>
        </div>
        <button className="btn btn_type_add control-user__btn-add" type="button" onClick={openAddProgramPopup}>Создать программу</button>
        <ul className="development__list">
          {
            filteredPrograms.map((program, i) => (
              <Program
                user={user}
                program={program}
                history={history}
                key={i}
                windowWidth={windowWidth}
                onEdit={openEditProgramPopup}
              />
            ))
          } 
        </ul>
        </>
      }
      </>
      {
        isAddProgramPopupOpen &&
        <ControlProgramAddPopup
          isOpen={isAddProgramPopupOpen}
          onClose={closePopups}
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
          onClose={closePopups}
          users={users}
          roles={roles}
          program={currentProgram}
          onEdit={handleEditProgram}
          isLoading={isLoading}
          isShowError={isShowError}
        />
      }
    </div>
  );
}

export default Development;