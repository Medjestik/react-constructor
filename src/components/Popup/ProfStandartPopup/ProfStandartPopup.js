import React from 'react';
import './ProfStandartPopup.css';
import Popup from '../../Popup/Popup.js';

function ProfStandartPopup({ isOpen, onClose, isLoading, profStandarts, profStandartsProgram, onSave }) {

  const [selectedProfStandart, setSelectedProfStandart] = React.useState([ ...profStandartsProgram]);
  const [currentProfStandart, setCurrentProfStandart] = React.useState([...profStandarts]);
  const [searchName, setSearchName] = React.useState('');
  const [searchCode, setSearchCode] = React.useState('');
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [addNameText, setAddNameText] = React.useState('');
  const [addNameCode, setAddNameCode] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSave(selectedProfStandart);
  }
  
  function handleShowAddForm() {
    setShowAddForm(!showAddForm);
    setSearchName('');
    setSearchCode('');
  }

  function handleAddProfStandart() {
    setShowAddForm(false);
    setAddNameText('');
    setAddNameCode('');
    const newProfStandart = {
      name: addNameText,
      code: addNameCode,
      id: parseInt(new Date().getTime()),
    }
    setCurrentProfStandart([...currentProfStandart, newProfStandart]);
  }

  function handleAddName(e) {
    setAddNameText(e.target.value);
  }

  function handleAddCode(e) {
    setAddNameCode(e.target.value);
  }

  function handleSearchByName(e) {
    setSearchName(e.target.value);
  }

  function handleSearchByCode(e) {
    setSearchCode(e.target.value);
  }

  function handleChangeProfStandart(id) {
    const newProfStandart = selectedProfStandart;
    if (newProfStandart.some(elem => elem.id === id)) {
      const index = newProfStandart.findIndex(elem => elem.id === id);
      newProfStandart.splice(index, 1);
    } else {
      currentProfStandart.find((elem) => {
        if (elem.id === id) {
          return newProfStandart.push(elem);
        } else {
          return false;
        }
      })
    }
    setSelectedProfStandart(newProfStandart);
  }

  React.useEffect(() => {
    const filteredProfStandart = profStandarts.filter((item) => {
      return item.name.toLowerCase().includes(searchName.toLowerCase()) && item.code.toLowerCase().includes(searchCode.toLowerCase());
    })
    setCurrentProfStandart(filteredProfStandart)
  }, [profStandarts, searchName, searchCode]);

  React.useEffect(() => {
    setSelectedProfStandart([ ...profStandartsProgram]);
    setCurrentProfStandart([...profStandarts]);
    setSearchName('');
    setSearchCode('');
    setAddNameText('');
    setAddNameCode('');
    setShowAddForm(false);
    return () => {
      setSelectedProfStandart([]);
      setCurrentProfStandart([]);
    };
    // eslint-disable-next-line
  }, [isOpen]);


  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="avatar-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Выбор профессиональных стандартов</h3>

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
              Добавить профстандарт
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

          <div className={`initial-popup__add ${showAddForm ? "prof-standard__add_type_show" : "prof-standard__add_type_hide"}`}>
            <div className="initial-popup__add-container">
              <input 
              className="initial-popup__add-input"
              placeholder="введите название профстандарта"
              type="text"
              id="add-input-name"
              name="add-input-name"
              autoComplete="off"
              value={addNameText}
              onChange={handleAddName}
              >
              </input>
              <input 
              className="initial-popup__add-input"
              placeholder="введите код профстандарта"
              type="text"
              id="add-input-code"
              name="add-input-code"
              autoComplete="off"
              value={addNameCode}
              onChange={handleAddCode}
              >
              </input>
              <button className="btn btn_type_save initial-popup__btn-save" type="button" onClick={handleAddProfStandart}>Добавить</button>
            </div>
          </div>
          
          <ul className="initial-popup__list">
            {
              currentProfStandart.map((item, i) => (
                <li className="initial-popup__item" key={i}>
                  <label className="checkbox initial-popup__checkbox">
                    <input 
                      name="prof-standard"
                      type="checkbox"
                      id={i}
                      defaultChecked={selectedProfStandart.some(elem => elem.id === item.id)}
                      onChange={() => handleChangeProfStandart(item.id)}
                      >
                    </input>
                    <span></span>
                  </label>
                  <div className="initial-popup__info">
                    <h4 className="initial-popup__name">{item.name}</h4>
                    <span className="initial-popup__code">{item.code}</span>
                  </div>
                  <button className="initial-popup__button-edit" type="button"></button>
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

export default ProfStandartPopup;