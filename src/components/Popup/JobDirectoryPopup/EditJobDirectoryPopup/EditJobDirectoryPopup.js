import React from 'react';
import Popup from '../../Popup.js';

function EditJobDirectoryPopup({ isOpen, currentJobDirectory, onClose, onEdit, isLoading, printDate }) { 

  const [addNameChapter, setAddNameChapter] = React.useState('');
  const [addNameChapterError, setAddNameChapterError] = React.useState(false);
  const [addNameJob, setAddNameJob] = React.useState('');
  const [addNameJobError, setAddNameJobError] = React.useState(false);
  const [addEditionDate, setAddEditionDate] = React.useState('');
  const [addEditionDateError, setAddEditionDateError] = React.useState(false);
  const [addFullName, setAddFullName] = React.useState('');
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    const newJobСlassification = {
      chapterName: addNameChapter,
      nameProfession: addNameJob,
      editionDate: addEditionDate,
      fullName: addFullName,
    }

    onEdit(newJobСlassification, currentJobDirectory.id, onClose);
  }

  function handleAddNameChapter(e) {
    setAddNameChapter(e.target.value);
    if (e.target.checkValidity()) {
      setAddNameChapterError(false);
    } else {
      setAddNameChapterError(true);
    }
  }

  function handleAddNameProfession(e) {
    setAddNameJob(e.target.value);
    if (e.target.checkValidity()) {
      setAddNameJobError(false);
    } else {
      setAddNameJobError(true);
    }
  }

  function handleAddEditionDate(e) {
    setAddEditionDate(e.target.value);
    if (e.target.value.length !== 10) {
      setAddEditionDateError(true);
    } else {
      setAddEditionDateError(false);
    }
  }

  React.useEffect(() => {
    setAddNameChapter(currentJobDirectory.chapterName);
    setAddNameJob(currentJobDirectory.nameProfession);
    setAddEditionDate(currentJobDirectory.editionDate);
    setAddNameChapterError(false);
    setAddNameJobError(false);
    setAddEditionDateError(false);
    setIsBlockSubmitButton(true);
  }, [currentJobDirectory, isOpen]);

  React.useEffect(() => {
    if (
      addNameChapterError || 
      addNameJobError || 
      addEditionDateError ||
      addNameChapter.length < 1 ||
      addNameJob.length < 1 ||
      addEditionDate.length < 10
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addNameChapter, addNameJob, addEditionDate])

  React.useEffect(() => { 
    let chapter = addNameChapter.length > 0 ? addNameChapter : "<название раздела>";
    let job = addNameJob.length > 0 ? addNameJob : "<наименование должности>";
    let editionDate = addEditionDate.length > 0 ? printDate(addEditionDate) : "xx.xx.xxxx";
     
    setAddFullName(chapter + " " + job + ". Дата редакции " + editionDate + " г." );


    // eslint-disable-next-line
  }, [addNameChapter, addNameJob, addEditionDate])

  return(
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="add-eks-popup-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Редактирование документа ЕКС</h3>
        <ul className="initial-popup__list-input">
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Название раздела</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите название раздела"
            type="text"
            id="add-eks-input-name"
            name="add-eks-input-name"
            autoComplete="off"
            value={addNameChapter}
            onChange={handleAddNameChapter}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${addNameChapterError ? "initial-popup__input-error_type_show" : ""}`}>Заполните название раздела</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Наименование должности</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите наименование должности"
            type="text"
            id="add-eks-input-job"
            name="add-eks-input-job"
            autoComplete="off"
            value={addNameJob}
            onChange={handleAddNameProfession}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${addNameJobError ? "initial-popup__input-error_type_show" : ""}`}>Заполните наименование должности</span>
          </li>
        
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Дата редакции</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите дату редакции"
            type="date"
            id="add-eks-input-edition-date"
            name="add-eks-input-edition-date"
            autoComplete="off"
            value={addEditionDate}
            onChange={handleAddEditionDate}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${addEditionDateError ? "initial-popup__input-error_type_show" : ""}`}>Заполните дату редакции</span>
          </li>
        </ul>

              
        <p className="initial-popup__result-name">
          <span className="initial-popup__result-name_weight_bold">Итоговое название: </span>
          {addFullName}
        </p>
         
        <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Сохранение.." : "Сохранить"}</button>

      </form>
    </Popup>
  )
}

export default EditJobDirectoryPopup;