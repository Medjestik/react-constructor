import React from 'react';
import './OrganizationRulesPopup.css';
import Popup from '../Popup.js';
import AddOrganizationRulesPopup from './AddOrganizationRulesPopup/AddOrganizationRulesPopup.js';
import OrganizationRulesPopupItem from './OrganizationRulesPopupItem/OrganizationRulesPopupItem.js';

function OrganizationRulesPopup({ isOpen, onClose, isLoading, organizationRules, organizationRulesProgram, onSave, onAdd }) {

  const [selectedOrganizationRules, setSelectedOrganizationRules] = React.useState([...organizationRulesProgram]);
  const [currentOrganizationRules, setCurrentOrganizationRules] = React.useState([...organizationRules]);
  const [searchName, setSearchName] = React.useState('');
  const [isShowAddPopup, setIsShowAddPopup] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onSave(selectedOrganizationRules); 
  } 

  function showAddPopup() {
    setIsShowAddPopup(true);
  }

  function closeAllPopups() {
    setIsShowAddPopup(false);
  }
  
  function handleSearchByName(e) {
    setSearchName(e.target.value);
  }


  function handleChangeWorldSkills(id) {
    const newOrganizationRules = selectedOrganizationRules;
    if (newOrganizationRules.some(elem => elem.id === id)) {
      const index = newOrganizationRules.findIndex(elem => elem.id === id);
      newOrganizationRules.splice(index, 1);
    } else {
      currentOrganizationRules.find((elem) => {
        if (elem.id === id) {
          return newOrganizationRules.push(elem);
        } else {
          return false;
        }
      })
    }
    setSelectedOrganizationRules(newOrganizationRules);
  }

  React.useEffect(() => {
    const filteredOrganizationRules = organizationRules.filter((item) => {
      return item.name.toLowerCase().includes(searchName.toLowerCase());
    })
    setCurrentOrganizationRules(filteredOrganizationRules)
  }, [organizationRules, searchName]);

  React.useEffect(() => {
    setSelectedOrganizationRules([...organizationRulesProgram]);
    setCurrentOrganizationRules([...organizationRules]);
    setSearchName('');
    return () => {
      setSelectedOrganizationRules([]);
      setCurrentOrganizationRules([]);
    };
    // eslint-disable-next-line
  }, [isOpen]);


  return (
    <>
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="os-popup-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Выбор корпоративных требований</h3>

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
                id="search-os-popup-input-name"
                name="search-os-popup-input-name"
                autoComplete="off"
                value={searchName}
                onChange={handleSearchByName}
                >
                </input>
              </div>
            </div>
          </div>

          <ul className="initial-popup__list">
          {
            currentOrganizationRules.map((item, i) => (
              <OrganizationRulesPopupItem
              item={item}
              i={i}
              key={i}
              selectedOrganizationRules={selectedOrganizationRules} 
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

    <AddOrganizationRulesPopup isOpen={isShowAddPopup} onClose={closeAllPopups} onAdd={onAdd} />    

    </>
  )
}

export default OrganizationRulesPopup;