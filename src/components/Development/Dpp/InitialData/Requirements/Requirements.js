import React from 'react';

function Requirements({ profLevels, initialData, requestMessageRequirements, onSave, isEditRights }) {

  const [userQualification, setUserQualification] = React.useState(initialData.req_user_kval);
  const [selectedProfLevels, setSelectedProfLevels] = React.useState(initialData.prof_levels);

  function handleChangeProfLevels(id) {
    const newLevels = selectedProfLevels;
    if (newLevels.some(elem => elem.id === id)) {
      const index = newLevels.findIndex(elem => elem.id === id);
      newLevels.splice(index, 1);
    } else {
      newLevels.push(profLevels[id - 1])
    }
    setSelectedProfLevels(newLevels);
  }

  function handleChangeUserQualification(e) {
    setUserQualification(e.target.value);
  }

  function onSubmit() {
    onSave(userQualification, selectedProfLevels);
  }

  return (
    <>
    <h3 className="initial-data__item-name">Требования к обучающимся</h3>
    <h5 className="initial-data__item-title">Требования к уровню профессионального образования</h5>
    <ul className="initial-data__item-requirements-list">
      {
        profLevels.map((level) => (
        <li key={level.id} className="initial-data__item-requirements-item">
          <label className="checkbox">
          <input 
            name="prof-levels"
            type="checkbox"
            id={level.id}
            value={level.id}
            defaultChecked={selectedProfLevels.some(elem => elem.id === level.id)}
            onChange={() => handleChangeProfLevels(level.id)}
            >
          </input>
            <span>{level.text}</span>
          </label>
        </li>
        ))
      }
    </ul>
    <h5 className="initial-data__item-title">Требования к квалификации</h5>
    <textarea 
      className="initial-data__item-qualification-text" 
      name="qualification-text" 
      placeholder="Опишите требования к квалификации обучающегося"
      defaultValue={userQualification}
      onChange={handleChangeUserQualification}
    >
    </textarea>
    {
      isEditRights &&
      <div className="initial-data__buttons initial-data__buttons_type_requirements">
        <button className="btn btn_type_save" type="button" onClick={onSubmit}>Сохранить данные</button>
        <span className={`initial-data__buttons-message ${requestMessageRequirements.isShow ? "initial-data__buttons-message_type_show" : "initial-data__buttons-message_type_hide"} ${requestMessageRequirements.type === 'error' ? "initial-data__buttons-message_type_error" : "initial-data__buttons-message_type_success"}`}>{requestMessageRequirements.text}</span>
      </div>
    }
    </>
  );
}

export default Requirements;
