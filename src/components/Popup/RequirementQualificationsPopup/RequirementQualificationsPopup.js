import React from 'react';
import './RequirementQualificationsPopup.css';
import Popup from '../../Popup/Popup.js';

function RequirementQualificationsPopup({ isOpen, onClose, isLoading, requirementQualifications, requirementQualificationProgram, onSave }) {

  const [selectedQualification, setSelectedQualification] = React.useState([ ...requirementQualificationProgram]);
  const [currentQualification, setCurrentQualification] = React.useState([...requirementQualifications]);
  const [searchName, setSearchName] = React.useState('');
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [addNameText, setAddNameText] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSave(selectedQualification);
  }
  
  function handleShowAddForm() {
    setShowAddForm(!showAddForm);
    setSearchName('');
  }

  function handleAddQualification() {
    setShowAddForm(false);
    setAddNameText('');
    const newQualification = {
      name: addNameText,
      id: parseInt(new Date().getTime()),
    }
    setCurrentQualification([...currentQualification, newQualification]);
  }

  function handleAddName(e) {
    setAddNameText(e.target.value);
  }

  function handleSearchByName(e) {
    setSearchName(e.target.value);
  }

  function handleChangeQualification(id) {
    const newQualification = selectedQualification;
    console.log(id)
    if (newQualification.some(elem => elem.id === id)) {
      const index = newQualification.findIndex(elem => elem.id === id);
      newQualification.splice(index, 1);
    } else {
      currentQualification.find((elem) => {
        if (elem.id === id) {
          return newQualification.push(elem);
        } else {
          return false;
        }
      })
    }
    setSelectedQualification(newQualification);
  }

  React.useEffect(() => {
    const filteredQualification = requirementQualifications.filter((item) => {
      return item.name.toLowerCase().includes(searchName.toLowerCase());
    })
    setCurrentQualification(filteredQualification)
  }, [requirementQualifications, searchName]);

  React.useEffect(() => {
    setSelectedQualification([...requirementQualificationProgram]);
    setCurrentQualification([...requirementQualifications]);
    setSearchName('');
    setAddNameText('');
    setShowAddForm(false);
    return () => {
      setSelectedQualification([]);
      setCurrentQualification([]);
    };
    // eslint-disable-next-line
  }, [isOpen]);


  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="avatar-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Выбор квалификационных требований по&nbsp;должностям</h3>

        {
          isLoading ?
          <figure className="preloader preloader_type_popup">
            <i className="preloader__circle"></i>
            <figcaption className="preloader__caption">Идёт загрузка...</figcaption>
          </figure>
          :
          <>
          <div className="initial-popup__control">
            <button 
            className={`btn btn_type_add initial-popup__btn-add ${showAddForm ? "initial-popup__btn-add_type_show" : "initial-popup__btn-add_type_hide"}`}
            type="button" 
            onClick={handleShowAddForm}
            >
              Добавить квалификацию
            </button>
            <div className="initial-popup__search">
              <div className="search initial-popup__search-input">
                <input
                className="input-search"
                placeholder="поиск по названию"
                type="text"
                id="search-input-name"
                name="search-input-name"
                autoComplete="off"
                value={searchName}
                onChange={handleSearchByName}
                >
                </input>
              </div>
            </div>
          </div>

          <div className={`initial-popup__add ${showAddForm ? "qualification__add_type_show" : "qualification__add_type_hide"}`}>
            <div className="initial-popup__add-container">
              <input 
              className="initial-popup__add-input"
              placeholder="введите название квалификации"
              type="text"
              id="add-input-name"
              name="add-input-name"
              autoComplete="off"
              value={addNameText}
              onChange={handleAddName}
              >
              </input>
              <button className="btn btn_type_save initial-popup__btn-save" type="button" onClick={handleAddQualification}>Добавить</button>
            </div>
          </div>
          
          <ul className="initial-popup__list">
            {
              currentQualification.map((item, i) => (
                <li className="initial-popup__item" key={i}>
                  <label className="checkbox initial-popup__checkbox">
                    <input 
                      name="qualification"
                      type="checkbox"
                      id={i}
                      defaultChecked={selectedQualification.some(elem => elem.id === item.id)}
                      onChange={() => handleChangeQualification(item.id)}
                      >
                    </input>
                    <span></span>
                  </label>
                  <div className="initial-popup__info">
                    <h4 className="initial-popup__name">{item.name}</h4>
                  </div>
                  <button className="initial-popup__button-edit" type="button"></button>
                </li>
              ))
            }
          </ul>
          </>

        }
        <button className="btn btn_type_save initial-popup__btn-save" type="submit">Сохранить</button>

      </form>
    </Popup>
  )
}

export default RequirementQualificationsPopup;