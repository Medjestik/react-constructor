import React from 'react';
import './Tasks.css';
import * as evaluationMaterialApi from '../../../../utils/evaluationMaterialApi/evaluationMaterialApi.js';
import * as api from '../../../../utils/api.js';
import PracticalTask from './PracticalTask/PracticalTask.js';
import TaskItem from './TaskItem/TaskItem.js';
import Preloader from '../../../Preloader/Preloader.js';
import EditNsiPopup from '../../../Popup/EditNsiPopup/EditNsiPopup.js';
import RemoveNsiPopup from '../../../Popup/RemoveNsiPopup/RemoveNsiPopup.js';

function Tasks({ loggedIn, dppDescription, isEditRights }) {

  const [isShowAddTaskType, setIsShowAddTaskType] = React.useState(false);
  const [isShowAddPracticalTask, setIsShowAddPracticalTask] = React.useState(false);
  const [isShowAddMenu, setIsShowAddMenu] = React.useState(true);
  const [tasks, setTasks] = React.useState([]);
  const [skills, setSkills] = React.useState([]);
  const [abilities, setAbilities] = React.useState([]);
  const [currentTask, setCurrentTask] = React.useState({});
  const [currentTaskType, setCurrentTaskType] = React.useState("");
  const [nsi, setNsi] = React.useState([]);
  const [nsiTypes, setNsiTypes] = React.useState([]);
  const [currentNsiItem, setCurrentNsiItem] = React.useState({});
  const [isRemoveNsiPopupOpen, setIsRemoveNsiPopupOpen] = React.useState(false);
  const [isEditNsiPopupOpen , setIsEditNsiPopupOpen] = React.useState(false);
  const [MTO, setMTO] = React.useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = React.useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);

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
    });
    setIsShowAddTaskType(false);
  }

  function openEditPracticalTask(task) {
    setIsShowAddPracticalTask(true);
    setIsShowAddMenu(false);
    setCurrentTaskType("edit");
    setCurrentTask(task);
    setIsShowAddTaskType(false);
  }

  function backToTaskList() {
    setIsShowAddPracticalTask(false);
    setIsShowAddMenu(true);
    setCurrentTaskType("");
    setCurrentTask({});
  }

  function toggleShowAddMenu() {
    setIsShowAddTaskType(!isShowAddTaskType);
  }

  function openRemoveNsiPopup(nsi) {
    setCurrentNsiItem(nsi);
    setIsRemoveNsiPopupOpen(true);
  }

  function openEditNsiPopup(nsi) {
    setCurrentNsiItem(nsi);
    setIsEditNsiPopupOpen(true);
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

  function handleAddNsi(elem, closeAllNsiPopup) {
    const token = localStorage.getItem("token");
    setIsLoadingRequest(true);
    if (loggedIn) {
      api.createNsiElem({ 
        token: token, 
        initialDataVersion:dppDescription.ish_version_id, 
        elem: elem
      })
      .then((res) => {
        setNsi([...nsi, res]);
        closeAllNsiPopup();
      })
      .catch((err) =>{
        console.log(err);
      })
      .finally(() => setIsLoadingRequest(false));
    }
  }

  function handleRemoveNsi(id) {
    const token = localStorage.getItem("token");
    setIsLoadingRequest(true);
    api.removeNsiElem({ 
      token: token, 
      initialDataVersion: dppDescription.ish_version_id, 
      id: id
    })
    .then((res) => {
      const newNsi = nsi.filter(elem => elem.id !== res);
      setNsi(newNsi);
      setCurrentTask({...currentTask, nsis: currentTask.nsis.filter((elem) => elem.id !== res)});
      console.log(currentTask);
      closeNsiPopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoadingRequest(false));
  }

  function handleEditNsi(elem) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.editNsiElem({ 
        token: token, 
        initialDataVersion:dppDescription.ish_version_id, 
        elem: elem,
        id: currentNsiItem.id
      })
      .then((res) => {
        const index = nsi.indexOf(nsi.find((elem) => (elem.id === currentNsiItem.id)));
        setNsi([...nsi.slice(0, index), res, ...nsi.slice(index + 1)]);
        closeNsiPopups();
      })
      .catch((err) =>{
        console.log(err);
      })
      .finally(() => setIsLoadingRequest(false));
    }
  }

  function handleSelectTaskNsi(taskId, nsis, closePopup) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      evaluationMaterialApi.selectTaskNsi({ 
        token: token, 
        omId: dppDescription.om_version_id, 
        taskId: taskId,
        nsis: nsis,
      })
        .then((res) => {
          setCurrentTask({...currentTask, nsis: res});
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

  function handleUnSelectTaskNsi(taskId, nsiId) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      evaluationMaterialApi.unSelectTaskNsi({ 
        token: token, 
        omId: dppDescription.om_version_id, 
        taskId: taskId,
        nsiId: nsiId
      })
        .then((res) => {
          setCurrentTask({...currentTask, nsis: currentTask.nsis.filter((elem) => elem.id !== res)});
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

  function handleAddPracticalTask(task) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      evaluationMaterialApi.createTask({ token: token, omId: dppDescription.om_version_id, task: task })
        .then((res) => {
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
          setCurrentTaskType(res);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
      }
  }

  function handleRemovePracticalTask(task) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      evaluationMaterialApi.removeTask({ token: token, omId: dppDescription.om_version_id, taskId: task.id })
        .then((res) => {
          const newTasks = tasks.filter((elem) => elem.id !== res)
          setTasks(newTasks);
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
          console.log(res);
          setTasks(res.tasks);
          setSkills(res.skills);
          setAbilities(res.abilities);
          res.nsis.sort(function(a,b) {
            return parseInt(a.type.position) - parseInt(b.type.position);
          })
          setNsi(res.nsis);
          setNsiTypes(res.nsi_types);
          setMTO(res.mtos);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingTasks(false);
        });
    }
  }

  function closeNsiPopups() {
    setIsRemoveNsiPopupOpen(false);
    setIsEditNsiPopupOpen(false);
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
          <div className="task__add">
            {
              isEditRights &&
              <button className={`btn btn_type_add task__add-btn ${isShowAddTaskType ? "task__add-btn_type_show" : "task__add-btn_type_hide"}`}type="button" onClick={toggleShowAddMenu}>Добавить задание</button>
            }
            <div className={`task__add-menu ${isShowAddTaskType ? "task__add-menu_type_show" : "task__add-menu_type_hide"}`}>
              <button className="btn task__menu-btn" type="button" onClick={openAddPracticalTask}>Практическое задание</button>
            </div>
          </div>
          <h5 className="practical-task__item-name">Добавленные задания</h5>
          <ul className="task__list">
            {
              tasks.map((elem, i) => (
                <TaskItem 
                key={elem.id} 
                task={elem} 
                index={i} 
                onEdit={openEditPracticalTask} 
                onRemove={handleRemovePracticalTask} 
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
      onAdd={handleAddPracticalTask}
      onEdit={handleEditPracticalTask}
      onAddSubject={handleAddAssessmentItem}
      onAddObject={handleAddAssessmentObject}
      onRemoveSubject={handleRemoveAssessmentItem}
      onRemoveObject={handleRemoveAssessmentObject}
      nsi={nsi}
      nsiTypes={nsiTypes}
      onSelectNsi={handleSelectTaskNsi}
      onUnSelectNsi={handleUnSelectTaskNsi}
      onAddNsi={handleAddNsi}
      onEditNsi={openEditNsiPopup}
      onRemoveNsi={openRemoveNsiPopup}
      MTO={MTO}
      onAddMTO={handleAddMTO}
      onEditMTO={handleEditMTO}
      onRemoveMTO={handleRemoveMTO}
      onSelectMTO={handleSelectTaskMTO}
      onUnSelectMTO={handleUnSelectTaskMTO}
      isLoadingRequest={isLoadingRequest}
      />
    }
    {
      isEditNsiPopupOpen &&
      <EditNsiPopup
        isOpen={isEditNsiPopupOpen}
        onClose={closeNsiPopups}  
        nsi={currentNsiItem}
        onEdit={handleEditNsi}
        isLoading={isLoadingRequest}
      />
      }
      {
        isRemoveNsiPopupOpen &&
        <RemoveNsiPopup
          isOpen={isRemoveNsiPopupOpen}
          onClose={closeNsiPopups}  
          nsi={currentNsiItem}
          onRemove={handleRemoveNsi}
          isLoading={isLoadingRequest}
        />
      }
    </>
  );
}

export default Tasks;