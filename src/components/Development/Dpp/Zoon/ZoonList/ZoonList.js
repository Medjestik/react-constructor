import React from 'react';
import './ZoonList.css';
import * as api from '../../../../../utils/api.js';
import Preloader from '../../../../Preloader/Preloader.js';
import DefineZoonOptionPopup from '../DefineZoonOptionPopup/DefineZoonOptionPopup.js';
import BuildCompetence from '../BuildCompetence/BuildCompetence.js';
import AddNodePopup from '../AddNodePopup/AddNodePopup.js';
import ConfirmRemovePopup from '../ConfirmRemovePopup/ConfirmRemovePopup.js';
import SortElementPopup from '../SortElementPopup/SortElementPopup.js';
import SwapChildrenPopup from '../SwapChildrenPopup/SwapChildrenPopup.js';
import ErrorRemovePopup from '../ErrorRemovePopup/ErrorRemovePopup.js';
import ErrorDragAndDropPopup from '../ErrorDragAndDropPopup/ErrorDragAndDropPopup.js';
import NsiPopup from '../../../../Popup/NsiPopup/NsiPopup.js';
import EditNsiPopup from '../../../../Popup/EditNsiPopup/EditNsiPopup.js';
import RemoveNsiPopup from '../../../../Popup/RemoveNsiPopup/RemoveNsiPopup.js';
import MoveElementPopup from '../MoveElementPopup/MoveElementPopup.js';

function ZoonList({ dppDescription, loggedIn, isEditRights }) {

  const [data, setData] = React.useState([]);
  const [nsiProgram, setNsiProgram] = React.useState([]);
  const [nsiTypes, setNsiTypes] = React.useState([]);

  const [isRendering, setIsRendering] = React.useState(true);

  console.log(data);

  const [currentNode, setCurrentNode] = React.useState({});
  const [nodeChildren, setNodeChildren] = React.useState([]);
  const [currentNodeType, setCurrentNodeType] = React.useState({});
  const [currentNsiItem, setCurrentNsiItem] = React.useState({});
  const [currentActionType, setCurrentActionType] = React.useState("");
  const [isOpenZoonOptionPopup, setOpenZoonOptionPopup] = React.useState(false);
  const [isAddNodePopupOpen, setIsAddNodePopupOpen] = React.useState(false);
  const [isSortElementPopupOpen, setIsSortElementPopupOpen] = React.useState(false);
  const [isSwapChildrenPopupOpen, setIsSwapChildrenPopupOpen] = React.useState(false);
  const [isConfirmRemovePopupOpen, setIsConfirmRemovePopupOpen] = React.useState(false);
  const [isErrorRemovePopupOpen, setIsErrorRemovePopupOpen] = React.useState(false);
  const [isMoveElementPopupOpen, setIsMoveElementPopupOpen] = React.useState(false);

  const [errorDragAndDrop, setErrorDragAndDrop] = React.useState('');
  const [isErrorDragAndDropPopupOpen, setIsErrorDragAndDropPopupOpen] = React.useState(false);

  const [isAddNsiPopupOpen, setIsAddNsiPopupOpen] = React.useState(false);
  const [isEditNsiPopupOpen, setIsEditNsiPopupOpen] = React.useState(false);  
  const [isRemoveNsiPopupOpen, setIsRemoveNsiPopupOpen] = React.useState(false);

  const [isBuildCompetencePopupOpen, setIsBuildCompetencePopupOpen] = React.useState(false);

  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isErrorRequest, setIsErrorRequest] = React.useState(false);
  const [isLoadingZoonRequest, setIsLoadingZoonRequest] = React.useState(false);

  function onClickNode(elem, type) {
    setCurrentNode(elem);
    setCurrentNodeType(type);
    setOpenZoonOptionPopup(true);
  }

  function openMoveNodePopup(node) {
    setCurrentNode(node);
    setIsErrorRequest(false);
    setIsMoveElementPopupOpen(true);
  }

  function handleMoveNode(draggedNode, droppedNode) {
    const token = localStorage.getItem("token");
      api.moveNode(({ 
        token: token, 
        dppId: dppDescription.id,
        elem_type: draggedNode.type,
        elem_id: draggedNode.id,
        to_type: droppedNode.type,
        to_id: droppedNode.id
      }))
        .then(() => {
          const newNode = {...draggedNode, pid: droppedNode.id};
          const index = data.zoons.indexOf(data.zoons.find((elem) => (elem.id === draggedNode.id)));
          setData({...data, zoons: [...data.zoons.slice(0, index), newNode, ...data.zoons.slice(index + 1)]});
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          closeZoonListPopups();
        })
  }

  function openBuildCompetencePopup() {
    setIsErrorRequest(false);
    setIsBuildCompetencePopupOpen(true);
    setCurrentActionType("add");
  }

  function handleBuildCompetence(zoon, competence, nodesId) {
    const token = localStorage.getItem("token");
    setIsLoadingRequest(true);
    api.buildCompetence(({ token: token, zoonVersion: dppDescription.zun_version_id, node: competence, nodesId: nodesId }))
    .then((res) => {
      const newNodes = data.zoons.map((elem) => {
        if (nodesId.includes(elem.id)) {
          elem.pid = res.id;
        }
        return elem;
      });
      setData({...data, zoons: [...newNodes, res]});
      setIsErrorRequest(false);
      closeZoonListPopups();
    })
    .catch((err) => {
      setIsErrorRequest(true);
      console.error(err);
    })
    .finally(() => {
      setIsLoadingRequest(false);
    });
  }

  function openEditCompetencePopup(nodeId, zoon) {
    setIsErrorRequest(false);
    setCurrentActionType("edit");
    const node = data.zoons.find(elem => elem.id === nodeId);
    setCurrentNode(node);
    setIsBuildCompetencePopupOpen(true);
  }

  function handleEditCompetence(zoon, competence, competenceId) {
    const token = localStorage.getItem("token");
    setIsLoadingRequest(true);
    api.editCompetence(({ token: token, zoonVersion: dppDescription.zun_version_id, node: competence, competenceId: competenceId }))
    .then((res) => {
      const index = data.zoons.indexOf(data.zoons.find((elem) => (elem.id === competenceId)));
      setData({...data, zoons: [...data.zoons.slice(0, index), res, ...data.zoons.slice(index + 1)]});
      closeZoonListPopups();
      setIsErrorRequest(false);
    })
    .catch((err) => {
      setIsErrorRequest(true);
      console.error(err);
    })
    .finally(() => {
      setIsLoadingRequest(false);
    });
  }

  function handleCreateNewSkill() {
    const data = { id: parseInt(new Date().getTime()), pid: "", tags: ["skill"], };
    setCurrentActionType("add");
    setCurrentNode(data);
    setIsAddNodePopupOpen(true);
  }

  function handleCreateNewAbility() {
    const data = { id: parseInt(new Date().getTime()), pid: "", tags: ["ability"], };
    setCurrentActionType("add");
    setCurrentNode(data);
    setIsAddNodePopupOpen(true);
  }

  function handleAddNodeWithParent(nodeId, zoon, type) {
    const node = data.zoons.find(elem => elem.id === nodeId);
    let children = data.zoons.filter((elem) => (nodeId === elem.pid)); 
    setIsErrorRequest(false);
    setCurrentActionType("add");
    if (node.tags[0] === "competence" && children.length > 0) {
      children.forEach((elem) => {
        if (elem.id.includes("a") && type === "skill") {
          setErrorDragAndDrop("Невозможно присоединить навык к компетенции, так как она уже содержит умения.");
          setIsErrorDragAndDropPopupOpen(true);
        } else if (elem.id.includes("s") && type === "ability") {
          setErrorDragAndDrop("Невозможно присоединить умение к компетенции, так как она уже содержит навыки.");
          setIsErrorDragAndDropPopupOpen(true);
        } else {
          const newNode = { id: parseInt(new Date().getTime()), pid: nodeId, tags: [type], };
          setCurrentNode(newNode);
          setIsAddNodePopupOpen(true);
        }
      })
    } else {
      const newNode = { id: parseInt(new Date().getTime()), pid: nodeId, tags: [type], };
      setCurrentNode(newNode);
      setIsAddNodePopupOpen(true);
    }
  }

  function handleAddNode(zoon, node) {
    const token = localStorage.getItem("token");
    setIsErrorRequest(false);
    setIsLoadingRequest(true);
    switch(node.tags[0]) {
      case 'knowledge':
        api.addKnowledge(({ token: token, zoonVersion: dppDescription.zun_version_id, node: node }))
        .then((res) => {
          closeZoonListPopups();
          setData({...data, zoons: [...data.zoons, res]});
        })
        .catch((err) => {
          setIsErrorRequest(true);
          console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
        break;
      case 'ability':
        api.addAbility(({ token: token, zoonVersion: dppDescription.zun_version_id, node: node }))
        .then((res) => {
          closeZoonListPopups();
          setData({...data, zoons: [...data.zoons, res]});
        })
        .catch((err) => {
          setIsErrorRequest(true);
          console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
        break;
      case 'skill':
        api.addSkill(({ token: token, zoonVersion: dppDescription.zun_version_id, node: node }))
        .then((res) => {
          closeZoonListPopups();
          setData({...data, zoons: [...data.zoons, res]});
        })
        .catch((err) => {
          setIsErrorRequest(true);
          console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
        break;
      default: 
        return false;
    }
  }

  function openEditNodePopup(nodeId, zoon) {
    setIsErrorRequest(false);
    setCurrentActionType("edit");
    const node = data.zoons.find(elem => elem.id === nodeId);
    setCurrentNode(node);
    setIsAddNodePopupOpen(true);
  }

  function handleEditNode(zoon, node) {
    const token = localStorage.getItem("token");
    setIsLoadingRequest(true);
    setIsErrorRequest(false);
    switch(node.tags[0]) {
      case 'knowledge':
        api.editKnowledge(({ token: token, zoonVersion: dppDescription.zun_version_id, nodeId: node.id, node: node }))
        .then((res) => {
          const index = data.zoons.indexOf(data.zoons.find((elem) => (elem.id === node.id)));
          setData({...data, zoons: [...data.zoons.slice(0, index), res, ...data.zoons.slice(index + 1)]});
          closeZoonListPopups();
        })
        .catch((err) => {
          setIsErrorRequest(true);
          console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
        break;
      case 'ability':
        api.editAbility(({ token: token, zoonVersion: dppDescription.zun_version_id, nodeId: node.id, node: node }))
        .then((res) => {
          const index = data.zoons.indexOf(data.zoons.find((elem) => (elem.id === node.id)));
          setData({...data, zoons: [...data.zoons.slice(0, index), res, ...data.zoons.slice(index + 1)]});
          closeZoonListPopups();
        })
        .catch((err) => {
          setIsErrorRequest(true);
          console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
        break;
      case 'skill':
        api.editSkill(({ token: token, zoonVersion: dppDescription.zun_version_id, nodeId: node.id, node: node }))
        .then((res) => {
          const index = data.zoons.indexOf(data.zoons.find((elem) => (elem.id === node.id)));
          setData({...data, zoons: [...data.zoons.slice(0, index), res, ...data.zoons.slice(index + 1)]});
          closeZoonListPopups();
        })
        .catch((err) => {
          setIsErrorRequest(true);
          console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
        break;
      default: 
        return false;
    }
  }

  function openAddNsiPopup() {
    setIsAddNsiPopupOpen(true);
  }

  function handleAddNsi(elem, closeAllNsiPopup) {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.createNsiElem({ 
        token: token, 
        initialDataVersion:dppDescription.ish_version_id, 
        elem: elem
      })
      .then((res) => {
        setNsiProgram([...nsiProgram, res]);
        console.log(closeAllNsiPopup);
        closeAllNsiPopup();
      })
      .catch((err) =>{
        console.log(err);
      })
    }
  }

  function openEditNsiPopup(nsi) {
    setCurrentNsiItem(nsi);
    setIsEditNsiPopupOpen(true);
  }

  function handleEditNsi(elem) {
    setIsLoadingZoonRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.editNsiElem({ 
        token: token, 
        initialDataVersion:dppDescription.ish_version_id, 
        elem: elem,
        id: currentNsiItem.id
      })
      .then((res) => {
        const index = nsiProgram.indexOf(nsiProgram.find((elem) => (elem.id === currentNsiItem.id)));
        setNsiProgram([...nsiProgram.slice(0, index), res, ...nsiProgram.slice(index + 1)]);
        closeNsiPopup();
      })
      .catch((err) =>{
        console.log(err);
      })
      .finally(() => setIsLoadingZoonRequest(false));
    }
  }

  function openRemoveNsiPopup(nsi) {
    setCurrentNsiItem(nsi);
    setIsRemoveNsiPopupOpen(true);
  }

  function handleRemoveNsi(id) {
    const token = localStorage.getItem("token");
    setIsLoadingZoonRequest(true);
    api.removeNsiElem({ 
      token: token, 
      initialDataVersion: dppDescription.ish_version_id, 
      id: id
    })
    .then((res) => {
      const newNsi = nsiProgram.filter(part => part.id !== res);
      setNsiProgram(newNsi);
      closeNsiPopup();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoadingZoonRequest(false));
  }

  function openRemoveNodePopup(nodeId, zoon, type) {
    const node = data.zoons.find(el=> el.id === nodeId);
    const children = data.zoons.filter(el => el.pid === node.id);
    if (children.length > 0) {
      setIsErrorRemovePopupOpen(true);
    } else {
      setIsConfirmRemovePopupOpen(true);
    }
  }

  function handleRemoveNode(zoon, nodeId, type) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    switch(type) {
      case 'Знание':
        api.removeKnowledge(({ token: token, zoonVersion: dppDescription.zun_version_id, nodeId: nodeId }))
        .then((res) => {
          const newNodes = data.zoons.filter((elem) => elem.id !== res);
          setData({...data, zoons: newNodes});
          closeZoonListPopups();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
        break;
      case 'Умение':
        api.removeAbility(({ token: token, zoonVersion: dppDescription.zun_version_id, nodeId: nodeId }))
        .then((res) => {
          const newNodes = data.zoons.filter((elem) => elem.id !== res);
          setData({...data, zoons: newNodes});
          closeZoonListPopups();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
        break;
      case 'Навык':
        api.removeSkill(({ token: token, zoonVersion: dppDescription.zun_version_id, nodeId: nodeId }))
        .then((res) => {
          const newNodes = data.zoons.filter((elem) => elem.id !== res);
          setData({...data, zoons: newNodes});
          closeZoonListPopups();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
        break;
        case 'Компетенция':
          api.removeCompetence(({ token: token, zoonVersion: dppDescription.zun_version_id, nodeId: nodeId }))
          .then((res) => {
            const newNodes = data.zoons.filter((elem) => elem.id !== res);
            setData({...data, zoons: newNodes});
            closeZoonListPopups();
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            setIsLoadingRequest(false);
          });
          break;
      default: 
        return false;
      }
  }

  function openSwapChildrenPopup(nodeId, zoon) {
    setIsSwapChildrenPopupOpen(true);
    let children = data.zoons.filter((elem) => (nodeId === elem.pid));
    children.sort(function(a, b) {
      return parseInt(a.position) - parseInt(b.position);
    });
    setNodeChildren(children);
  }

  function handleSwapChildren(children) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    api.swapChildren({ token: token, zoonVersion: dppDescription.zun_version_id, nodeId: currentNode.id, children: children })
    .then(() => {
      const childrenNodes = children.map((childId, i) => {
        return data.zoons.find((node) => (node.id === childId ? node.position = i + 1 : false));
      })
      const filteredNodes = data.zoons.filter(node => !children.includes(node.id));
      const newNodes = [...filteredNodes, ...childrenNodes]
      setData({...data, zoons: newNodes});
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      closeZoonListPopups();
      setIsLoadingRequest(false);
    });
  }

  function sortElementPopupOpen() {
    closeZoonListPopups();
    setIsSortElementPopupOpen(true);
  }

  function handleSortElement(elements) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    api.sortElement({ token: token, zoonVersion: dppDescription.zun_version_id, nodeId: currentNode.id, elements: elements })
    .then((res) => {
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      closeZoonListPopups();
      setIsLoadingRequest(false);
    });
  }

  function handleDisconnectNode(nodeId, zoon) {
    const node = data.zoons.find(el=> el.id === nodeId);
    const token = localStorage.getItem("token");
    api.disconnectNode({ token: token, zoonVersion: dppDescription.zun_version_id, node: node })
    .then(() => {
      const indexNode = data.zoons.indexOf(data.zoons.find((elem) => (elem.id === nodeId)));
      let newNode = {};
      switch(node.tags[0]) {
        case 'skill':
          newNode = {...node, pid: "c"};
        break;
        case 'ability':
          newNode = {...node, pid: "s"};
        break;
        case 'knowledge':
          newNode = {...node, pid: "a"};
        break;
        default:
          return false;
      }
      setData({...data, zoons: [...data.zoons.slice(0, indexNode), newNode, ...data.zoons.slice(indexNode + 1)]});
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      closeZoonListPopups();
    })
  }

  function closeZoonListPopups() {
    setOpenZoonOptionPopup(false);
    setIsAddNodePopupOpen(false);
    setIsSortElementPopupOpen(false);
    setIsSwapChildrenPopupOpen(false);
    setIsConfirmRemovePopupOpen(false);
    setIsBuildCompetencePopupOpen(false);
    setIsMoveElementPopupOpen(false);
  }

  function closeErrorRemovePopup() {
    setIsErrorRemovePopupOpen(false);
  }

  function closeErrorAddPopup() {
    setErrorDragAndDrop('');
    setIsErrorDragAndDropPopupOpen(false);
  }

  function closeNsiPopup() {
    setIsAddNsiPopupOpen(false);
    setIsEditNsiPopupOpen(false);
    setIsRemoveNsiPopupOpen(false);
  }

  function defineChildren(id) {
    const childrenFirst = data.zoons.filter((elem) => (elem.pid === id));
    return childrenFirst.map((elem, firstIndex) => {
      const childrenSecond = data.zoons.filter((zoon) => (zoon.pid === elem.id));
      return (
        <li className="zoon-list__item" key={elem.id}>
          {
            elem.tags[0] === "skill" &&
            <p className={`zoon-list__name name_type_skill ${elem.valid ? "name_type_invalid" : ""}`} onClick={() => onClickNode(elem, "Навык")}>
              <span className="zoon-list__caption">Н</span>
              <span className="zoon-list__count">({firstIndex + 1}).</span>
              {elem.name}
            </p>
          }
          {
            elem.tags[0] === "ability" &&
            <p className={`zoon-list__name name_type_ability ${elem.valid ? "name_type_invalid" : ""}`} onClick={() => onClickNode(elem, "Умение")}>
              <span className="zoon-list__caption">У</span>
              <span className="zoon-list__count">({firstIndex + 1}).</span>
              {elem.name}
            </p>
          }
          {
            elem.tags[0] === "knowledge" &&
            <p className={`zoon-list__name name_type_knowledge ${elem.valid ? "name_type_invalid" : ""}`} onClick={() => onClickNode(elem, "Знание")}>
              <span className="zoon-list__caption">З</span>
              <span className="zoon-list__count">({firstIndex + 1}).</span>
              {elem.name}
            </p>
          }
          <ul className="zoon-list__list">
            {
              childrenSecond.map((elem, secondIndex) => {
                const childrenThird = data.zoons.filter((zoon) => (zoon.pid === elem.id));
                return (
                  <li className="zoon-list__item" key={elem.id}>
                    {
                      elem.tags[0] === "skill" &&
                      <p className={`zoon-list__name name_type_skill ${elem.valid ? "name_type_invalid" : ""}`} onClick={() => onClickNode(elem, "Навык")}>
                        <span className="zoon-list__caption">Н</span>
                        <span className="zoon-list__count">{`(${firstIndex + 1}${secondIndex + 1}).`}</span>
                        {elem.name}
                      </p>
                    }
                    {
                      elem.tags[0] === "ability" &&
                      <p className={`zoon-list__name name_type_ability ${elem.valid ? "name_type_invalid" : ""}`} onClick={() => onClickNode(elem, "Умение")}>
                        <span className="zoon-list__caption">У</span>
                        <span className="zoon-list__count">{`(${firstIndex + 1}${secondIndex + 1}).`}</span>
                        {elem.name}
                      </p>
                    }
                    {
                      elem.tags[0] === "knowledge" &&
                      <p className={`zoon-list__name name_type_knowledge ${elem.valid ? "name_type_invalid" : ""}`} onClick={() => onClickNode(elem, "Знание")}>
                        <span className="zoon-list__caption">З</span>
                        <span className="zoon-list__count">{`(${firstIndex + 1}-${secondIndex + 1}).`}</span>
                        {elem.name}
                      </p>
                    }
                    <ul className="zoon-list__list">
                      {
                        childrenThird.map((elem, thirdIndex) => (
                          <li className="zoon-list__item" key={elem.id}>
                            <p className={`zoon-list__name name_type_knowledge ${elem.valid ? "name_type_invalid" : ""}`} onClick={() => onClickNode(elem, "Знание")}>
                            <span className="zoon-list__caption">З</span>
                            <span className="zoon-list__count">{`(${firstIndex + 1}${secondIndex + 1}-${thirdIndex + 1}).`}</span>
                            {elem.name}
                          </p>
                          </li>
                        ))
                      }
                    </ul>
                  </li>
                )
              })
            }
          </ul>
        </li>
      )
    })
  }
    
  React.useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem("token");
      setIsRendering(true);
      Promise.all([
        api.getZoon({ token: token, dppId: dppDescription.id, zoonVersion: dppDescription.zun_version_id, }),
        api.getNsi({ token: token, initialVersionId: dppDescription.ish_version_id, }),
        api.getNsiType({ token: token }),
      ])
      .then(([ data, nsi, nsiTypes ]) => {
        setData(data);
        nsi.sort(function(a,b) {
          return parseInt(a.type.position) - parseInt(b.type.position)
        })
        setNsiProgram(nsi);
        setNsiTypes(nsiTypes);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsRendering(false)); 
    }  return () => {
      setData([]);
      setNsiProgram([]);
      setNsiTypes([]);
      setCurrentNode({});
      setCurrentNodeType({});
      setCurrentActionType("");
      setCurrentNsiItem({});
    };
  }, [loggedIn, dppDescription]);


  return (
    <div className="zoon-list">
      {
        isRendering ?
        <Preloader />
        :
        <>

        <ul className="zoon-list__symbol-list">
          <li className="zoon-list__symbol-item">
            <span className="zoon-list__symbol symbol-competence"></span>
            <h5 className="zoon-list__symbol-name">Компетенция</h5>
          </li>
          <li className="zoon-list__symbol-item">
            <span className="zoon-list__symbol symbol-skill"></span>
            <h5 className="zoon-list__symbol-name">Навык</h5>
          </li>
          <li className="zoon-list__symbol-item">
            <span className="zoon-list__symbol symbol-ability"></span>
            <h5 className="zoon-list__symbol-name">Умение</h5>
          </li>
          <li className="zoon-list__symbol-item">
            <span className="zoon-list__symbol symbol-knowledge"></span>
            <h5 className="zoon-list__symbol-name">Знание</h5>
          </li>
          <li className="zoon-list__symbol-item">
            <span className="zoon-list__symbol symbol-cross-knowledge"></span>
            <h5 className="zoon-list__symbol-name">Сквозное знание</h5>
          </li>
        </ul>

        {
        isEditRights && 
        <div className="zoon-chart__btn-control">
          <button className="btn btn_type_add zoon-chart__btn_type_add-skill" onClick={handleCreateNewSkill}>Создать новый навык</button>
          <button className="btn btn_type_add zoon-chart__btn_type_add-ability" onClick={handleCreateNewAbility}>Создать новое умение</button>
          <button className="btn btn_type_add zoon-chart__btn_type_build-competence" onClick={openBuildCompetencePopup}>Сформировать компетенцию</button>
        </div>
        }

        <h3 className="zoon-list__title">Сформированные компетенции</h3>
        <ul className="zoon-list__list zoon-list__initial">
          {
            data.zoons.filter((elem) => (elem.type === "Компетенция")).map((elem) => (
              <li className="zoon-list__item" key={elem.id}>
                <p className={`zoon-list__name name_type_competence ${elem.valid ? "name_type_invalid" : ""}`} onClick={() => onClickNode(elem, "Компетенция")}>{elem.name}</p>
                <ul className="zoon-list__list">
                  {defineChildren(elem.id)}
                </ul>
              </li>
            ))
          }
        </ul>

        <h3 className="zoon-list__title">Сквозные знания</h3>
        <ul className="zoon-list__list zoon-list__initial">
          {
            data.zoons.filter((elem) => (elem.pid === "th")).map((elem, indexCrossKnowledge) => (
              <li key={elem.id} className="zoon-list__item">
                <p className={`zoon-list__name name_type_cross-knowledge ${elem.valid ? "name_type_invalid" : ""}`} onClick={() => onClickNode(elem, "Знание")}>
                  <span className="zoon-list__caption">СЗ</span>
                  <span className="zoon-list__count">({indexCrossKnowledge + 1}).</span>
                  {elem.name}
                </p>
              </li>
            ))
          }
        </ul>

        <h3 className="zoon-list__title">Элементы, не прикрепленные к компетенциям</h3>
        <ul className="zoon-list__list zoon-list__initial">
          {
            data.zoons.filter((elem) => (elem.pid && elem.pid.length === 1)).map((elem) => (
              <li className="zoon-list__item" key={elem.id}>
                <p onClick={() => onClickNode(elem, elem.type)} className={`zoon-list__name                     
                ${elem.tags[0] === "skill" ? "name_type_skill" : ""}
                ${elem.tags[0] === "ability" ? "name_type_ability" : ""}
                ${elem.tags[0] === "knowledge" ? "name_type_knowledge" : ""}
                ${elem.valid ? "name_type_invalid" : ""}
                `}
                >{elem.name}</p>
                <ul className="zoon-list__list">
                  {defineChildren(elem.id)}
                </ul>
              </li>
            ))
          }
        </ul>

        {
          isOpenZoonOptionPopup 
          &&
          <DefineZoonOptionPopup
          isOpen={isOpenZoonOptionPopup}
          onClose={closeZoonListPopups}
          currentNode={currentNode}
          currentNodeType={currentNodeType}
          nodes={data.zoons}
          onAddNode={handleAddNodeWithParent}
          onEditNode={openEditNodePopup}
          onEditCompetence={openEditCompetencePopup}
          onDisconnectNode={handleDisconnectNode}
          onRemoveNode={openRemoveNodePopup}
          onSortChildren={openSwapChildrenPopup}
          onMoveNode={openMoveNodePopup}
          />
        }

        {
          isBuildCompetencePopupOpen
          &&
          <BuildCompetence
          isOpen={isBuildCompetencePopupOpen}
          onClose={closeZoonListPopups}
          onBuild={handleBuildCompetence}
          onEdit={handleEditCompetence}
          nodes={data.zoons}
          zoonChart={{}}
          isLoadingRequest={isLoadingRequest}
          isErrorRequest={isErrorRequest}
          currentNode={currentNode}
          currentActionType={currentActionType}
          />
        }

        {
          isAddNodePopupOpen
          &&
          <AddNodePopup
          isOpen={isAddNodePopupOpen}
          onClose={closeZoonListPopups}
          zoonChart={{}}
          currentNode={currentNode}
          onAdd={handleAddNode}
          onEdit={handleEditNode}
          isLoadingRequest={isLoadingRequest}
          isErrorRequest={isErrorRequest}
          nsi={nsiProgram}
          addNsiPopupOpen={openAddNsiPopup}
          onEditNsi={openEditNsiPopup}
          onRemoveNsi={openRemoveNsiPopup}
          typologyParts={data.typologyParts}
          currentActionType={currentActionType}
          isEditRights={isEditRights}
          />
        }

        {
          isConfirmRemovePopupOpen
          &&
          <ConfirmRemovePopup
          isOpen={isConfirmRemovePopupOpen} 
          onClose={closeZoonListPopups}
          zoon={{}}
          currentNodeId={currentNode.id}
          currentNodeType={currentNodeType}
          onConfirm={handleRemoveNode}
          isLoadingRequest={isLoadingRequest}
          />
        }

        {
          isErrorRemovePopupOpen
          &&
          <ErrorRemovePopup
          isOpen={isErrorRemovePopupOpen}
          onClose={closeErrorRemovePopup}
          onConfirm={closeErrorRemovePopup}
          />
        }

        {
          isSwapChildrenPopupOpen
          &&
          <SwapChildrenPopup
          isOpen={isSwapChildrenPopupOpen}
          onClose={closeZoonListPopups}
          nodeChildren={nodeChildren}
          onSave={handleSwapChildren}
          isLoadingRequest={isLoadingRequest}
          />
        }

        {
          isSortElementPopupOpen
          &&
          <SortElementPopup
          isOpen={isSortElementPopupOpen}
          onClose={closeZoonListPopups}
          nodes={data.zoons}
          onSave={handleSortElement}
          isLoadingRequest={isLoadingRequest}
          />
        }

        {
          isMoveElementPopupOpen
          &&
          <MoveElementPopup
          isOpen={isMoveElementPopupOpen}
          onClose={closeZoonListPopups}
          nodes={data.zoons}
          currentNode={currentNode}
          onMove={handleMoveNode}
          />
        }

        {
          isErrorDragAndDropPopupOpen
          &&
          <ErrorDragAndDropPopup
          isOpen={isErrorDragAndDropPopupOpen}
          onClose={closeErrorAddPopup}
          onConfirm={closeErrorAddPopup}
          errorDragAndDrop={errorDragAndDrop}
          />
        }

        { 
          isAddNsiPopupOpen
          &&
          <NsiPopup
          isOpen={isAddNsiPopupOpen}
          onClose={closeNsiPopup}
          nsiTypes={nsiTypes}
          onAdd={handleAddNsi}
          />
        }

        {
          isEditNsiPopupOpen 
          &&
          <EditNsiPopup
            isOpen={isEditNsiPopupOpen}
            onClose={closeNsiPopup}  
            nsi={currentNsiItem}
            onEdit={handleEditNsi}
            isLoading={isLoadingZoonRequest}
          />
        }

        {
          isRemoveNsiPopupOpen 
          &&
          <RemoveNsiPopup
            isOpen={isRemoveNsiPopupOpen}
            onClose={closeNsiPopup}  
            nsi={currentNsiItem}
            onRemove={handleRemoveNsi}
            isLoading={isLoadingZoonRequest}
          />
        }
        </>
      }
    </div>
  );
}

export default ZoonList;

