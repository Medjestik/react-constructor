import React from 'react';
import './EditNodePopup.css';
import Popup from '../../../../Popup/Popup.js';

function EditNodePopup({ isOpen, onClose, zoonChart, currentNode, onSave, isLoadingRequest, isErrorRequest }) {

  const [knowledgeWhat, setKnowledgeWhat] = React.useState('');
  const [errorKnowledgeWhat, setErrorKnowledgeWhat] = React.useState(true);
  const [formErrorKnowledge, setFormErrorKnowledge] = React.useState(true);
  const [abilityWhat, setAbilityWhat] = React.useState('');
  const [abilityWith, setAbilityWith] = React.useState('');
  const [abilityWhere, setAbilityWhere] = React.useState('');
  const [formErrorAbility, setFormErrorAbility] = React.useState(true);
  const [skillWhat, setSkillWhat] = React.useState('');
  const [skillWith, setSkillWith] = React.useState('');
  const [skillWhere, setSkillWhere] = React.useState('');
  const [formErrorSkill, setFormErrorSkill] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    /*switch(currentNode.tags[0]) {
      case 'knowledge':
        const newKnowledge = "Знать " + knowledgeWhat;
        const newKnowledgeNode = { ...currentNode, name: newKnowledge, what: knowledgeWhat };
        onSave(zoonChart, newKnowledgeNode);
        break;
      
      case 'ability': 
        const newAbility = "Уметь " + abilityWhat + " " + abilityWith + " " + abilityWhere;
        const newAbilityNode = { ...currentNode, name: newAbility, what: abilityWhat, with: abilityWith, where: abilityWhere };
        onSave(zoonChart, newAbilityNode);
        break;

        case 'skill': 
        const newSkill = "Владеть навыком " + skillWhat + " " + skillWith + " " + skillWhere;
        const newSkillNode = { ...currentNode, name: newSkill, what: skillWhat, with: skillWith, where: skillWhere };
        onSave(zoonChart, newSkillNode);
        break;

      default: 
        return false;
    }*/
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
  }

  function handleChangeAbilityWith(e) {
    setAbilityWith(e.target.value);
  }

  function handleChangeAbilityWhere(e) {
    setAbilityWhere(e.target.value);
  }

  function handleChangeSkillWhat(e) {
    setSkillWhat(e.target.value);
  }

  function handleChangeSkillWith(e) {
    setSkillWith(e.target.value);
  }

  function handleChangeSkillWhere(e) {
    setSkillWhere(e.target.value);
  }

  React.useEffect(() => {
    setKnowledgeWhat(currentNode.what || "");
    setErrorKnowledgeWhat(true);
    setFormErrorKnowledge(true);
    setAbilityWhat(currentNode.what || "");
    setAbilityWith(currentNode.with || "");
    setAbilityWhere(currentNode.where || "");
    setFormErrorAbility(true);
    setSkillWhat(currentNode.what || "");
    setSkillWith(currentNode.with || "");
    setSkillWhere(currentNode.where || "");
    setFormErrorSkill(true);
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
    if (abilityWhat.length > 0 & abilityWith.length > 0 & abilityWhere.length > 0) {
      setFormErrorAbility(false);
    } else {
      setFormErrorAbility(true);
    }
  }, [abilityWhat, abilityWith, abilityWhere]);

  React.useEffect(() => {
    if (skillWhat.length > 0 & skillWith.length > 0 & skillWhere.length > 0) {
      setFormErrorSkill(false);
    } else {
      setFormErrorSkill(true);
    }
  }, [skillWhat, skillWith, skillWhere]);

  function handleDefineType(type) {
    switch(type) {
      case 'knowledge':
        return (
          <>
          <h3 className="popup__title add-node__main-title">Редактирование знания</h3>
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
          minLength="1"
          required
          ></input>
          <span className="popup__subtitle add-node__caption">{`Итоговое название: Знать ${knowledgeWhat || ""}`}</span>
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
        )
      case 'ability':
        return(
          <>
          <h3 className="popup__title add-node__main-title">Редактирование умения</h3>
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
          minLength="1"
          required
          ></input>
          <span className="popup__subtitle add-node__caption">{`Итоговое название: Уметь ${abilityWhat || ""} ${abilityWith || ""} ${abilityWhere || ""}`}</span>
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
        )
        case "skill":
          return(
            <>
            <h3 className="popup__title add-node__main-title">Редактирование навыка</h3>
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
            minLength="1"
            required
            ></input>
            <span className="popup__subtitle add-node__caption">{`Итоговое название: Владеть навыком ${skillWhat || ""} ${skillWith || ""} ${skillWhere || ""}`}</span>
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

export default EditNodePopup;