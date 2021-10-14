import React from 'react';
import './EvaluationMaterial.css';
import KnowledgeMaterial from '../KnowledgeMaterial/KnowledgeMaterial.js';
import Tasks from '../Tasks/Tasks.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function EvaluationMaterial({ dppDescription, loggedIn, isEditRights }) {

  return (
    <div className="evaluation-material">
      <h1 className="main__title">Проектирование оценочных материалов</h1>
      <Tabs className="tabs">

        <TabList className="tab-list">
          <Tab className="tab">Набор тестов</Tab>
          <Tab className="tab">Практические задания</Tab>
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

      </Tabs>

    </div>
  );
}

export default EvaluationMaterial;