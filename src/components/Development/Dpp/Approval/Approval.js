import React from 'react';
import './Approval.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Preloader from '../../../Preloader/Preloader.js';
import Annotation from './Annotation/Annotation.js';
import ExportProgram from './ExportProgram/ExportProgram.js';
import PerformersList from './PerformersList/PerformersList.js';

function Approval() {

  const [isLoadingData, setIsLoadingData] = React.useState(false);

  return (
    <div className="approval">
      <h1 className="main__title">Утверждение программы</h1>
      <p className="main__subtitle">Этап находится в разработке.</p> 

      {
        isLoadingData
        ?
        <Preloader />
        :
        <Tabs className="tabs">
          <TabList className="tab-list">
            <Tab className="tab">Аннотация</Tab>
            <Tab className="tab">Список исполнителей</Tab>
            <Tab className="tab">Экспорт программы</Tab>
          </TabList>
          <TabPanel>
            <Annotation />
          </TabPanel>
          <TabPanel>
            <PerformersList />
          </TabPanel>
          <TabPanel>
            <ExportProgram />
          </TabPanel>
        </Tabs>
      }
    </div>
  );
}

export default Approval;