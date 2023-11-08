import React from 'react';
import './ChoosePartsPopup.css';
import Popup from '../Popup.js';

function ChoosePartsPopup({ isOpen, onClose, typologies, onChangeTypologyParts, isLoading }) {

  const [currentTypologies, setCurrentTypologies] = React.useState();
  const [isShowTypologiesParts, setIsShowTypologiesParts] = React.useState(false);
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);
  
  function handleSubmit(e) {
    e.preventDefault();
    onChangeTypologyParts(currentTypologies)
  }

  function handleChangeTypology(typology) {
    setCurrentTypologies(typology);
    setIsShowTypologiesParts(true);
    setIsBlockSubmitButton(false);
  }

  React.useEffect(() => {
    setIsShowTypologiesParts(false);
    setIsBlockSubmitButton(true);
  }, [isOpen]);


  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="edit-part-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="popup__title popup-choose-parts__title">Выберите существующую структуру программы</h3>
        <ul className="popup-choose-parts__list">
        {
          typologies.map((elem) => (
            <li className="popup-choose-parts__item popup-choose-parts__item_type_typologies" key={elem.id}>
              <label className="radio radio_margin_top radio_margin_bottom">
                <input 
                className="radio" 
                id={`typologies ${elem.id}`} 
                name="typologies" 
                type="radio" 
                value={elem.name} 
                onChange={() => handleChangeTypology(elem)}
                >
                </input>
                <span>{elem.name}</span>
              </label>
            </li>
          ))
        }
        </ul>
        {
          isShowTypologiesParts &&
          <>
          <h4 className="popup__title popup-choose-parts__title">Разделы типовой структуры</h4>
          <ul className="popup-choose-parts__list">
            {
              currentTypologies.typology_parts.map((elem, i) => (
                <li key={i} className="popup-choose-parts__item">{`${i + 1}. ${elem.name}`}</li>
              ))
            }
          </ul>
          </>
        }
        <button 
        className={`btn btn_type_save popup-choose-parts__btn ${isLoading ? "btn_type_loading" : ""} ${isBlockSubmitButton ? "btn_type_block" : ""}`} 
        type="submit"
        >
          {isLoading ? "Сохранение.." : "Сохранить"}
        </button>
      </form>
    </Popup>
    )
}

export default ChoosePartsPopup;