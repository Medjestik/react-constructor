import React from 'react';
import Select from 'react-select';

function Form({ initialData, onSave, isLoading, requestMessage, clearRequestMessage, isEditRights }) {

  const options = [
    { label: 'Очная', value: 'o'},
    { label: 'Очно-заочная', value: 'oz'},
    { label: 'Заочная', value: 'z'},
  ]

  const [form, setForm] = React.useState(
    initialData.edu_form
    ?
    options.find((elem) => elem.label.toLowerCase() === initialData.edu_form.toLowerCase())
    :
    { label: "Выберите форму..", value: "empty" }
  );
  const [isDistance, setIsDistance] = React.useState(initialData.edu_form_dot === 1 ? true : false);
  const [isPractice, setIsPractice] = React.useState(initialData.edu_practic === 1 ? true : false);

  function handleChangeForm(option) {
    setForm(option);
    clearRequestMessage();
  }

  function handleChangeDistance(e) {
    setIsDistance(!isDistance);
    clearRequestMessage();
  }

  function handleChangePractice(e) {
    setIsPractice(!isPractice);
    clearRequestMessage();
  }

  function onSubmit() {
    onSave(form.label, isDistance, isPractice);
  }

  return (
    <>

    <h5 className="initial-data__item-title initial-data__item-title_margin_bottom">Форма обучения</h5>

    <Select 
      className="select" 
      options={options}
      placeholder="Выберите форму.."
      onChange={handleChangeForm}
      defaultValue={form}
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

    <label className="checkbox">
      <input 
        name="prof-levels"
        type="checkbox"
        id='is-distance'
        autoComplete="off"
        value={isDistance}
        defaultChecked={isDistance}
        onChange={handleChangeDistance}
        required
        >
      </input>
      <span>С применением дистанционных образовательных технологий</span>
    </label>

    <h5 className="initial-data__item-title initial-data__item-title_margin_top">Практика</h5>

    <label className="checkbox">
      <input 
        name="prof-levels"
        type="checkbox"
        id='is-practice'
        autoComplete="off"
        value={isPractice}
        defaultChecked={isPractice}
        onChange={handleChangePractice}
        required
        >
      </input>
      <span>Производственная практика</span>
    </label>

    {
      isEditRights &&
      <>
        <div className="form__btn-container form__btn-container_margin_top-20">
          <div className="form__btn-item">
            <button className={`btn btn_type_save ${form.value === "empty" && "btn_type_block" } ${isLoading && "btn_type_loading"}`} type="button" onClick={onSubmit}>Сохранить данные</button>
          </div>
        </div>

        <span className={`request-message ${(requestMessage.isShow && requestMessage.action === 'form') ? "request-message_type_show" : "request-message_type_hide"} ${requestMessage.type === 'error' ? "request-message_type_error" : "request-message_type_success"}`}>{requestMessage.text}</span>
      </>
    }

    </>
  );
}

export default Form;
