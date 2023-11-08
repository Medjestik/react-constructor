import React from 'react';
import Select from 'react-select';

function QualificationField({ initialData, onSave, isLoading, requestMessage, clearRequestMessage, isEditRights }) {

  const [qualificationField, setQualificationField] = React.useState(
    initialData.qualification_professional_field 
    ? 
    { label: initialData.qualification_professional_field.text, value: initialData.qualification_professional_field.text.id } 
    : 
    { label: "Выберите область..", value: "empty" }
  );

  const [qualificationSphere, setQualificationSphere] = React.useState(initialData.qualification_professional_sphere || '');

  function handleChangeQualificationField(field) {
    setQualificationField(field);
    clearRequestMessage();
  }
  
  function handleChangeQualificationSphere(e) {
    setQualificationSphere(e.target.value);
    clearRequestMessage();
  }

  function handleSubmit() {
    const newData = {
      qualificationField: { id: qualificationField.value },
      qualificationSphere: qualificationSphere,
    }
    onSave(newData);
  }

  return (
    <>
    <h5 className="initial-data__item-title initial-data__item-title_margin_bottom">Область профессиональной деятельности</h5>

    <Select 
      className="select" 
      options={initialData.qualification_professional_field_parts.map((elem) => ({ label: elem.text, value: elem.id }))}
      placeholder="Выберите область.."
      onChange={handleChangeQualificationField}
      defaultValue={qualificationField}
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

    <h5 className="initial-data__item-title initial-data__item-title_margin_top initial-data__item-title_margin_bottom ">Сфера профессиональной деятельности</h5>
    <textarea 
      className="form__textarea" 
      name="program-data-add-qualification-sphere"
      id="program-data-add-qualification-sphere"
      placeholder="Введите описание сферы деятельности.."
      defaultValue={qualificationSphere}
      onChange={handleChangeQualificationSphere}
    >
    </textarea>

    {
      isEditRights &&
      <>
        <div className="form__btn-container form__btn-container_margin_top-20">
          <div className="form__btn-item">
            <button className={`btn btn_type_save ${qualificationField.value === "empty" && "btn_type_block"} ${isLoading && "btn_type_loading"}`} type="button" onClick={handleSubmit}>Сохранить данные</button>
          </div>
        </div>

        <span className={`request-message ${(requestMessage.isShow && requestMessage.action === 'qualification-field') ? "request-message_type_show" : "request-message_type_hide"} ${requestMessage.type === 'error' ? "request-message_type_error" : "request-message_type_success"}`}>{requestMessage.text}</span>
      </>
    }

    </>
  );
}

export default QualificationField;
