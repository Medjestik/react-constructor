import React from 'react';
import './Development.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import * as api from '../../utils/api.js';
import Program from './Dpp/Program/Program.js';
import Preloader from '../Preloader/Preloader.js';

function Development({ history }) {

  const user = React.useContext(CurrentUserContext);

  const [isLoadingProgram, setIsLoadingProgram] = React.useState(false);
  const [assignedPrograms, setAssignedPrograms] = React.useState([]);

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

  return (
    <div className="development">
      <h1 className="main__title">Разработка ДПП</h1>
      <p className="main__subtitle">Ниже отображаются все ДПП, где Вы назначены как исполнитель</p>
      <ul className="development__list">
        {
          isLoadingProgram 
          ?
            <Preloader />
          :
          assignedPrograms.map((program, i) => (
            <Program
              program={program}
              history={history}
              key={i}
            />
          ))
        } 
      </ul>
    </div>
  );
}

export default Development;