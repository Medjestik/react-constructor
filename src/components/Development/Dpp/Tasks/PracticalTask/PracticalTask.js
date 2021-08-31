import React from 'react';
import './PracticalTask.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TinyEditor from '../../../../TinyEditor/TinyEditor.js';
import AddAssessmentItemPopup from '../AddAssessmentItemPopup/AddAssessmentItemPopup.js';
import AddAssessmentObjectPopup from '../AddAssessmentObjectPopup/AddAssessmentObjectPopup.js';
import PracticalTaskSubjectItem from './PracticalTaskSubjectItem/PracticalTaskSubjectItem.js';
import RemoveAssessmentObjectPopup from '../RemoveAssessmentObjectPopup/RemoveAssessmentObjectPopup.js';
import RemoveAssessmentItemPopup from '../RemoveAssessmentItemPopup/RemoveAssessmentItemPopup.js';
import ChooseNsiTaskPopup from '../ChooseNsiTaskPopup/ChooseNsiTaskPopup.js';
import NsiPopup from '../../../../Popup/NsiPopup/NsiPopup.js';
import NsiTaskItem from '../NsiTaskItem/NsiTaskItem.js';

function PracticalTask({ 
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
  onRemoveObject,
  nsi,
  nsiTypes,
  onSelectNsi,
  onUnSelectNsi,
  onAddNsi,
  onEditNsi,
  onRemoveNsi,
  isLoadingRequest 
}) {

  const [description, setDescription] = React.useState("");
  const [place, setPlace] = React.useState("");
  const [placeError, setPlaceError] = React.useState(false);
  const [time, setTime] = React.useState("");
  const [timeError, setTimeError] = React.useState(false);
  const [isOpenAddAssessmentItemPopup, setIsOpenAddAssessmentItemPopup] = React.useState(false);
  const [isOpenAddAssessmentObjectPopup, setIsOpenAddAssessmentObjectPopup] = React.useState(false);
  const [isOpenRemoveAssessmentObjectPopup, setIsOpenRemoveAssessmentObjectPopup] = React.useState(false);
  const [isOpenRemoveAssessmentItemPopup, setIsOpenRemoveAssessmentItemPopup] = React.useState(false);
  const [nsiTask, setNsiTask] = React.useState([]);
  const [currentSubject, setCurrentSubject] = React.useState({});
  const [currentObject, setCurrentObject] = React.useState({});
  const [isOpenChooseNsiTaskPopup, setIsOpenChooseNsiTaskPopup] = React.useState(false);
  const [isOpenAddNsiPopup, setIsOpenAddNsiPopup] = React.useState(false);
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  console.log(currentTask);

  function unSelectNsi(elem) {
    onUnSelectNsi(currentTask.id, elem.id);
  }

  function openAddNsiPopup() { 
    setIsOpenAddNsiPopup(true);
  }

  function openChooseNsiTaskPopup() { 
    setIsOpenChooseNsiTaskPopup(true);
  }

  function openAddAssessmentItemPopup() { 
    setIsOpenAddAssessmentItemPopup(true);
  }

  function openRemoveAssessmentItemPopup(subject) {
    setCurrentSubject(subject);
    setIsOpenRemoveAssessmentItemPopup(true);
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

  function closeAddAddAssessmentItemPopups() {
    setIsOpenAddAssessmentItemPopup(false);
    setIsOpenAddAssessmentObjectPopup(false);
    setIsOpenRemoveAssessmentObjectPopup(false);
    setIsOpenRemoveAssessmentItemPopup(false);
    setIsOpenChooseNsiTaskPopup(false);
  }

  function closeAddNsiPopup() {
    setIsOpenAddNsiPopup(false);
  }

  function onAddTask() {
    const newTask = {
      description: description,
      place: place,
      time: time,
      type: 1,
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
    if (placeError || timeError) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }

  }, [placeError, timeError]);

  React.useEffect(() => {
    setDescription(currentTask.description || "");
    setPlace(currentTask.place || "");
    setTime(currentTask.time || "");
    setNsiTask(currentTask.nsis);
    return () => {
      setDescription("");
      setPlace("");
      setTime("");
      setIsBlockSubmitButton(false);
      setCurrentSubject({});
      setCurrentObject({});
      setNsiTask([]);
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
          <Tab className="tab">Критерии оценки</Tab>
          <Tab className="tab">Источники информации для выполнения</Tab>
          <Tab className="tab">Материально-техническое обеспечение</Tab>
        </TabList>
        <TabPanel>
          <p className="main__subtitle">Добавление задания на применение навыков в реальных или модельных условиях (Практическое задание).</p>
          <ul className="practical-task__list">
            <li className="practical-task__item">
              <h5 className="practical-task__item-name">Описание ситуации и постановка задачи</h5>
              <TinyEditor onChange={handleChangeDescription} currentTask={currentTask} currentTaskType={currentTaskType} />
            </li>
            <li className="practical-task__item">
              <h5 className="practical-task__item-name">Место выполнения</h5>
              <input 
              className="practical-task__item-input"
              placeholder="введите место выполнения"
              type="text"
              id="add-or-input-name"
              name="add-or-input-name"
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
              id="add-pf-input-registration-number"
              name="add-pf-input-registration-number"
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
          <button className="btn btn_type_add practical-task__btn-add" type="button" onClick={openAddAssessmentItemPopup}>Добавить предмет оценки</button>
          <h3 className="practical-task__subtitle-count">{`Предметов оценки добавлено: ${currentTask.subjects.length || 0}`}</h3>
          <ul className="practical-task__subject-list"> 
          {
            currentTask.subjects &&
            currentTask.subjects.map((item) => (
              <PracticalTaskSubjectItem
              key={`${item.id}s`}
              item={item}
              onAddObject={openAddAssessmentObjectPopup}
              onRemoveSubject={openRemoveAssessmentItemPopup}
              onRemoveObject={openRemoveAssessmentObjectPopup}
              />
            ))
          }
          </ul>
        </TabPanel> 
        <TabPanel>
          <button className="btn btn_type_choose practical-task__btn-add" type="button" onClick={openChooseNsiTaskPopup}>Выбрать источники НСИ</button>
          <h3 className="practical-task__subtitle-count">{`Текущие источники добавлено: ${nsiTask.length}`}</h3>
          <ul className="reference-information__list">
              {
                nsiTask.map((elem, i) => (
                  <NsiTaskItem             
                  elem={elem}
                  key={i}
                  unSelectNsi={unSelectNsi}
                  />
                ))
              }
          </ul>
        </TabPanel>
        <TabPanel>
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
      isOpenChooseNsiTaskPopup &&
      <ChooseNsiTaskPopup
      isOpen={isOpenChooseNsiTaskPopup} 
      onClose={closeAddAddAssessmentItemPopups}
      nsi={nsi}
      currentTask={currentTask}
      onSelectNsi={onSelectNsi}
      openAddNsiPopup={openAddNsiPopup}
      onEditNsi={onEditNsi}
      onRemoveNsi={onRemoveNsi}
      isLoadingRequest={isLoadingRequest}
      />
    }

    { 
      isOpenAddNsiPopup
      &&
      <NsiPopup
      isOpen={isOpenAddNsiPopup}
      onClose={closeAddNsiPopup}
      nsiTypes={nsiTypes}
      onAdd={onAddNsi}
      />
    }

    </>
  );
}

export default PracticalTask;

