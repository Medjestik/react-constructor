import React from 'react';
import './ProfStandartPopup.css';
import Popup from '../../Popup/Popup.js';
import ProfStandartPopupItem from './ProfStandartPopupItem/ProfStandartPopupItem.js';
import AddProfStandartPopup from './AddProfStandartPopup/AddProfStandartPopup.js';

function ProfStandartPopup({ isOpen, onClose, isLoading, profStandarts, profStandartsProgram, onSave }) {

  const [selectedProfStandart, setSelectedProfStandart] = React.useState([ ...profStandartsProgram]);
  const [currentProfStandart, setCurrentProfStandart] = React.useState([...profStandarts]);
  const [searchName, setSearchName] = React.useState('');
  const [searchCode, setSearchCode] = React.useState('');
  const [isShowAddPopup, setIsShowAddPopup] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onSave(selectedProfStandart);
  }

  function showAddPopup() {
    setIsShowAddPopup(true);
  }

  function closeAllPopups() {
    setIsShowAddPopup(false);
  }
  
  function handleAddProfStandart(newProfStandart) {
    closeAllPopups();
    setCurrentProfStandart([...currentProfStandart, newProfStandart]);
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
    return () => {
      setSelectedProfStandart([]);
      setCurrentProfStandart([]);
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
              currentProfStandart.map((item, i) => (
                <ProfStandartPopupItem
                item={item}
                i={i}
                key={i}
                selectedProfStandart={selectedProfStandart}
                onChange={handleChangeProfStandart}
                />
              ))
            }
          </ul>
          </>

        }
        <button className="btn btn_type_save profstandart__btn-save" type="submit">Сохранить</button>

      </form>
    </Popup>

    <AddProfStandartPopup isOpen={isShowAddPopup} onClose={closeAllPopups} onAdd={handleAddProfStandart} />
    </>
  )
}

export default ProfStandartPopup;