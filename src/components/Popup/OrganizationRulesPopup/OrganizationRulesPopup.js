import React from 'react';
import './OrganizationRulesPopup.css';
import Popup from '../Popup.js';
import AddOrganizationRulesPopup from './AddOrganizationRulesPopup/AddOrganizationRulesPopup.js';
import OrganizationRulesPopupItem from './OrganizationRulesPopupItem/OrganizationRulesPopupItem.js';
import EditOrganizationRulesPopup from './EditOrganizationRulesPopup/EditOrganizationRulesPopup.js';
import RemoveOrganizationRulesPopup from './RemoveOrganizationRulesPopup/RemoveOrganizationRulesPopup.js';

function OrganizationRulesPopup({ isOpen, onClose, isLoading, isLoadingPopup, organizationRules, organizationRulesProgram, onSave, onAdd, onEdit, onRemove, isErrorRequest }) {

  const [selectedOrganizationRules, setSelectedOrganizationRules] = React.useState([...organizationRulesProgram]);
  const [filteredOrganizationRules, setFilteredOrganizationRules] = React.useState([...organizationRules]);
  const [searchName, setSearchName] = React.useState('');
  const [isShowAddPopup, setIsShowAddPopup] = React.useState(false);
  const [isShowEditPopup, setIsShowEditPopup] = React.useState(false);
  const [isShowRemovePopup, setIsShowRemovePopup] = React.useState(false);
  const [currentOrganizationRules, setCurrentOrganizationRules] = React.useState({});

  function handleSubmit(e) {
    e.preventDefault();
    onSave(selectedOrganizationRules); 
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
    setCurrentOrganizationRules(elem);
  }

  function openEditPopup(elem, hideMenu) {  
    setIsShowEditPopup(true);
    hideMenu();
    setCurrentOrganizationRules(elem);
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
      filteredOrganizationRules.find((elem) => {
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
    setFilteredOrganizationRules(filteredOrganizationRules)
  }, [organizationRules, searchName]);

  React.useEffect(() => {
    setSelectedOrganizationRules([...organizationRulesProgram]);
    setFilteredOrganizationRules([...organizationRules]);
    setSearchName('');
    return () => {
      setSelectedOrganizationRules([]);
      setFilteredOrganizationRules([]);
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
            filteredOrganizationRules.map((item, i) => (
              <OrganizationRulesPopupItem
              item={item}
              i={i}
              key={i}
              selectedOrganizationRules={selectedOrganizationRules} 
              onChange={handleChangeWorldSkills}
              onEdit={openEditPopup}
              onRemove={openRemovePopup}
              />
            ))
          }
          </ul>
          </>
        }
        <button className="btn btn_type_save world-skills__btn-save" type="submit">Сохранить</button>

      </form>
    </Popup>

    {
      isShowAddPopup && 
      <AddOrganizationRulesPopup
      isOpen={isShowAddPopup} 
      onClose={closeAllPopups} 
      onAdd={onAdd} 
      isLoading={isLoading}
      />
    } 

    {
      isShowEditPopup &&
      <EditOrganizationRulesPopup
      isOpen={isShowEditPopup} 
      currentOrganizationRules={currentOrganizationRules} 
      onClose={closeAllPopups} 
      onEdit={onEdit}
      isLoading={isLoading}
      />
    }

    {
      isShowRemovePopup &&
      <RemoveOrganizationRulesPopup
      isOpen={isShowRemovePopup} 
      currentOrganizationRules={currentOrganizationRules} 
      onClose={closeAllPopups} 
      onRemove={onRemove}
      isLoading={isLoading}
      isErrorRequest={isErrorRequest}
      />
    }

    </>
  )
}

export default OrganizationRulesPopup;