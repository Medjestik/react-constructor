import React from 'react';
import './ProfStandartPopup.css';
import Popup from '../../Popup/Popup.js';

function ProfStandartPopup({ isOpen, onClose, isLoading, initialData, profStandarts, profStandartsProgram, onSave }) {

  const [selectedProfStandart, setSelectedProfStandart] = React.useState([ ...profStandartsProgram]);

  function handleSubmit(e) {
    e.preventDefault();
    onSave(selectedProfStandart);
  }

  function handleChangeProfStandart(id) {
    const newProfStandart = selectedProfStandart;
    if (newProfStandart.some(elem => elem.id === id)) {
      const index = newProfStandart.findIndex(elem => elem.id === id);
      newProfStandart.splice(index, 1);
    } else {
      profStandarts.find((elem) => {
        if (elem.id === id) {
          return newProfStandart.push(elem);
        } else {
          return false;
        }
      })
    }
    setSelectedProfStandart(newProfStandart);
    console.log(profStandartsProgram);
  }

  React.useEffect(() => {
    setSelectedProfStandart([ ...profStandartsProgram]);
    console.log(selectedProfStandart);
    return () => {
      setSelectedProfStandart([]);
    };
    // eslint-disable-next-line
  }, [isOpen]);


  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="avatar-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="profstandart__title">Выбор профессиональных стандартов</h3>

        {
          isLoading ?
          <figure className="preloader preloader_type_popup">
            <i className="preloader__circle"></i>
            <figcaption className="preloader__caption">Идёт загрузка...</figcaption>
          </figure>
          :
          <>
          <div className="profstandart__control">
            <button className="btn btn_type_add profstandart__btn-add" type="button">Добавить профстандарт</button>
            <div className="profstandart__search">
              <div className="search profstandart__search-input">
                <input 
                className="input-search" 
                placeholder="поиск по названию"
                type="email" 
                id="searchQuestion"
                name="searchQuestion" 
                >
                </input>
              </div>
              <div className="search profstandart__search-input">
                <input 
                className="input-search" 
                placeholder="поиск по коду"
                type="email" 
                id="searchQuestion"
                name="searchQuestion" 
                >
                </input>
              </div>
            </div>
          </div>
          
          <ul className="profstandart__list">
            {
              profStandarts.map((item, i) => (
                <li className="profstandart__item" key={i}>
                  <label className="checkbox profstandart__checkbox">
                    <input 
                      name="prof-standart"
                      type="checkbox"
                      id={i}
                      defaultChecked={selectedProfStandart.some(elem => elem.id === item.id)}
                      onChange={() => handleChangeProfStandart(item.id)}
                      >
                    </input>
                    <span></span>
                  </label>
                  <div className="profstandart__info">
                    <h4 className="profstandart__name">{item.name}</h4>
                    <span className="profstandart__code">{item.code}</span>
                  </div>
                  <button className="profstandart__button-edit" type="button"></button>
                </li>
              ))
            }
          </ul>
          </>

        }
        <button className="btn btn_type_save profstandart__btn-save" type="submit">Сохранить</button>

      </form>
    </Popup>
  )
}

export default ProfStandartPopup;