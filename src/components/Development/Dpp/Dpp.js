import React from 'react';
import './Dpp.css';
import { Route, Switch } from 'react-router-dom';
import Steps from './Steps/Steps.js';
import InitialData from './InitialData/InitialData.js';
import Zoon from './Zoon/Zoon.js';
import EvaluationMaterial from './EvaluationMaterial/EvaluationMaterial.js';
import ProgramStructure from './ProgramStructure/ProgramStructure.js';
import EducationalMaterial from './EducationalMaterial/EducationalMaterial.js';
import Approval from './Approval/Approval.js';

function Dpp({ history, pathname }) {

  return (
    <div className="dpp">
      
      <h2 className="main__title dpp__title">Информационное сопровождение проектов</h2>
      <Steps
        pathname={pathname} 
      />

      <Switch>    
        <Route path="/main/development/dpp/initial-data" exact>
          <InitialData />
        </Route>
      </Switch>

      <Switch>    
        <Route path="/main/development/dpp/zoon" exact>
          <Zoon />
        </Route>
      </Switch>

      <Switch>    
        <Route path="/main/development/dpp/evaluation-material" exact>
          <EvaluationMaterial />
        </Route>
      </Switch>

      <Switch>    
        <Route path="/main/development/dpp/program-structure" exact>
          <ProgramStructure />
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