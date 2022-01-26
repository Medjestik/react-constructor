import React from 'react';
import './ZoonList.css';
import * as api from '../../../../../utils/api.js';
import Preloader from '../../../../Preloader/Preloader.js';
import DefineZoonOption from '../DefineZoonOption/DefineZoonOption.js';

function ZoonList({ dppDescription, loggedIn }) {

  const [nodes, setNodes] = React.useState([]);
  const [isRendering, setIsRendering] = React.useState(true); 
  const [competence, setCompetence] = React.useState([]);
  const [crossKnowledge, setCrossKnowledge] = React.useState([]);
  const [zoonWithoutCompetence, setZoonWithoutCompetence] = React.useState([]);

  const [currentNode, setCurrentNode] = React.useState({});
  const [currentNodeType, setCurrentNodeType] = React.useState({});
  const [isOpenZoonOptionPopup, setOpenZoonOptionPopup] = React.useState(false);

  function onClickNode(elem, type) {
    setCurrentNode(elem);
    setCurrentNodeType(type);
    setOpenZoonOptionPopup(true);
  }

  function handleChooseOption() {

  }

  function closeZoonListPopups() {
    setOpenZoonOptionPopup(false);
  }

  function defineChildren(id) {
    const childrenFirst = nodes.zoons.filter((elem) => (elem.pid === id));
    return childrenFirst.map((elem, firstIndex) => {
      const childrenSecond = nodes.zoons.filter((zoon) => (zoon.pid === elem.id));
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
                const childrenThird = nodes.zoons.filter((zoon) => (zoon.pid === elem.id));
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
        setNodes(res);
        const competence = res.zoons.filter((elem) => (elem.type === "Компетенция"));
        setCompetence(competence);
        const crossKnowledge = res.zoons.filter((elem) => (elem.pid === "th"));
        setCrossKnowledge(crossKnowledge);
        const zoonWithoutCompetence = res.zoons.filter((elem) => (elem.pid && elem.pid.length === 1));
        setZoonWithoutCompetence(zoonWithoutCompetence);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsRendering(false)); 
    }  return () => {
      setNodes([]);
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
            competence.map((elem) => (
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
            crossKnowledge.map((elem, indexCrossKnowledge) => (
              <li key={elem.id} className="zoon-list__item">
                <p className="zoon-list__name name_type_cross-knowledge" onClick={() => onClickNode(elem, "Сквозное знание")}>
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
            zoonWithoutCompetence.map((elem) => (
              <li className="zoon-list__item" key={elem.id}>
                <p className={`zoon-list__name                     
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
          <DefineZoonOption
          isOpen={isOpenZoonOptionPopup}
          onClose={closeZoonListPopups}
          currentNode={currentNode}
          currentNodeType={currentNodeType}
          nodes={nodes}
          onConfirm={handleChooseOption}
          />
        }

        </>
      }
    </div>
  );
}

export default ZoonList;

