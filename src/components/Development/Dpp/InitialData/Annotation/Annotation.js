import React from 'react';

function Annotation({ initialData, requestMessageDescription, onSave, isEditRights }) {

  const [programDescription, setProgramDescription] = React.useState(initialData.annotationDescription);

  function handleChangeProgramDescription(e) {
    setProgramDescription(e.target.value);
  }

  function handleSubmit() {
    onSave(programDescription);
  }

  return (
    <>
    <h3 className="initial-data__item-name">Аннотация программы</h3>
    <p className="initial-data__item-subtitle initial-data__item-subtitle_type_structure">Укажите информацию о программе (актуальность, новизна, теоретическая и практическая значимость).</p>
    <textarea 
      className="initial-data__item-qualification-text" 
      name="description-text" 
      placeholder="Введите описание программы.."
      defaultValue={programDescription}
      onChange={handleChangeProgramDescription}
    >
    </textarea>
    {
      isEditRights &&
      <div className="initial-data__buttons initial-data__buttons_type_requirements">
        <button className="btn btn_type_save" type="button" onClick={handleSubmit}>Сохранить данные</button>
        <span className={`initial-data__buttons-message ${requestMessageDescription.isShow ? "initial-data__buttons-message_type_show" : "initial-data__buttons-message_type_hide"} ${requestMessageDescription.type === 'error' ? "initial-data__buttons-message_type_error" : "initial-data__buttons-message_type_success"}`}>{requestMessageDescription.text}</span>
      </div>
    }
    </>
  );
}

export default Annotation;
