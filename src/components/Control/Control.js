import React from 'react';
import './Control.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ControlFeedback from './ControlFeedback/ControlFeedback.js';
import ControlUser from './ControlUser/ControlUser.js';
import ControlProgram from './ControlProgram/ControlProgram.js';
import ControlStructure from './ControlStructure/ControlStructure.js';
import ControlNotice from './ControlNotice/ControlNotice.js';

function Control({ loggedIn }) {

  return (
    <div className="control">
      <h1 className="main__title">Управление</h1>
      <p className="main__subtitle">Раздел для администраторов системы.</p>

      <Tabs className="tabs">

        <TabList className="tab-list">
          <Tab className="tab">Пользователи</Tab>
          <Tab className="tab">Программы</Tab> 
          <Tab className="tab">Типовые структуры</Tab>
          <Tab className="tab">Обратная связь</Tab>
          <Tab className="tab">Объявления</Tab>
        </TabList>

        <TabPanel>
          <ControlUser loggedIn={loggedIn} />
        </TabPanel>
        
        <TabPanel>
          <ControlProgram loggedIn={loggedIn} />
        </TabPanel>

        <TabPanel>
          <ControlStructure loggedIn={loggedIn} />
        </TabPanel>

        <TabPanel>
          <ControlFeedback loggedIn={loggedIn} />
        </TabPanel>

        <TabPanel>
          <ControlNotice loggedIn={loggedIn} />
        </TabPanel>

      </Tabs>
    </div>
  );
}

export default Control;