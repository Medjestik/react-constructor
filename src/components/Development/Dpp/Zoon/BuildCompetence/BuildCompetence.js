import React from 'react';
import './BuildCompetence.css';
import Popup from '../../../../Popup/Popup.js';

function BuildCompetence({ isOpen, onClose, onBuild, onEdit, nodes, zoonChart, isLoadingRequest, isErrorRequest, currentNode, currentActionType }) {

  const [currentNodes, setCurrentNodes] = React.useState([]);
  const [chooseNodesId, setChooseNodesId] = React.useState([]);
  const [competenceWhat, setCompetenceWhat] = React.useState("");
  const [competenceWhatError, setCompetenceWhatError] = React.useState(false);
  const [competenceWith, setCompetenceWith] = React.useState("");
  const [competenceWithError, setCompetenceWithError] = React.useState(false);
  const [competenceWhere, setCompetenceWhere] = React.useState("");
  const [competenceWhereError, setCompetenceWhereError] = React.useState(false);
  const [formErrorCompetence, setFormErrorCompetence] = React.useState(true);
  const [currentCompetence, setCurrentCompetence] = React.useState({});
  
  console.log(currentNode);

  function handleSubmit(e) {
    e.preventDefault();
    const newCompetence = "Способен " + competenceWhat + competenceWith + competenceWhere;
    const newCompetenceNode = { name: newCompetence, what: competenceWhat, with: competenceWith, where: competenceWhere };
    if (currentActionType === "edit") {
      //console.log(newSkillNode);
      //onEdit(zoonChart, newSkillNode);
      onEdit(zoonChart, { ...currentCompetence, name: newCompetence, what: competenceWhat, with: competenceWith, where: competenceWhere }, currentCompetence.id);
    } else {
      onBuild(zoonChart, newCompetenceNode, chooseNodesId);
    }
  }

  function handleChooseNode(id) {
    let index = chooseNodesId.indexOf(id);
    let newArray = chooseNodesId;
    if (index === -1) {
      newArray.push(id);
    } else {
      newArray.splice(index, 1);
    }
    setChooseNodesId(newArray);
  }

  function handleChangeCompetenceWhat(e) {
    setCompetenceWhat(e.target.value);
    if (e.target.checkValidity()) {
      setCompetenceWhatError(false);
    } else {
      setCompetenceWhatError(true);
    }
  }

  function handleChangeCompetenceWith(e) {
    setCompetenceWith(e.target.value);
    if (e.target.checkValidity()) {
      setCompetenceWithError(false);
    } else {
      setCompetenceWithError(true);
    }
  }

  function handleChangeCompetenceWhere(e) {
    setCompetenceWhere(e.target.value);
    if (e.target.checkValidity()) {
      setCompetenceWhereError(false);
    } else {
      setCompetenceWhereError(true);
    }
  }

  React.useEffect(() => {
    if (competenceWhatError || competenceWithError || competenceWhereError) {
      setFormErrorCompetence(true);
    } else {
      setFormErrorCompetence(false);
    }
  }, [competenceWhatError, competenceWithError, competenceWhereError]);

  React.useEffect(() => {
    setCompetenceWhat(currentActionType === "edit" ? currentNode.what : "");
    setCompetenceWith(currentActionType === "edit" ? currentNode.with : "");
    setCompetenceWhere(currentActionType === "edit" ? currentNode.where : "");
    setCompetenceWhatError(currentActionType === "edit" ? false : true);
    setCompetenceWithError(currentActionType === "edit" ? false : true);
    setCompetenceWhereError(currentActionType === "edit" ? false : true);
    setFormErrorCompetence(currentActionType === "edit" ? false : true);

    const unLinksNodes = nodes.filter((elem) => ((elem.pid === "c")) || ((elem.pid === "s")));
    const filteredNodes = unLinksNodes.filter((elem) => ((elem.type === "Навык") || (elem.type === "Умение")));
    setCurrentNodes(filteredNodes);
    setCurrentCompetence(currentActionType === "edit" ? currentNode : {});

    return () => {
      setCurrentNodes([]);
    }
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="build-competence" action="#" noValidate onSubmit={handleSubmit}>
      <h3 className="popup__title add-node__main-title">{currentActionType === "edit" ? "Редактирование компетенции" : "Формирование новой компетенции"}</h3>
      <h5 className="popup__title add-node__title">Название компетенции</h5>
      <p className="popup__subtitle add-node__subtitle">Заполните параметры названия компонента</p>
      <input 
      className="node__input"
      placeholder="Способен на что?"
      type="text"
      id="add-input-competence-name"
      name="add-input-competence-name"
      autoComplete="off"
      value={competenceWhat || ""}
      onChange={handleChangeCompetenceWhat}
      minLength="1"
      required
      ></input>
      <input 
      className="node__input"
      placeholder="При помощи чего?"
      type="text"
      id="add-input-competence-help"
      name="add-input-competence-help"
      autoComplete="off"
      value={competenceWith || ""}
      onChange={handleChangeCompetenceWith}
      minLength="1"
      required
      ></input>
      <input 
      className="node__input"
      placeholder="При каких условиях?"
      type="text"
      id="add-input-competence-conditions"
      name="add-input-competence-conditions"
      autoComplete="off"
      value={competenceWhere || ""}
      onChange={handleChangeCompetenceWhere}
      minLength="1"
      required
      ></input>
      <span className="popup__subtitle add-node__caption">{`Итоговое название: Способен ${competenceWhat || ""} ${competenceWith || ""} ${competenceWhere || ""}`}</span>

      {
        currentActionType === "add" ?
        <>
        <h5 className="popup__title add-node__title build-competence__title">Навыки и умения, которые войдут в компетенцию</h5>
        <p className="popup__subtitle add-node__subtitle">Выберите необходимые компоненты</p>
        <ul className="build-competence__list">
          {
            currentNodes.map((elem, i) => (
              <li className="build-competence__item" key={i}>
                <label className="checkbox build-competence__checkbox">
                  <input 
                    name="nodes"
                    type="checkbox"
                    id={elem.id}
                    //defaultChecked={selectedProfStandart.some(elem => elem.id === item.id)}
                    onChange={() => handleChooseNode(elem.id)}
                    >
                  </input>
                  <span></span>
                </label>
                <div className="build-competence__info">
                  <span className={`build-competence__type ${elem.type === "Навык" ? "build-competence__type-skill" : ""}`}>{elem.type || "тип"}</span>
                  <h4 className="build-competence__name">{elem.name || "название"}</h4>
                </div>
              </li>
            ))
          }
        </ul>
        </>
        :
        <div></div>
      }
      


      <div className="add-zoon__error">
      <span className={`add-zoon__error-message ${isErrorRequest ? "add-zoon__error-message_type_show" : "add-zoon__error-message_type_hide"}`}>К сожалению, произошла ошибка, попробуйте обновить страницу.</span>
      </div>
      <button className={`
      btn btn_type_save initial-popup__btn-save 
      ${isLoadingRequest || formErrorCompetence ? "btn_type_loading" : ""}
      `} 
      type="submit"
      >
      {isLoadingRequest ? "Сохранение.." : "Сохранить"}
      </button>
      </form>
    </Popup>
  )
}

export default BuildCompetence;