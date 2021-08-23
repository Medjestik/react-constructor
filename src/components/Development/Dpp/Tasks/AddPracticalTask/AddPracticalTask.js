import React from 'react';
import './AddPracticalTask.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TinyEditor from '../../../../TinyEditor/TinyEditor.js';

function AddPracticalTask({ onAdd }) {
  
  const [description, setDescription] = React.useState("");
  const [place, setplace] = React.useState("");
  const [time, setTime] = React.useState("");

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
    onAdd(newTask);
    console.log(newTask);
  }

  function handleChangePlace(e) {
    setplace(e.target.value);
  }

  function handleChangeTime(e) {
    setTime(e.target.value);
  }

  function handleChangeDescription(content) {
    setDescription(content);
  }

  return (
    <div className="practical-task"> 
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
              <TinyEditor onChange={handleChangeDescription} />
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
          <button className="btn btn_type_save practical-task__save-btn" type="button" onClick={onAddTask}>Сохранить</button>
        </TabPanel>
        <TabPanel>
        </TabPanel>
        <TabPanel>
        </TabPanel>
        <TabPanel>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default AddPracticalTask;