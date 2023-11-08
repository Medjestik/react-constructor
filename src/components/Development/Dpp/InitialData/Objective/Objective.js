import React from 'react';
import Select from 'react-select';

function Objective({ initialData, currentProgramType, onSave, isLoading, requestMessage, clearRequestMessage, isEditRights }) { 

  const [digitalSphere, setDigitalSphere] = React.useState(
    initialData.digital_sphere
    ?
    { label: initialData.digital_sphere.name, value: initialData.digital_sphere.id }
    :
    { label: "Выберите сферу..", value: "empty" }
  );

  function handleChangeSphere(option) {
    clearRequestMessage();
    setDigitalSphere(option);
  }

  return (
    <>
    <h5 className="initial-data__item-title">Цель</h5>

    {
      initialData.direction ?
      <>
      {
        currentProgramType.includes('pp')
        ?
        <>
          {
            initialData.direction.id === 1 &&
            <p className="initial-data__item-subtitle">Целью обучения является формирование цифровых компетенций в области создания алгоритмов и компьютерных программ, пригодных для практического применения и приобретение новой квалификации.</p>
          }
          {
            initialData.direction.id === 2 &&
            <p className="initial-data__item-subtitle">Целью обучения является формирование цифровых компетенций, необходимых для выполнения нового вида профессиональной деятельности в области цифровых компетенций и приобретение новой квалификации.</p>
          }
          {
            initialData.direction.id === 3 &&
            <p className="initial-data__item-subtitle">Целью обучения является приобретение новой квалификации.</p>
          }
          {
            initialData.direction.id === 4 &&
            <p className="initial-data__item-subtitle">Целью обучения является получение компетенций, необходимых для выполнения нового вида профессиональной деятельности.</p>
          }
        </>
        :
        <p className="initial-data__item-subtitle">Целью программы являются совершенствование и (или) получение новой компетенции, необходимой для профессиональной деятельности, и (или) повышение профессионального уровня в рамках имеющейся квалификации в области профессиональной деятельности.</p>
      }
      </>
      :
      <>
      </>
    }

    <h5 className="initial-data__item-title initial-data__item-title_margin_top">Задачи</h5>
    <ul className="initial-data__item-target-tasks">
      <li className="initial-data__item-target-task target-task_type_first">приобретение обучающимися знаний, умений и навыков в соответствии с учебным планом и календарным графиком учебного процесса</li>
      <li className="initial-data__item-target-task target-task_type_second">оценка достижений обучающимися планируемых результатов обучения</li>
    </ul>

    {
      initialData.direction &&
      <>
          {
      initialData.direction.id === 2 &&
      <>
      <h5 className="initial-data__item-title initial-data__item-title_margin_top initial-data__item-title_margin_bottom">Цифровая сфера</h5>

      <Select 
        className="select" 
        options={initialData.digital_spheres.map((elem) => { return { value: elem.id, label: elem.name }})}
        placeholder="Выберите единицы измерения.."
        onChange={handleChangeSphere}
        defaultValue={digitalSphere}
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

      {
      isEditRights &&
      <>
        <div className="form__btn-container form__btn-container_margin_top-20">
          <div className="form__btn-item">
            <button className={`btn btn_type_save ${digitalSphere.value === "empty" && "btn_type_block" } ${isLoading && "btn_type_loading"}`} type="button" onClick={() => onSave(digitalSphere)}>Сохранить данные</button>
          </div>
        </div>

        <span className={`request-message ${(requestMessage.isShow && requestMessage.action === 'objective') ? "request-message_type_show" : "request-message_type_hide"} ${requestMessage.type === 'error' ? "request-message_type_error" : "request-message_type_success"}`}>{requestMessage.text}</span>
      </>
      }

      </>
    }
      
      </>
    }

    </>
  );
}

export default Objective;
