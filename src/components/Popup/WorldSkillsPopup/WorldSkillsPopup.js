import React from 'react';
import './WorldSkillsPopup.css';
import Popup from '../Popup.js';
import AddWorldSkillsPopup from './AddWorldSkillsPopup/AddWorldSkillsPopup.js';
import WorldSkillsPopupItem from './WorldSkillsPopupItem/WorldSkillsPopupItem.js';
import RemoveWorldSkillsPopup from './RemoveWorldSkillsPopup/RemoveWorldSkillsPopup.js';
import EditWorldSkillsPopup from './EditWorldSkillsPopup/EditWorldSkillsPopup.js';

function WorldSkillsPopup({ isOpen, onClose, isLoading, isLoadingPopup, worldSkills, worldSkillsProgram, onSave, onAdd, onEdit, onRemove, isErrorRequest }) {

  const [selectedWorldSkills, setSelectedWorldSkills] = React.useState([...worldSkillsProgram]);
  const [filteredWorldSkills, setFilteredWorldSkills] = React.useState([...worldSkills]);
  const [searchName, setSearchName] = React.useState('');
  const [searchCode, setSearchCode] = React.useState('');
  const [isShowAddPopup, setIsShowAddPopup] = React.useState(false);
  const [isShowEditPopup, setIsShowEditPopup] = React.useState(false);
  const [isShowRemovePopup, setIsShowRemovePopup] = React.useState(false);
  const [currentWorldSkills, setCurrentWorldSkills] = React.useState({});

  function handleSubmit(e) {
    e.preventDefault();
    onSave(selectedWorldSkills); 
  } 

  function showAddPopup() {
    setIsShowAddPopup(true);
  }

  function closeAllPopups() {
    setIsShowAddPopup(false);
    setIsShowEditPopup(false)
    setIsShowRemovePopup(false);
  }

  function openRemovePopup(elem, hideMenu) {
    setIsShowRemovePopup(true);
    hideMenu();
    setCurrentWorldSkills(elem);
  }

  function openEditPopup(elem, hideMenu) {  
    setIsShowEditPopup(true);
    hideMenu();
    setCurrentWorldSkills(elem);
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
      filteredWorldSkills.find((elem) => {
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
    setFilteredWorldSkills(filteredWorldSkills)
  }, [worldSkills, searchName, searchCode]);

  React.useEffect(() => {
    setSelectedWorldSkills([...worldSkillsProgram]);
    setFilteredWorldSkills([...worldSkills]);
    setSearchName('');
    setSearchCode('');
    return () => {
      setSelectedWorldSkills([]);
      setFilteredWorldSkills([]);
    };
    // eslint-disable-next-line
  }, [isOpen]);


  return (
    <>
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="ws-popup-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Выбор компетенций WorldSkills</h3>

        {
          isLoadingPopup ?
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
                id="search-ws-popup-input-name"
                name="search-ws-popup-input-name"
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
                id="search-ws-popup-input-code"
                name="search-ws-popup-input-code"
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
            filteredWorldSkills.map((item, i) => (
              <WorldSkillsPopupItem
              item={item}
              i={i}
              key={i}
              selectedWorldSkills={selectedWorldSkills}
              onChange={handleChangeWorldSkills}
              onEdit={openEditPopup}
              onRemove={openRemovePopup}
              />
            ))
          }
          </ul>
          </>
        }
        <button className={`btn btn_type_save profstandart__btn-save ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Сохранение.." : "Сохранить"}</button>
      </form>
    </Popup>

    {
      isShowAddPopup && 
      <AddWorldSkillsPopup
      isOpen={isShowAddPopup} 
      onClose={closeAllPopups} 
      onAdd={onAdd} 
      isLoading={isLoading}
      />
    }

    {
      isShowEditPopup &&
      <EditWorldSkillsPopup 
      isOpen={isShowEditPopup} 
      currentWorldSkills={currentWorldSkills} 
      onClose={closeAllPopups} 
      onEdit={onEdit}
      isLoading={isLoading}
      />
    }

    {
      isShowRemovePopup &&
      <RemoveWorldSkillsPopup 
      isOpen={isShowRemovePopup} 
      currentWorldSkills={currentWorldSkills} 
      onClose={closeAllPopups} 
      onRemove={onRemove}
      isLoading={isLoading}
      isErrorRequest={isErrorRequest}
      />
    }

    </>
  )
}

export default WorldSkillsPopup;