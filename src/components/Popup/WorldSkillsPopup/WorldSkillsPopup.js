import React from 'react';
import './WorldSkillsPopup.css';
import Popup from '../Popup.js';
import AddWorldSkillsPopup from './AddWorldSkillsPopup/AddWorldSkillsPopup.js';
import * as api from '../../../utils/api.js';
import WorldSkillsPopupItem from './WorldSkillsPopupItem/WorldSkillsPopupItem.js';

function WorldSkillsPopup({ isOpen, onClose, isLoading, worldSkills, worldSkillsProgram, onSave }) {

  const [selectedWorldSkills, setSelectedWorldSkills] = React.useState([...worldSkillsProgram]);
  const [currentWorldSkills, setCurrentWorldSkills] = React.useState([...worldSkills]);
  const [searchName, setSearchName] = React.useState('');
  const [searchCode, setSearchCode] = React.useState('');
  const [isShowAddPopup, setIsShowAddPopup] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onSave(selectedWorldSkills);
  } 

  function showAddPopup() {
    setIsShowAddPopup(true);
  }

  function closeAllPopups() {
    setIsShowAddPopup(false);
  }
  
  function handleAddDocument(newDocument) { 
    
    const token = localStorage.getItem("token");
    api.createWorldSkills({ token: token, document: newDocument })
    .then((res) => {
      closeAllPopups();
      setCurrentWorldSkills([...currentWorldSkills, res]);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  function handleSearchByName(e) {
    setSearchName(e.target.value);
  }

  function handleSearchByCode(e) {
    setSearchCode(e.target.value);
  }

  function handleChangeWorldSkills(id) {
    const newWorldsSkills = selectedWorldSkills;
    if (newWorldsSkills.some(elem => elem.id === id)) {
      const index = newWorldsSkills.findIndex(elem => elem.id === id);
      newWorldsSkills.splice(index, 1);
    } else {
      currentWorldSkills.find((elem) => {
        if (elem.id === id) {
          return newWorldsSkills.push(elem);
        } else {
          return false;
        }
      })
    }
    setSelectedWorldSkills(newWorldsSkills);
  }

  React.useEffect(() => {
    const filteredWorldSkills = worldSkills.filter((item) => {
      return item.name.toLowerCase().includes(searchName.toLowerCase()) && item.code.toLowerCase().includes(searchCode.toLowerCase());
    })
    setCurrentWorldSkills(filteredWorldSkills)
  }, [worldSkills, searchName, searchCode]);

  React.useEffect(() => {
    setSelectedWorldSkills([...worldSkillsProgram]);
    setCurrentWorldSkills([...worldSkills]);
    setSearchName('');
    setSearchCode('');
    return () => {
      setSelectedWorldSkills([]);
      setCurrentWorldSkills([]);
    };
    // eslint-disable-next-line
  }, [isOpen]);


  return (
    <>
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="worldskills-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Выбор компетенций WorldSkills</h3>

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
            className="btn btn_type_add initial-popup__btn-add"
            type="button" 
            onClick={showAddPopup}
            >
              Добавить документ
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

          <ul className="initial-popup__list">
          {
            currentWorldSkills.map((item, i) => (
              <WorldSkillsPopupItem
              item={item}
              i={i}
              key={i}
              selectedWorldSkills={selectedWorldSkills}
              onChange={handleChangeWorldSkills}
              />
            ))
          }
          </ul>
          </>
        }
        <button className="btn btn_type_save world-skills__btn-save" type="submit">Сохранить</button>

      </form>
    </Popup>

    <AddWorldSkillsPopup isOpen={isShowAddPopup} onClose={closeAllPopups} onAdd={handleAddDocument} />

    </>
  )
}

export default WorldSkillsPopup;