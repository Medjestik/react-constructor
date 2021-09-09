import React from 'react';
import './ZoonChart.css';
import OrgChart from '@balkangraph/orgchart.js';
import AddNodePopup from '../AddNodePopup/AddNodePopup.js';
import ConfirmRemovePopup from '../ConfirmRemovePopup/ConfirmRemovePopup.js';
import ErrorRemovePopup from '../ErrorRemovePopup/ErrorRemovePopup.js';
import AddNewLinkPopup from '../AddNewLinkPopup/AddNewLinkPopup.js';
import RemoveLinkPopup from '../RemoveLinkPopup/RemoveLinkPopup.js';
import BuildCompetence from '../BuildCompetence/BuildCompetence.js';
import NsiPopup from '../../../../Popup/NsiPopup/NsiPopup.js';
import * as api from '../../../../../utils/api.js';
import ErrorDragAndDropPopup from '../ErrorDragAndDropPopup/ErrorDragAndDropPopup.js';
import SwapChildrenPopup from '../SwapChildrenPopup/SwapChildrenPopup.js';

function ZoonChart({ dppDescription, nodes, nsi, nsiTypes, onAddNsi, onEditNsi, onRemoveNsi, zoonLinks, typologyParts, isEditRights }) {

  const [zoonChart, setZoonChart] = React.useState({});
  const [currentNode, setCurrentNode] = React.useState({});
  const [currentNodeId, setCurrentNodeId] = React.useState('');
  const [currentNodeType, setCurrentNodeType] = React.useState('');
  const [isAddNodePopupOpen, setIsAddNodePopupOpen] = React.useState(false);
  const [isConfirmRemovePopupOpen, setIsConfirmRemovePopupOpen] = React.useState(false); 
  const [isErrorRemovePopupOpen, setIsErrorRemovePopupOpen] = React.useState(false);
  const [isAddNewLinkPopupOpen, setIsAddNewLinkPopupOpen] = React.useState(false);
  const [isRemoveLinkPopupOpen, setIsRemoveLinkPopupOpen] = React.useState(false);
  const [isBuildCompetencePopupOpen, setIsBuildCompetencePopupOpen] = React.useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isErrorRequest, setIsErrorRequest] = React.useState(false);
  const [errorDragAndDrop, setErrorDragAndDrop] = React.useState('');
  const [isErrorDragAndDropPopupOpen, setIsErrorDragAndDropPopupOpen] = React.useState(false);
  const [isAddNsiPopupOpen , setIsAddNsiPopupOpen] = React.useState(false);
  const [isSwapChildrenPopupOpen, setIsSwapChildrenPopupOpen] = React.useState(false);
  const [nodeChildren, setNodeChildren] = React.useState([]);
  const [currentActionType, setCurrentActionType] = React.useState("");

  const divRef = React.createRef();
  OrgChart.templates.myTemplate = Object.assign({}, OrgChart.templates.ana);
  OrgChart.templates.myTemplate.size = [400, 120];
  OrgChart.templates.myTemplate.node = '<rect x="0" y="0" height="120" width="400" fill="#039BE5" stroke-width="1" stroke="#aeaeae" rx="40" ry="40"></rect>' +
  '<path d="M25,54 C25,32 55,32 55,54 L24,54" stroke="#fff" stroke-width="2" fill="#039BE5"></path>' +
  '<circle stroke="#fff" stroke-width="2" fill="#039BE5" cx="40" cy="30" r="8"></circle> ';

  OrgChart.templates.myTemplate.ripple = { radius: 40, color: "#0890D3", rect: { x: 0, y: 0, width: 400, height: 120, rx: 40, ry: 40 }};

  OrgChart.templates.myTemplate.field_name = '<foreignObject x="10" y="34" width="365" height="80"><p class="field__name" style="margin: 0px;">{val}</p></foreignObject>';
  OrgChart.templates.myTemplate.field_title = '<foreignObject x="10" y="10" width="365" height="24"><p class="field__title" style="margin: 0px;">{val}</p></foreignObject>';

  OrgChart.templates.myTemplate.tooltip = '<foreignObject x="10" y="-35" width="365" height="80"><p class="field__tooltip">{val}</p></foreignObject>';

  OrgChart.templates.myTemplate.valid = '<foreignObject x="330" y="8" width="22" height="22"><img class="field__warning" style="opacity: {val}" src="https://edu.emiit.ru/warning.png" alt="кнопка меню" control-node-menu-id="{id}"></img></foreignObject>';

  OrgChart.templates.myTemplate.nodeMenuButton = '<foreignObject x="370" y="8" width="20" height="20"><img class="field__menu" src="https://edu.emiit.ru/menu-button.png" alt="кнопка меню" control-node-menu-id="{id}"></img></foreignObject>';

  OrgChart.templates.myTemplate.plus = '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
    + '<text text-anchor="middle" style="font-size: 18px;cursor:pointer;" fill="#757575" x="15" y="22">{collapsed-children-count}</text>';

  OrgChart.templates.competence = Object.assign({}, OrgChart.templates.myTemplate);
  OrgChart.templates.competence.node = '<rect x="0" y="0" height="120" width="400" fill="#8B00FF" stroke-width="1" stroke="#DDDDDD" rx="10" ry="10"></rect>';

  OrgChart.templates.skill = Object.assign({}, OrgChart.templates.myTemplate);
  OrgChart.templates.skill.node = '<rect x="0" y="0" height="120" width="400" fill="#5EB9AF" stroke-width="1" stroke="#DDDDDD" rx="10" ry="10"></rect>';

  OrgChart.templates.ability = Object.assign({}, OrgChart.templates.myTemplate);
  OrgChart.templates.ability.node = '<rect x="0" y="0" height="120" width="400" fill="#4A56E2" stroke-width="1" stroke="#DDDDDD" rx="10" ry="10"></rect>';

  OrgChart.templates.knowledge = Object.assign({}, OrgChart.templates.myTemplate);
  OrgChart.templates.knowledge.node = '<rect x="0" y="0" height="120" width="400" fill="#FA7565" stroke-width="1" stroke="#DDDDDD" rx="10" ry="10"></rect>';

  OrgChart.templates.through = Object.assign({}, OrgChart.templates.myTemplate);
  OrgChart.templates.through.node = '<rect x="0" y="0" height="120" width="400" fill="#FBB444" stroke-width="1" stroke="#DDDDDD" rx="10" ry="10"></rect>';

  React.useEffect (() => {
    const zoon = new OrgChart(divRef.current , {
      nodes: nodes,
      slinks: zoonLinks,
      layout: OrgChart.tree,
      nodeMouseClick: OrgChart.action.none,
      enableSearch: false,
      enableDragDrop: true,
      //showXScroll: OrgChart.scroll.visible,
      //showYScroll: OrgChart.scroll.visible,
      mouseScrool: OrgChart.action.zoom,
      lazyLoading: false,
      orderBy: "position",
      zoom: {
        speed: 30,
        smooth: 10
      },
      scaleInitial: OrgChart.match.boundary,
      nodeBinding: {
        field_name: "name",
        field_title: "type",
        valid: "valid",
        tooltip: "name"
      },
      isBusy: false,
      toolbar: {
        fullScreen: true,
        zoom: true,
        fit: true,
      },
      nodeMenu: {
        details: { text: "Details" },
        edit: { text: "Edit" },
        add: { text: "Add" },
        remove: { text: "Remove" }
      },
      tags: {
        "competence": {
          template: "competence",
          nodeMenu: isEditRights ?
          {
            edit: { text: "Редактировать", icon: "", onClick: function (nodeId) {
              editCompetencePopupOpen(nodeId, zoon);
            } },
            addSkill: isEditRights ? { text: "Добавить навык", icon: "", onClick: function (nodeId) {
              addNode(nodeId, zoon, "skill");
            } } : null,
            addAbility: { text: "Добавить умение", icon: "", onClick: function (nodeId) {
              addNode(nodeId, zoon, "ability");
            } },
            remove: { text: "Удалить", icon: "", onClick: function (nodeId) {
              removeNode(nodeId, zoon, "competence");
            } },
            order: { text: "Упорядочить", icon: "", onClick: function (nodeId) {
              openSwapChildrenPopup(nodeId, zoon);
            } },
          } : 
          {
            edit: { text: "Редактировать", icon: "", onClick: function (nodeId) {
              editCompetencePopupOpen(nodeId, zoon);
            } },
          }
        },
        "skill": {
          template: "skill",
          nodeMenu: isEditRights ? {
            edit: { text: "Редактировать", icon: "", onClick: function (nodeId) {
              editNode(nodeId, zoon);
            } },
            addAbility: { text: "Добавить умение", icon: "", onClick: function (nodeId) {
              addNode(nodeId, zoon, "ability");
            } },
            remove: { text: "Удалить", icon: "", onClick: function (nodeId) {
              removeNode(nodeId, zoon, "skill");
            } },
            disconnect: { text: "Отсоединить", icon: "", onClick: function (nodeId) {
              disconnectNode(nodeId, zoon);
            } },
            order: { text: "Упорядочить", icon: "", onClick: function (nodeId) {
              openSwapChildrenPopup(nodeId, zoon);
            } },
          } : {
            edit: { text: "Редактировать", icon: "", onClick: function (nodeId) {
              editNode(nodeId, zoon);
            } },
          },
        },
        "ability": {
          template: "ability", 
          nodeMenu: isEditRights ? {
            edit: { text: "Редактировать", icon: "", onClick: function (nodeId) {
              editNode(nodeId, zoon);
            } },
            addKnowledge: { text: "Добавить знание", icon: "", onClick: function (nodeId) {
              addNode(nodeId, zoon, "knowledge");
            } },
            remove: { text: "Удалить", icon: "", onClick: function (nodeId) {
              removeNode(nodeId, zoon, "ability");
            } },
            disconnect: { text: "Отсоединить", icon: "", onClick: function (nodeId) {
              disconnectNode(nodeId, zoon);
            } },
            order: { text: "Упорядочить", icon: "", onClick: function (nodeId) {
              openSwapChildrenPopup(nodeId, zoon);
            } },
          } : {
            edit: { text: "Редактировать", icon: "", onClick: function (nodeId) {
              editNode(nodeId, zoon);
            } },
          }
        },
        "knowledge": {
          template: "knowledge",
          nodeMenu: isEditRights ? {
            edit: { text: "Редактировать", icon: "", onClick: function (nodeId) {
              editNode(nodeId, zoon);
            } },
            remove: { text: "Удалить", icon: "", onClick: function (nodeId) {
              removeNode(nodeId, zoon, "knowledge");
            } },
            disconnect: { text: "Отсоединить", icon: "", onClick: function (nodeId) {
              disconnectNode(nodeId, zoon);
            } },
            addLink: { text: "Добавить связь", icon: "", onClick: function (nodeId) {
              addLinkPopupOpen(nodeId, zoon);
            } },
            removeLink: { text: "Удалить связь", icon: "", onClick: function (nodeId) {
              removeLinkPopupOpen(nodeId, zoon);
            } },
          } : {
            edit: { text: "Редактировать", icon: "", onClick: function (nodeId) {
              editNode(nodeId, zoon);
            } },
          },
        },
        "through": {
          template: "through",
          nodeMenu: isEditRights ? {
            addKnowledge: { text: "Добавить знание", icon: "", onClick: function (nodeId) {
              addNode(nodeId, zoon, "knowledge");
            } },
            order: { text: "Упорядочить", icon: "", onClick: function (nodeId) {
              openSwapChildrenPopup(nodeId, zoon);
            } },
          } : {

          },
        }
      },
    });
   
  zoon.on('drop', function (sender, draggedNodeId, droppedNodeId) {
    if (droppedNodeId !== undefined) {
      const draggedNode = nodes.find(elem => elem.id === draggedNodeId);
      const droppedNode = nodes.find(elem => elem.id === droppedNodeId);
      if (draggedNode.type === droppedNode.type) {
        setErrorDragAndDrop("Невозможно добавить элемент к элементу того же типа.");
        setIsErrorDragAndDropPopupOpen(true);
        return false;
      }
      if (draggedNode.type === "Компетенция") {
        setErrorDragAndDrop("«Компетенцию» нельзя присоединить к другому элементу.");
        setIsErrorDragAndDropPopupOpen(true);
        return false;
      }
      if (droppedNode.type === "Знание") {
        setErrorDragAndDrop("Невозможно добавить элемент к элементу типа «Знание».");
        setIsErrorDragAndDropPopupOpen(true);
        return false;
      }
      if (droppedNode.type === "Сквозные знания" && draggedNode.type !== "Знание") {
        setErrorDragAndDrop("Сквозным может быть только «Знание».");
        setIsErrorDragAndDropPopupOpen(true);
        return false;
      }
      if (droppedNode.type === "Навык" && draggedNode.type === "Знание") {
        setErrorDragAndDrop("«Знание» не может принадлежать «Навыку».");
        setIsErrorDragAndDropPopupOpen(true);
        return false;
      }
      if (draggedNode.type === "Навык" && droppedNode.type === "Умение") {
        setErrorDragAndDrop("Невозможно присоединить «Навык» к «Умению».");
        setIsErrorDragAndDropPopupOpen(true);
        return false;
      }
      if (draggedNode.type === "Сквозные знания") {
        setErrorDragAndDrop("Невозможно переместить «Сквозные знания».");
        setIsErrorDragAndDropPopupOpen(true);
        return false;
      }
      if (droppedNode.type === "Компетенция") {
        const children = nodes.filter(elem => elem.pid === droppedNodeId);
        const skills = children.filter(child => child.type.includes("Навык"));
        const abilities = children.filter(child => child.type.includes("Умение"));
        if (draggedNode.type === "Умение") {
          if (skills.length > 0) {
            setErrorDragAndDrop("Невозможно присоединить умение к компетенции, так как она уже содержит навыки.");
            setIsErrorDragAndDropPopupOpen(true);
            return false;
          }
        }
        if (draggedNode.type === "Навык") {
          if (abilities.length > 0) {
            setErrorDragAndDrop("Невозможно присоединить навык к компетенции, так как она уже содержит умения.");
            setIsErrorDragAndDropPopupOpen(true);
            return false;
          }
        }

        if (draggedNode.type === "Знание") {
          setErrorDragAndDrop("Невозможно присоединить знание к компетенции.");
          setIsErrorDragAndDropPopupOpen(true);
          return false;
        }
      }
      const token = localStorage.getItem("token");
      api.moveNode(({ 
        token: token, 
        dppId: dppDescription.id, 
        elem_type: draggedNode.type, 
        elem_id: draggedNodeId, 
        to_type: droppedNode.type, 
        to_id: droppedNodeId 
      }))
        .then(() => {
        })
        .catch((err) => {
          console.error(err);
        })

    }
  })

  setZoonChart(zoon);

  return () => {
    setZoonChart({});
    setCurrentNode({});
    setCurrentNodeId('');
    setNodeChildren([]);
  };
  // eslint-disable-next-line
  }, [nodes]);

  
  function handleCreateNewSkill() {
    const data = { id: OrgChart.randomId(), pid: "", tags: ["skill"], };
    setCurrentActionType("add");
    setCurrentNode(data);
    setIsAddNodePopupOpen(true);
  }

  function handleCreateNewAbility() {
    const data = { id: OrgChart.randomId(), pid: "", tags: ["ability"], };
    setCurrentActionType("add");
    setCurrentNode(data);
    setIsAddNodePopupOpen(true);
  }

  function addNode(nodeId, zoon, type) {
    setIsErrorRequest(false);
    setCurrentActionType("add");
    setZoonChart(zoon);
    const node = { id: OrgChart.randomId(), pid: nodeId, tags: [type], };
    setCurrentNode(node);
    setIsAddNodePopupOpen(true);
  }

  function handleAddNode(zoon, node) {
    const token = localStorage.getItem("token");
    setIsLoadingRequest(true);
    switch(node.tags[0]) {
      case 'knowledge':
        api.addKnowledge(({ token: token, zoonVersion: dppDescription.zun_version_id, node: node }))
        .then((res) => {
          zoon.addNode(res);
          zoon.center(res.id);
          setIsErrorRequest(false);
          closeZoonPopups();
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
          zoon.addNode(res);
          zoon.center(res.id);
          setIsErrorRequest(false);
          closeZoonPopups();
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
          zoon.addNode(res);
          zoon.center(res.id);
          setIsErrorRequest(false);
          closeZoonPopups();
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

  function editNode(nodeId, zoon) {
    setIsErrorRequest(false);
    setCurrentActionType("edit");
    setZoonChart(zoon);
    const node = nodes.find(elem => elem.id === nodeId);
    setCurrentNode(node);
    setIsAddNodePopupOpen(true);
  }

  function handleEditNode(zoon, node) {
    const token = localStorage.getItem("token");
    setIsLoadingRequest(true);
    switch(node.tags[0]) {
      case 'knowledge':
        api.editKnowledge(({ token: token, zoonVersion: dppDescription.zun_version_id, nodeId: node.id, node: node }))
        .then((res) => {
          zoon.updateNode(res);
          closeZoonPopups();
          setIsErrorRequest(false);
          zoon.center(res.id);
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
          zoon.updateNode(res);
          closeZoonPopups();
          setIsErrorRequest(false);
          zoon.center(res.id);
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
          zoon.updateNode(res);
          closeZoonPopups();
          setIsErrorRequest(false);
          zoon.center(res.id);
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

  function removeNode(nodeId, zoon, type) {
    const node = nodes.find(el=> el.id === nodeId);
    const children = nodes.filter(el => el.pid === node.id);
    if (children.length > 0) {
      setIsErrorRemovePopupOpen(true);
    } else {
      setCurrentNodeId(nodeId);
      setZoonChart(zoon);
      setCurrentNodeType(type);
      setIsConfirmRemovePopupOpen(true);
    }
  }

  function disconnectNode(nodeId, zoon) {
    const node = nodes.find(el=> el.id === nodeId);
    const token = localStorage.getItem("token");
    api.disconnectNode({ token: token, zoonVersion: dppDescription.zun_version_id, node: node })
    .then(() => {
      let nodeIndex = nodes.indexOf(node);
      if (node.type === 'Навык') {
        nodes[nodeIndex].pid = "c";
      } else {
        nodes[nodeIndex].pid = "s";
      }
      zoon.draw(OrgChart.action.init);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  function addLinkPopupOpen(nodeId, zoon) {
    const node = nodes.find(el=> el.id === nodeId); 
    setCurrentNode(node);
    setIsAddNewLinkPopupOpen(true);
  }

  function addNsiPopupOpen() {
    setIsAddNsiPopupOpen(true);
  }
  
  function closeAddNsiPopup() {
    setIsAddNsiPopupOpen(false);
  }

  function removeLinkPopupOpen(nodeId, zoon) {
    const node = nodes.find(el=> el.id === nodeId);
    setCurrentNode(node);
    setIsRemoveLinkPopupOpen(true);
  }

  function openSwapChildrenPopup(nodeId, zoon) {
    setZoonChart(zoon);
    setCurrentNodeId(nodeId);
    setIsSwapChildrenPopupOpen(true);
    let children = nodes.filter((elem) => (nodeId === elem.pid));
    children.sort(function(a, b) {
      return parseInt(a.position) - parseInt(b.position);
    });
    setNodeChildren(children);
  }

  function handleAddLink(nodeId, abilityId) {
    const token = localStorage.getItem("token");
    api.addLink({ token: token, zoonVersion: dppDescription.zun_version_id, nodeId: nodeId, abilityId: abilityId })
    .then(() => {
      zoonChart.addSlink(nodeId, abilityId, "", "blue");
      zoonChart.draw(OrgChart.action.init);
      closeZoonPopups();
    })
    .catch((err) => {
      console.error(err);
    })
  }

  function handleRemoveLink(nodeId, abilityId) {
    const token = localStorage.getItem("token");
    api.removeLink({ token: token, zoonVersion: dppDescription.zun_version_id, nodeId: nodeId, abilityId: abilityId })
    .then(() => {
      zoonChart.removeSlink(nodeId, abilityId);
      zoonChart.draw(OrgChart.action.init);
      closeZoonPopups();
    })
    .catch((err) => {
      console.error(err);
    })
  }

  function handleRemoveNode(zoon, nodeId, type) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    switch(type) {
      case 'knowledge':
        api.removeKnowledge(({ token: token, zoonVersion: dppDescription.zun_version_id, nodeId: nodeId }))
        .then((res) => {
          zoon.removeNode(res);
          closeZoonPopups();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
        break;
      case 'ability':
        api.removeAbility(({ token: token, zoonVersion: dppDescription.zun_version_id, nodeId: nodeId }))
        .then((res) => {
          zoon.removeNode(res);
          closeZoonPopups();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
        break;
      case 'skill':
        api.removeSkill(({ token: token, zoonVersion: dppDescription.zun_version_id, nodeId: nodeId }))
        .then((res) => {
          zoon.removeNode(res);
          closeZoonPopups();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
        break;
        case 'competence':
          api.removeCompetence(({ token: token, zoonVersion: dppDescription.zun_version_id, nodeId: nodeId }))
          .then((res) => {
            zoon.removeNode(res);
            closeZoonPopups();
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

  function handleSwapChildren(children) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    api.swapChildren({ token: token, zoonVersion: dppDescription.zun_version_id, nodeId: currentNodeId, children: children })
    .then(() => {
      children.forEach((childId, i) => {
         nodes.find((node) => (node.id === childId ? node.position = i + 1 : false));
      })
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      closeZoonPopups();
      zoonChart.draw(OrgChart.action.init);
      setIsLoadingRequest(false);
    });
  }

  function buildCompetencePopupOpen() {
    setIsErrorRequest(false);
    setIsBuildCompetencePopupOpen(true);
    setCurrentActionType("add");
  }

  
  function handleBuildCompetence(zoon, competence, nodesId) {
    const token = localStorage.getItem("token");
    setIsLoadingRequest(true);
    api.buildCompetence(({ token: token, zoonVersion: dppDescription.zun_version_id, node: competence, nodesId: nodesId }))
    .then((res) => {
      zoon.addNode(res);
      zoon.center(res.id);
      nodesId.forEach((id) => {
        let old_el = nodes.find(elem => elem.id === id)
        zoon.updateNode({ id: id, type: old_el.type, tags: old_el.tags, name: old_el.name, pid: res.id })
      })
      setIsErrorRequest(false);
      closeZoonPopups();
    })
    .catch((err) => {
      setIsErrorRequest(true);
      console.error(err);
    })
    .finally(() => {
      setIsLoadingRequest(false);
    });
  }

  function editCompetencePopupOpen(nodeId, zoon) {
    setIsErrorRequest(false);
    setCurrentActionType("edit");
    setZoonChart(zoon);
    const node = nodes.find(elem => elem.id === nodeId);
    setCurrentNode(node);
    setIsBuildCompetencePopupOpen(true);
  }

  function handleEditCompetence(zoon, competence, competenceId) {
    const token = localStorage.getItem("token");
    setIsLoadingRequest(true);
    api.editCompetence(({ token: token, zoonVersion: dppDescription.zun_version_id, node: competence, competenceId: competenceId }))
    .then((res) => {
      zoon.updateNode(res);
      closeZoonPopups();
      setIsErrorRequest(false);
      zoon.center(res.id);
    })
    .catch((err) => {
      setIsErrorRequest(true);
      console.error(err);
    })
    .finally(() => {
      setIsLoadingRequest(false);
    });
  }

  function closeZoonPopups() {
    setIsAddNodePopupOpen(false);
    setIsConfirmRemovePopupOpen(false);
    setIsErrorRemovePopupOpen(false);
    setIsErrorDragAndDropPopupOpen(false);
    setIsAddNewLinkPopupOpen(false);
    setIsRemoveLinkPopupOpen(false);
    setIsBuildCompetencePopupOpen(false);
    setIsSwapChildrenPopupOpen(false);
  }

  return (
    <>

    <div className="zoon__container">
      {
        isEditRights && 
        <div className="zoon-chart__btn-control">
          <button className="btn btn_type_add zoon-chart__btn_type_add-skill" onClick={handleCreateNewSkill}>Создать новый навык</button>
          <button className="btn btn_type_add zoon-chart__btn_type_add-ability" onClick={handleCreateNewAbility}>Создать новое умение</button>
          <button className="btn btn_type_add zoon-chart__btn_type_build-competence" onClick={buildCompetencePopupOpen}>Сформировать компетенцию</button>
        </div>
      }
      <div id="tree" className="zoon-chart" ref={divRef}></div>
    </div>

    {
      isAddNodePopupOpen
      &&
      <AddNodePopup
      isOpen={isAddNodePopupOpen}
      onClose={closeZoonPopups}
      zoonChart={zoonChart}
      currentNode={currentNode}
      onAdd={handleAddNode}
      onEditNsi={onEditNsi}
      onEdit={handleEditNode}
      isLoadingRequest={isLoadingRequest}
      isErrorRequest={isErrorRequest}
      addNsiPopupOpen={addNsiPopupOpen}
      onRemoveNsi={onRemoveNsi}
      nsi={nsi}
      typologyParts={typologyParts}
      currentActionType={currentActionType}
      isEditRights={isEditRights}
      />
    }
    {
      isConfirmRemovePopupOpen
      &&
      <ConfirmRemovePopup
      isOpen={isConfirmRemovePopupOpen} 
      onClose={closeZoonPopups}
      zoon={zoonChart}
      currentNodeId={currentNodeId}
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
      onClose={closeZoonPopups}
      onConfirm={closeZoonPopups}
      />
    }

    {
      isErrorDragAndDropPopupOpen
      &&
      <ErrorDragAndDropPopup
      isOpen={isErrorDragAndDropPopupOpen}
      onClose={closeZoonPopups}
      onConfirm={closeZoonPopups}
      errorDragAndDrop={errorDragAndDrop}
      />
    }

    {
      isAddNewLinkPopupOpen
      &&
      <AddNewLinkPopup
      isOpen={isAddNewLinkPopupOpen}
      onClose={closeZoonPopups}
      currentNode={currentNode}
      nodes={nodes}
      onConfirm={handleAddLink}
      zoonLinks={zoonLinks}
      />
    }

    {
      isRemoveLinkPopupOpen
      &&
      <RemoveLinkPopup
      isOpen={isRemoveLinkPopupOpen}
      onClose={closeZoonPopups}
      currentNode={currentNode}
      nodes={nodes}
      onConfirm={handleRemoveLink}
      zoonLinks={zoonLinks}
      />
    }
    {
      isBuildCompetencePopupOpen
      &&
      <BuildCompetence
      isOpen={isBuildCompetencePopupOpen}
      onClose={closeZoonPopups}
      onBuild={handleBuildCompetence}
      onEdit={handleEditCompetence}
      nodes={nodes}
      zoonChart={zoonChart}
      isLoadingRequest={isLoadingRequest}
      isErrorRequest={isErrorRequest}
      currentNode={currentNode}
      currentActionType={currentActionType}
      />
    }

    { 
      isAddNsiPopupOpen
      &&
      <NsiPopup
      isOpen={isAddNsiPopupOpen}
      onClose={closeAddNsiPopup}
      nsiTypes={nsiTypes}
      onAdd={onAddNsi}
      />
    }

    {
      isSwapChildrenPopupOpen
      &&
      <SwapChildrenPopup
      isOpen={isSwapChildrenPopupOpen}
      onClose={closeZoonPopups}
      nodeChildren={nodeChildren}
      onSave={handleSwapChildren}
      isLoadingRequest={isLoadingRequest}
      />
    }

    </>
  );
}


export default ZoonChart;