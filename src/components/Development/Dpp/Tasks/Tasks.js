import React from 'react';
import './Tasks.css';
import * as evaluationMaterialApi from '../../../../utils/evaluationMaterialApi/evaluationMaterialApi.js';
import AddPracticalTask from './AddPracticalTask/AddPracticalTask.js';

function Tasks({ loggedIn, dppDescription, tasks }) {

  const [isShowAddTaskType, setIsShowAddTaskType] = React.useState(false);
  const [isShowAddPracticalTask, setIsShowAddPracticalTask] = React.useState(false);
  const [isShowAddMenu, setIsShowAddMenu] = React.useState(true);

  const [currentTasks, setCurrentsTasks] = React.useState(tasks);

  function openAddPracticalTask() {
    setIsShowAddPracticalTask(true);
    setIsShowAddMenu(false);
  }

  function toggleShowAddMenu() {
    setIsShowAddTaskType(!isShowAddTaskType);
  }

  function handleAddPracticalTask(task) {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      evaluationMaterialApi.createTask({ token: token, omId: dppDescription.om_version_id, task: task })
        .then((res) => {
          setCurrentsTasks([...currentTasks, res]);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {

        });
      }
  }

  return (
    <div className="tasks"> 
      <p className="main__subtitle">Для работы с оценочными материалами выберите или создайте новое задание.</p>
      {
        isShowAddMenu &&
        <>
          <div className="task__add">
            <button className={`btn btn_type_add task__add-btn ${isShowAddTaskType ? "task__add-btn_type_show" : "task__add-btn_type_hide"}`}type="button" onClick={toggleShowAddMenu}>Добавить задание</button>
            <div className={`task__add-menu ${isShowAddTaskType ? "task__add-menu_type_show" : "task__add-menu_type_hide"}`}>
              <button className="btn task__menu-btn" type="button" onClick={openAddPracticalTask}>Практическое задание</button>
              <button className="btn task__menu-btn" type="button">Оформление портфолио</button>
            </div>
          </div>
          <h5 className="practical-task__item-name">Добавленные задания</h5>
          <ul className="task__list">
            {
              currentTasks.map((elem) => (
                <li className="task__item" key={elem.id}>
                  <span></span>
                  {elem.name}
                </li>
              ))
            }
          </ul>
        </>
      }
      {
        isShowAddPracticalTask &&
        <AddPracticalTask onAdd={handleAddPracticalTask} />
      }

    </div>
  );
}

export default Tasks;