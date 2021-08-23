import React from 'react';
import './ProfStandartPopup.css';
import Popup from '../../Popup/Popup.js';
import ProfStandartPopupItem from './ProfStandartPopupItem/ProfStandartPopupItem.js';
import AddProfStandartPopup from './AddProfStandartPopup/AddProfStandartPopup.js';
import EditProfStandartPopup from './EditProfStandartPopup/EditProfStandartPopup.js';
import RemoveProfStandartPopup from './RemoveProfStandartPopup/RemoveProfStandartPopup.js';

function ProfStandartPopup({ isOpen, onClose, isLoading, isLoadingPopup, profStandarts, profStandartsProgram, onSave, onAdd, onEdit, onRemove, isErrorRequest }) {

  const [selectedProfStandart, setSelectedProfStandart] = React.useState([ ...profStandartsProgram]);
  const [filteredProfStandart, setFilteredProfStandart] = React.useState([...profStandarts]);
  const [searchName, setSearchName] = React.useState('');
  const [searchCode, setSearchCode] = React.useState('');
  const [isShowAddPopup, setIsShowAddPopup] = React.useState(false);
  const [isShowEditPopup, setIsShowEditPopup] = React.useState(false);
  const [isShowRemovePopup, setIsShowRemovePopup] = React.useState(false);
  const [currentProfstandart, setCurrentProfstandart] = React.useState({});

  function handleSubmit(e) {
    e.preventDefault();
    onSave(selectedProfStandart);
  }

  function showAddPopup() {
    setIsShowAddPopup(true);
    setSearchName('');
    setSearchCode('');
  }

  function showEditPopup(elem, hideMenu) {  
    setIsShowEditPopup(true)
    hideMenu();
    setCurrentProfstandart(elem);
  }

  function openRemovePopup(elem, hideMenu) {
    setIsShowRemovePopup(true);
    hideMenu();
    setCurrentProfstandart(elem);
  }

  function closeAllPopups() {
    setIsShowAddPopup(false);
    setIsShowEditPopup(false);
    setIsShowRemovePopup(false);
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
      filteredProfStandart.find((elem) => {
        if (elem.id === id) {
          return newProfStandart.push(elem);
        } else {
          return false;
        }
      })
    }
    setSelectedProfStandart(newProfStandart);
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
    const changeProfstandart = profStandarts.filter((item) => {
      return item.nameText.toLowerCase().includes(searchName.toLowerCase()) && item.nameCode.toLowerCase().includes(searchCode.toLowerCase());
    })
    setFilteredProfStandart(changeProfstandart);
  }, [profStandarts, searchName, searchCode]);

  React.useEffect(() => {
    setSelectedProfStandart([ ...profStandartsProgram]);
    setFilteredProfStandart([...profStandarts]);
    setSearchName('');
    setSearchCode('');
    return () => {
      setSelectedProfStandart([]);
      setFilteredProfStandart([]);
    };
    // eslint-disable-next-line
  }, [isOpen]);


  return (
    <>
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="pf-popup-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Редактирование профессиональных стандартов</h3>

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
              Добавить профстандарт
            </button>
            <div className="initial-popup__search">
              <div className="search initial-popup__search-input">
                <input
                className="input-search"
                placeholder="поиск по названию"
                type="text"
                id="search-pf-popup-input-name"
                name="search-pf-popup-input-name"
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
                id="search-pf-popup-input-code"
                name="search-pf-popup-input-code"
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
              filteredProfStandart.map((item, i) => (
                <ProfStandartPopupItem
                item={item}
                i={i}
                key={i}
                selectedProfStandart={selectedProfStandart}
                onChange={handleChangeProfStandart}
                onEdit={showEditPopup}
                onRemove={openRemovePopup}
                printDate={printDate}
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
      <AddProfStandartPopup 
      isOpen={isShowAddPopup} 
      onClose={closeAllPopups} 
      onAdd={onAdd} 
      printDate={printDate}
      isLoading={isLoading}
      />
    }

    {
      isShowEditPopup &&
      <EditProfStandartPopup 
      isOpen={isShowEditPopup} 
      currentProfstandart={currentProfstandart} 
      onClose={closeAllPopups} 
      printDate={printDate}
      onEdit={onEdit}
      isLoading={isLoading}
      />
    }

    {
      isShowRemovePopup &&
      <RemoveProfStandartPopup 
      isOpen={isShowRemovePopup} 
      currentProfstandart={currentProfstandart} 
      onClose={closeAllPopups} 
      onRemove={onRemove}
      isLoading={isLoading}
      isErrorRequest={isErrorRequest}
      />
    }

    </>
  )
}

export default ProfStandartPopup;