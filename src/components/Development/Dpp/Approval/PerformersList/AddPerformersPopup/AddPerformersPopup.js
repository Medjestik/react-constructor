import React from 'react';
import Popup from '../../../../../Popup/Popup.js';
import Select from 'react-select'

function AddPerformersPopup({ isOpen, onClose, onAdd, isLoading, isShowError }) { 

  const [firstname, setFirstname] = React.useState("");
  const [errorFirstname, setErrorFirstname] = React.useState(false);
  const [lastname, setLastname] = React.useState("");
  const [errorLastname, setErrorLastname] = React.useState(false);
  const [middlename, setMiddlename] = React.useState("");
  const [errorMiddlename, setErrorMiddlename] = React.useState(false);
  const [task, setTask] = React.useState("");
  const [errorTask, setErrorTask] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [titleShort, setTitleShort] = React.useState("");
  const [degree, setDegree] = React.useState("");
  const [degreeShort, setDegreeShort] = React.useState("");

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  const titleOptions = [
    { value: "", label: "Нет звания", },
    { value: "проф", label: "Профессор", }, 
    { value: "доц", label: "Доцент", }, 
  ];

  const degreeOptions = [
    { value: "null", label: "Нет степени", }, 
    { value: "д-р архитектуры", label: "доктор архитектуры", }, 
    { value: "д-р биол. наук", label: "доктор биологических наук", }, 
    { value: "д-р ветеринар. наук", label: "доктор ветеринарных наук", },
    { value: "д-р воен. наук", label: "доктор военных наук", },
    { value: "д-р геогр. наук", label: "доктор географических наук", },
    { value: "д-р геол.-минерал. наук", label: "доктор геолого-минералогических наук", },
    { value: "д-р искусствоведения", label: "доктор искусствоведения", },
    { value: "д-р ист. наук", label: "доктор исторических наук", },
    { value: "д-р культурологии", label: "доктор культурологии", },
    { value: "д-р мед. наук", label: "доктор медицинских наук", },
    { value: "д-р пед. наук", label: "доктор педагогических наук", },
    { value: "д-р полит. наук", label: "доктор политических наук", },
    { value: "д-р психол. наук", label: "доктор психологических наук", },
    { value: "д-р социол. наук", label: "доктор социологических наук", },
    { value: "д-р с.-х. наук", label: "доктор сельскохозяйственных наук", },
    { value: "д-р техн. наук", label: "доктор технических наук", },
    { value: "д-р фармацевт. наук", label: "доктор фармацевтических наук", },
    { value: "д-р физ.-мат. наук", label: "доктор физико-математических наук", },
    { value: "д-р филол. наук", label: "доктор филологических наук", },
    { value: "д-р филос. наук", label: "доктор философских наук", },
    { value: "д-р хим. наук", label: "доктор химических наук", },
    { value: "д-р экон. наук", label: "доктор экономических наук", },
    { value: "д-р юрид. наук", label: "доктор химических наук", },
    { value: "канд. архитектуры", label: "кандидат архитектуры", },
    { value: "канд. биол. наук", label: "кандидат биологических наук", },
    { value: "канд. ветеринар. наук", label: "кандидат ветеринарных наук", },
    { value: "канд. воен. наук", label: "кандидат военных наук", },
    { value: "канд. геогр. наук", label: "кандидат географических наук", },
    { value: "канд. геол.-минерал. наук", label: "кандидат геолого-минералогических наук", },
    { value: "канд. искусствоведения", label: "кандидат искусствоведения", },
    { value: "канд. ист. наук", label: "кандидат исторических наук", },
    { value: "канд. культурологии", label: "кандидат культурологии", },
    { value: "канд. мед. наук", label: "кандидат медицинских наук", },
    { value: "канд. пед. наук", label: "кандидат педагогических наук", },
    { value: "канд. полит. наук", label: "кандидат политических наук", },
    { value: "канд. психол. наук", label: "кандидат психологических наук", },
    { value: "канд. социол. наук", label: "кандидат социологических наук", },
    { value: "канд. с.-х. наук", label: "кандидат сельскохозяйственных наук", },
    { value: "канд. техн. наук", label: "кандидат технических наук", },
    { value: "канд. фармацевт. наук", label: "кандидат фармацевтических наук", },
    { value: "канд. физ.-мат. наук", label: "кандидат физико-математических наук", },
    { value: "канд. филол. наук", label: "кандидат филологических наук", },
    { value: "канд. филос. наук", label: "кандидат философских наук", },
    { value: "канд. хим. наук", label: "кандидат химических наук", },
    { value: "канд. экон. наук", label: "кандидат экономических наук", },
    { value: "канд. юрид. наук", label: "кандидат юридических наук", },
  ];

  function handleSubmit(e) {
    e.preventDefault();

    const newPerformer = {
      firstname: firstname,
      lastname: lastname,
      middlename: middlename,
      title: title,
      titleShort: titleShort,
      degree: degree,
      degreeShort: degreeShort,
      task: task,
    }

    onAdd(newPerformer);
  }

  function handleAddFirstname(e) {
    setFirstname(e.target.value);
    if (e.target.checkValidity()) {
      setErrorFirstname(false);
    } else {
      setErrorFirstname(true);
    }
  }

  function handleAddLastname(e) {
    setLastname(e.target.value);
    if (e.target.checkValidity()) {
      setErrorLastname(false);
    } else {
      setErrorLastname(true);
    }
  }

  function handleAddMiddlename(e) {
    setMiddlename(e.target.value);
    if (e.target.checkValidity()) {
      setErrorMiddlename(false);
    } else {
      setErrorMiddlename(true);
    }
  }

  function handleAddTask(e) {
    setTask(e.target.value);
    if (e.target.checkValidity()) {
      setErrorTask(false);
    } else {
      setErrorTask(true);
    }
  }

  function handleChangeTitle(selectedOption) {
    setTitle(selectedOption.label);
    setTitleShort(selectedOption.value);
  }

  function handleChangeDegree(selectedOption) {
    setDegree(selectedOption.label);
    setDegreeShort(selectedOption.value);
  }

  React.useEffect(() => {
    setFirstname('');
    setErrorFirstname(false);
    setLastname('');
    setErrorLastname(false);
    setMiddlename('');
    setErrorMiddlename(false);
    setTask('');
    setDegree('');
    setDegreeShort('');
    setErrorTask(false);
    setIsBlockSubmitButton(true);
  }, [isOpen]);

  React.useEffect(() => {
    if (
      errorFirstname || 
      firstname.length < 2 ||
      errorLastname || 
      lastname.length < 2 ||
      errorMiddlename || 
      middlename.length < 2 ||
      title.length < 2 ||
      degree.length < 2 ||
      errorTask ||
      task.length < 2
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [firstname, lastname, middlename, title, degree, task]);

  return(
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="control-performer-add-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Добавление исполнителя</h3>
        <ul className="initial-popup__list-input">
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Фамилия*</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите фамилию исполнителя"
            type="text"
            id="add-new-performer-lastname"
            name="add-new-performer-lastname"
            autoComplete="off"
            minLength="2"
            value={lastname}
            onChange={handleAddLastname}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${errorLastname ? "initial-popup__input-error_type_show" : ""}`}>Фамилия должна быть не короче 2 символов</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Имя*</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите имя исполнителя"
            type="text"
            id="add-new-performer-firstname"
            name="add-new-performer-firstname"
            autoComplete="off"
            minLength="2"
            value={firstname}
            onChange={handleAddFirstname}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${errorFirstname ? "initial-popup__input-error_type_show" : ""}`}>Имя должно быть не короче 2 символов</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Отчество*</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите отчество исполнителя"
            type="text"
            id="add-new-performer-middlename"
            name="add-new-performer-middlename"
            autoComplete="off"
            minLength="2"
            value={middlename}
            onChange={handleAddMiddlename}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${errorMiddlename ? "initial-popup__input-error_type_show" : ""}`}>Отчество должно быть не короче 2 символов</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Звание*</h5>
            <Select 
            className="select" 
            options={titleOptions}
            placeholder="Выберите звание.."
            onChange={handleChangeTitle}
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
            <h5 className="initial-popup__input-name">Ученая степень*</h5>
            <Select 
            className="select" 
            options={degreeOptions}
            placeholder="Выберите ученую степень.."
            onChange={handleChangeDegree}
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
            <h5 className="initial-popup__input-name">Описание выполненной работы*</h5>
            <textarea 
              className="initial-data__item-qualification-text" 
              name="control-structure-part-name" 
              placeholder="Введите описание"
              value={task}
              onChange={handleAddTask}
              minLength="2"
              required
            >
            </textarea>  
          </li>
        </ul>
       
        <span className={`popup__submit-error ${isShowError.isShow ? "popup__submit-error_type_show" : "popup__submit-error_type_hide"}`}>{isShowError.isShow ? isShowError.text : ""}</span>
        <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Добавление.." : "Добавить"}</button>

      </form>
    </Popup>
  )
}

export default AddPerformersPopup;