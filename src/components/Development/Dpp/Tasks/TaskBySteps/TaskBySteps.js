import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TinyEditor from '../../../../TinyEditor/TinyEditor.js';
import AddAssessmentItemPopup from '../AddAssessmentItemPopup/AddAssessmentItemPopup.js';
import AddAssessmentObjectPopup from '../AddAssessmentObjectPopup/AddAssessmentObjectPopup.js';
import PracticalTaskSubjectItem from '../PracticalTask/PracticalTaskSubjectItem/PracticalTaskSubjectItem.js';
import EditAssessmentObjectPopup from '../EditAssessmentObjectPopup/EditAssessmentObjectPopup.js';
import RemoveAssessmentObjectPopup from '../RemoveAssessmentObjectPopup/RemoveAssessmentObjectPopup.js';
import RemoveAssessmentItemPopup from '../RemoveAssessmentItemPopup/RemoveAssessmentItemPopup.js';
import TechnicalProvisionTaskPopup from '../TechnicalProvisionTaskPopup/TechnicalProvisionTaskPopup.js';
import ChooseMTOPopup from '../../../../Popup/ChooseMTOPopup/ChooseMTOPopup.js';
import MTOTaskItem from '../MTOTaskItem/MTOTaskItem.js';
import RemoveMTOPopup from '../../../../Popup/RemoveMTOPopup/RemoveMTOPopup.js';
import AdditionalMaterial from '../AdditionalMaterial/AdditionalMaterial.js';
import TaskSteps from '../TaskSteps/TaskSteps.js';
import AddTaskStepPopup from '../AddTaskStepPopup/AddTaskStepPopup.js';

function TaskBySteps({ 
  currentTask, 
  currentTaskType,
  skills, 
  abilities, 
  onBack, 
  onAdd, 
  onEdit, 
  onAddSubject, 
  onAddObject, 
  onRemoveSubject,
  onEditObject,
  onRemoveObject,
  MTO, 
  onAddMTO,
  onEditMTO,
  onRemoveMTO,
  onSelectMTO,
  onUnSelectMTO,
  onAddAdditionalMaterial,
  onRemoveAdditionalMaterial,
  onAddStep,
  onEditStep,
  onRemoveStep,
  onChangeOrder,
  isLoadingRequest 
}) {

  const [description, setDescription] = React.useState("");
  const [place, setPlace] = React.useState("");
  const [placeError, setPlaceError] = React.useState(false);
  const [time, setTime] = React.useState("");
  const [timeError, setTimeError] = React.useState(false);
  const [isOpenAddAssessmentItemPopup, setIsOpenAddAssessmentItemPopup] = React.useState(false);
  const [isOpenAddAssessmentObjectPopup, setIsOpenAddAssessmentObjectPopup] = React.useState(false);
  const [isOpenEditAssessmentObjectPopup, setIsOpenEditAssessmentObjectPopup] = React.useState(false);
  const [isOpenRemoveAssessmentObjectPopup, setIsOpenRemoveAssessmentObjectPopup] = React.useState(false);
  const [isOpenRemoveAssessmentItemPopup, setIsOpenRemoveAssessmentItemPopup] = React.useState(false);
  const [currentSubject, setCurrentSubject] = React.useState({});
  const [currentObject, setCurrentObject] = React.useState({});
  const [isOpenTechnicalProvisionTaskPopup, setIsOpenTechnicalProvisionTaskPopup] = React.useState(false);
  const [mtoTask, setMTOTask] = React.useState([]);
  const [stepsTask, setStepsTask] = React.useState([]);
  const [currentStep, setCurrentStep] = React.useState({});
  const [isOpenAddTaskStepOpen, setIsOpenAddTaskStepOpen] = React.useState(false);
  const [isOpenChooseMTOPopup, setIsOpenChooseMTOPopup] = React.useState(false);
  const [currentMTO, setCurrentMTO] = React.useState({});
  const [currentActionType, setCurrentActionType] = React.useState("");
  const [currentStepType, setCurrentStepType] = React.useState("");
  const [isOpenRemoveMTOPopup, setIsOpenRemoveMTOPopup] = React.useState(false);
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(false);
  const [currentAdditionalMaterial, setCurrentAdditionalMaterial] = React.useState([]);

  function openEditMTOPopup(elem) {
    setCurrentMTO(elem);
    setIsOpenTechnicalProvisionTaskPopup(true);
    setCurrentActionType("edit");
  }

  function openRemoveMTOPopup(elem) { 
    setCurrentMTO(elem);
    setIsOpenRemoveMTOPopup(true);
  }

  function openChooseMTOPopup() { 
    setIsOpenChooseMTOPopup(true);
  }

  function openTechnicalProvisionTaskPopup() { 
    setIsOpenTechnicalProvisionTaskPopup(true);
    setCurrentActionType("add");
  }

  function openAddAssessmentItemPopup() { 
    setIsOpenAddAssessmentItemPopup(true);
  }

  function openRemoveAssessmentItemPopup(subject) {
    setCurrentSubject(subject);
    setIsOpenRemoveAssessmentItemPopup(true);
  }

  function openEditAssessmentObjectPopup(subject, object) {
    setCurrentSubject(subject);
    setCurrentObject(object);
    setIsOpenEditAssessmentObjectPopup(true);
  }

  function openRemoveAssessmentObjectPopup(subject, object) {
    setCurrentSubject(subject);
    setCurrentObject(object);
    setIsOpenRemoveAssessmentObjectPopup(true); 
  }

  function openAddAssessmentObjectPopup(subject) {
    setCurrentSubject(subject);
    setIsOpenAddAssessmentObjectPopup(true);
  }

  function openAddTaskStepPopup() {
    setIsOpenAddTaskStepOpen(true);
    setCurrentStepType("add");
  }

  function openEditTaskStepPopup(step) {
    setIsOpenAddTaskStepOpen(true);
    setCurrentStep(step);
    setCurrentStepType("edit");
  }

  function closeTaskStepPopups() {
    setIsOpenAddTaskStepOpen(false);
  }

  function closeAddAddAssessmentItemPopups() {
    setIsOpenAddAssessmentItemPopup(false);
    setIsOpenAddAssessmentObjectPopup(false);
    setIsOpenEditAssessmentObjectPopup(false);
    setIsOpenRemoveAssessmentObjectPopup(false);
    setIsOpenRemoveAssessmentItemPopup(false);
    setIsOpenChooseMTOPopup(false);
  }

  function closeMTOPopup() {
    setIsOpenTechnicalProvisionTaskPopup(false);
    setIsOpenRemoveMTOPopup(false);
    setCurrentActionType("");
  }

  function onAddTask() {
    const newTask = {
      description: description,
      place: place,
      time: time,
      type: 3,
      portfolioStructureReq: "",
      portfolioPresentationReq: "",
      portfolioProcedure: "",
    }
    if (currentTaskType === "edit") {
      onEdit(newTask, currentTask.id);
    } else {
      onAdd(newTask);
    }
  }

  function handleChangePlace(e) {
    setPlace(e.target.value);
    if (e.target.checkValidity()) {
      setPlaceError(false);
    } else {
      setPlaceError(true);
    }
  }

  function handleChangeTime(e) {
    setTime(e.target.value);
    if (e.target.checkValidity()) {
      setTimeError(false);
    } else {
      setTimeError(true);
    }
  }

  function handleChangeDescription(content) {
    setDescription(content);
  }

  React.useEffect(() => {
    if (placeError || place.length < 1 || timeError || time.length < 1) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }

  }, [place, placeError, time, timeError]);

  React.useEffect(() => {
    setDescription(currentTask.description || "");
    setPlace(currentTask.place || "");
    setTime(currentTask.time || "");
    setMTOTask(currentTask.mtos);
    setStepsTask(currentTask.taskSteps);
    setCurrentAdditionalMaterial(currentTask.additional_files);
    return () => {
      setDescription("");
      setPlace("");
      setTime("");
      setIsBlockSubmitButton(false);
      setCurrentSubject({});
      setCurrentObject({});
      setMTOTask([]);
      setStepsTask([]);
      setCurrentMTO({});
      setCurrentAdditionalMaterial([]);
      setCurrentStep({});
    };
  // eslint-disable-next-line
  }, [currentTask]);


  return (
    <>
    <div className="practical-task">
      <button className="btn btn_type_back practical-task__btn-back" type="button" onClick={onBack}>К списку заданий</button>
      <Tabs className="tabs">
        <TabList className="tab-list">
          <Tab className="tab">Описание</Tab>
          <Tab disabled={currentTaskType === "add" ? true : false} className="tab">Шаги</Tab>
          <Tab disabled={currentTaskType === "add" ? true : false} className="tab">Критерии оценки</Tab>
          <Tab disabled={currentTaskType === "add" ? true : false} className="tab">Дополнительные материалы</Tab>
          <Tab disabled={currentTaskType === "add" ? true : false} className="tab">МТО</Tab>
        </TabList>
        <TabPanel>
          <p className="main__subtitle">Добавление задания на применение навыков в реальных или модельных условиях (Задание по шагам).</p>
          <ul className="practical-task__list">
            <li className="practical-task__item">
              <h5 className="practical-task__item-name">Описание проекта и исходные данные</h5>
              <TinyEditor 
              onChange={handleChangeDescription} 
              currentTask={currentTask} 
              currentTaskType={currentTaskType} 
              currentTaskValue={currentTask.description} 
              />
            </li>
            <li className="practical-task__item">
              <h5 className="practical-task__item-name">Место выполнения</h5>
              <input 
              className="practical-task__item-input"
              placeholder="введите место выполнения"
              type="text"
              id="add-task-by-step-place"
              name="add-task-by-step-place"
              autoComplete="off"
              value={place}
              onChange={handleChangePlace}
              required
              >
              </input>
            </li>
            <li className="practical-task__item">
              <h5 className="practical-task__item-name">Максимальное время выполнения (в минутах)</h5>
              <input 
              className="practical-task__item-input"
              placeholder="введите время выполнения в минутах"
              type="number"
              id="add-task-by-step-time"
              name="add-task-by-step-time"
              autoComplete="off"
              pattern="[0-9]*"
              value={time}
              onChange={handleChangeTime}
              required
              onWheel={(e) => e.target.blur()}
              >
              </input>
            </li>
          </ul>
          <button className={`btn btn_type_save practical-task__save-btn ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoadingRequest ? "btn_type_loading" : ""}`} type="submit" onClick={onAddTask}>{isLoadingRequest ? "Сохранение.." : "Сохранить"}</button>
        </TabPanel>

        <TabPanel>
          <TaskSteps 
          stepsTask={stepsTask} 
          onAddStep={openAddTaskStepPopup}
          onEditStep={openEditTaskStepPopup}
          onRemoveStep={onRemoveStep}
          onChangeOrder={onChangeOrder}
          />
        </TabPanel>

        <TabPanel>
          <button className="btn btn_type_add practical-task__btn-add" type="button" onClick={openAddAssessmentItemPopup}>Добавить предмет оценки</button>
          {

          }
          <h3 className="practical-task__subtitle-count">{`Предметов оценки добавлено: ${currentTask.subjects.length || 0}`}</h3>
          <ul className="practical-task__subject-list"> 
          {
            currentTask.subjects &&
            currentTask.subjects.map((item) => (
              <PracticalTaskSubjectItem
              key={`${item.id}s`}
              currentTask={currentTask}
              item={item}
              onAddObject={openAddAssessmentObjectPopup}
              onRemoveSubject={openRemoveAssessmentItemPopup}
              onEditObject={openEditAssessmentObjectPopup}
              onRemoveObject={openRemoveAssessmentObjectPopup}
              />
            ))
          }
          </ul>
        </TabPanel>

        <TabPanel> 
          <AdditionalMaterial
            additionalMaterial={currentAdditionalMaterial}
            onAddAdditionalMaterial={onAddAdditionalMaterial}
            onRemoveAdditionalMaterial={onRemoveAdditionalMaterial}
            currentTask={currentTask}
            isLoadingRequest={isLoadingRequest}
          />
        </TabPanel>
        <TabPanel>
          <button className="btn btn_type_choose practical-task__btn-add" type="button" onClick={openChooseMTOPopup}>Выбрать МТО</button>
          <h3 className="practical-task__subtitle-count">{`МТО добавлено: ${mtoTask.length}`}</h3>
          <ul className="mto-item__list">
            {
              mtoTask.map((elem) => (
                <MTOTaskItem
                key={elem.id}
                elem={elem}
                onUnSelectMTO={onUnSelectMTO}
                currentTask={currentTask}
                />
              ))
            }
          </ul>

        </TabPanel>
      </Tabs>
      
    </div> 

    {
      isOpenAddAssessmentItemPopup &&
      <AddAssessmentItemPopup 
      isOpen={isOpenAddAssessmentItemPopup} 
      onClose={closeAddAddAssessmentItemPopups}
      currentTask={currentTask}
      skills={skills}
      abilities={abilities}
      onAddSubject={onAddSubject}
      isLoadingRequest={isLoadingRequest}
      />
    }

    {
      isOpenAddAssessmentObjectPopup &&
      <AddAssessmentObjectPopup
      isOpen={isOpenAddAssessmentObjectPopup} 
      onClose={closeAddAddAssessmentItemPopups}
      currentTask={currentTask}
      currentSubject={currentSubject}
      onAddObject={onAddObject}
      isLoadingRequest={isLoadingRequest}
      />
    }

    {
      isOpenEditAssessmentObjectPopup &&
      <EditAssessmentObjectPopup
      isOpen={isOpenEditAssessmentObjectPopup} 
      onClose={closeAddAddAssessmentItemPopups}
      currentTask={currentTask}
      currentSubject={currentSubject}
      currentObject={currentObject}
      onConfirm={onEditObject}
      isLoadingRequest={isLoadingRequest}
      />
    }

    {
      isOpenRemoveAssessmentObjectPopup &&
      <RemoveAssessmentObjectPopup
      isOpen={isOpenRemoveAssessmentObjectPopup} 
      onClose={closeAddAddAssessmentItemPopups}
      currentTask={currentTask}
      currentSubject={currentSubject}
      currentObject={currentObject}
      onConfirm={onRemoveObject}
      isLoadingRequest={isLoadingRequest}
      />
    }

    {
      isOpenRemoveAssessmentItemPopup &&
      <RemoveAssessmentItemPopup
      isOpen={isOpenRemoveAssessmentItemPopup} 
      onClose={closeAddAddAssessmentItemPopups}
      currentTask={currentTask}
      currentSubject={currentSubject}
      onConfirm={onRemoveSubject}
      isLoadingRequest={isLoadingRequest}
      />
    }

    {
      isOpenAddTaskStepOpen &&
      <AddTaskStepPopup
      isOpen={isOpenAddTaskStepOpen} 
      onClose={closeTaskStepPopups}
      currentTask={currentTask}
      currentStep={currentStep}
      currentStepType={currentStepType}
      onAddStep={onAddStep}
      onEditStep={onEditStep}
      isLoadingRequest={isLoadingRequest}
      />
    }

    {
      isOpenChooseMTOPopup &&
      <ChooseMTOPopup
      isOpen={isOpenChooseMTOPopup}
      onClose={closeAddAddAssessmentItemPopups}
      MTO={MTO}
      openAddMTOPopup={openTechnicalProvisionTaskPopup}
      onEditMTO={openEditMTOPopup}
      onRemoveMTO={openRemoveMTOPopup}
      onSelectMTO={onSelectMTO}
      currentTask={currentTask}
      isLoadingRequest={isLoadingRequest}
      />
    }

    {
      isOpenRemoveMTOPopup &&
      <RemoveMTOPopup 
      isOpen={isOpenRemoveMTOPopup}
      onClose={closeMTOPopup}
      onRemove={onRemoveMTO}
      currentMTO={currentMTO}
      isLoadingRequest={isLoadingRequest}
      />
    }

    {
      isOpenTechnicalProvisionTaskPopup &&  
      <TechnicalProvisionTaskPopup
      isOpen={isOpenTechnicalProvisionTaskPopup}
      onClose={closeMTOPopup}
      currentActionType={currentActionType}
      currentMTO={currentMTO}
      onAddMTO={onAddMTO}
      onEditMTO={onEditMTO}
      isLoadingRequest={isLoadingRequest}
      />
    }

    </>
  );
}

export default TaskBySteps;