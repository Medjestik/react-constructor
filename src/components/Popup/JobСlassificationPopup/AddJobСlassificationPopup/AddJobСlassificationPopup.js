import React from 'react';
import './AddJobСlassificationPopup.css';
import Popup from '../../Popup.js';

function AddJobСlassificationPopup({ isOpen, onClose, onAdd }) {

  const [addNameChapter, setAddNameChapter] = React.useState('');
  const [addNameChapterError, setAddNameChapterError] = React.useState(false);
  const [addNameProfession, setAddNameProfession] = React.useState('');
  const [addNameProfessionError, setAddNameProfessionError] = React.useState(false);
  const [addIssueNumber, setAddIssueNumber] = React.useState('');
  const [addIssueNumberError, setAddIssueNumberError] = React.useState(false);
  const [addEditionDate, setAddEditionDate] = React.useState('');
  const [addEditionDateError, setAddEditionDateError] = React.useState(false);
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    const newJobСlassification = {
     chapterName: addNameChapter,
     nameProfession: addNameProfession,
     issueNumber: addIssueNumber,
     editionDate: addEditionDate,
    }

    onAdd(newJobСlassification);
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
    setAddNameProfession(e.target.value);
    if (e.target.checkValidity()) {
      setAddNameProfessionError(false);
    } else {
      setAddNameProfessionError(true);
    }
  }

  function handleAddIssueNumber(e) {
    setAddIssueNumber(e.target.value);
    if (e.target.checkValidity()) {
      setAddIssueNumberError(false);
    } else {
      setAddIssueNumberError(true);
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
    setAddNameChapter('');
    setAddNameProfession('');
    setAddIssueNumber('');
    setAddEditionDate('');
    setAddNameChapterError(false);
    setAddNameProfessionError(false);
    setAddIssueNumberError(false);
    setAddEditionDateError(false);
    setIsBlockSubmitButton(true);
  }, [isOpen]);

  React.useEffect(() => {
    if (
      addNameChapterError || 
      addNameProfessionError || 
      addIssueNumberError || 
      addEditionDateError ||
      addNameChapter.length < 1 ||
      addNameProfession.length < 1 ||
      addIssueNumber.length < 1 ||
      addEditionDate.length < 10
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addNameChapter, addNameProfession, addIssueNumber, addEditionDate])

  return(
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="avatar-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Добавление нового документа ЕТКС</h3>
        <ul className="initial-popup__list-input">
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Название раздела</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите название раздела"
            type="text"
            id="add-input-name"
            name="add-input-name"
            autoComplete="off"
            value={addNameChapter}
            onChange={handleAddNameChapter}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${addNameChapterError ? "initial-popup__input-error_type_show" : ""}`}>Заполните название раздела</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Наименование профессии</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите наименование профессии"
            type="text"
            id="add-input-profession"
            name="add-input-profession"
            autoComplete="off"
            value={addNameProfession}
            onChange={handleAddNameProfession}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${addNameProfessionError ? "initial-popup__input-error_type_show" : ""}`}>Заполните наименование профессии</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Номер выпуска</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите номер выпуска"
            type="number"
            id="add-input-number"
            name="add-input-number"
            autoComplete="off"
            value={addIssueNumber}
            onChange={handleAddIssueNumber}
            required
            onWheel={(e) => e.target.blur()}
            >
            </input>
            <span className={`initial-popup__input-error ${addIssueNumberError ? "initial-popup__input-error_type_show" : ""}`}>Заполните номер выпуска</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Дата редакции</h5>
            <input  
            className="initial-popup__input"
            placeholder="введите дату редакции"
            type="date"
            id="add-input-edition-date"
            name="add-input-edition-date"
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
          {`
            ${addNameChapter} 
            ${addNameProfession}
            ${addIssueNumber}
            ${addEditionDate}
          `}
        </p>
       
        <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""}`} type="submit">Добавить</button>

      </form>
    </Popup>
  )
}

export default AddJobСlassificationPopup;