import React from 'react';
import './ZoonChart.css';
import OrgChart from '@balkangraph/orgchart.js';
import EditNodePopup from '../EditNodePopup/EditNodePopup.js';
import useOnPushEsc from '../../../../../hooks/useOnPushEsc.js';
import useOnClickOverlay from '../../../../../hooks/useOnClickOverlay.js';

function ZoonChart({ nodes }) {

  const [zoonChart, setZoonChart] = React.useState({})
  const [currentNode, setCurrentNode] = React.useState({})
  const [isEditNodePopupOpen, setIsEditNodePopupOpen] = React.useState(false);

  const divRef = React.createRef();
  OrgChart.templates.myTemplate = Object.assign({}, OrgChart.templates.ana);
  OrgChart.templates.myTemplate.size = [400, 120];
  OrgChart.templates.myTemplate.node = '<rect x="0" y="0" height="120" width="400" fill="#039BE5" stroke-width="1" stroke="#aeaeae" rx="40" ry="40"></rect>' +
  '<path d="M25,54 C25,32 55,32 55,54 L24,54" stroke="#fff" stroke-width="2" fill="#039BE5"></path>' +
  '<circle stroke="#fff" stroke-width="2" fill="#039BE5" cx="40" cy="30" r="8"></circle> ';

  OrgChart.templates.myTemplate.ripple = { radius: 40, color: "#0890D3", rect: { x: 0, y: 0, width: 400, height: 120, rx: 40, ry: 40 }};

  OrgChart.templates.myTemplate.field_name = '<foreignObject x="10" y="32" width="360" height="200"><p class="field__name" style="margin: 0px;">{val}</p></foreignObject>';
  OrgChart.templates.myTemplate.field_title = '<foreignObject x="10" y="5" width="360" height="200"><p class="field__title" style="margin: 0px;">{val}</p></foreignObject>';

  OrgChart.templates.myTemplate.nodeMenuButton = '<g style="cursor:pointer;" transform="matrix(1,0,0,1,385,42)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="4" fill="#ffffff"></circle><circle cx="0" cy="14" r="4" fill="#ffffff"></circle><circle cx="0" cy="28" r="4" fill="#ffffff"></circle></g>';

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

  React.useEffect (() => {
    const zoon = new OrgChart(divRef.current , {
      nodes: nodes,
      layout: OrgChart.treeRightOffset,
      nodeMouseClick: OrgChart.action.none,
      enableSearch: false,
      nodeBinding: {
        field_name: "name",
        field_title: "title"
      },
      enableDragDrop: true,
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
            edit: { text: "Редактировать" },
            addSkill: { text: "Добавить навык", icon: OrgChart.icon.add(24, 24, "#7A7A7A"), onClick: function (nodeId) {
              addSkill(nodeId, zoon);
            } },
            remove: { text: "Удалить" }
          },
        },
        "skill": {
          template: "skill",
          nodeMenu: {
            edit: { text: "Редактировать" },
            addAbility: { text: "Добавить умение", icon: OrgChart.icon.add(24, 24, "#7A7A7A"), onClick: function (nodeId) {
              addAbility(nodeId, zoon);
            } },
            remove: { text: "Удалить" }
          },
        },
        "ability": {
          template: "ability", 
          nodeMenu: {
            edit: { text: "Редактировать" },
            addKnowledge: { text: "Добавить знание", icon: OrgChart.icon.add(24, 24, "#7A7A7A"), onClick: function (nodeId) {
              addKnowledge(nodeId, zoon);
            } },
            remove: { text: "Удалить" }
          }
        },
        "knowledge": {
          template: "knowledge",
          nodeMenu: {
            edit: { text: "Редактировать" },
            remove: { text: "Удалить" }
          },
        }
      },
      toolbar: {
        fullScreen: true,
        zoom: true,
        fit: true,
      },
      showXScroll: OrgChart.scroll.visible, 
      showYScroll: OrgChart.scroll.visible, 
      mouseScrool: OrgChart.action.zoom,
    });

    zoon.on('drop', function (sender, draggedNodeId, droppedNodeId) {
      const draggedNode = sender.getNode(draggedNodeId);
      const droppedNode = sender.getNode(droppedNodeId);

      console.log(draggedNode);
      //console.log(droppedNode.tags.indexOf("knowledge"));
      if (droppedNode.tags.indexOf("knowledge") !== -1) {
        return false;
      }

      /*if (droppedNode.tags.indexOf("department") !== -1 && draggedNode.tags.indexOf("department") === -1) {
          var draggedNodeData = sender.get(draggedNode.id);
          draggedNodeData.pid = null;
          draggedNodeData.stpid = droppedNode.id;
          sender.updateNode(draggedNodeData);
          return false;
      }*/
  });

    console.log(nodes);
    // eslint-disable-next-line
  }, [nodes]);

  function handleAddNode(zoon, node) {
    zoon.addNode(node);
    closeZoonPopups();
  }

  function closeZoonPopups() {
    setIsEditNodePopupOpen(false);
  }

  useOnClickOverlay(closeZoonPopups);
  useOnPushEsc(closeZoonPopups);

  function addSkill(nodeId, zoon) {
    //const node = zoon.getNode(nodeId);
    setZoonChart(zoon);
    const data = { id: OrgChart.randomId(), pid: nodeId, tags: ["skill"], title: "Навык", };
    setCurrentNode(data);
    setIsEditNodePopupOpen(true);
  }

  function addAbility(nodeId, zoon) {
    //const node = zoon.getNode(nodeId);
    setZoonChart(zoon);
    const data = { id: OrgChart.randomId(), pid: nodeId, tags: ["ability"], title: "Умение", };
    setCurrentNode(data);
    setIsEditNodePopupOpen(true);
  }

  function addKnowledge(nodeId, zoon) {
    //const node = zoon.getNode(nodeId);
    setZoonChart(zoon);
    const data = { id: OrgChart.randomId(), pid: nodeId, tags: ["knowledge"], title: "Знание", };
    setCurrentNode(data);
    setIsEditNodePopupOpen(true);
  }

  //console.log(currentNode);
  
  return (
    <>
    <div id="tree" className="zoon-chart" ref={divRef}></div>

    {
      isEditNodePopupOpen
      &&
      <EditNodePopup 
      isOpen={isEditNodePopupOpen} 
      onClose={closeZoonPopups} 
      zoonChart={zoonChart} 
      currentNode={currentNode}
      onSave={handleAddNode} 
      />
    }
    </>
  );
}


export default ZoonChart;