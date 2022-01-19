import React from 'react';
import './Approval.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Preloader from '../../../Preloader/Preloader.js';
import ExportProgram from './ExportProgram/ExportProgram.js';
import PerformersList from './PerformersList/PerformersList.js';
import * as approvalApi from '../../../../utils/approvalApi/approvalApi.js';

function Approval({ dppDescription, loggedIn, isEditRights }) {

  const [isLoadingData, setIsLoadingData] = React.useState(true);
  const [programData, setProgramData] = React.useState({});

  function getData() {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      setIsLoadingData(true);
      approvalApi.getData({ token: token, dppId: dppDescription.id })
        .then((res) => {
          console.log(res);
          setProgramData(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoadingData(false); 
        });
    }
  }

  React.useEffect(() => {
    getData();
    return (() => {
      setProgramData({});
    })
    // eslint-disable-next-line
  }, []);

  return (
    <div className="approval">
      <h1 className="main__title">Утверждение программы</h1>

      {
        isLoadingData
        ?
        <Preloader />
        :
        <Tabs className="tabs">
          <TabList className="tab-list">
            <Tab className="tab">Список исполнителей</Tab>
            <Tab className="tab">Экспорт программы</Tab>
          </TabList>
          <TabPanel>
            <PerformersList
              dppDescription={dppDescription} 
              loggedIn={loggedIn}
              isEditRights={isEditRights}
            />
          </TabPanel>
          <TabPanel>
            <ExportProgram 
              dppDescription={dppDescription}
              programData={programData}
            />
          </TabPanel>
        </Tabs>
      }
    </div>
  );
}

export default Approval;