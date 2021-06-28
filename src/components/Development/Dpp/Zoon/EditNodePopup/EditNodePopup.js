import React from 'react';
import './EditNodePopup.css';
import Popup from '../../../../Popup/Popup.js';

function RequirementQualificationsPopup({ isOpen, onClose, zoonChart, currentNode, onSave }) {

  const [nameKnowledge, setNameKnowledge] = React.useState('');
  const [nameAbility, setNameAbility] = React.useState('');
  const [helpAbility, setHelpAbility] = React.useState('');
  const [conditionsAbility, setConditionsAbility] = React.useState('');
  const [nameSkill, setNameSkill] = React.useState('');
  const [helpSkill, setHelpSkill] = React.useState('');
  const [conditionsSkill, setConditionsSkill] = React.useState('');

  console.log(nameAbility);

  function handleSubmit(e) {
    e.preventDefault();
    switch(currentNode.tags[0]) {
      case 'knowledge':
        const newKnowledge = "Знать " + nameKnowledge;
        const newKnowledgeNode = { ...currentNode, name: newKnowledge };
        onSave(zoonChart, newKnowledgeNode);
        break;
      
      case 'ability': 
        const newAbility = "Уметь " + nameAbility + " " + helpAbility + " " + conditionsAbility;
        const newAbilityNode = { ...currentNode, name: newAbility };
        onSave(zoonChart, newAbilityNode);
        break;

        case 'skill': 
        const newSkill = "Владеть навыком " + nameSkill + " " + helpSkill + " " + conditionsSkill;
        const newSkillNode = { ...currentNode, name: newSkill };
        onSave(zoonChart, newSkillNode);
        break;

      default: 
        return false;
    }
  }
  
  function handleChangeKnowledgeName(e) {
    setNameKnowledge(e.target.value);
  }

  function handleChangeAbilityName(e) {
    setNameAbility(e.target.value);
  }

  function handleChangeAbilityHelp(e) {
    setHelpAbility(e.target.value);
  }

  function handleChangeAbilityConditions(e) {
    setConditionsAbility(e.target.value);
  }

  function handleChangeSkillName(e) {
    setNameSkill(e.target.value);
  }

  function handleChangeSkillHelp(e) {
    setHelpSkill(e.target.value);
  }

  function handleChangeSkillConditions(e) {
    setConditionsSkill(e.target.value);
  }

  
  React.useEffect(() => {
    setNameKnowledge('');
    setNameAbility();
    setHelpAbility('');
    setConditionsAbility('');
    setNameSkill();
    setHelpSkill('');
    setConditionsSkill('');
    return () => {

    };
    // eslint-disable-next-line
  }, [isOpen]);

  function handleDefineType(type) {
    switch(type) {
      case 'knowledge':
        return (
          <>
          <h3 className="popup__title add-node__main-title">Создание нового знания</h3>
          <h5 className="popup__title add-node__title">Название знания</h5>
          <p className="popup__subtitle add-node__subtitle">Заполните параметры названия компонента</p>
          <input 
          className="node__input"
          placeholder="Знать что?"
          type="text"
          id="add-input-knowledge-name"
          name="add-input-knowledge-name"
          autoComplete="off"
          value={nameKnowledge || ""}
          onChange={handleChangeKnowledgeName}
          ></input>
          <span className="popup__subtitle add-node__caption">{`Итоговое название: Знать ${nameKnowledge || ""}`}</span>
          </>
        )
      case 'ability':
        return(
          <>
          <h3 className="popup__title add-node__main-title">Создание нового умения</h3>
          <h5 className="popup__title add-node__title">Название умения</h5>
          <p className="popup__subtitle add-node__subtitle">Заполните параметры названия компонента</p>
          <input 
          className="node__input"
          placeholder="Уметь что?"
          type="text"
          id="add-input-ability-name"
          name="add-input-ability-name"
          autoComplete="off"
          value={nameAbility || ""}
          onChange={handleChangeAbilityName}
          ></input>
          <input 
          className="node__input"
          placeholder="При помощи чего?"
          type="text"
          id="add-input-ability-help"
          name="add-input-ability-help"
          autoComplete="off"
          value={helpAbility || ""}
          onChange={handleChangeAbilityHelp}
          ></input>
          <input 
          className="node__input"
          placeholder="При каких условиях?"
          type="text"
          id="add-input-ability-conditions"
          name="add-input-ability-conditions"
          autoComplete="off"
          value={conditionsAbility || ""}
          onChange={handleChangeAbilityConditions}
          ></input>
          <span className="popup__subtitle add-node__caption">{`Итоговое название: Уметь ${nameAbility || ""} ${helpAbility || ""} ${conditionsAbility || ""}`}</span>
          </>
        )
        case "skill":
          return(
            <>
            <h3 className="popup__title add-node__main-title">Создание нового навыка</h3>
            <h5 className="popup__title add-node__title">Название умения</h5>
            <p className="popup__subtitle add-node__subtitle">Заполните параметры названия компонента</p>
            <input 
            className="node__input"
            placeholder="Владеть навыком каким?"
            type="text"
            id="add-input-skill-name"
            name="add-input-skill-name"
            autoComplete="off"
            value={nameSkill|| ""}
            onChange={handleChangeSkillName}
            ></input>
            <input 
            className="node__input"
            placeholder="При помощи чего?"
            type="text"
            id="add-input-skill-help"
            name="add-input-skilly-help"
            autoComplete="off"
            value={helpSkill || ""}
            onChange={handleChangeSkillHelp}
            ></input>
            <input 
            className="node__input"
            placeholder="При каких условиях?"
            type="text"
            id="add-input-skill-conditions"
            name="add-input-skill-conditions"
            autoComplete="off"
            value={conditionsSkill || ""}
            onChange={handleChangeSkillConditions}
            ></input>
            <span className="popup__subtitle add-node__caption">{`Итоговое название: Владеть навыком ${nameSkill || ""} ${helpSkill || ""} ${conditionsSkill || ""}`}</span>
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
      <form className="popup__form popup__form_type_large" name="edit-zoon-form" action="#" noValidate onSubmit={handleSubmit}>
        {handleDefineType(currentNode.tags[0] || "")}
  
        <button className="btn btn_type_save initial-popup__btn-save" type="submit">Сохранить</button>
      </form>
    </Popup>
  )
}

export default RequirementQualificationsPopup;