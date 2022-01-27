import React from 'react';
import './Zoon.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ZoonGraph from './ZoonGraph/ZoonGraph.js';
import ZoonList from './ZoonList/ZoonList.js';
import ZoonTypology from './ZoonTypology/ZoonTypology.js';

function Zoon({ dppDescription, loggedIn, isEditRights }) {

  return (
    <div className="zoon">
      <h1 className="main__title">Проектирование ПК и ЗУН</h1>
      <Tabs className="tabs">
        <TabList className="tab-list">
          <Tab className="tab">В виде графа</Tab>
          <Tab className="tab">В виде списка</Tab>
          <Tab className="tab">Типология ДПП</Tab>
        </TabList>
        <TabPanel>
          <ZoonGraph dppDescription={dppDescription} loggedIn={loggedIn} isEditRights={isEditRights} /> 
        </TabPanel>
        <TabPanel>
          <ZoonList dppDescription={dppDescription} loggedIn={loggedIn} isEditRights={isEditRights} />
        </TabPanel>
        <TabPanel>
          <ZoonTypology dppDescription={dppDescription} loggedIn={loggedIn} isEditRights={isEditRights} />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Zoon;