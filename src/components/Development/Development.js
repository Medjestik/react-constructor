import React from 'react';
import './Development.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import * as api from '../../utils/api.js';
import Program from './Dpp/Program/Program.js';
import Preloader from '../Preloader/Preloader.js';

function Development({ history, windowWidth }) {

  const user = React.useContext(CurrentUserContext);

  const [isLoadingProgram, setIsLoadingProgram] = React.useState(false);
  const [assignedPrograms, setAssignedPrograms] = React.useState([]);
  const [filteredPrograms, setFilteredPrograms] = React.useState([]);
  const [searchProgramName, setSearchProgramName] = React.useState("");

  function getDpps () {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoadingProgram(true);
      api.getPrograms({ token: token })
        .then((res) => {
          res.forEach((program) => {
            program.participants.find((performer) => {
              if (user.id === performer.user_id) {
                program.user_role = performer.rolename;
              }
              return false;
            })
          })
          setAssignedPrograms(res);
          setFilteredPrograms(res);
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
      <ul className="development__list">
        {
          isLoadingProgram 
          ?
            <Preloader />
          :
          filteredPrograms.map((program, i) => (
            <Program
              program={program}
              history={history}
              key={i}
              windowWidth={windowWidth}
            />
          ))
        } 
      </ul>
    </div>
  );
}

export default Development;