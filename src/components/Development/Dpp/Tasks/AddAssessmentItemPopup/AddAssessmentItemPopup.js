import React from 'react';
import Popup from '../../../../Popup/Popup.js';

function AddAssessmentItemPopup({ isOpen, onClose, skills, abilities }) {

  const [type, setType] = React.useState(0);
  const [skill, setSkill] = React.useState("");
  const [ability, setAbility] = React.useState("");
  const [iShowSkillField, setIsShowSkillField] = React.useState(false);
  const [iShowAbilityField, setIsShowAbilityField] = React.useState(false);

  function handleSubmit() {
    console.log(type);
  }

  function handleChangeItemType(e) {
    setType(e.target.value);
  }

  React.useEffect(() => {
    console.log(type);
    switch (type) {
      case "2":
        setIsShowSkillField(false);
        setIsShowAbilityField(true);

        break;
      case "3":
        setIsShowSkillField(true);
        setIsShowAbilityField(false);

        break;
      case "4":
        setIsShowSkillField(true);
        setIsShowAbilityField(false);

        break;
      default:
        setIsShowSkillField(false);
        setIsShowAbilityField(false);
    }
  }, [type]);

  React.useEffect(() => {
    setType(0);
    setIsShowSkillField(false);
    setIsShowAbilityField(false);
  }, [isOpen]);
 

  return(
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="add-task-assessment-item-popup-form" action="#" noValidate onSubmit={handleSubmit}>

        <h3 className="initial-popup__title">Добавление нового предмета оценки</h3>
        <ul className="practical-task__list">
          <li className="practical-task__item">
              <h5 className="practical-task__item-name">Выберите что оценивает задание</h5>
              <div className="select-wrapper">
                <select           
                id="add-practical-task-assessment-item-type"
                name="add-practical-task-assessment-item-type"
                onChange={handleChangeItemType}
                defaultValue="placeholder"
                required   
                >
                  <option value="placeholder" disabled hidden>Выберите что оценивает задание</option>
                  <option value="2">Только умение</option>
                  <option value="3">Только навык</option>
                  <option value="4">Навык и входящие в них умения в совокупности</option>
                </select>
                <div className="select-arrow"></div>
                <div className="select-arrow"></div>
              </div>
            </li>
            <li className={`practical-task__item ${iShowAbilityField ? "" : "practical-task__item_type_hide"}`}>
              <h5 className="practical-task__item-name">Выберите умение</h5>
              <div className="select-wrapper">
                <select           
                id="add-practical-task-assessment-item-type"
                name="add-practical-task-assessment-item-type"
                onChange={handleChangeItemType}
                defaultValue="placeholder"
                required   
                >
                  <option value="placeholder" disabled hidden>Выберите умение</option>
                  {
                    abilities.map((ability) => (
                      <option value={ability.id}>{ability.name}</option>
                    ))
                  }
                </select>
                <div className="select-arrow"></div>
                <div className="select-arrow"></div>
              </div>
            </li>
            <li className={`practical-task__item ${iShowSkillField ? "" : "practical-task__item_type_hide"}`}>
              <h5 className="practical-task__item-name">Выберите навык</h5>
              <div className="select-wrapper">
                <select           
                id="add-practical-task-assessment-item-type"
                name="add-practical-task-assessment-item-type"
                onChange={handleChangeItemType}
                defaultValue="placeholder"
                required   
                >
                  <option className="select-option" value="placeholder" disabled hidden>Выберите навык</option>
                  {
                    skills.map((skill) => (
                      <option value={skill.id}>{skill.name}</option>
                    ))
                  }
                </select>
                <div className="select-arrow"></div>
                <div className="select-arrow"></div>
              </div>
            </li>
        </ul>

      </form>
    </Popup>
  )
}

export default AddAssessmentItemPopup;