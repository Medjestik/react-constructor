import React from 'react';
import Select from 'react-select';

function Hours({ initialData, onSave, isLoading, requestMessage, clearRequestMessage, isEditRights }) {

  const options = [
    { label: 'Календарные дни', value: 'day'},
    { label: 'Недели', value: 'week'},
    { label: 'Месяцы', value: 'month'},
  ]

  const [hours, setHours] = React.useState(initialData.total_hours);
  const [duration, setDuration] = React.useState(initialData.edu_period_duration);
  const [durationForm, setDurationForm] = React.useState(
    initialData.edu_period_name
    ?
    options.find((elem) => elem.label.toLowerCase() === initialData.edu_period_name.toLowerCase())
    :
    { label: "Выберите единицы измерения..", value: "empty" }
  );

  function handleChangeHours(e) {
    setHours(e.target.value);
    clearRequestMessage();
  }

  function handleChangeDuration(e) {
    setDuration(e.target.value);
    clearRequestMessage();
  }

  function handleChangeHoursForm(option) {
    setDurationForm(option);
    clearRequestMessage();
  }

  function onSubmit() {
    onSave(hours, durationForm.label, duration);
  }

  return (
    <>

    <h5 className="initial-data__item-title initial-data__item-title_margin_bottom">Трудоемкость освоения (в ак. часах)</h5>

    <input 
      className={`form__input`}
      placeholder="Введите количество часов.."
      type="number"
      id="program-data-add-hours"
      name="program-data-add-hours"
      autoComplete="off"
      value={hours}
      onChange={handleChangeHours}
      onWheel={(e) => e.target.blur()}
      min="0"
    >
    </input>
    
    <h5 className="initial-data__item-title initial-data__item-title_margin_top initial-data__item-title_margin_bottom">Единицы измерения</h5>

    <Select 
      className="select" 
      options={options}
      placeholder="Выберите единицы измерения.."
      onChange={handleChangeHoursForm}
      defaultValue={durationForm}
      theme={(theme) => ({
        ...theme,
        borderRadius: 10,
        borderWidth: 2,
        colors: {
          ...theme.colors,
          primary25: '#DDDDDD',
          primary: '#5EB9AF',
        },
      })}
    />

    <h5 className="initial-data__item-title initial-data__item-title_margin_top initial-data__item-title_margin_bottom">Срок освоения</h5>
    
    <input 
      className={`form__input`}
      placeholder="Введите срок освоения.."
      type="number"
      id="program-data-add-period"
      name="program-data-add-period"
      autoComplete="off"
      value={duration}
      onChange={handleChangeDuration}
      onWheel={(e) => e.target.blur()}
      min="0"
    >
    </input>

    {
      isEditRights &&
      <>
        <div className="form__btn-container form__btn-container_margin_top-20">
          <div className="form__btn-item">
            <button className={`btn btn_type_save ${durationForm.value === "empty" && "btn_type_block" } ${isLoading && "btn_type_loading"}`} type="button" onClick={onSubmit}>Сохранить данные</button>
          </div>
        </div>

        <span className={`request-message ${(requestMessage.isShow && requestMessage.action === 'hours') ? "request-message_type_show" : "request-message_type_hide"} ${requestMessage.type === 'error' ? "request-message_type_error" : "request-message_type_success"}`}>{requestMessage.text}</span>
      </>
    }

    </>
  );
}

export default Hours;
