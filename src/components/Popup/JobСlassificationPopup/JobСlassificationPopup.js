import React from 'react';
import './JobСlassificationPopup.css';
import Popup from '../Popup.js';
import AddJobСlassificationPopup from './AddJobСlassificationPopup/AddJobСlassificationPopup.js';
import JobСlassificationPopupItem from './JobСlassificationPopupItem/JobСlassificationPopupItem.js';
import EditJobСlassificationPopup from './EditJobСlassificationPopup/EditJobСlassificationPopup.js';
import RemoveJobСlassificationPopup from './RemoveJobСlassificationPopup/RemoveJobСlassificationPopup.js';

function JobСlassificationPopup({ isOpen, onClose, isLoading, isLoadingPopup, jobСlassification, jobСlassificationProgram, onSave, onAdd, onEdit, onRemove, isErrorRequest }) {

  const [selectedJobСlassification, setSelectedJobСlassification] = React.useState([...jobСlassificationProgram]);
  const [filteredJobСlassification, setFilteredJobСlassification] = React.useState([...jobСlassification]);
  const [searchName, setSearchName] = React.useState('');
  const [searchProfession, setSearchProfession] = React.useState('');
  const [isShowAddPopup, setIsShowAddPopup] = React.useState(false);
  const [isShowEditPopup, setIsShowEditPopup] = React.useState(false);
  const [isShowRemovePopup, setIsShowRemovePopup] = React.useState(false);
  const [currentJobСlassification, setCurrentJobСlassification] = React.useState({});

  function handleSubmit(e) {
    e.preventDefault();
    onSave(selectedJobСlassification);
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
    setCurrentJobСlassification(elem);
  }

  function openEditPopup(elem, hideMenu) {  
    setIsShowEditPopup(true);
    hideMenu();
    setCurrentJobСlassification(elem);
  }

  function handleSearchByName(e) {
    setSearchName(e.target.value);
  }

  function handleSearchByProfession(e) {
    setSearchProfession(e.target.value);
  }

  function handleChangeJobClassification(id) {
    const newJobClassification = selectedJobСlassification;
    if (newJobClassification.some(elem => elem.id === id)) {
      const index = newJobClassification.findIndex(elem => elem.id === id);
      newJobClassification.splice(index, 1);
    } else {
      filteredJobСlassification.find((elem) => {
        if (elem.id === id) {
          return newJobClassification.push(elem);
        } else {
          return false;
        }
      })
    }
    setSelectedJobСlassification(newJobClassification);
  }

  function printDate(obj) {
    let t=new Date(obj);
    let y=t.getFullYear();
    let d=t.getDate();
    let mon=t.getMonth();
    let s = "";
    switch (mon)
    {
      case 0: s="января"; break;
      case 1: s="февраля"; break;
      case 2: s="марта"; break;
      case 3: s="апреля"; break;
      case 4: s="мая"; break;
      case 5: s="июня"; break;
      case 6: s="июля"; break;
      case 7: s="августа"; break;
      case 8: s="сентября"; break;
      case 9: s="октября"; break;
      case 10: s="ноября"; break;
      case 11: s="декабря"; break;
      default: s=""
    }
    return d+" "+s+" "+y;
  }

  React.useEffect(() => {
    const filteredJobСlassification = jobСlassification.filter((item) => {
      return item.chapterName.toLowerCase().includes(searchName.toLowerCase()) && item.nameProfession.toLowerCase().includes(searchProfession.toLowerCase());
    })
    setFilteredJobСlassification(filteredJobСlassification)
  }, [jobСlassification, searchName, searchProfession]);

  React.useEffect(() => {
    setSelectedJobСlassification([ ...jobСlassificationProgram]);
    setFilteredJobСlassification([...jobСlassification]);
    setSearchName('');
    setSearchProfession('');
    return () => {
      setSelectedJobСlassification([]);
      setFilteredJobСlassification([]);
    };
    // eslint-disable-next-line
  }, [isOpen]);


  return (
    <>
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="etks-popup-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Выбор документов ЕТКС</h3>

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
                placeholder="поиск по разделу"
                type="text"
                id="search-etks-popup-input-name"
                name="search-etks-popup-input-name"
                autoComplete="off"
                value={searchName}
                onChange={handleSearchByName}
                >
                </input>
              </div>
              <div className="search initial-popup__search-input">
                <input 
                className="input-search"
                placeholder="поиск по профессии"
                type="text"
                id="search-etks-popup-input-profession"
                name="search-etks-popup-input-profession"
                autoComplete="off"
                value={searchProfession}
                onChange={handleSearchByProfession}
                >
                </input>
              </div>
            </div>
          </div>

          <ul className="initial-popup__list">
            {
              filteredJobСlassification.map((item, i) => (
                <JobСlassificationPopupItem
                item={item}
                i={i}
                key={i}
                selectedJobСlassification={selectedJobСlassification}
                onChange={handleChangeJobClassification}
                printDate={printDate}
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
      <AddJobСlassificationPopup
      isOpen={isShowAddPopup} 
      onClose={closeAllPopups} 
      onAdd={onAdd} 
      isLoading={isLoading}
      printDate={printDate}
      />
    }

    {
      isShowEditPopup &&
      <EditJobСlassificationPopup
      isOpen={isShowEditPopup} 
      currentJobСlassification={currentJobСlassification} 
      onClose={closeAllPopups} 
      onEdit={onEdit}
      isLoading={isLoading}
      printDate={printDate}
      />
    }

    {
      isShowRemovePopup &&
      <RemoveJobСlassificationPopup 
      isOpen={isShowRemovePopup} 
      currentJobСlassification={currentJobСlassification} 
      onClose={closeAllPopups} 
      onRemove={onRemove}
      isLoading={isLoading}
      isErrorRequest={isErrorRequest}
      />
    }

    </>
  )
}

export default JobСlassificationPopup;