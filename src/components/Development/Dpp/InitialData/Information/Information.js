import React from 'react';

function Information({ dppDescription, initialData, onSave, isLoading, requestMessage, clearRequestMessage, isEditRights }) { 

  const [currentDirection, setCurrentDirection] = React.useState(initialData.direction ? initialData.direction.id : 0);

  function handleChangeDirection(id) {
    setCurrentDirection(id);
    clearRequestMessage();
  }

  return (
    <>
    <h3 className="initial-data__item-name">Общая информация</h3>
    <p className="initial-data__item-subtitle initial-data__item-subtitle_type_basis">Определите основные параметры программы.</p>
    <h5 className="initial-data__item-title initial-data__item-title_margin_top">Наименование</h5>
    <p className="initial-data__item-subtitle">{dppDescription.name}</p>
    <h5 className="initial-data__item-title initial-data__item-title_margin_top">Тип</h5>
    <p className="initial-data__item-subtitle">{dppDescription.type_name}</p>

    {
      dppDescription.type.id === 2 &&
      <>
      <h5 className="initial-data__item-title initial-data__item-title_margin_top">Условия</h5>
      {
        dppDescription.is_digital === 1 
        ?
        <>
        <p className="initial-data__item-subtitle">Разрабатывается в рамках проекта «Цифровые кафедры»</p>

        <label className="radio">
          <input 
            name="prof-levels"
            type="radio"
            id="direction-radio-1"
            defaultChecked={currentDirection === 1 ? true : false}
            onChange={() => handleChangeDirection(1)}
            >
          </input>
          <span>Для студентов, обучающихся по основным профессиональным образовательным программам, которые не относятся к ИТ-профилю</span>
        </label>

        <label className="radio">
          <input 
            name="prof-levels"
            type="radio"
            id="direction-radio-1"
            defaultChecked={currentDirection === 2 ? true : false}
            onChange={() => handleChangeDirection(2)}
            >
          </input>
          <span>Для студентов, обучающихся по основным профессиональным образовательным программам, отнесенным к ИТ-сфере</span>
        </label>
        </>
        :
        <>
        <label className="radio">
          <input 
            name="prof-levels"
            type="radio"
            id="direction-radio-2"
            defaultChecked={currentDirection === 3 ? true : false}
            onChange={() => handleChangeDirection(3)}
            >
          </input>
          <span>ДПП ПП направлена на присвоение новой квалификации</span>
        </label>

        <label className="radio">
          <input 
            name="prof-levels"
            type="radio"
            id="direction-radio-2"
            defaultChecked={currentDirection === 4 ? true : false}
            onChange={() => handleChangeDirection(4)}
            >
          </input>
          <span>ДПП ПП не рассчитана на присвоение новой квалификации</span>
        </label>
        </>
      }

      {
      isEditRights &&
      <>
        <div className="form__btn-container form__btn-container_margin_top-20">
          <div className="form__btn-item">
            <button className={`btn btn_type_save ${currentDirection === 0 && "btn_type_block" } ${isLoading && "btn_type_loading"}`} type="button" onClick={() => onSave(currentDirection)}>Сохранить данные</button>
          </div>
        </div>

        <span className={`request-message ${(requestMessage.isShow && requestMessage.action === 'info') ? "request-message_type_show" : "request-message_type_hide"} ${requestMessage.type === 'error' ? "request-message_type_error" : "request-message_type_success"}`}>{requestMessage.text}</span>
      </>
      }

      </>
    }

    </>
  );
}

export default Information;
