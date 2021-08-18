import React from 'react';
import './RequirementFgosPopup.css';
import Popup from '../../Popup/Popup.js';

function RequirementFgosPopup({ isOpen, onClose, isLoading, requirementFgos, requirementFgosProgram, onSave }) {

  const [selectedFgos, setSelectedFgos] = React.useState([ ...requirementFgosProgram]);
  const [currentFgos, setCurrentFgos] = React.useState([...requirementFgos]);
  const [searchName, setSearchName] = React.useState('');
  const [searchCode, setSearchCode] = React.useState('');
  const [showAddForm, setShowAddForm] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onSave(selectedFgos);
  }
  
  function handleShowAddForm() {
    setShowAddForm(!showAddForm);
    setSearchName('');
    setSearchCode('');
  }

  function handleSearchByName(e) {
    setSearchName(e.target.value);
  }

  function handleSearchByCode(e) {
    setSearchCode(e.target.value);
  }

  function handleChangeFgos(id) {
    const newFgos = selectedFgos;
    if (newFgos.some(elem => elem.id === id)) {
      const index = newFgos.findIndex(elem => elem.id === id);
      newFgos.splice(index, 1);
    } else {
      currentFgos.find((elem) => {
        if (elem.id === id) {
          return newFgos.push(elem);
        } else {
          return false;
        }
      })
    }
    setSelectedFgos(newFgos);
  }

  React.useEffect(() => {
    const filteredFgos = requirementFgos.filter((item) => {
      return item.name.toLowerCase().includes(searchName.toLowerCase()) && item.code.toLowerCase().includes(searchCode.toLowerCase());
    })
    setCurrentFgos(filteredFgos)
  }, [requirementFgos, searchName, searchCode]);

  React.useEffect(() => {
    setSelectedFgos([ ...requirementFgosProgram]);
    setCurrentFgos([...requirementFgos]);
    setSearchName('');
    setSearchCode('');
    setShowAddForm(false);
    return () => {
      setSelectedFgos([]);
      setCurrentFgos([]);
    };
    // eslint-disable-next-line
  }, [isOpen]);


  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="avatar-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Выбор федеральных государственных образовательных стандартов</h3>

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
              Выбрать тип
            </button>
            <div className="initial-popup__search">
              <div className="search initial-popup__search-input">
                <input
                className="input-search"
                placeholder="поиск по направлению"
                type="text"
                id="search-input-name"
                name="search-input-name"
                autoComplete="off"
                value={searchName}
                onChange={handleSearchByName}
                >
                </input>
              </div>
              <div className="search initial-popup__search-input">
                <input 
                className="input-search"
                placeholder="поиск по коду"
                type="text"
                id="search-input-code"
                name="search-input-code"
                autoComplete="off"
                value={searchCode}
                onChange={handleSearchByCode}
                >
                </input>
              </div>
            </div>
          </div>

          <div className={`initial-popup__show ${showAddForm ? "initial-popup__show_type_show" : "initial-popup__show_type_hide"}`}>
            <div className="initial-popup__show-container">
            </div>
          </div>
          
          <ul className="initial-popup__list initial-popup__list_type_fgoses">
            {
              currentFgos.map((item, i) => (
                <li className="initial-popup__item" key={i}>
                  <label className="checkbox initial-popup__checkbox">
                    <input 
                      name="prof-standard"
                      type="checkbox"
                      id={i}
                      defaultChecked={selectedFgos.some(elem => elem.id === item.id)}
                      onChange={() => handleChangeFgos(item.id)}
                      >
                    </input>
                    <span></span>
                  </label>
                  <div className="initial-popup__info">
                    <span className="initial-popup__code">{item.code || "xx.xx.xx"}</span>
                    <h4 className="initial-popup__name">{item.name || "название"}</h4>
                  </div>
                </li>
              ))
            }
          </ul>
          </>

        }
        <button className="btn btn_type_save profstandart__btn-save" type="submit">Сохранить</button>

      </form>
    </Popup>
  )
}

export default RequirementFgosPopup;