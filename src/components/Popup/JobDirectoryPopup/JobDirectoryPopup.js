import React from 'react';
import './JobDirectoryPopup.css';
import Popup from '../Popup.js';
import AddJobDirectoryPopup from './AddJobDirectoryPopup/AddJobDirectoryPopup.js';
import JobDirectoryPopupItem from './JobDirectoryPopupItem/JobDirectoryPopupItem.js';
import EditJobDirectoryPopup from './EditJobDirectoryPopup/EditJobDirectoryPopup.js';
import RemoveJobDirectoryPopup from './RemoveJobDirectoryPopup/RemoveJobDirectoryPopup.js';

function JobDirectoryPopup({ isOpen, onClose, isLoading, isLoadingPopup, jobDirectory, jobDirectoryProgram, onSave, onAdd, onEdit, onRemove, isErrorRequest }) {

  const [selectedJobDirectory, setSelectedJobDirectory] = React.useState([ ...jobDirectoryProgram]);
  const [filteredJobDirectory, setFilteredJobDirectory] = React.useState([...jobDirectory]);
  const [searchName, setSearchName] = React.useState('');
  const [searchJob, setSearchJob] = React.useState('');
  const [isShowAddPopup, setIsShowAddPopup] = React.useState(false);
  const [isShowEditPopup, setIsShowEditPopup] = React.useState(false);
  const [isShowRemovePopup, setIsShowRemovePopup] = React.useState(false);
  const [currentJobDirectory, setCurrentJobDirectory] = React.useState({});

  function handleSubmit(e) {
    e.preventDefault();
    onSave(selectedJobDirectory);
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
    setCurrentJobDirectory(elem);
  }

  function openEditPopup(elem, hideMenu) {  
    setIsShowEditPopup(true);
    hideMenu();
    setCurrentJobDirectory(elem);
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
      filteredJobDirectory.find((elem) => {
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
      case 0: s="????????????"; break;
      case 1: s="??????????????"; break;
      case 2: s="??????????"; break;
      case 3: s="????????????"; break;
      case 4: s="??????"; break;
      case 5: s="????????"; break;
      case 6: s="????????"; break;
      case 7: s="??????????????"; break;
      case 8: s="????????????????"; break;
      case 9: s="??????????????"; break;
      case 10: s="????????????"; break;
      case 11: s="??????????????"; break;
      default: s=""
    }
    return d+" "+s+" "+y;
  }

  React.useEffect(() => {
    const filteredJobDirectory = jobDirectory.filter((item) => {
      return item.chapterName.toLowerCase().includes(searchName.toLowerCase()) && item.nameProfession.toLowerCase().includes(searchJob.toLowerCase());
    })
    setFilteredJobDirectory(filteredJobDirectory)
  }, [jobDirectory, searchName, searchJob]);

  React.useEffect(() => {
    setFilteredJobDirectory([ ...jobDirectoryProgram]);
    setFilteredJobDirectory([...jobDirectory]);
    setSearchName('');
    setSearchJob('');
    return () => {
      setSelectedJobDirectory([]);
      setFilteredJobDirectory([]);
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
        <h3 className="initial-popup__title">?????????? ???????????????????? ??????</h3>

        {
          isLoadingPopup ?
          <figure className="preloader preloader_type_popup">
            <i className="preloader__circle"></i>
            <figcaption className="preloader__caption">???????? ????????????????...</figcaption>
          </figure>
          :
          <>
          <div className="initial-popup__control">
            <button 
            className="btn btn_type_add initial-popup__btn-add"
            type="button" 
            onClick={showAddPopup}
            >
              ???????????????? ????????????????
            </button>
            <div className="initial-popup__search">
              <div className="search initial-popup__search-input">
                <input
                className="input-search"
                placeholder="?????????? ???? ??????????????"
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
                placeholder="?????????? ???? ??????????????????"
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
            filteredJobDirectory.map((item, i) => (
              <JobDirectoryPopupItem
              item={item}
              i={i}
              key={i}
              selectedJobDirectory={selectedJobDirectory}
              onChange={handleChangeJobDirectory}
              printDate={printDate}
              onEdit={openEditPopup}
              onRemove={openRemovePopup}
              />
            ))
          }
          </ul>
          
          </>
        }
        <button className={`btn btn_type_save profstandart__btn-save ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "????????????????????.." : "??????????????????"}</button>

      </form>
    </Popup>

    {
      isShowAddPopup && 
      <AddJobDirectoryPopup
      isOpen={isShowAddPopup} 
      onClose={closeAllPopups} 
      onAdd={onAdd} 
      isLoading={isLoading}
      printDate={printDate}
      />
    }

    {
      isShowEditPopup &&
      <EditJobDirectoryPopup
      isOpen={isShowEditPopup} 
      currentJobDirectory={currentJobDirectory} 
      onClose={closeAllPopups} 
      onEdit={onEdit}
      isLoading={isLoading}
      printDate={printDate}
      />
    }

    {
      isShowRemovePopup &&
      <RemoveJobDirectoryPopup
      isOpen={isShowRemovePopup} 
      currentJobDirectory={currentJobDirectory} 
      onClose={closeAllPopups} 
      onRemove={onRemove}
      isLoading={isLoading}
      isErrorRequest={isErrorRequest}
      />
    }

    </>
  )
}

export default JobDirectoryPopup;