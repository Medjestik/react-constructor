import React from 'react';
import './AddNodePopup.css';
import Popup from '../../../../Popup/Popup.js';
import Justification from './Justification/Justification.js';
import KnowledgeTypology from './KnowledgeTypology/KnowledgeTypology.js';

function AddNodePopup({ isOpen, onClose, zoonChart, currentNode, onAdd, onEdit, isLoadingRequest, isErrorRequest, openAddJustificationPopup, addNsiPopupOpen, onEditNsi, onRemoveNsi, nsi, typologyParts, currentActionType, isEditRights }) {

  const [knowledgeWhat, setKnowledgeWhat] = React.useState('');
  const [errorKnowledgeWhat, setErrorKnowledgeWhat] = React.useState(true);
  const [formErrorKnowledge, setFormErrorKnowledge] = React.useState(true);
  const [abilityWhat, setAbilityWhat] = React.useState('');
  const [errorAbilityWhat, setErrorAbilityWhat] = React.useState(true);
  const [abilityWith, setAbilityWith] = React.useState('');
  const [errorAbilityWith, setErrorAbilityWith] = React.useState(true);
  const [abilityWhere, setAbilityWhere] = React.useState('');
  const [errorAbilityWhere, setErrorAbilityWhere] = React.useState(true);
  const [formErrorAbility, setFormErrorAbility] = React.useState(true);
  const [skillWhat, setSkillWhat] = React.useState('');
  const [errorSkillWhat, setErrorSkillWhat] = React.useState(true);
  const [skillWith, setSkillWith] = React.useState('');
  const [errorSkillWith, setErrorSkillWith] = React.useState(true);
  const [skillWhere, setSkillWhere] = React.useState('');
  const [errorSkillWhere, setErrorSkillWhere] = React.useState(true);
  const [formErrorSkill, setFormErrorSkill] = React.useState(true); 

  const [newNode, setNewNode] = React.useState();
  const [nsiArray, setNsiArray] = React.useState([])

  function handleChooseJustificationType(number) {
    setNewNode({ ...newNode, justificationType: number });
  }

  function handleChangeExpertOpinion(text) {
    setNewNode({ ...newNode, expertOpinion: text });
  }

  function handleChangeNsiNote(text) {
    setNewNode({ ...newNode, note: text });
  }

  function handleChooseNsi(id) {
    let index = nsiArray.indexOf(id);
    let newArray = nsiArray;
    console.log(newArray);
    if (index === -1) {
      newArray.push(id);
    } else {
      newArray.splice(index, 1);
    }
    setNsiArray(newArray);
  }

  function handleChooseTypologyPart(id) {
    setNewNode({ ...newNode, typologyPartId: id });
  }

  function handleSwapType() {
    setNsiArray([]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(currentActionType)
    switch(currentNode.tags[0]) {
      case 'knowledge':
        const newKnowledge = "Знать " + knowledgeWhat;
        const newKnowledgeNode = { ...newNode, name: newKnowledge, what: knowledgeWhat, nsis: nsiArray };
        if (currentActionType === "edit") {
          onEdit(zoonChart, newKnowledgeNode);
        } else {
          onAdd(zoonChart, newKnowledgeNode);
        }
        
        break;
      
      case 'ability': 
        const newAbility = "Уметь " + abilityWhat + " " + abilityWith + " " + abilityWhere;
        const newAbilityNode = { ...newNode, name: newAbility, what: abilityWhat, with: abilityWith, where: abilityWhere, nsis: nsiArray };
        if (currentActionType === "edit") {
          onEdit(zoonChart, newAbilityNode);
        } else {
          onAdd(zoonChart, newAbilityNode);
        }
        break;

        case 'skill': 
        const newSkill = "Владеть навыком " + skillWhat + " " + skillWith + " " + skillWhere;
        const newSkillNode = { ...newNode, name: newSkill, what: skillWhat, with: skillWith, where: skillWhere, nsis: nsiArray };
        if (currentActionType === "edit") {
          console.log(newSkillNode);
          onEdit(zoonChart, newSkillNode);
        } else {
          onAdd(zoonChart, newSkillNode);
        }
        break;

      default: 
        return false;
    }
  }
  
  function handleChangeKnowledgeWhat(e) {
    setKnowledgeWhat(e.target.value);
    if (e.target.checkValidity()) {
      setErrorKnowledgeWhat(false);
    } else {
      setErrorKnowledgeWhat(true);
    }
  }

  function handleChangeAbilityWhat(e) {
    setAbilityWhat(e.target.value);
    if (e.target.checkValidity()) {
      setErrorAbilityWhat(false);
    } else {
      setErrorAbilityWhat(true);
    }
  }

  function handleChangeAbilityWith(e) {
    setAbilityWith(e.target.value);
    if (e.target.checkValidity()) {
      setErrorAbilityWith(false);
    } else {
      setErrorAbilityWith(true);
    }
  }

  function handleChangeAbilityWhere(e) {
    setAbilityWhere(e.target.value);
    if (e.target.checkValidity()) {
      setErrorAbilityWhere(false);
    } else {
      setErrorAbilityWhere(true);
    }
  }

  function handleChangeSkillWhat(e) {
    setSkillWhat(e.target.value);
    if (e.target.checkValidity()) {
      setErrorSkillWhat(false);
    } else {
      setErrorSkillWhat(true);
    }
  }

  function handleChangeSkillWith(e) {
    setSkillWith(e.target.value);
    if (e.target.checkValidity()) {
      setErrorSkillWith(false);
    } else {
      setErrorSkillWith(true);
    }
  }

  function handleChangeSkillWhere(e) {
    setSkillWhere(e.target.value);
    if (e.target.checkValidity()) {
      setErrorSkillWhere(false);
    } else {
      setErrorSkillWhere(true);
    }
  }



  React.useEffect(() => {
    setKnowledgeWhat(currentActionType === "edit" ? currentNode.what : "");
    setErrorKnowledgeWhat(currentActionType === "edit" ? false : true);
    setFormErrorKnowledge(true);
    setAbilityWhat(currentActionType === "edit" ? currentNode.what : "");
    setAbilityWith(currentActionType === "edit" ? currentNode.with : "");
    setAbilityWhere(currentActionType === "edit" ? currentNode.where : "");
    setErrorAbilityWhat(currentActionType === "edit" ? false : true);
    setErrorAbilityWith(currentActionType === "edit" ? false : true);
    setErrorAbilityWhere(currentActionType === "edit" ? false : true);
    setFormErrorAbility(true);
    setSkillWhat(currentActionType === "edit" ? currentNode.what : "");
    setSkillWith(currentActionType === "edit" ? currentNode.with : "");
    setSkillWhere(currentActionType === "edit" ? currentNode.where : "");
    setErrorSkillWhat(currentActionType === "edit" ? false : true);
    setErrorSkillWith(currentActionType === "edit" ? false : true);
    setErrorSkillWhere(currentActionType === "edit" ? false : true);
    setFormErrorSkill(true);
    setNsiArray(currentActionType === "edit" ? currentNode.nsis : []);
    setNewNode(currentActionType === "edit" ? currentNode : { ...currentNode, justificationType: "", expertOpinion: "", nsis: [], typologyPartId: "", note: "", });

    return () => {
      setNewNode({})
    }
    // eslint-disable-next-line
  }, [isOpen]);

  React.useEffect(() => {
    if (errorKnowledgeWhat) {
      setFormErrorKnowledge(true);
    } else {
      setFormErrorKnowledge(false);
    }
  }, [errorKnowledgeWhat]);

  React.useEffect(() => {
    if (errorAbilityWhat || errorAbilityWith || errorAbilityWhere) {
      setFormErrorAbility(true);
    } else {
      setFormErrorAbility(false);
    }
  }, [errorAbilityWhat, errorAbilityWith, errorAbilityWhere]);

  React.useEffect(() => {
    if (errorSkillWhat || errorSkillWith || errorSkillWhere) {
      setFormErrorSkill(true);
    } else {
      setFormErrorSkill(false);
    }
  }, [errorSkillWhat, errorSkillWith, errorSkillWhere]);

  function handleDefineType(type) {
    switch(type) {
      case 'knowledge':
        return (
          <>
          <h3 className="popup__title add-node__main-title">{currentActionType === "edit" ? "Редактирование знания" : "Создание нового знания"}</h3>
          <h5 className="popup__title add-node__title">Название знания</h5>
          <p className="popup__subtitle add-node__subtitle">Заполните параметры названия компонента</p>
          <input 
          className="node__input"
          placeholder="Знать что?"
          type="text"
          id="add-input-knowledge-name"
          name="add-input-knowledge-name"
          autoComplete="off"
          value={knowledgeWhat || ""}
          onChange={handleChangeKnowledgeWhat}
          spellCheck="true"
          minLength="1"
          required
          ></input>
          <span className="popup__subtitle add-node__caption">{`Итоговое название: Знать ${knowledgeWhat || ""}`}</span>

          <KnowledgeTypology
            typologyParts={typologyParts}
            currentNode={currentNode}
            currentActionType={currentActionType}
            onChoose={handleChooseTypologyPart}
          />
          
          <Justification 
          openAddJustificationPopup={openAddJustificationPopup} 
          nsi={nsi} 
          onChooseJustificationType={handleChooseJustificationType}
          onChangeExpertOpinion={handleChangeExpertOpinion}
          onChangeNsiNote={handleChangeNsiNote}
          onChooseNsi={handleChooseNsi}
          onSwapType={handleSwapType}
          addNsiPopupOpen={addNsiPopupOpen}
          onEditNsi={onEditNsi}
          onRemoveNsi={onRemoveNsi}
          currentActionType={currentActionType}
          currentNode={currentNode}
          isEditRights={isEditRights}
          />

          {
            isEditRights &&
            <>
            <div className="add-zoon__error">
              <span className={`add-zoon__error-message ${isErrorRequest ? "add-zoon__error-message_type_show" : "add-zoon__error-message_type_hide"}`}>К сожалению, произошла ошибка, попробуйте обновить страницу.</span>
            </div>
            <button className={`
            btn btn_type_save initial-popup__btn-save 
            ${isLoadingRequest || formErrorKnowledge ? "btn_type_loading" : ""}
            `} 
            type="submit"
            >
            {isLoadingRequest ? "Сохранение.." : "Сохранить"}
            </button>
            </>
          }

          </>
        )
      case 'ability':
        return(
          <>
          <h3 className="popup__title add-node__main-title">{currentActionType === "edit" ? "Редактирование умения" : "Создание нового умения"}</h3>
          <h5 className="popup__title add-node__title">Название умения</h5>
          <p className="popup__subtitle add-node__subtitle">Заполните параметры названия компонента</p>
          <input 
          className="node__input"
          placeholder="Уметь что?"
          type="text"
          id="add-input-ability-name"
          name="add-input-ability-name"
          autoComplete="off"
          value={abilityWhat || ""}
          onChange={handleChangeAbilityWhat}
          spellCheck="true"
          minLength="1"
          required
          ></input>
          <input 
          className="node__input"
          placeholder="При помощи чего?"
          type="text"
          id="add-input-ability-help"
          name="add-input-ability-help"
          autoComplete="off"
          value={abilityWith || ""}
          onChange={handleChangeAbilityWith}
          spellCheck="true"
          minLength="1"
          required
          ></input>
          <input 
          className="node__input"
          placeholder="При каких условиях?"
          type="text"
          id="add-input-ability-conditions"
          name="add-input-ability-conditions"
          autoComplete="off"
          value={abilityWhere || ""}
          onChange={handleChangeAbilityWhere}
          spellCheck="true"
          minLength="1"
          required
          ></input>
          <span className="popup__subtitle add-node__caption">{`Итоговое название: Уметь ${abilityWhat || ""} ${abilityWith || ""} ${abilityWhere || ""}`}</span>

          <Justification 
          openAddJustificationPopup={openAddJustificationPopup} 
          nsi={nsi} 
          onChooseJustificationType={handleChooseJustificationType}
          onChangeExpertOpinion={handleChangeExpertOpinion}
          onChangeNsiNote={handleChangeNsiNote}
          onChooseNsi={handleChooseNsi}
          onSwapType={handleSwapType}
          addNsiPopupOpen={addNsiPopupOpen}
          onEditNsi={onEditNsi}
          onRemoveNsi={onRemoveNsi}
          currentActionType={currentActionType}
          currentNode={currentNode}
          isEditRights={isEditRights}
          />

          {
            isEditRights &&
            <>
            <div className="add-zoon__error">
              <span className={`add-zoon__error-message ${isErrorRequest ? "add-zoon__error-message_type_show" : "add-zoon__error-message_type_hide"}`}>К сожалению, произошла ошибка, попробуйте обновить страницу.</span>
            </div>
            <button className={`
            btn btn_type_save initial-popup__btn-save 
            ${isLoadingRequest || formErrorAbility ? "btn_type_loading" : ""}
            `} 
            type="submit"
            >
            {isLoadingRequest ? "Сохранение.." : "Сохранить"}
            </button>
            </>
          }
          
          </>
        )
        case "skill":
          return(
            <>
            <h3 className="popup__title add-node__main-title">{currentActionType === "edit" ? "Редактирование навыка" : "Создание нового навыка"}</h3>
            <h5 className="popup__title add-node__title">Название навыка</h5>
            <p className="popup__subtitle add-node__subtitle">Заполните параметры названия компонента</p>
            <input 
            className="node__input"
            placeholder="Владеть навыком каким?"
            type="text"
            id="add-input-skill-name"
            name="add-input-skill-name"
            autoComplete="off"
            value={skillWhat || ""}
            onChange={handleChangeSkillWhat}
            spellCheck="true"
            minLength="1"
            required
            ></input>
            <input 
            className="node__input"
            placeholder="При помощи чего?"
            type="text"
            id="add-input-skill-help"
            name="add-input-skilly-help"
            autoComplete="off"
            value={skillWith || ""}
            onChange={handleChangeSkillWith}
            spellCheck="true"
            minLength="1"
            required
            ></input>
            <input 
            className="node__input"
            placeholder="При каких условиях?"
            type="text"
            id="add-input-skill-conditions"
            name="add-input-skill-conditions"
            autoComplete="off"
            value={skillWhere || ""}
            onChange={handleChangeSkillWhere}
            spellCheck="true"
            minLength="1"
            required
            ></input>
            <span className="popup__subtitle add-node__caption">{`Итоговое название: Владеть навыком ${skillWhat || ""} ${skillWith || ""} ${skillWhere || ""}`}</span>

            <Justification 
            nsi={nsi} 
            onChooseJustificationType={handleChooseJustificationType}
            onChangeExpertOpinion={handleChangeExpertOpinion}
            onChangeNsiNote={handleChangeNsiNote}
            onChooseNsi={handleChooseNsi}
            onSwapType={handleSwapType}
            addNsiPopupOpen={addNsiPopupOpen}
            onEditNsi={onEditNsi}
            onRemoveNsi={onRemoveNsi}
            currentActionType={currentActionType}
            currentNode={currentNode}
            isEditRights={isEditRights}
            />

            {
              isEditRights && 
              <>
              <div className="add-zoon__error">
                <span className={`add-zoon__error-message ${isErrorRequest ? "add-zoon__error-message_type_show" : "add-zoon__error-message_type_hide"}`}>К сожалению, произошла ошибка, попробуйте обновить страницу.</span>
              </div>
              <button className={`
              btn btn_type_save initial-popup__btn-save 
              ${isLoadingRequest || formErrorSkill ? "btn_type_loading" : ""}
              `} 
              type="submit"
              >
              {isLoadingRequest ? "Сохранение.." : "Сохранить"}
              </button>
              </>
            }
            </>
          )
      default:
        return (
          <div>Неизвестный тип</div>
        )
    }
  }

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="add-zoon-form" action="#" noValidate onSubmit={handleSubmit}>
        {handleDefineType(currentNode.tags[0] || "")}
      </form>
    </Popup>
  )
}

export default AddNodePopup;