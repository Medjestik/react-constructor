import React from 'react';
import './JobСlassificationPopup.css';
import Popup from '../Popup.js';
import AddJobСlassificationPopup from './AddJobСlassificationPopup/AddJobСlassificationPopup.js';
import * as api from '../../../utils/api.js';
import JobСlassificationPopupItem from './JobСlassificationPopupItem/JobСlassificationPopupItem.js';

function JobСlassificationPopup({ isOpen, onClose, isLoading, jobСlassification, jobСlassificationProgram, onSave }) {

  const [selectedJobСlassification, setSelectedJobСlassification] = React.useState([...jobСlassificationProgram]);
  const [currentJobСlassification, setCurrentJobСlassification] = React.useState([...jobСlassification]);
  const [searchName, setSearchName] = React.useState('');
  const [searchProfession, setSearchProfession] = React.useState('');
  const [isShowAddPopup, setIsShowAddPopup] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onSave(selectedJobСlassification);
  }

  function showAddPopup() {
    setIsShowAddPopup(true);
  }

  function closeAllPopups() {
    setIsShowAddPopup(false);
  }
  
  function handleAddDocument(newDocument) {
    const token = localStorage.getItem("token");
    api.createJobClassification({ token: token, document: newDocument })
    .then((res) => {
      closeAllPopups();
      setCurrentJobСlassification([...currentJobСlassification, res]);
    })
    .catch((err) => {
      console.error(err);
    })
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
      currentJobСlassification.find((elem) => {
        if (elem.id === id) {
          return newJobClassification.push(elem);
        } else {
          return false;
        }
      })
    }
    setSelectedJobСlassification(newJobClassification);
  }

  React.useEffect(() => {
    const filteredJobСlassification = jobСlassification.filter((item) => {
      return item.chapterName.toLowerCase().includes(searchName.toLowerCase()) && item.nameProfession.toLowerCase().includes(searchProfession.toLowerCase());
    })
    setCurrentJobСlassification(filteredJobСlassification)
  }, [jobСlassification, searchName, searchProfession]);

  React.useEffect(() => {
    setSelectedJobСlassification([ ...jobСlassificationProgram]);
    setCurrentJobСlassification([...jobСlassification]);
    setSearchName('');
    setSearchProfession('');
    return () => {
      setSelectedJobСlassification([]);
      setCurrentJobСlassification([]);
    };
    // eslint-disable-next-line
  }, [isOpen]);


  return (
    <>
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="avatar-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Выбор документов ЕТКС</h3>

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
                placeholder="поиск по разделу"
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
                placeholder="поиск по профессии"
                type="text"
                id="search-input-profession"
                name="search-input-profession"
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
              currentJobСlassification.map((item, i) => (
                <JobСlassificationPopupItem
                item={item}
                i={i}
                key={i}
                selectedJobСlassification={selectedJobСlassification}
                onChange={handleChangeJobClassification}
                />
              ))
            }
          </ul>

          </>
        }
        <button className="btn btn_type_save job-classification__btn-save" type="submit">Сохранить</button>

      </form>
    </Popup>

    <AddJobСlassificationPopup isOpen={isShowAddPopup} onClose={closeAllPopups} onAdd={handleAddDocument} />

    </>
  )
}

export default JobСlassificationPopup;