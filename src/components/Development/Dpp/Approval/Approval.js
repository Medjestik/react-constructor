import React from 'react';
import './Approval.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Preloader from '../../../Preloader/Preloader.js';
import Annotation from './Annotation/Annotation.js';
import ExportProgram from './ExportProgram/ExportProgram.js';
import PerformersList from './PerformersList/PerformersList.js';
import * as approvalApi from '../../../../utils/approvalApi/approvalApi.js';

function Approval({ dppDescription, loggedIn }) {

  const [isLoadingData, setIsLoadingData] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [programData, setProgramData] = React.useState({});
  const [isShowRequestMessage, setIsShowRequestMessage] = React.useState({ isShow: false, text: "", type: "" });

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

  function handleEditAnnotation(annotation) {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      setIsLoading(true);
      approvalApi.editAnnotation({ token: token, ivId: programData.ishVersion.id, annotation: annotation })
        .then((res) => {
          setProgramData({...programData, ishVersion: res});
          setIsShowRequestMessage({ isShow: true, text: "Данные успешно сохранены!", type: "success" });
        })
        .catch(() => {
          setIsShowRequestMessage({ isShow: true, text: "К сожалению, на сервере произошла ошибка!", type: "error" });
        })
        .finally(() => {
          setIsLoading(false);
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
            <Tab className="tab">Экспорт программы</Tab>
            <Tab className="tab">Список исполнителей</Tab>
          </TabList>
          <TabPanel>
            <ExportProgram dppDescription={dppDescription} programData={programData} />
          </TabPanel>
          <TabPanel>
            <PerformersList />
          </TabPanel>
        </Tabs>
      }
    </div>
  );
}

export default Approval;