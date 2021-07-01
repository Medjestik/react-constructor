import React from 'react';
import './ZoonChart.css';
import OrgChart from '@balkangraph/orgchart.js';
import AddNodePopup from '../AddNodePopup/AddNodePopup.js';
import EditNodePopup from '../EditNodePopup/EditNodePopup.js';
import ConfirmRemovePopup from '../ConfirmRemovePopup/ConfirmRemovePopup.js';
import ErrorRemovePopup from '../ErrorRemovePopup/ErrorRemovePopup.js';
import useOnPushEsc from '../../../../../hooks/useOnPushEsc.js';
import useOnClickOverlay from '../../../../../hooks/useOnClickOverlay.js';
import * as api from '../../../../../utils/api.js';
import ErrorDragAndDropPopup from '../ErrorDragAndDropPopup/ErrorDragAndDropPopup.js';

function ZoonChart({ nodes, dppDescription }) {

  const [zoonChart, setZoonChart] = React.useState({})
  const [currentNode, setCurrentNode] = React.useState({})
  const [currentNodeId, setCurrentNodeId] = React.useState('')
  const [currentNodeType, setCurrentNodeType] = React.useState('')
  const [isAddNodePopupOpen, setIsAddNodePopupOpen] = React.useState(false);
  const [isEditNodePopupOpen, setIsEditNodePopupOpen] = React.useState(false);
  const [isConfirmRemovePopupOpen, setIsConfirmRemovePopupOpen] = React.useState(false);
  const [isErrorRemovePopupOpen, setIsErrorRemovePopupOpen] = React.useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isErrorRequest, setIsErrorRequest] = React.useState(false);
  const [errorDragAndDrop, setErrorDragAndDrop] = React.useState('');
  const [isErrorDragAndDropPopupOpen, setIsErrorDragAndDropPopupOpen] = React.useState(false);

  const divRef = React.createRef();
  OrgChart.templates.myTemplate = Object.assign({}, OrgChart.templates.ana);
  OrgChart.templates.myTemplate.size = [400, 120];
  OrgChart.templates.myTemplate.node = '<rect x="0" y="0" height="120" width="400" fill="#039BE5" stroke-width="1" stroke="#aeaeae" rx="40" ry="40"></rect>' +
  '<path d="M25,54 C25,32 55,32 55,54 L24,54" stroke="#fff" stroke-width="2" fill="#039BE5"></path>' +
  '<circle stroke="#fff" stroke-width="2" fill="#039BE5" cx="40" cy="30" r="8"></circle> ';

  OrgChart.templates.myTemplate.ripple = { radius: 40, color: "#0890D3", rect: { x: 0, y: 0, width: 400, height: 120, rx: 40, ry: 40 }};

  OrgChart.templates.myTemplate.field_name = '<foreignObject x="10" y="32" width="365" height="80"><p class="field__name" style="margin: 0px;">{val}</p></foreignObject>';
  OrgChart.templates.myTemplate.field_title = '<foreignObject x="10" y="5" width="365" height="24"><p class="field__title" style="margin: 0px;">{val}</p></foreignObject>';

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
      layout: OrgChart.treeRightOffset,
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
        field_title: "type"
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
          nodeMenu: {
            //edit: { text: "Редактировать" },
            addSkill: { text: "Добавить навык", icon: "", onClick: function (nodeId) {
              addNode(nodeId, zoon, "skill");
            } },
            remove: { text: "Удалить" }
          },
        },
        "skill": {
          template: "skill",
          nodeMenu: {
            edit: { text: "Редактировать", icon: "", onClick: function (nodeId) {
              editNode(nodeId, zoon);
            } },
            addAbility: { text: "Добавить умение", icon: "", onClick: function (nodeId) {
              addNode(nodeId, zoon, "ability");
            } },
            remove: { text: "Удалить", icon: "", onClick: function (nodeId) {
              removeNode(nodeId, zoon, "skill");
            } },
          },
        },
        "ability": {
          template: "ability", 
          nodeMenu: {
            edit: { text: "Редактировать", icon: "", onClick: function (nodeId) {
              editNode(nodeId, zoon);
            } },
            addKnowledge: { text: "Добавить знание", icon: "", onClick: function (nodeId) {
              addNode(nodeId, zoon, "knowledge");
            } },
            remove: { text: "Удалить", icon: "", onClick: function (nodeId) {
              removeNode(nodeId, zoon, "ability");
            } },
          }
        },
        "knowledge": {
          template: "knowledge",
          nodeMenu: {
            edit: { text: "Редактировать", icon: "", onClick: function (nodeId) {
              editNode(nodeId, zoon);
            } },
            remove: { text: "Удалить", icon: "", onClick: function (nodeId) {
              removeNode(nodeId, zoon, "knowledge");
            } },
          },
        },
        "through": {
          template: "through",
          nodeMenu: {
            addKnowledge: { text: "Добавить знание", icon: "", onClick: function (nodeId) {
              addNode(nodeId, zoon, "knowledge");
            } },
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
    // eslint-disable-next-line
  }, [nodes]);


  function handleCreateNewSkill() {
    const data = { id: OrgChart.randomId(), pid: "", tags: ["skill"], };
    setCurrentNode(data);
    setIsAddNodePopupOpen(true);
  }

  function handleCreateNewAbility() {
    const data = { id: OrgChart.randomId(), pid: "", tags: ["ability"], };
    setCurrentNode(data);
    setIsAddNodePopupOpen(true);
  }

  function addNode(nodeId, zoon, type) {
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
        api.addKnowledge(({ token: token, dppId: dppDescription.id, zoonVersion: dppDescription.zun_version_id, node: node }))
        .then((res) => {
          zoon.addNode(res);
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
        api.addAbility(({ token: token, dppId: dppDescription.id, zoonVersion: dppDescription.zun_version_id, node: node }))
        .then((res) => {
          zoon.addNode(res);
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
        api.addSkill(({ token: token, dppId: dppDescription.id, zoonVersion: dppDescription.zun_version_id, node: node }))
        .then((res) => {
          zoon.addNode(res);
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
    setZoonChart(zoon);
    const node = nodes.find(elem => elem.id === nodeId);
    setCurrentNode(node);
    setIsEditNodePopupOpen(true);
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

  function handleRemoveNode(zoon, nodeId, type) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    switch(type) {
      case 'knowledge':
        api.removeKnowledge(({ token: token, dppId: dppDescription.id, zoonVersion: dppDescription.zun_version_id, nodeId: nodeId }))
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
        api.removeAbility(({ token: token, dppId: dppDescription.id, zoonVersion: dppDescription.zun_version_id, nodeId: nodeId }))
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
        api.removeSkill(({ token: token, dppId: dppDescription.id, zoonVersion: dppDescription.zun_version_id, nodeId: nodeId }))
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

  function closeZoonPopups() {
    setIsAddNodePopupOpen(false);
    setIsConfirmRemovePopupOpen(false);
    setIsErrorRemovePopupOpen(false);
    setIsErrorDragAndDropPopupOpen(false);
    setIsEditNodePopupOpen(false);
  }

  useOnClickOverlay(closeZoonPopups);
  useOnPushEsc(closeZoonPopups);

  return (
    <>
    <div className="zoon-chart_btn-control">
      <button className="btn btn_type_add zoon-chart__btn_type_add-skill" onClick={handleCreateNewSkill}>Создать новый навык</button>
      <button className="btn btn_type_add zoon-chart__btn_type_add-ability" onClick={handleCreateNewAbility}>Создать новое умение</button>
      <button className="btn btn_type_add zoon-chart__btn_type_build-competence">Сформировать компетенцию</button>
    </div>
    <div id="tree" className="zoon-chart" ref={divRef}></div>

    {
      isAddNodePopupOpen
      &&
      <AddNodePopup
      isOpen={isAddNodePopupOpen}
      onClose={closeZoonPopups}
      zoonChart={zoonChart}
      currentNode={currentNode}
      onSave={handleAddNode}
      isLoadingRequest={isLoadingRequest}
      isErrorRequest={isErrorRequest}
      />
    }
    {
      isEditNodePopupOpen
      &&
      <EditNodePopup
      isOpen={isEditNodePopupOpen}
      onClose={closeZoonPopups}
      zoonChart={zoonChart}
      currentNode={currentNode}
      onSave={handleAddNode}
      isLoadingRequest={isLoadingRequest}
      isErrorRequest={isErrorRequest}
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

    </>
  );
}


export default ZoonChart;