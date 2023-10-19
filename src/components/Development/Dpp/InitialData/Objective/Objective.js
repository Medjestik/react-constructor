import React from 'react';

function Objective({ initialData, requestMessageCompetence, onSave, isEditRights }) { 

  const [countHours, setCountHours] = React.useState(initialData.total_hours);


  function handleChangeCountHours(e) {
    setCountHours(e.target.value);
  }

  return (
    <>
    <h3 className="initial-data__item-name">Цель и задачи</h3>
    <p className="initial-data__item-subtitle">Укажите, формирует ли ДПП новую компетенцию или совершенствует имеющуюся. Цель и задачи ДПП.</p>
    <h5 className="initial-data__item-title">Цель</h5>
    <p className="initial-data__item-subtitle">Целью программы являются совершенствование и (или) получение новой компетенции, необходимой для профессиональной деятельности, и (или) повышение профессионального уровня в рамках имеющейся квалификации в области профессиональной деятельности.</p>
    <h5 className="initial-data__item-title">Задачи</h5>
    <ul className="initial-data__item-target-tasks">
      <li className="initial-data__item-target-task target-task_type_first">приобретение обучающимися знаний, умений и навыков в соответствии с учебным планом и календарным графиком учебного процесса</li>
      <li className="initial-data__item-target-task target-task_type_second">оценка достижений обучающимися планируемых результатов обучения</li>
    </ul>

    <h5 className="initial-data__item-title">Трудоемкость освоения программы (в часах)</h5>

    <input 
      className="initial-popup__input initial-data__target-input"
      placeholder="введите количество часов трудоемкости"
      type="number"
      id="initial-data-target-input-hours"
      name="initial-data-target-input-hours"
      autoComplete="off"
      value={countHours}
      onChange={handleChangeCountHours}
      onWheel={(e) => e.target.blur()}
      min="0"
      required
    >
    </input>

    {
      isEditRights &&
      <div className="initial-data__buttons initial-data__buttons_type_requirements">
        <button 
        className={`btn btn_type_save ${countHours > 15 ? "" : "btn_type_block" }`} 
        type="button" 
        onClick={() => onSave(countHours)}
        >
          Сохранить данные
        </button>
        <span className={`initial-data__buttons-message ${requestMessageCompetence.isShow ? "initial-data__buttons-message_type_show" : "initial-data__buttons-message_type_hide"} ${requestMessageCompetence.type === 'error' ? "initial-data__buttons-message_type_error" : "initial-data__buttons-message_type_success"}`}>{requestMessageCompetence.text}</span>
      </div>
    }
    </>
  );
}

export default Objective;
