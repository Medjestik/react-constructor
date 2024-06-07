import React from 'react';
import Popup from '../Popup.js';
import Select from 'react-select';

function EditLearningPlanPPPopup({ isOpen, currentLearningPlanElem, onClose, onEdit, isLoading }) { 

  const formOptions = [
    { value: "Зачет", label: "Зачет", }, 
    { value: "Зачет с оценкой", label: "Зачет с оценкой", }, 
  ];

  const attestationOptions = [
    { value: "Защита ВКР", label: "Защита ВКР", }, 
    { value: "Итоговая работа", label: "Итоговая работа", }, 
  ];

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);

  const [addLecO, setAddLecO] = React.useState(0);
  const [addLecOError, setAddLecOError] = React.useState(false);
  const [addLecZ, setAddLecZ] = React.useState(0);
  const [addLecZError, setAddLecZError] = React.useState(false);

  const [addPrakO, setAddPrakO] = React.useState(0);
  const [addPrakOError, setAddPrakOError] = React.useState(false);
  const [addPrakZ, setAddPrakZ] = React.useState(0);
  const [addPrakZError, setAddPrakZError] = React.useState(false);

  const [addConsultO, setAddConsultO] = React.useState(0);
  const [addConsultOError, setAddConsultOError] = React.useState(false);
  const [addConsultZ, setAddConsultZ] = React.useState(0);
  const [addConsultZError, setAddConsultZError] = React.useState(false);

  const [attForm, setAttForm] = React.useState('');

  const [addAtt, setAddAtt] = React.useState(0);
  const [addAttError, setAddAttError] = React.useState(false);

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    const newElem = {
     ...currentLearningPlanElem,
     name: addName,
     lection_hours_o: addLecO,
     lection_hours_z: addLecZ,
     practice_hours_o: addPrakO,
     practice_hours_z: addPrakZ,
     consult_hours_o: addConsultO,
     consult_hours_z: addConsultZ,
     attestation_form: attForm,
     attestation_hours: addAtt,
    }

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

  function handleAddLecO(e) {
    setAddLecO(e.target.value);
    if (e.target.checkValidity()) {
      setAddLecOError(false);
    } else {
      setAddLecOError(true);
    }
  }

  function handleAddLecZ(e) {
    setAddLecZ(e.target.value);
    if (e.target.checkValidity()) {
      setAddLecZError(false);
    } else {
      setAddLecZError(true);
    }
  }

  function handleAddPrakO(e) {
    setAddPrakO(e.target.value);
    if (e.target.checkValidity()) {
      setAddPrakOError(false);
    } else {
      setAddPrakOError(true);
    }
  }

  function handleAddPrakZ(e) {
    setAddPrakZ(e.target.value);
    if (e.target.checkValidity()) {
      setAddPrakZError(false);
    } else {
      setAddPrakZError(true);
    }
  }

  function handleAddConsultO(e) {
    setAddConsultO(e.target.value);
    if (e.target.checkValidity()) {
      setAddConsultOError(false);
    } else {
      setAddConsultOError(true);
    }
  }

  function handleAddConsultZ(e) {
    setAddConsultZ(e.target.value);
    if (e.target.checkValidity()) {
      setAddConsultZError(false);
    } else {
      setAddConsultZError(true);
    }
  }

  function handleChangeForm(selectedOption) {
    setAttForm(selectedOption.value);
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
    setAddLecO(currentLearningPlanElem.lection_hours_o || 0);
    setAddLecZ(currentLearningPlanElem.lection_hours_z || 0);
    setAddPrakO(currentLearningPlanElem.practice_hours_o || 0);
    setAddPrakZ(currentLearningPlanElem.practice_hours_z || 0);
    setAddConsultO(currentLearningPlanElem.consult_hours_o || 0);
    setAddConsultZ(currentLearningPlanElem.consult_hours_z || 0);
    setAddAtt(currentLearningPlanElem.attestation_hours || 0);
    setAttForm(currentLearningPlanElem.attestation_form || '');
    setAddNameError(false);
    setAddLecOError(false);
    setAddLecZError(false);
    setAddPrakOError(false);
    setAddPrakZError(false);
    setAddConsultOError(false);
    setAddConsultZError(false);
    setAddAttError(false);
    setIsBlockSubmitButton(true);
  }, [currentLearningPlanElem, isOpen]);

  React.useEffect(() => {
    if (currentLearningPlanElem.parent_id !== null) {
      if (
        addNameError ||
        addLecOError || 
        addLecZError ||
        addPrakOError || 
        addPrakZError
        ) {
        setIsBlockSubmitButton(true);
      } else {
        setIsBlockSubmitButton(false);
      }
    } else {
      if (
        addNameError ||
        addConsultOError || 
        addConsultZError ||
        addAttError ||
        (attForm !== 'Зачет' && attForm !== 'Зачет с оценкой' && attForm !== 'Защита ВКР' && attForm !== 'Итоговая работа')
        ) {
        setIsBlockSubmitButton(true);
      } else {
        setIsBlockSubmitButton(false);
      }
    }

    // eslint-disable-next-line
  }, [addName, addLecO, addLecZ, addPrakO, addPrakZ, addConsultO, addConsultZ, addAtt, attForm]);

  console.log(currentLearningPlanElem);

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
            id="edit-pp-input-name"
            name="edit-pp-input-name"
            autoComplete="off"
            value={addName}
            onChange={handleAddName}
            disabled={currentLearningPlanElem.name === "Итоговая аттестация"}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${addNameError ? "initial-popup__input-error_type_show" : ""}`}>Заполните название элемента</span>
          </li>

          {
            (currentLearningPlanElem.parent_id !== null) && 
            <>
            <li className="initial-popup__item-input">
              <h5 className="initial-popup__input-name">Количество часов очных лекций</h5>
              <input 
              className="initial-popup__input"
              placeholder="введите количество часов очных лекций"
              type="number"
              id="edit-pp-input-hours-lek-o"
              name="edit-pp-input-hours-lek-o"
              autoComplete="off"
              value={addLecO}
              onChange={handleAddLecO}
              required
              min="0"
              pattern="[0-9]*"
              step="any"
              onWheel={(e) => e.target.blur()}
              >
              </input>
              <span className={`initial-popup__input-error ${addLecOError ? "initial-popup__input-error_type_show" : ""}`}>Заполните количество часов лекций</span>
            </li>

            <li className="initial-popup__item-input">
              <h5 className="initial-popup__input-name">Количество часов заочных лекций</h5>
              <input 
              className="initial-popup__input"
              placeholder="введите количество часов заочных лекций"
              type="number"
              id="edit-pp-input-hours-lek-z"
              name="edit-pp-input-hours-lek-z"
              autoComplete="off"
              value={addLecZ}
              onChange={handleAddLecZ}
              required
              min="0"
              pattern="[0-9]*"
              step="any"
              onWheel={(e) => e.target.blur()}
              >
              </input>
              <span className={`initial-popup__input-error ${addLecZError ? "initial-popup__input-error_type_show" : ""}`}>Заполните количество часов лекций</span>
            </li>

            <li className="initial-popup__item-input">
              <h5 className="initial-popup__input-name">Количество часов очных практик</h5>
              <input 
              className="initial-popup__input"
              placeholder="введите количество часов очных практик"
              type="number"
              id="edit-pp-input-hours-prak-o"
              name="edit-pp-input-hours-prak-o"
              autoComplete="off"
              value={addPrakO}
              onChange={handleAddPrakO}
              required
              min="0"
              pattern="[0-9]*"
              step="any"
              onWheel={(e) => e.target.blur()}
              >
              </input>
              <span className={`initial-popup__input-error ${addPrakOError ? "initial-popup__input-error_type_show" : ""}`}>Заполните количество часов практик</span>
            </li>

            <li className="initial-popup__item-input">
              <h5 className="initial-popup__input-name">Количество часов заочных практик</h5>
              <input 
              className="initial-popup__input"
              placeholder="введите количество часов заочных практик"
              type="number"
              id="edit-pp-input-hours-prak-z"
              name="edit-pp-input-hours-prak-z"
              autoComplete="off"
              value={addPrakZ}
              onChange={handleAddPrakZ}
              required
              min="0"
              pattern="[0-9]*"
              step="any"
              onWheel={(e) => e.target.blur()}
              >
              </input>
              <span className={`initial-popup__input-error ${addPrakZError ? "initial-popup__input-error_type_show" : ""}`}>Заполните количество часов практик</span>
            </li>
            </>
          }

          {
            (currentLearningPlanElem.parent_id === null) &&
            <>
            {
              (currentLearningPlanElem.themes.length === 0) && (currentLearningPlanElem.name !== "Итоговая аттестация") &&
              <>
              <li className="initial-popup__item-input">
                <h5 className="initial-popup__input-name">Количество часов очных лекций</h5>
                <input 
                  className="initial-popup__input"
                  placeholder="введите количество часов очных лекций"
                  type="number"
                  id="edit-pp-input-hours-lek-o"
                  name="edit-pp-input-hours-lek-o"
                  autoComplete="off"
                  value={addLecO}
                  onChange={handleAddLecO}
                  required
                  min="0"
                  pattern="[0-9]*"
                  step="any"
                  onWheel={(e) => e.target.blur()}
                >
                </input>
                <span className={`initial-popup__input-error ${addLecOError ? "initial-popup__input-error_type_show" : ""}`}>Заполните количество часов лекций</span>
              </li>
    
                <li className="initial-popup__item-input">
                  <h5 className="initial-popup__input-name">Количество часов заочных лекций</h5>
                  <input 
                  className="initial-popup__input"
                  placeholder="введите количество часов заочных лекций"
                  type="number"
                  id="edit-pp-input-hours-lek-z"
                  name="edit-pp-input-hours-lek-z"
                  autoComplete="off"
                  value={addLecZ}
                  onChange={handleAddLecZ}
                  required
                  min="0"
                  pattern="[0-9]*"
                  step="any"
                  onWheel={(e) => e.target.blur()}
                  >
                  </input>
                  <span className={`initial-popup__input-error ${addLecZError ? "initial-popup__input-error_type_show" : ""}`}>Заполните количество часов лекций</span>
                </li>
    
                <li className="initial-popup__item-input">
                  <h5 className="initial-popup__input-name">Количество часов очных практик</h5>
                  <input 
                  className="initial-popup__input"
                  placeholder="введите количество часов очных практик"
                  type="number"
                  id="edit-pp-input-hours-prak-o"
                  name="edit-pp-input-hours-prak-o"
                  autoComplete="off"
                  value={addPrakO}
                  onChange={handleAddPrakO}
                  required
                  min="0"
                  pattern="[0-9]*"
                  step="any"
                  onWheel={(e) => e.target.blur()}
                  >
                  </input>
                  <span className={`initial-popup__input-error ${addPrakOError ? "initial-popup__input-error_type_show" : ""}`}>Заполните количество часов практик</span>
                </li>
    
                <li className="initial-popup__item-input">
                  <h5 className="initial-popup__input-name">Количество часов заочных практик</h5>
                  <input 
                  className="initial-popup__input"
                  placeholder="введите количество часов заочных практик"
                  type="number"
                  id="edit-pp-input-hours-prak-z"
                  name="edit-pp-input-hours-prak-z"
                  autoComplete="off"
                  value={addPrakZ}
                  onChange={handleAddPrakZ}
                  required
                  min="0"
                  pattern="[0-9]*"
                  step="any"
                  onWheel={(e) => e.target.blur()}
                  >
                  </input>
                  <span className={`initial-popup__input-error ${addPrakZError ? "initial-popup__input-error_type_show" : ""}`}>Заполните количество часов практик</span>
                </li>
              </>
            }
            <li className="initial-popup__item-input">
              <h5 className="initial-popup__input-name">Количество часов очных консультаций</h5>
              <input 
              className="initial-popup__input"
              placeholder="введите количество часов очных консультаций"
              type="number"
              id="edit-pp-input-hours-consult-o"
              name="edit-pp-input-hours-consult-o"
              autoComplete="off"
              value={addConsultO}
              onChange={handleAddConsultO}
              required
              min="0"
              pattern="[0-9]*"
              step="any"
              onWheel={(e) => e.target.blur()}
              >
              </input>
              <span className={`initial-popup__input-error ${addConsultOError ? "initial-popup__input-error_type_show" : ""}`}>Заполните количество часов консультаций</span>
            </li>

            <li className="initial-popup__item-input">
              <h5 className="initial-popup__input-name">Количество часов заочных консультаций</h5>
              <input 
              className="initial-popup__input"
              placeholder="введите количество часов заочных консультаций"
              type="number"
              id="edit-pp-input-hours-consult-z"
              name="edit-pp-input-hours-consult-z"
              autoComplete="off"
              value={addConsultZ}
              onChange={handleAddConsultZ}
              required
              min="0"
              pattern="[0-9]*"
              step="any"
              onWheel={(e) => e.target.blur()}
              >
              </input>
              <span className={`initial-popup__input-error ${addConsultZError ? "initial-popup__input-error_type_show" : ""}`}>Заполните количество часов консультаций</span>
            </li>

            <li className="initial-popup__item-input">
              <h5 className="initial-popup__input-name">Форма аттестации</h5>
              <Select 
                className="select" 
                options={currentLearningPlanElem.name !== "Итоговая аттестация" ? formOptions : attestationOptions}
                placeholder="Выберите форму аттестации.."
                defaultValue={{ label: currentLearningPlanElem.attestation_form || 'Выберите форму..', value: currentLearningPlanElem.attestation_form }}
                onChange={handleChangeForm}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    primary25: '#DDDDDD',
                    primary: '#5EB9AF',
                  },
                })}
              />
            </li>

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

            </>
          }

        </ul>
       
        <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Сохранение.." : "Сохранить"}</button>

      </form>
    </Popup>
  )
}

export default EditLearningPlanPPPopup;