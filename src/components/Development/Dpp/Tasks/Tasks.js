import React from 'react';
import './Tasks.css';
import * as evaluationMaterialApi from '../../../../utils/evaluationMaterialApi/evaluationMaterialApi.js';
import PracticalTask from './PracticalTask/PracticalTask.js';
import ProjectTask from './ProjectTask/ProjectTask.js';
import TaskBySteps from './TaskBySteps/TaskBySteps.js';
import TaskItem from './TaskItem/TaskItem.js';
import Preloader from '../../../Preloader/Preloader.js';
import RemoveTaskPopup from './RemoveTaskPopup/RemoveTaskPopup.js';

function Tasks({ loggedIn, dppDescription, isEditRights }) {

  const [isShowAddTaskType, setIsShowAddTaskType] = React.useState(false);
  const [isShowRemoveTaskPopup, setIsShowRemoveTaskPopup] = React.useState(false);
  const [isShowAddPracticalTask, setIsShowAddPracticalTask] = React.useState(false);
  const [isShowAddProjectTask, setIsShowAddProjectTask] = React.useState(false);
  const [isShowAddTaskBySteps, setIsShowAddTaskBySteps] = React.useState(false);
  const [isShowAddMenu, setIsShowAddMenu] = React.useState(true);
  const [tasks, setTasks] = React.useState([]);
  const [skills, setSkills] = React.useState([]);
  const [abilities, setAbilities] = React.useState([]);
  const [currentTask, setCurrentTask] = React.useState({});
  const [currentTaskType, setCurrentTaskType] = React.useState("");
  const [MTO, setMTO] = React.useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = React.useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);

  const [totalTime, setTotalTime] = React.useState(0);

  function openAddPracticalTask() {
    setIsShowAddPracticalTask(true);
    setIsShowAddMenu(false);
    setCurrentTaskType("add");
    setCurrentTask({
      description: "",
      place: "",
      time: "",
      type: "",
      portfolioStructureReq: "",
      portfolioPresentationReq: "",
      portfolioProcedure: "",
      subjects: [],
      nsis: [],
      mtos: [],
      taskSteps: [],
    });
    setIsShowAddTaskType(false);
  }

  function openAddProjectTask() {
    setIsShowAddProjectTask(true);
    setIsShowAddMenu(false);
    setCurrentTaskType("add");
    setCurrentTask({
      description: "",
      instruction: "",
      control: "",
      type: "",
      portfolioStructureReq: "",
      portfolioPresentationReq: "",
      portfolioProcedure: "",
      subjects: [],
      nsis: [],
      mtos: [],
      taskSteps: [],
    });
    setIsShowAddTaskType(false);
  }

  function openAddTaskBySteps() {
    setIsShowAddTaskBySteps(true);
    setIsShowAddMenu(false);
    setCurrentTaskType("add");
    setCurrentTask({
      description: "",
      place: "",
      time: "",
      type: "",
      portfolioStructureReq: "",
      portfolioPresentationReq: "",
      portfolioProcedure: "",
      subjects: [],
      nsis: [],
      mtos: [],
      taskSteps: [],
    });
    setIsShowAddTaskType(false);
  }

  function openEditPracticalTask(task) {
    if (task.task_type_id === 1) {
      setIsShowAddPracticalTask(true);
      setIsShowAddMenu(false);
    } else if (task.task_type_id === 2) {
      setIsShowAddProjectTask(true);
      setIsShowAddMenu(false);
    } else {
      setIsShowAddTaskBySteps(true);
      setIsShowAddMenu(false);
    }
    setCurrentTaskType("edit");
    setCurrentTask(task);
    setIsShowAddTaskType(false);
  }

  function openRemoveTaskPopup(task) {
    setIsShowRemoveTaskPopup(true);
    setCurrentTask(task);
  }

  function closeRemoveTaskPopup(task) {
    setIsShowRemoveTaskPopup(false);
    setCurrentTask({});
  }

  function backToTaskList() {
    setIsShowAddPracticalTask(false);
    setIsShowAddProjectTask(false);
    setIsShowAddTaskBySteps(false);
    setIsShowAddMenu(true);
    setCurrentTaskType("");
    setCurrentTask({});
  }

  function toggleShowAddMenu() {
    setIsShowAddTaskType(!isShowAddTaskType);
  }

  function handleUploadAdditionalMaterial(material, closePopup) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      const formData = new FormData();
      formData.append('file', material.file);
      formData.append('name', material.name);
      evaluationMaterialApi.uploadAdditionalMaterial({ token: token, omId: dppDescription.om_version_id, taskId: currentTask.id, material: formData })
        .then((res) => {
          const indexTask = tasks.indexOf(tasks.find((elem) => (elem.id === currentTask.id)));
          const findTask = tasks[indexTask];
          const newTask = {...findTask, additional_files: [...findTask.additional_files, res]};
          setTasks([...tasks.slice(0, indexTask), newTask, ...tasks.slice(indexTask + 1)]);
          setCurrentTask(newTask);
          closePopup();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
    }
  }

  function handleRemoveAdditionalMaterial(materialId, closePopup) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      evaluationMaterialApi.removeAdditionalMaterial({ token: token, omId: dppDescription.om_version_id, taskId: currentTask.id, materialId: materialId })
        .then((res) => {
          const indexTask = tasks.indexOf(tasks.find((elem) => (elem.id === currentTask.id)));
          const findTask = tasks[indexTask];
          const newFiles = findTask.additional_files.filter((file) => file.id !== res);
          const newTask = {...findTask, additional_files: newFiles};
          setTasks([...tasks.slice(0, indexTask), newTask, ...tasks.slice(indexTask + 1)]);
          setCurrentTask(newTask);
          closePopup();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
    }
  }

  function handleAddStep(step, closePopup) {
    const token = localStorage.getItem("token");
    setIsLoadingRequest(true);
    if (loggedIn) {
      evaluationMaterialApi.createTaskStep({ 
        token: token, 
        omId: dppDescription.om_version_id, 
        taskId: currentTask.id, 
        step: step
      })
      .then((res) => {
        const indexTask = tasks.indexOf(tasks.find((elem) => (elem.id === currentTask.id)));
        const findTask = tasks[indexTask];
        const newTask = {...findTask, taskSteps: [...findTask.taskSteps, res.data]};
        setTasks([...tasks.slice(0, indexTask), newTask, ...tasks.slice(indexTask + 1)]);
        setCurrentTask(newTask);
        closePopup();
      })
      .catch((err) =>{
        console.log(err);
      })
      .finally(() => setIsLoadingRequest(false));
    }
  }

  function handleEditTaskStep(step, closePopup) {
    const token = localStorage.getItem("token");
    setIsLoadingRequest(true);
    if (loggedIn) {
      evaluationMaterialApi.editTaskStep({ 
        token: token, 
        omId: dppDescription.om_version_id, 
        taskId: currentTask.id, 
        step: step
      })
        .then((res) => {
          const indexTask = tasks.indexOf(tasks.find((elem) => (elem.id === currentTask.id)));
          const findTask = tasks[indexTask];
          const indexStep = findTask.taskSteps.indexOf(findTask.taskSteps.find((elem) => (elem.id === step.id)));
          const newSteps = ([...tasks[indexTask].taskSteps.slice(0, indexStep), res.data, ...tasks[indexTask].taskSteps.slice(indexStep + 1)]);
          const newTask = { ...findTask, taskSteps: newSteps };
          setTasks([...tasks.slice(0, indexTask), newTask, ...tasks.slice(indexTask + 1)]);
          setCurrentTask(newTask);
          closePopup();
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
      }
  }

  function handleChangeOrderTaskStep(steps) {
    const token = localStorage.getItem("token");
    setIsLoadingRequest(true);
    console.log(steps)
    if (loggedIn) {
      evaluationMaterialApi.changeOrderTaskStep({ 
        token: token, 
        omId: dppDescription.om_version_id, 
        taskId: currentTask.id, 
        steps: steps
      })
        .then((res) => {
          const indexTask = tasks.indexOf(tasks.find((elem) => (elem.id === currentTask.id)));
          const findTask = tasks[indexTask];
          const newTask = { ...findTask, taskSteps: res.data };
          setTasks([...tasks.slice(0, indexTask), newTask, ...tasks.slice(indexTask + 1)]);
          setCurrentTask(newTask);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
      }
  }

  function handleRemoveTaskStep(step) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      evaluationMaterialApi.removeTaskStep({
        token: token, 
        omId: dppDescription.om_version_id, 
        taskId: currentTask.id, 
        stepId: step.id
      })
        .then((res) => {
          const indexTask = tasks.indexOf(tasks.find((elem) => (elem.id === currentTask.id)));
          const findTask = tasks[indexTask];
          const newFiles = findTask.taskSteps.filter((file) => file.id !== res);
          const newTask = {...findTask, taskSteps: newFiles};
          setTasks([...tasks.slice(0, indexTask), newTask, ...tasks.slice(indexTask + 1)]);
          setCurrentTask(newTask);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
    }
  }

  function handleAddMTO(mto, closePopup) {
    const token = localStorage.getItem("token");
    setIsLoadingRequest(true);
    if (loggedIn) {
      evaluationMaterialApi.createTaskMTO({ 
        token: token, 
        dppId: dppDescription.id, 
        mto: mto
      })
      .then((res) => {
        setMTO([...MTO, res]);
        closePopup();
      })
      .catch((err) =>{
        console.log(err);
      })
      .finally(() => setIsLoadingRequest(false));
    }
  }

  function handleEditMTO(mto, mtoId, closePopup) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      evaluationMaterialApi.editTaskMTO({ 
        token: token,
        dppId: dppDescription.id,
        mtoId: mtoId,
        mto: mto
      })
      .then((res) => {
        console.log(res);
        const index = MTO.indexOf(MTO.find((elem) => (elem.id === res.id)));
        setMTO([...MTO.slice(0, index), res, ...MTO.slice(index + 1)]);
        const indexTaskMTO = currentTask.mtos.indexOf(currentTask.mtos.find((elem) => (elem.id === res.id)));
        setCurrentTask({...currentTask, mtos: [...currentTask.mtos.slice(0, indexTaskMTO), res, ...currentTask.mtos.slice(indexTaskMTO + 1)]});
        closePopup();
      })
      .catch((err) =>{
        console.log(err);
      })
      .finally(() => setIsLoadingRequest(false));
    }
  }

  function handleRemoveMTO(mtoId, closePopup) {
    const token = localStorage.getItem("token");
    setIsLoadingRequest(true);
    evaluationMaterialApi.removeTaskMTO({ 
      token: token, 
      dppId: dppDescription.id, 
      mtoId: mtoId
    })
    .then((res) => {
      const newMTO = MTO.filter(elem => elem.id !== res);
      setMTO(newMTO);
      setCurrentTask({...currentTask, mtos: currentTask.mtos.filter((elem) => elem.id !== res)});
      closePopup();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoadingRequest(false));
  }

  function handleSelectTaskMTO(taskId, mtos, closePopup) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      evaluationMaterialApi.selectTaskMTO({ 
        token: token, 
        omId: dppDescription.om_version_id, 
        taskId: taskId,
        mtos: mtos,
      })
        .then((res) => {
          setCurrentTask({...currentTask, mtos: res});
          closePopup();
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
      }
  }

  function handleUnSelectTaskMTO(taskId, mtoId) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      evaluationMaterialApi.unSelectTaskMTO({ 
        token: token, 
        omId: dppDescription.om_version_id, 
        taskId: taskId,
        mtoId: mtoId
      })
        .then((res) => {
          setCurrentTask({...currentTask, mtos: currentTask.mtos.filter((elem) => elem.id !== res)});
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
      }
  }

  function handleEditAssessmentObject(taskId, subjectId, object, closePopup) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      evaluationMaterialApi.editObject({ 
        token: token, 
        omId: dppDescription.om_version_id, 
        taskId: taskId, 
        subjectId: subjectId, 
        object: object
      })
        .then((res) => {
          const indexTask = tasks.indexOf(tasks.find((elem) => (elem.id === taskId)));
          const findTask = tasks[indexTask];
          const indexSubject = findTask.subjects.indexOf(findTask.subjects.find((elem) => (elem.id === subjectId)));
          const findSubject = findTask.subjects[indexSubject];
          const indexObject = findSubject.objects.indexOf(findSubject.objects.find((elem) => (elem.id === object.id)));
          const newObjects = [...findSubject.objects.slice(0, indexObject), res, ...findSubject.objects.slice(indexObject + 1)];
          const newSubject = {...findSubject, objects: newObjects};
          const newSubjects = ([...tasks[indexTask].subjects.slice(0, indexSubject), newSubject, ...tasks[indexTask].subjects.slice(indexSubject + 1)]);
          const newTask = { ...findTask, subjects: newSubjects };
          setTasks([...tasks.slice(0, indexTask), newTask, ...tasks.slice(indexTask + 1)]);
          setCurrentTask(newTask);
          closePopup();
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
      }
  }

  function handleRemoveAssessmentObject(taskId, subjectId, objectId, closePopup) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      evaluationMaterialApi.removeObject({ 
        token: token, 
        omId: dppDescription.om_version_id, 
        taskId: taskId, 
        subjectId: subjectId, 
        objectId: objectId 
      })
        .then(() => {
          const indexTask = tasks.indexOf(tasks.find((elem) => (elem.id === taskId)));
          const findTask = tasks[indexTask];
          const indexSubject = findTask.subjects.indexOf(findTask.subjects.find((elem) => (elem.id === subjectId)));
          const findSubject = findTask.subjects[indexSubject];
          const newSubject = {...findSubject, objects: findSubject.objects.filter((elem) => elem.id !== objectId)};
          const newSubjects = ([...tasks[indexTask].subjects.slice(0, indexSubject), newSubject, ...tasks[indexTask].subjects.slice(indexSubject + 1)]);
          const newTask = { ...findTask, subjects: newSubjects };
          setTasks([...tasks.slice(0, indexTask), newTask, ...tasks.slice(indexTask + 1)]);
          setCurrentTask(newTask);
          closePopup();
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
      }
  }

  function handleAddAssessmentObject(taskId, subjectId, object, closePopup) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      evaluationMaterialApi.addAssessmentObject({ 
        token: token, 
        omId: dppDescription.om_version_id, 
        taskId: taskId, 
        subjectId: subjectId, 
        object: object 
      })
        .then((res) => {
          const indexTask = tasks.indexOf(tasks.find((elem) => (elem.id === taskId)));
          const findTask = tasks[indexTask];
          const indexSubject = findTask.subjects.indexOf(findTask.subjects.find((elem) => (elem.id === subjectId)));
          const findSubject = findTask.subjects[indexSubject];
          const newSubject = { ...findSubject, objects: [...findSubject.objects, res]}
          const newSubjects = ([...tasks[indexTask].subjects.slice(0, indexSubject), newSubject, ...tasks[indexTask].subjects.slice(indexSubject + 1)]);
          const newTask = { ...findTask, subjects: newSubjects };
          setTasks([...tasks.slice(0, indexTask), newTask, ...tasks.slice(indexTask + 1)]);
          setCurrentTask(newTask);
          closePopup();
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
      }
  }

  function handleRemoveAssessmentItem(taskId, subjectId, closePopup) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      evaluationMaterialApi.removeAssessmentItem({ 
        token: token, 
        omId: dppDescription.om_version_id, 
        taskId: taskId, 
        subjectId: subjectId,
      })
        .then(() => {
          const indexTask = tasks.indexOf(tasks.find((elem) => (elem.id === taskId)));
          const findTask = tasks[indexTask];
          const newTask = {...findTask, subjects: findTask.subjects.filter((elem) => elem.id !== subjectId)};
          setTasks([...tasks.slice(0, indexTask), newTask, ...tasks.slice(indexTask + 1)]);
          setCurrentTask(newTask);
          closePopup();
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
      }
  }

  function handleAddAssessmentItem(taskId, subject, closePopup) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      evaluationMaterialApi.addAssessmentItem({ token: token, omId: dppDescription.om_version_id, taskId: taskId, subject: subject })
        .then((res) => {
          const index = tasks.indexOf(tasks.find((elem) => (elem.id === taskId)));
          const findTask = tasks[index];
          const newTask = { ...findTask, subjects: [...findTask.subjects, res]};
          setTasks([...tasks.slice(0, index), newTask, ...tasks.slice(index + 1)]);
          setCurrentTask(newTask);
          closePopup();
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
      }
  }

  function handleAddTask(task) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      evaluationMaterialApi.createTask({ token: token, omId: dppDescription.om_version_id, task: task })
        .then((res) => {
          console.log(res);
          setTasks([...tasks, res]);
          setCurrentTask(res);
          setCurrentTaskType("edit");
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
      }
  }

  function handleEditPracticalTask(task, id) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      evaluationMaterialApi.editTask({ token: token, omId: dppDescription.om_version_id, task: task, taskId: id })
        .then((res) => {
          const index = tasks.indexOf(tasks.find((elem) => (elem.id === res.id)));
          setTasks([...tasks.slice(0, index), res, ...tasks.slice(index + 1)]);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
      }
  }
  

  function handleRemovePracticalTask(task, closePopup) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      evaluationMaterialApi.removeTask({ token: token, omId: dppDescription.om_version_id, taskId: task.id })
        .then((res) => {
          const newTasks = tasks.filter((elem) => elem.id !== res)
          setTasks(newTasks);
          closePopup();
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
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
          setMTO(res.mtos);
          const sum = res.tasks.map((elem) => Number(elem.time)).reduce(function summarize(sum, number) {
            const updatedSum = sum + number;
            return updatedSum;
          }, 0);
          setTotalTime(sum);
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
    setCurrentTask({});
    return () => {
      setTasks([]);
      setSkills([]);
      setAbilities([]);
      setMTO([]);
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
      {
        isShowAddMenu &&
        <>
          <p className="main__subtitle">Для работы с оценочными материалами выберите или создайте новое задание.</p> 

          <div className="task__add-container">
            <div className="task__add">
              {
                isEditRights &&
                <button className={`btn btn_type_add task__add-btn ${isShowAddTaskType ? "task__add-btn_type_show" : "task__add-btn_type_hide"}`}type="button" onClick={toggleShowAddMenu}>Добавить задание</button>
              }
              <div className={`task__add-menu ${isShowAddTaskType ? "task__add-menu_type_show" : "task__add-menu_type_hide"}`}>
                <button className="btn task__menu-btn" type="button" onClick={openAddPracticalTask}>Практическое задание</button>
                <button className="btn task__menu-btn" type="button" onClick={openAddProjectTask}>Проектное задание</button>
                <button className="btn task__menu-btn" type="button" onClick={openAddTaskBySteps}>Задание по шагам</button>
              </div>
            </div>
            <a className="btn knowledge-item__btn knowledge-item__btn_export" href={`https://constructor-api.emiit.ru/dpps/${dppDescription.id}/export_tasks`} target="_blank" rel="noreferrer">Экспорт в Word</a>
          </div>
          <h5 className="practical-task__item-name">Добавленные задания (Общее время: {Math.round(totalTime / 45)} ч. или {totalTime} мин.)</h5>
          <ul className="task__list">
            {
              tasks.map((elem, i) => (
                <TaskItem 
                key={elem.id} 
                task={elem} 
                index={i} 
                onEdit={openEditPracticalTask} 
                onRemove={openRemoveTaskPopup} 
                isEditRights={isEditRights} 
                />
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
      <PracticalTask
      currentTask={currentTask} 
      currentTaskType={currentTaskType}
      skills={skills}
      abilities={abilities}
      onBack={backToTaskList}
      onAdd={handleAddTask}
      onEdit={handleEditPracticalTask}
      onAddSubject={handleAddAssessmentItem}
      onAddObject={handleAddAssessmentObject}
      onRemoveSubject={handleRemoveAssessmentItem}
      onEditObject={handleEditAssessmentObject}
      onRemoveObject={handleRemoveAssessmentObject}
      MTO={MTO}
      onAddMTO={handleAddMTO}
      onEditMTO={handleEditMTO}
      onRemoveMTO={handleRemoveMTO}
      onSelectMTO={handleSelectTaskMTO}
      onUnSelectMTO={handleUnSelectTaskMTO}
      onAddAdditionalMaterial={handleUploadAdditionalMaterial}
      onRemoveAdditionalMaterial={handleRemoveAdditionalMaterial}
      isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isShowAddProjectTask &&
      <ProjectTask 
      currentTask={currentTask} 
      currentTaskType={currentTaskType}
      skills={skills}
      abilities={abilities}
      onBack={backToTaskList}
      onAdd={handleAddTask}
      onEdit={handleEditPracticalTask}
      onAddSubject={handleAddAssessmentItem}
      onAddObject={handleAddAssessmentObject}
      onRemoveSubject={handleRemoveAssessmentItem}
      onEditObject={handleEditAssessmentObject}
      onRemoveObject={handleRemoveAssessmentObject}
      MTO={MTO}
      onAddMTO={handleAddMTO}
      onEditMTO={handleEditMTO}
      onRemoveMTO={handleRemoveMTO}
      onSelectMTO={handleSelectTaskMTO}
      onUnSelectMTO={handleUnSelectTaskMTO}
      onAddAdditionalMaterial={handleUploadAdditionalMaterial}
      onRemoveAdditionalMaterial={handleRemoveAdditionalMaterial}
      isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isShowAddTaskBySteps &&
      <TaskBySteps
      currentTask={currentTask} 
      currentTaskType={currentTaskType}
      skills={skills}
      abilities={abilities}
      onBack={backToTaskList}
      onAdd={handleAddTask}
      onEdit={handleEditPracticalTask}
      onAddSubject={handleAddAssessmentItem}
      onAddObject={handleAddAssessmentObject}
      onRemoveSubject={handleRemoveAssessmentItem}
      onEditObject={handleEditAssessmentObject}
      onRemoveObject={handleRemoveAssessmentObject}
      onAddStep={handleAddStep}
      onEditStep={handleEditTaskStep}
      onChangeOrder={handleChangeOrderTaskStep}
      onRemoveStep={handleRemoveTaskStep}
      MTO={MTO}
      onAddMTO={handleAddMTO}
      onEditMTO={handleEditMTO}
      onRemoveMTO={handleRemoveMTO}
      onSelectMTO={handleSelectTaskMTO}
      onUnSelectMTO={handleUnSelectTaskMTO}
      onAddAdditionalMaterial={handleUploadAdditionalMaterial}
      onRemoveAdditionalMaterial={handleRemoveAdditionalMaterial}
      isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isShowRemoveTaskPopup &&
      <RemoveTaskPopup 
        isOpen={isShowRemoveTaskPopup}
        onClose={closeRemoveTaskPopup}  
        currentTask={currentTask}
        onConfirm={handleRemovePracticalTask}
        isLoading={isLoadingRequest}
      />

    }
    </>
  );
}

export default Tasks;