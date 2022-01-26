import React from 'react';
import './ZoonList.css';
import * as api from '../../../../../utils/api.js';
import Preloader from '../../../../Preloader/Preloader.js';
import DefineZoonOptionPopup from '../DefineZoonOptionPopup/DefineZoonOptionPopup.js';
import ConfirmRemovePopup from '../ConfirmRemovePopup/ConfirmRemovePopup.js';
import SortElementPopup from '../SortElementPopup/SortElementPopup.js';
import SwapChildrenPopup from '../SwapChildrenPopup/SwapChildrenPopup.js';

function ZoonList({ dppDescription, loggedIn }) {

  const [data, setData] = React.useState([]);
  const [isRendering, setIsRendering] = React.useState(true); 

  const [currentNode, setCurrentNode] = React.useState({});
  const [nodeChildren, setNodeChildren] = React.useState([]);
  const [currentNodeType, setCurrentNodeType] = React.useState({});
  const [isOpenZoonOptionPopup, setOpenZoonOptionPopup] = React.useState(false);
  const [isSortElementPopupOpen, setIsSortElementPopupOpen] = React.useState(false);
  const [isSwapChildrenPopupOpen, setIsSwapChildrenPopupOpen] = React.useState(false);
  const [isConfirmRemovePopupOpen, setIsConfirmRemovePopupOpen] = React.useState(false);

  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);


  function onClickNode(elem, type) {
    setCurrentNode(elem);
    setCurrentNodeType(type);
    //setOpenZoonOptionPopup(true);
  }

  function openRemoveNodePopup(nodeId, zoon, type) {
    const node = data.zoons.find(el=> el.id === nodeId);
    const children = data.zoons.filter(el => el.pid === node.id);
    if (children.length > 0) {
      //setIsErrorRemovePopupOpen(true);
    } else {
      setIsConfirmRemovePopupOpen(true);
    }
  }

  function handleRemoveNode(zoon, nodeId, type) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    console.log(type)
    switch(type) {
      case 'Знание':
        api.removeKnowledge(({ token: token, zoonVersion: dppDescription.zun_version_id, nodeId: nodeId }))
        .then((res) => {
          const newNodes = data.zoons.filter((elem) => elem.id !== res);
          console.log(newNodes);
          setData({...data, zoons: newNodes});
          console.log(data);
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
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      closeZoonListPopups();
      setIsLoadingRequest(false);
    });
  }

  function closeZoonListPopups() {
    setOpenZoonOptionPopup(false);
    setIsSortElementPopupOpen(false);
    setIsSwapChildrenPopupOpen(false);
    setIsConfirmRemovePopupOpen(false);
  }

  function defineChildren(id) {
    const childrenFirst = data.zoons.filter((elem) => (elem.pid === id));
    return childrenFirst.map((elem, firstIndex) => {
      const childrenSecond = data.zoons.filter((zoon) => (zoon.pid === elem.id));
      return (
        <li className="zoon-list__item" key={elem.id}>
          {
            elem.tags[0] === "skill" &&
            <p className="zoon-list__name name_type_skill" onClick={() => onClickNode(elem, "Навык")}>
              <span className="zoon-list__caption">Н</span>
              <span className="zoon-list__count">({firstIndex + 1}).</span>
              {elem.name}
            </p>
          }
          {
            elem.tags[0] === "ability" &&
            <p className="zoon-list__name name_type_ability" onClick={() => onClickNode(elem, "Умение")}>
              <span className="zoon-list__caption">У</span>
              <span className="zoon-list__count">({firstIndex + 1}).</span>
              {elem.name}
            </p>
          }
          {
            elem.tags[0] === "knowledge" &&
            <p className="zoon-list__name name_type_knowledge" onClick={() => onClickNode(elem, "Знание")}>
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
                      <p className="zoon-list__name name_type_skill" onClick={() => onClickNode(elem, "Навык")}>
                        <span className="zoon-list__caption">Н</span>
                        <span className="zoon-list__count">{`(${firstIndex + 1}${secondIndex + 1}).`}</span>
                        {elem.name}
                      </p>
                    }
                    {
                      elem.tags[0] === "ability" &&
                      <p className="zoon-list__name name_type_ability" onClick={() => onClickNode(elem, "Умение")}>
                        <span className="zoon-list__caption">У</span>
                        <span className="zoon-list__count">{`(${firstIndex + 1}${secondIndex + 1}).`}</span>
                        {elem.name}
                      </p>
                    }
                    {
                      elem.tags[0] === "knowledge" &&
                      <p className="zoon-list__name name_type_knowledge" onClick={() => onClickNode(elem, "Знание")}>
                        <span className="zoon-list__caption">З</span>
                        <span className="zoon-list__count">{`(${firstIndex + 1}-${secondIndex + 1}).`}</span>
                        {elem.name}
                      </p>
                    }
                    <ul className="zoon-list__list">
                      {
                        childrenThird.map((elem, thirdIndex) => (
                          <li className="zoon-list__item" key={elem.id}>
                            <p className="zoon-list__name name_type_knowledge" onClick={() => onClickNode(elem, "Знание")}>
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
      api.getZoon({ token: token, dppId: dppDescription.id, zoonVersion: dppDescription.zun_version_id, })
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsRendering(false)); 
    }  return () => {
      setData([]);
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

        <h3 className="zoon-list__title">Сформированные компетенции</h3>
        <ul className="zoon-list__list zoon-list__initial">
          {
            data.zoons.filter((elem) => (elem.type === "Компетенция")).map((elem) => (
              <li className="zoon-list__item" key={elem.id}>
                <p className="zoon-list__name name_type_competence" onClick={() => onClickNode(elem, "Компетенция")}>{elem.name}</p>
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
                <p className="zoon-list__name name_type_cross-knowledge" onClick={() => onClickNode(elem, "Знание")}>
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
          isOpenZoonOptionPopup &&
          <DefineZoonOptionPopup
          isOpen={isOpenZoonOptionPopup}
          onClose={closeZoonListPopups}
          currentNode={currentNode}
          currentNodeType={currentNodeType}
          nodes={data.zoons}
          onRemoveNode={openRemoveNodePopup}
          onSortChildren={openSwapChildrenPopup}
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

        </>
      }
    </div>
  );
}

export default ZoonList;

