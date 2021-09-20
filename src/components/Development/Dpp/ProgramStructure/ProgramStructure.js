import React from 'react';
import './ProgramStructure.css';
import * as programStructureApi from '../../../../utils/programStructureApi/programStructureApi.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Preloader from '../../../Preloader/Preloader.js';
import LearningPlan from '../LearningPlan/LearningPlan.js';
import LearningResult from '../LearningResult/LearningResult.js';
import EditLearningPlanPopup from '../../../Popup/EditLearningPlanPopup/EditLearningPlanPopup.js';

function ProgramStructure({ dppDescription, loggedIn, isEditRights }) { 

  const [programStructure, setProgramStructure] = React.useState([]);
  const [isLoadingProgramStructure, setIsLoadingProgramStructure] = React.useState(false);
  const [currentLearningPlanElem, setCurrentLearningPlanElem] = React.useState({});
  const [isOpenEditLearningPopup, setIsOpenEditLearningPopup] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCurrentTypeChoose, setIsCurrentTypeChoose] = React.useState("");

  function openEditLearningPlan(elem) {
    setCurrentLearningPlanElem(elem);
    setIsOpenEditLearningPopup(true);
  }

  function closeProgramStructurePopups() {
    setIsOpenEditLearningPopup(false);
  }

  function chooseType(type) {
    if (isCurrentTypeChoose === type) {
      setIsCurrentTypeChoose(!isCurrentTypeChoose);
    } else {
      setIsCurrentTypeChoose(type);
    }
  }

  function defineHoursTotal() {
    let hours = programStructure.reduce(function(accumulator, currentValue) {
      return accumulator + parseFloat(currentValue.total_hours);
    }, 0);
    return (
      <span className={`program-structure__hours ${dppDescription.total_hours === hours ? "program-structure__hours_type_success" : "program-structure__hours_type_error"}`}>{hours}</span>
    )
  }

  function defineHoursLec() {
    let hours = programStructure.reduce(function(accumulator, currentValue) {
      return accumulator + parseFloat(currentValue.lection_hours);
    },0);
    return (
      <span className="program-structure__hours">{hours}</span>
    )
  }

  function defineHoursPrac() {
    let hours = programStructure.reduce(function(accumulator, currentValue) {
      return accumulator + parseFloat(currentValue.practice_hours);
    },0);
    return (
      <span className="program-structure__hours">{hours}</span>
    )
  } 

  function defineHoursLab() {
    let hours = programStructure.reduce(function(accumulator, currentValue) {
      return accumulator + parseFloat(currentValue.lab_hours);
    },0);
    return (
      <span className="program-structure__hours">{hours}</span>
    )
  }

  function defineHoursSelf() {
    let hours = programStructure.reduce(function(accumulator, currentValue) {
      return accumulator + parseFloat(currentValue.self_hours);
    },0);
    return (
      <span className="program-structure__hours">{hours}</span>
    )
  }

  function defineHoursAtt() {
    let hours = programStructure.reduce(function(accumulator, currentValue) {
      return accumulator + parseFloat(currentValue.attestation_hours);
    },0);
    return (
      <span className="program-structure__hours">{hours}</span>
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

  function onChangeOrder(sectionId, ids) {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      programStructureApi.changeThemeOrder({ token: token, stId: dppDescription.st_version_id, sectionId: sectionId, themes: ids, })
        .then(() => {
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {

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
      setIsCurrentTypeChoose("");
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
            <ul className="program-structure__hours-list">
              <li className="program-structure__hours-item">
                <p className="program-structure__hours-name">Планируется часов: <span className="program-structure__hours program-structure__hours_type_main">{dppDescription.total_hours}</span></p>
              </li>
              <li className="program-structure__hours-item">
                <p className="program-structure__hours-name">Распределено часов: {defineHoursTotal()}</p>
              </li>
            </ul>

            <ul className="program-structure__hours-list">
              <li 
              className={`program-structure__hours-item program-structure__hours-item_type_choose
              ${isCurrentTypeChoose === "lec" ? "program-structure__hours-item_type_active" : ""}
              `} 
              onClick={() => chooseType("lec")}
              >
                <p className={`program-structure__hours-name ${isCurrentTypeChoose === "lec" ? "program-structure__hours-name_type_active" : ""}`}>Лекции: {defineHoursLec()}</p>
              </li>
              <li 
              className={`program-structure__hours-item program-structure__hours-item_type_choose
              ${isCurrentTypeChoose === "prak" ? "program-structure__hours-item_type_active" : ""}
              `} 
              onClick={() => chooseType("prak")}
              >
                <p className={`program-structure__hours-name ${isCurrentTypeChoose === "prak" ? "program-structure__hours-name_type_active" : ""}`}>Практика: {defineHoursPrac()}</p>
              </li>
              <li 
              className={`program-structure__hours-item program-structure__hours-item_type_choose
              ${isCurrentTypeChoose === "lab" ? "program-structure__hours-item_type_active" : ""}
              `}
              onClick={() => chooseType("lab")}
              >
                <p className={`program-structure__hours-name ${isCurrentTypeChoose === "lab" ? "program-structure__hours-name_type_active" : ""}`}>Лабораторные: {defineHoursLab()}</p>
              </li>
              <li 
              className={`program-structure__hours-item program-structure__hours-item_type_choose
              ${isCurrentTypeChoose === "self" ? "program-structure__hours-item_type_active" : ""}
              `} 
              onClick={() => chooseType("self")}
              >
                <p className={`program-structure__hours-name ${isCurrentTypeChoose === "self" ? "program-structure__hours-name_type_active" : ""}`}>Самостоятельные: {defineHoursSelf()}</p>
              </li>
              <li 
              className={`program-structure__hours-item program-structure__hours-item_type_choose
              ${isCurrentTypeChoose === "att" ? "program-structure__hours-item_type_active" : ""}
              `}
              onClick={() => chooseType("att")}
              >
                <p className={`program-structure__hours-name ${isCurrentTypeChoose === "att" ? "program-structure__hours-name_type_active" : ""}`}>Аттестация: {defineHoursAtt()}</p>
              </li>
            </ul>
            
            <LearningPlan 
            programStructure={programStructure} 
            onEdit={openEditLearningPlan}
            onChangeOrder={onChangeOrder}
            isEditRights={isEditRights}
            isCurrentTypeChoose={isCurrentTypeChoose}
            />
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