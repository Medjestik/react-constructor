import React from 'react';
import './Tasks.css';
import * as evaluationMaterialApi from '../../../../utils/evaluationMaterialApi/evaluationMaterialApi.js';
import AddPracticalTask from './AddPracticalTask/AddPracticalTask.js';
import TaskItem from './TaskItem/TaskItem.js';
import Preloader from '../../../Preloader/Preloader.js'

function Tasks({ loggedIn, dppDescription }) {

  const [isShowAddTaskType, setIsShowAddTaskType] = React.useState(false);
  const [isShowAddPracticalTask, setIsShowAddPracticalTask] = React.useState(false);
  const [isShowAddMenu, setIsShowAddMenu] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
  const [skills, setSkills] = React.useState([]);
  const [abilities, setAbilities] = React.useState([]);
  const [currentTask, setCurrentsTask] = React.useState({});
  const [currentTaskType, setCurrentTaskType] = React.useState("")
  const [isLoadingTasks, setIsLoadingTasks] = React.useState(true);

  function openAddPracticalTask() {
    setIsShowAddPracticalTask(true);
    setIsShowAddMenu(false);
    setCurrentTaskType("add");
    setCurrentsTask({});
    setIsShowAddTaskType(false);
  }

  function openEditPracticalTask(task) {
    setIsShowAddPracticalTask(true);
    setIsShowAddMenu(false);
    setCurrentTaskType("edit");
    setCurrentsTask(task);
    setIsShowAddTaskType(false);
  }

  function backToTaskList() {
    setIsShowAddPracticalTask(false);
    setIsShowAddMenu(true);
    setCurrentTaskType("");
    setCurrentsTask({});
  }

  function toggleShowAddMenu() {
    setIsShowAddTaskType(!isShowAddTaskType);
  }

  function handleAddPracticalTask(task) {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      evaluationMaterialApi.createTask({ token: token, omId: dppDescription.om_version_id, task: task })
        .then((res) => {
          setTasks([...tasks, res.tasks]);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {

        });
      }
  }

  function handleEditPracticalTask(task, id) {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      evaluationMaterialApi.editTask({ token: token, omId: dppDescription.om_version_id, task: task, taskId: id })
        .then((res) => {
          //setCurrentsTasks([...currentTasks, res]);
          console.log(res);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {

        });
      }
  }

  function getTasks() {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      setIsLoadingTasks(true);
      evaluationMaterialApi.getTask({ token: token, dppId: dppDescription.id, omId: dppDescription.om_version_id })
        .then((res) => {
          setTasks(res.tasks);
          setSkills(res.skills);
          setAbilities(res.abilities);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingTasks(false);
        });
    }
  }

  React.useEffect(() => {
    getTasks();
    setCurrentTaskType("");
    setCurrentsTask({});
    return () => {
      setTasks([]);
      setSkills([]);
      setAbilities([]);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
    <div className="tasks"> 

    {
      isLoadingTasks 
      ?
      <Preloader />
      :
      <>
      <p className="main__subtitle">Функционал находится на доработке и временно не доступен.</p>
      {
        isShowAddMenu &&
        <>
          <p className="main__subtitle">Для работы с оценочными материалами выберите или создайте новое задание.</p>
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
              tasks.map((elem, i) => (
                <TaskItem key={elem.id} task={elem} index={i} onEdit={openEditPracticalTask} />
              ))
            }
          </ul>
        </>
        }
        </>
      }
      
    </div>
    {
      isShowAddPracticalTask &&
      <AddPracticalTask 
      currentTask={currentTask} 
      currentTaskType={currentTaskType}
      skills={skills}
      abilities={abilities}
      onBack={backToTaskList}
      onAdd={handleAddPracticalTask}
      onEdit={handleEditPracticalTask}
      />
    }
    </>
  );
}

export default Tasks;