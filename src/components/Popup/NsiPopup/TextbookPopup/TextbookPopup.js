import React from 'react';
import Popup from '../../Popup.js';

function TextbookPopup({ isOpen, onClose, nsi, onSave, id, printDate, type, isLoading }) {

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [addAuthors, setAddAuthors] = React.useState('');
  const [addAuthorsError, setAddAuthorsError] = React.useState(false);
  const [addEditor, setAddEditor] = React.useState('');
  const [addEditorError, setAddEditorError] = React.useState(false);
  const [addCity, setAddCity] = React.useState('');
  const [addCityError, setAddCityError] = React.useState(false);
  const [addYear, setAddYear] = React.useState('');
  const [addYearError, setAddYearError] = React.useState(false);
  const [addPages, setAddPages] = React.useState('');
  const [addFullName, setAddFullName] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const newNsi = { ...nsi, nsiName: addName, nsiAuthors: addAuthors, nsiEditor: addEditor, nsiCity: addCity, nsiYear: addYear, nsiPages: addPages, type_id: id, nsiFullName: addFullName };
    onSave(newNsi, onClose);
  }

  function handleAddName(e) {
    setAddName(e.target.value);
    if (e.target.checkValidity()) {
      setAddNameError(false);
    } else {
      setAddNameError(true);
    }
  }

  function handleAddAuthors(e) {
    setAddAuthors(e.target.value);
    if (e.target.checkValidity()) {
      setAddAuthorsError(false);
    } else {
      setAddAuthorsError(true);
    }
  }

  function handleAddEditor(e) {
    setAddEditor(e.target.value);
    if (e.target.checkValidity()) {
      setAddEditorError(false);
    } else {
      setAddEditorError(true);
    }
  }

  function handleAddCity(e) {
    setAddCity(e.target.value);
    if (e.target.checkValidity()) {
      setAddCityError(false);
    } else {
      setAddCityError(true);
    }
  }

  function handleAddYear(e) {
    setAddYear(e.target.value);
    if (e.target.checkValidity()) {
      setAddYearError(false);
    } else {
      setAddYearError(true);
    }
  }

  function handleAddPages(e) {
    setAddPages(e.target.value);
  }

  React.useEffect(() => {
    setAddName(nsi.nsiName);
    setAddAuthors(nsi.nsiAuthors);
    setAddEditor(nsi.nsiEditor);
    setAddCity(nsi.nsiCity);
    setAddYear(nsi.nsiYear);
    setAddPages(nsi.nsiPages || "");
    setAddFullName('');
    setAddNameError(false);
    setAddAuthorsError(false);
    setAddEditorError(false);
    setAddCityError(false);
    setAddYearError(false);
    setIsBlockSubmitButton(true);
  }, [nsi, isOpen]);

  React.useEffect(() => {
    if (
      addNameError || 
      addName.length < 1 ||
      addAuthorsError ||
      addAuthors.length < 1 ||
      addEditorError || 
      addEditor.length < 1 ||
      addCityError ||
      addCity.length < 1 ||
      addYearError ||
      addYear.length < 1
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addName, addAuthors, addEditor, addCity, addYear])

  React.useEffect(() => { 
    let name = addName.length > 0 ? addName : "<наименование>"
    let authors = addAuthors.length > 0 ? addAuthors : "<Фамилия И.О. авторов>"
    let editor = addEditor.length > 0 ? addEditor : "<издательство>"
    let city = addCity.length > 0 ? addCity : "<город>"
    let year = addYear.length > 0 ? addYear : "<год>"
    let pages = addPages.length > 0 ? ". — " + addPages + " с." : ""
    setAddFullName(authors + " " + name + ". — " + city + " : " + editor + ", " + year + "" + pages);

  // eslint-disable-next-line
  }, [addName, addAuthors, addEditor, addCity, addYear, addPages])

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name={`${type}-nsi-form-${id}`} action="#" noValidate onSubmit={handleSubmit}>
          <h3 className="nsi-popup__title">{`${type === "edit" ? "Редактирование " : "Добавление "}`}учебников и монографий</h3>
          <ul className="nsi-popup__list-input">
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Наименование</h5>
            <input 
            className="nsi-popup__input"
            placeholder="введите наименование"
            type="text"
            id={`${type}-nsi-input-name-${id}`}
            name={`${type}-nsi-input-name-${id}`}
            autoComplete="off"
            value={addName}
            onChange={handleAddName}
            required
            >
            </input>
            <span className={`nsi-popup__input-error ${addNameError ? "nsi-popup__input-error_type_show" : ""}`}>Заполните наименование</span>
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Автор</h5>
            <input  
            className="nsi-popup__input"
            placeholder="введите фамилию и инициалы автора"
            type="text"
            id={`${type}-nsi-input-authors-${id}`}
            name={`${type}-nsi-input-authors-${id}`}
            autoComplete="off"
            value={addAuthors}
            onChange={handleAddAuthors}
            required
            >
            </input>
            <span className={`nsi-popup__input-error ${addAuthorsError ? "nsi-popup__input-error_type_show" : ""}`}>Заполните фамилию и инициалы автора</span>
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Издательство</h5>
            <input  
            className="nsi-popup__input"
            placeholder="введите название издательства"
            type="text"
            id={`${type}-nsi-input-editor-${id}`}
            name={`${type}-nsi-input-editor-${id}`}
            autoComplete="off"
            value={addEditor}
            onChange={handleAddEditor}
            required
            >
            </input>
            <span className={`nsi-popup__input-error ${addEditorError ? "nsi-popup__input-error_type_show" : ""}`}>Заполните название издательства</span>
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Город издания</h5>
            <input  
            className="nsi-popup__input"
            placeholder="введите город издания"
            type="text"
            id={`${type}-nsi-input-city-${id}`}
            name={`${type}-nsi-input-city-${id}`}
            autoComplete="off"
            value={addCity}
            onChange={handleAddCity}
            required
            >
            </input>
            <span className={`nsi-popup__input-error ${addCityError ? "nsi-popup__input-error_type_show" : ""}`}>Заполните город издания</span>
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Год издания</h5>
            <input  
            className="nsi-popup__input"
            placeholder="введите год издания"
            type="number"
            id={`${type}-nsi-input-year-${id}`}
            name={`${type}-nsi-input-year-${id}`}
            autoComplete="off"
            value={addYear}
            onChange={handleAddYear}
            onWheel={(e) => e.target.blur()}
            min="1900"
            max="2099"
            step="1"
            required
            >
            </input>
            <span className={`nsi-popup__input-error ${addYearError ? "nsi-popup__input-error_type_show" : ""}`}>Заполните год издания</span>
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Количество страниц (Не обязательное поле)</h5>
            <input  
            className="nsi-popup__input"
            placeholder="введите год издания"
            type="number"
            id={`${type}-nsi-input-pages-${id}`}
            name={`${type}-nsi-input-pages-${id}`}
            autoComplete="off"
            value={addPages}
            onChange={handleAddPages}
            onWheel={(e) => e.target.blur()}
            required
            >
            </input>
          </li>
        </ul>

        <p className="initial-popup__result-name">
          <span className="initial-popup__result-name_weight_bold">Итоговое название: </span>
          {addFullName}
        </p>

        {
          type === "edit" ?
          <button 
          className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} 
          type="submit"
          >
            {isLoading ? "Сохранение.." : "Сохранить"}
          </button>
          :
          <button 
          className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} 
          type="submit"
          >
            {isLoading ? "Добавление.." : "Добавить"}
          </button>
        }

      </form>
    </Popup>
    )
}

export default TextbookPopup;