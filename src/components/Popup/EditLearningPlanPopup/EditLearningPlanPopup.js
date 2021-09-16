import React from 'react';
import Popup from '../Popup.js';

function EditLearningPlanPopup({ isOpen, currentLearningPlanElem, onClose, onEdit, isLoading }) {

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [addLec, setAddLec] = React.useState(0);
  const [addLecError, setAddLecError] = React.useState(false);
  const [addPrak, setAddPrak] = React.useState(0);
  const [addPrakError, setAddPrakError] = React.useState(false);
  const [addLab, setAddLab] = React.useState(0);
  const [addLabError, setAddLabError] = React.useState(false);
  const [addSam, setAddSam] = React.useState(0);
  const [addSamError, setAddSamError] = React.useState(false);
  const [addAtt, setAddAtt] = React.useState(0);
  const [addAttError, setAddAttError] = React.useState(false);
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    const newElem = {
     ...currentLearningPlanElem,
     name: addName,
     lection_hours: addLec,
     practice_hours: addPrak,
     lab_hours: addLab,
     self_hours: addSam,
     attestation_hours: addAtt,
    }

    console.log(newElem);

    onEdit(newElem, currentLearningPlanElem.id, onClose);
  }

  function handleAddName(e) {
    setAddName(e.target.value);
    if (e.target.checkValidity()) {
      setAddNameError(false);
    } else {
      setAddNameError(true);
    }
  }

  function handleAddLec(e) {
    setAddLec(e.target.value);
    if (e.target.checkValidity()) {
      setAddLecError(false);
    } else {
      setAddLecError(true);
    }
  }

  function handleAddPrak(e) {
    setAddPrak(e.target.value);
    if (e.target.checkValidity()) {
      setAddPrakError(false);
    } else {
      setAddPrakError(true);
    }
  }

  function handleAddLab(e) {
    setAddLab(e.target.value);
    if (e.target.checkValidity()) {
      setAddLabError(false);
    } else {
      setAddLabError(true);
    }
  }

  function handleAddSam(e) {
    setAddSam(e.target.value);
    if (e.target.checkValidity()) {
      setAddSamError(false);
    } else {
      setAddSamError(true);
    }
  }

  function handleAddAtt(e) {
    setAddAtt(e.target.value);
    console.log(e.target.value);
    if (e.target.checkValidity()) {
      setAddAttError(false);
    } else {
      setAddAttError(true);
    }
  }

  React.useEffect(() => {
    setAddName(currentLearningPlanElem.name || "");
    setAddLec(currentLearningPlanElem.lection_hours || 0)
    setAddPrak(currentLearningPlanElem.practice_hours || 0)
    setAddLab(currentLearningPlanElem.lab_hours || 0)
    setAddSam(currentLearningPlanElem.self_hours || 0)
    setAddAtt(currentLearningPlanElem.attestation_hours || 0)
    setAddNameError(false);
    setAddLecError(false);
    setAddPrakError(false);
    setAddLabError(false);
    setAddSamError(false);
    setAddAttError(false);
    setIsBlockSubmitButton(true);
  }, [currentLearningPlanElem, isOpen]);

  React.useEffect(() => {
    if (
      addNameError || 
      addLecError ||
      addPrakError ||
      addLabError ||
      addSamError ||
      addAttError
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addName, addLec, addPrak, addLab, addSam, addAtt])

  return(
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="edit-lp-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Редактирование элемента учебного плана</h3>
        <ul className="initial-popup__list-input">
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Название элемента</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите название элемента"
            type="text"
            id="edit-lp-input-name"
            name="edit-lp-input-name"
            autoComplete="off"
            value={addName}
            onChange={handleAddName}
            disabled={currentLearningPlanElem.name === "Итоговая аттестация"}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${addNameError ? "initial-popup__input-error_type_show" : ""}`}>Заполните название компетенции</span>
          </li>
          {
            currentLearningPlanElem.parent_id === null 
            ?
            <div></div>
            :
            <>
            <li className="initial-popup__item-input">
              <h5 className="initial-popup__input-name">Количество часов лекций</h5>
              <input 
              className="initial-popup__input"
              placeholder="введите количество часов лекций"
              type="number"
              id="edit-lp-input-hours-lek"
              name="edit-lp-input-hours-lek"
              autoComplete="off"
              value={addLec}
              onChange={handleAddLec}
              required
              min="0"
              pattern="[0-9]*"
              step="any"
              onWheel={(e) => e.target.blur()}
              >
              </input>
              <span className={`initial-popup__input-error ${addLecError ? "initial-popup__input-error_type_show" : ""}`}>Заполните количество часов лекций</span>
            </li>
            <li className="initial-popup__item-input">
              <h5 className="initial-popup__input-name">Количество часов практик</h5>
              <input 
              className="initial-popup__input"
              placeholder="введите количество часов практик"
              type="number"
              id="edit-lp-input-hours-prak"
              name="edit-lp-input-hours-prak"
              autoComplete="off"
              value={addPrak}
              onChange={handleAddPrak}
              required
              min="0"
              pattern="[0-9]*"
              step="any"
              disabled={!currentLearningPlanElem.have_practice}
              onWheel={(e) => e.target.blur()}
              >
              </input>
              <span className={`initial-popup__input-error ${addPrakError ? "initial-popup__input-error_type_show" : ""}`}>Заполните количество часов практик</span>
            </li>
            <li className="initial-popup__item-input">
              <h5 className="initial-popup__input-name">Количество часов лабораторных</h5>
              <input 
              className="initial-popup__input"
              placeholder="введите количество часов лабораторных"
              type="number"
              id="edit-lp-input-hours-lab"
              name="edit-lp-input-hours-lab"
              autoComplete="off"
              value={addLab}
              onChange={handleAddLab}
              required
              min="0"
              pattern="[0-9]*"
              step="any"
              disabled={!currentLearningPlanElem.have_practice}
              onWheel={(e) => e.target.blur()}
              >
              </input>
              <span className={`initial-popup__input-error ${addLabError ? "initial-popup__input-error_type_show" : ""}`}>Заполните количество часов лабораторных</span>
            </li>
            <li className="initial-popup__item-input">
              <h5 className="initial-popup__input-name">Количество часов самостоятельной работы</h5>
              <input 
              className="initial-popup__input"
              placeholder="введите количество часов самостоятельной работы"
              type="number"
              id="edit-lp-input-hours-sam"
              name="edit-lp-input-hours-sam"
              autoComplete="off"
              value={addSam}
              onChange={handleAddSam}
              required
              min="0"
              pattern="[0-9]*"
              step="any"
              onWheel={(e) => e.target.blur()}
              >
              </input>
              <span className={`initial-popup__input-error ${addSamError ? "initial-popup__input-error_type_show" : ""}`}>Заполните количество часов самостоятельной работы</span>
            </li>
            </>
          }
          {
            currentLearningPlanElem.name !== "Итоговая аттестация" 
            ?
            <div></div>
            :
            <li className="initial-popup__item-input">
              <h5 className="initial-popup__input-name">Количество часов аттестации</h5>
              <input 
              className="initial-popup__input"
              placeholder="введите количество часов аттестации"
              type="number"
              id="edit-lp-input-hours-att"
              name="edit-lp-input-hours-att"
              autoComplete="off"
              value={addAtt}
              onChange={handleAddAtt}
              required
              min="0"
              pattern="[0-9]*"
              step="any"
              onWheel={(e) => e.target.blur()}
              >
              </input>
              <span className={`initial-popup__input-error ${addAttError ? "initial-popup__input-error_type_show" : ""}`}>Заполните количество часов аттестации</span>
            </li>
          }
        </ul>
       
        <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Сохранение.." : "Сохранить"}</button>

      </form>
    </Popup>
  )
}

export default EditLearningPlanPopup;