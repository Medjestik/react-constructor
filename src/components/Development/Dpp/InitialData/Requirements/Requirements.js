import React from 'react';

function Requirements({ initialData, currentProgramType, profLevels, onSave, isLoading, requestMessage, clearRequestMessage, isEditRights }) {

  const [selectedProfLevels, setSelectedProfLevels] = React.useState(initialData.prof_levels);
  const [reqQualification, setReqQualification] = React.useState(initialData.req_qualification);
  const [qualification, setQualification] = React.useState(initialData.qualification);
  
  function handleChangeProfLevels(id) {
    const newLevels = selectedProfLevels;
    if (newLevels.some(elem => elem.id === id)) {
      const index = newLevels.findIndex(elem => elem.id === id);
      newLevels.splice(index, 1);
    } else {
      newLevels.push(profLevels[id - 1])
    }
    setSelectedProfLevels(newLevels);
    clearRequestMessage();
  }

  function handleChangeReqQualification(e) {
    setReqQualification(e.target.value);
    clearRequestMessage();
  }

  function handleChangeQualification(e) {
    setQualification(e.target.value);
    clearRequestMessage();
  }

  function onSubmit() {
    onSave(selectedProfLevels, qualification, reqQualification);
  }

  return (
    <>

    <h5 className="initial-data__item-title">Требования к уровню профессионального образования</h5>
    {
      currentProgramType.includes('digital') 
      ?
      <ul className="initial-data__item-requirements-list">
        {
          profLevels.map((level) => (
            <label key={level.id} className="checkbox">
              <input 
                name="program-data-prof-levels"
                type="checkbox"
                id={level.id}
                value={level.id}
                defaultChecked={selectedProfLevels.some(elem => elem.id === level.id)}
                disabled
                >
              </input>
              <span>{level.text}</span>
            </label>
          ))
        }
      </ul>
      :
      <ul className="initial-data__item-requirements-list">
        {
          profLevels.map((level) => (
            <label key={level.id} className="checkbox">
              <input 
                name="program-data-prof-levels"
                type="checkbox"
                id={level.id}
                value={level.id}
                defaultChecked={selectedProfLevels.some(elem => elem.id === level.id)}
                onChange={() => handleChangeProfLevels(level.id)}
                >
              </input>
              <span>{level.text}</span>
            </label>
          ))
        }
      </ul>
    }


    <h5 className="initial-data__item-title initial-data__item-title_margin_top initial-data__item-title_margin_bottom">Требования к квалификации (если имеются)</h5>
    <textarea 
      className="form__textarea" 
      name="qualification-text" 
      placeholder="Опишите требования к квалификации обучающегося.."
      defaultValue={reqQualification}
      onChange={handleChangeReqQualification}
    >
    </textarea>

    {
      currentProgramType.includes('pp') 
      &&
      <>
      <h5 className="initial-data__item-title initial-data__item-title_margin_top initial-data__item-title_margin_bottom">Квалификация (если присваивается)</h5>
      <input 
        className={`form__input`}
        placeholder="Введите квалификацию.."
        type="text"
        id="program-data-add-hours"
        name="program-data-add-hours"
        autoComplete="off"
        value={qualification}
        onChange={handleChangeQualification}
      >
      </input>
      </>
    }


    {
      isEditRights &&
      <>
        <div className="form__btn-container form__btn-container_margin_top-20">
          <div className="form__btn-item">
            <button className={`btn btn_type_save ${isLoading && "btn_type_loading"}`} type="button" onClick={onSubmit}>Сохранить данные</button>
          </div>
        </div>

        <span className={`request-message ${(requestMessage.isShow && requestMessage.action === 'requirement') ? "request-message_type_show" : "request-message_type_hide"} ${requestMessage.type === 'requirement' ? "request-message_type_error" : "request-message_type_success"}`}>{requestMessage.text}</span>
      </>
    }

    </>
  );
}

export default Requirements;
