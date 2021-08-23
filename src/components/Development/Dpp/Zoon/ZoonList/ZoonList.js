import React from 'react';
import './ZoonList.css';
import * as api from '../../../../../utils/api.js';
import Preloader from '../../../../Preloader/Preloader.js';

function ZoonList({ dppDescription, loggedIn }) {

  const [zoon, setZoon] = React.useState([]);
  const [isRendering, setIsRendering] = React.useState(true); 
  const [competence, setCompetence] = React.useState([]);
  const [crossKnowledge, setCrossKnowledge] = React.useState([]);
  const [zoonWithoutCompetence, setZoonWithoutCompetence] = React.useState([]);

  console.log(zoon);

  function defineChildrenCompetence(id) {
    const childrenFirst = zoon.zoons.filter((elem) => (elem.pid === id));
    return childrenFirst.map((elem) => {
      const childrenSecond = zoon.zoons.filter((zoon) => (zoon.pid === elem.id));
      return (
        <li className="zoon-list__item" key={elem.id}>
          <p className={`zoon-list__name 
          ${elem.tags[0] === "skill" ? "name_type_skill" : ""}
          ${elem.tags[0] === "ability" ? "name_type_ability" : ""}
          ${elem.tags[0] === "knowledge" ? "name_type_knowledge" : ""}
          `}>{elem.name}</p>
          <ul className="zoon-list__list">
            {
              childrenSecond.map((elem) => {
                const childrenThird = zoon.zoons.filter((zoon) => (zoon.pid === elem.id));
                return (
                  <li className="zoon-list__item" key={elem.id}>
                    <p className={`zoon-list__name 
                    ${elem.tags[0] === "skill" ? "name_type_skill" : ""}
                    ${elem.tags[0] === "ability" ? "name_type_ability" : ""}
                    ${elem.tags[0] === "knowledge" ? "name_type_knowledge" : ""}
                    `}>{elem.name}</p>
                    <ul className="zoon-list__list">
                      {
                        childrenThird.map((elem) => (
                          <li className="zoon-list__item" key={elem.id}>
                            <p className="zoon-list__name name_type_knowledge">{elem.name}</p>
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
        setZoon(res);
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
      setZoon([]);
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
        <ul className="zoon-list__list">
          {
            competence.map((elem) => (
              <li className="zoon-list__item" key={elem.id}>
                <p className="zoon-list__name name_type_competence">{elem.name}</p>
                <ul className="zoon-list__list">
                  {defineChildrenCompetence(elem.id)}
                </ul>
              </li>
            ))
          }
        </ul>

        <h3 className="zoon-list__title">Сквозные знания</h3>
        <ul className="zoon-list__list">
          {
            crossKnowledge.map((elem) => (
              <li key={elem.id} className="zoon-list__item">
                <p className="zoon-list__name name_type_cross-knowledge">{elem.name}</p>
              </li>
            ))
          }
        </ul>

        <h3 className="zoon-list__title">Элементы, не прикрепленные к компетенциям</h3>
        <ul className="zoon-list__list">
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
                  {defineChildrenCompetence(elem.id)}
                </ul>
              </li>
            ))
          }
        </ul>

        </>
      }
    </div>
  );
}

export default ZoonList;