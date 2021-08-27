import React from 'react';
import './ProgramStructure.css';
import * as programStructureApi from '../../../../utils/programStructureApi/programStructureApi.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Preloader from '../../../Preloader/Preloader.js';
import LearningPlan from '../LearningPlan/LearningPlan.js';
import LearningResult from '../LearningResult/LearningResult.js';
import EditLearningPlanPopup from '../../../Popup/EditLearningPlanPopup/EditLearningPlanPopup.js';

function ProgramStructure({ dppDescription, loggedIn }) { 

  const [programStructure, setProgramStructure] = React.useState([]);
  const [isLoadingProgramStructure, setIsLoadingProgramStructure] = React.useState(false);
  const [currentLearningPlanElem, setCurrentLearningPlanElem] = React.useState({});
  const [isOpenEditLearningPopup, setIsOpenEditLearningPopup] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  function openEditLearningPlan(elem) {
    setCurrentLearningPlanElem(elem);
    setIsOpenEditLearningPopup(true);
  }

  function closeProgramStructurePopups() {
    setIsOpenEditLearningPopup(false);
  }

  function defineHours() {
     let hours = programStructure.reduce(function(accumulator, currentValue) {
      return accumulator + currentValue.total_hours;
    },0);
    return (
      <span className={`program-structure__hours ${dppDescription.total_hours === hours ? "program-structure__hours_type_success" : "program-structure__hours_type_error"}`}>{hours}</span>
    )
  }

  function handleEditProgramStructure(elem, id, closePopup) {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      setIsLoading(true);
      programStructureApi.editProgramStructure({ token: token, stId: dppDescription.st_version_id, sectionsId: id, section: elem })
        .then((res) => {
          const index = programStructure.indexOf(programStructure.find((elem) => (elem.id === res.id)));
          setProgramStructure([...programStructure.slice(0, index), res, ...programStructure.slice(index + 1)]);
          closePopup();
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  function handleUpTheme(id) {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      setIsLoading(true);
      programStructureApi.moveThemeUp({ token: token, stId: dppDescription.st_version_id, themeId: id, })
        .then((res) => {
          const index = programStructure.indexOf(programStructure.find((elem) => (elem.id === res.id)));
          setProgramStructure([...programStructure.slice(0, index), res, ...programStructure.slice(index + 1)]);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  function handleDownTheme(id) {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      setIsLoading(true);
      programStructureApi.moveThemeDown({ token: token, stId: dppDescription.st_version_id, themeId: id, })
        .then((res) => {
          const index = programStructure.indexOf(programStructure.find((elem) => (elem.id === res.id)));
          setProgramStructure([...programStructure.slice(0, index), res, ...programStructure.slice(index + 1)]);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  function getStructure() {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      setIsLoadingProgramStructure(true);
      programStructureApi.getProgramStructure({ token: token, dppId: dppDescription.id, stId: dppDescription.st_version_id })
        .then((res) => {
          setProgramStructure(res);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingProgramStructure(false);
        });
    }
  }

  React.useEffect(() => {
    getStructure();
    return () => {
      setProgramStructure([]);
    };
    // eslint-disable-next-line
  }, [loggedIn, dppDescription])

  return (
    <>
    <div className="program-structure">
      <h2 className="main__title">Проектирование структуры ДПП</h2>

      {
        isLoadingProgramStructure 
        ?
        <Preloader />
        :
        <Tabs className="tabs">
          <TabList className="tab-list">
            <Tab className="tab">Учебный план</Tab>
            <Tab className="tab">Результаты обучения</Tab>
          </TabList>
          <TabPanel>
            <h3 className="program-structure__hours">Планируется часов: <span className="program-structure__hours program-structure__hours_type_main">{dppDescription.total_hours}</span></h3>
            <h3 className="program-structure__hours">Распределено часов: {defineHours()}</h3>  
            <LearningPlan programStructure={programStructure} onEdit={openEditLearningPlan} moveUp={handleUpTheme} moveDown={handleDownTheme} />
          </TabPanel>
          <TabPanel>
            <LearningResult dppDescription={dppDescription} loggedIn={loggedIn} />
          </TabPanel>
        </Tabs>
      }
    </div>

    {
      isOpenEditLearningPopup &&
      <EditLearningPlanPopup
      isOpen={isOpenEditLearningPopup}
      currentLearningPlanElem={currentLearningPlanElem}
      onClose={closeProgramStructurePopups}
      onEdit={handleEditProgramStructure}
      isLoading={isLoading}
      />
    }

    </>
  );
}

export default ProgramStructure;