import React from 'react';
import './JobDirectoryPopup.css';
import Popup from '../Popup.js';
import AddJobDirectoryPopup from './AddJobDirectoryPopup/AddJobDirectoryPopup.js';
import JobDirectoryPopupItem from './JobDirectoryPopupItem/JobDirectoryPopupItem.js';

function JobDirectoryPopup({ isOpen, onClose, isLoading, jobDirectory, jobDirectoryProgram, onSave, onAdd }) {

  const [selectedJobDirectory, setSelectedJobDirectory] = React.useState([ ...jobDirectoryProgram]);
  const [currentJobDirectory, setCurrentJobDirectory] = React.useState([...jobDirectory]);
  const [searchName, setSearchName] = React.useState('');
  const [searchJob, setSearchJob] = React.useState('');
  const [isShowAddPopup, setIsShowAddPopup] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onSave(selectedJobDirectory);
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

  function handleSearchByJob(e) {
    setSearchJob(e.target.value);
  }

  function handleChangeJobDirectory(id) {
    const newJobDirectory = selectedJobDirectory;
    if (newJobDirectory.some(elem => elem.id === id)) {
      const index = newJobDirectory.findIndex(elem => elem.id === id);
      newJobDirectory.splice(index, 1);
    } else {
      currentJobDirectory.find((elem) => {
        if (elem.id === id) {
          return newJobDirectory.push(elem);
        } else {
          return false;
        }
      })
    }
    setSelectedJobDirectory(newJobDirectory);
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
    const filteredJobDirectory = jobDirectory.filter((item) => {
      return item.chapterName.toLowerCase().includes(searchName.toLowerCase()) && item.nameProfession.toLowerCase().includes(searchJob.toLowerCase());
    })
    setCurrentJobDirectory(filteredJobDirectory)
  }, [jobDirectory, searchName, searchJob]);

  React.useEffect(() => {
    setSelectedJobDirectory([ ...jobDirectoryProgram]);
    setCurrentJobDirectory([...jobDirectory]);
    setSearchName('');
    setSearchJob('');
    return () => {
      setSelectedJobDirectory([]);
      setCurrentJobDirectory([]);
    };
    // eslint-disable-next-line
  }, [isOpen]);


  return (
    <>
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="eks-popup-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Выбор документов ЕКС</h3>

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
                id="search-eks-popup-input-name"
                name="search-ekts-popup-input-name"
                autoComplete="off"
                value={searchName}
                onChange={handleSearchByName}
                >
                </input>
              </div>
              <div className="search initial-popup__search-input">
                <input 
                className="input-search"
                placeholder="поиск по должности"
                type="text"
                id="search-eks-popup-input-job"
                name="search-ekts-popup-input-job"
                autoComplete="off"
                value={searchJob}
                onChange={handleSearchByJob}
                >
                </input>
              </div>
            </div>
          </div>

          <ul className="initial-popup__list">
          {
            currentJobDirectory.map((item, i) => (
              <JobDirectoryPopupItem
              item={item}
              i={i}
              key={i}
              selectedJobDirectory={selectedJobDirectory}
              onChange={handleChangeJobDirectory}
              printDate={printDate}
              />
            ))
          }
          </ul>
          
          </>
        }
        <button className="btn btn_type_save job-directory__btn-save" type="submit">Сохранить</button>

      </form>
    </Popup>

    <AddJobDirectoryPopup isOpen={isShowAddPopup} onClose={closeAllPopups} onAdd={onAdd} printDate={printDate} />

    </>
  )
}

export default JobDirectoryPopup;