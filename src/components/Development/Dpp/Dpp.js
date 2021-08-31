import React from 'react';
import './Dpp.css';
import * as api from '../../../utils/api.js';
import { Route, Switch } from 'react-router-dom';
import Steps from './Steps/Steps.js';
import InitialData from './InitialData/InitialData.js';
import Zoon from './Zoon/Zoon.js';
import EvaluationMaterial from './EvaluationMaterial/EvaluationMaterial.js';
import ProgramStructure from './ProgramStructure/ProgramStructure.js';
import EducationalMaterial from './EducationalMaterial/EducationalMaterial.js';
import Approval from './Approval/Approval.js';
import Preloader from '../../Preloader/Preloader.js';

function Dpp({ loggedIn, history, pathname, }) {

  const [dppDescription, setDppDescription] = React.useState({});
  const [isLoadingProgram, setIsLoadingProgram] = React.useState({});
  const [isEditRights, setIsEditRights] = React.useState(true);

  function getDppDescription() {
    const token = localStorage.getItem("token");
    const currentProgramId = localStorage.getItem("currentProgramId");
    if (token || currentProgramId) {
      setIsLoadingProgram(true);
      api.getProgramDescription({ token: token, id: currentProgramId })
        .then((res) => {
          console.log(res);
          setDppDescription(res);
          if (res.userRole === 5) {
            setIsEditRights(false);
          }
        })
        .catch((err) => {
            console.error(err);
            history.push('/main/development');
        })
        .finally(() => {
          setIsLoadingProgram(false);
        });
    }
  }

  React.useEffect(() => {
    getDppDescription();
    return () => {
      setDppDescription([]);
    };
    // eslint-disable-next-line
  },[])

  return (

      isLoadingProgram 
      ?
      <Preloader />
      :
      <div className="dpp">
      
        <h2 className="main__title dpp__title">{dppDescription.name}</h2>
        <Steps
          pathname={pathname} 
        />

        <Switch>    
          <Route path="/main/development/dpp/initial-data" exact>
            <InitialData
              loggedIn={loggedIn}
              history={history}
              dppDescription={dppDescription}
              isEditRights={isEditRights}
            />
          </Route>
        </Switch>

        <Switch>    
          <Route path="/main/development/dpp/zoon" exact>
            <Zoon 
            dppDescription={dppDescription}
            loggedIn={loggedIn}
            isEditRights={isEditRights}
            />
          </Route>
        </Switch>

        <Switch>    
          <Route path="/main/development/dpp/evaluation-material" exact>
            <EvaluationMaterial
            dppDescription={dppDescription}
            loggedIn={loggedIn}
            isEditRights={isEditRights}
            />
          </Route>
        </Switch>

        <Switch>    
          <Route path="/main/development/dpp/program-structure" exact>
            <ProgramStructure
            dppDescription={dppDescription}
            loggedIn={loggedIn}
            isEditRights={isEditRights}
            />
          </Route>
        </Switch>

        <Switch>    
          <Route path="/main/development/dpp/educational-material" exact>
            <EducationalMaterial />
          </Route>
        </Switch>

        <Switch>    
          <Route path="/main/development/dpp/approval" exact>
            <Approval />
          </Route>
        </Switch>

      </div>
  );
}

export default Dpp;