import React from 'react';
import './EvaluationMaterial.css';
import KnowledgeMaterial from '../KnowledgeMaterial/KnowledgeMaterial.js';
import Tasks from '../Tasks/Tasks.js';
import MaterialParameters from '../MaterialParameters/MaterialParameters.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function EvaluationMaterial({ dppDescription, loggedIn, isEditRights }) {

  const [testPercent, setTestPercent] = React.useState(0);

  console.log(dppDescription);

  function handleChangeTestPercent(e) {
    setTestPercent(e.target.value);
  }

  React.useEffect(() => {
    setTestPercent(0);
  }, []);

  return (
    <div className="evaluation-material">
      <h1 className="main__title">Проектирование оценочных материалов</h1>
      <Tabs className="tabs">

        <TabList className="tab-list">
          <Tab className="tab">Набор тестов</Tab>
          <Tab className="tab">Практические задания</Tab>
          <Tab className="tab">Параметры ОМ</Tab>
        </TabList>

        <TabPanel>
        <KnowledgeMaterial
          dppDescription={dppDescription}
          loggedIn={loggedIn}
          isEditRights={isEditRights}
        />
        </TabPanel>
        
        <TabPanel>
          <Tasks 
          loggedIn={loggedIn} 
          dppDescription={dppDescription}
          isEditRights={isEditRights} 
          />
        </TabPanel>

        <TabPanel>
          <MaterialParameters
          loggedIn={loggedIn} 
          dppDescription={dppDescription}
          isEditRights={isEditRights} 
          />
        </TabPanel>

      </Tabs>

    </div>
  );
}

export default EvaluationMaterial;