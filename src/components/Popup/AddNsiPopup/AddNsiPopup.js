import React from 'react';
import './AddNsiPopup.css';
import Popup from '../Popup.js';
import AccordionChooseNsiType from '../../Accordion/AccordionChooseNsiType/AccordionChooseNsiType.js';
import NsiTextbook from './NsiType/NsiTextbook.js';
import NsiTechnicalDocumentation from './NsiTechnicalDocumentation/NsiTechnicalDocumentation.js';
import NsiInternetResources from './NsiInternetResources/NsiInternetResources.js';

function AddNsiPopup({ isOpen, onClose, nsi }) {

  const [currentNsiType, setCurrentNsiType] = React.useState('');
  const [isFormError, setIsFormError] = React.useState(true);

  function chooseNsiType(type) {
    setCurrentNsiType(type);
  }

  React.useEffect(() => {
    setCurrentNsiType('');
    setIsFormError(true);
  }, [isOpen]);

  function defineNsi(type) {
    switch(type) {
      case 'textbook':
        return(<NsiTextbook type={type} formError={setIsFormError} />)
  
      case 'technical':
        return(<NsiTechnicalDocumentation type={type} formError={setIsFormError} />)
  
      case 'internet':
        return(<NsiInternetResources type={type} formError={setIsFormError} />)
  
      case 'library':
        return(<div>4</div>)
  
      case 'act':
        return(<div>5</div>)
          
        case 'document':
          return(<div>6</div>)
  
      default: 
        return false;
    }
  }
  

  return (
    <Popup 
    isOpen={isOpen}
    onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="add-nsi-form" action="#" noValidate>
        <h3 className="nsi-popup__title">Добавление нового источника</h3>
        <AccordionChooseNsiType chooseNsiType={chooseNsiType} isOpen={isOpen} />
        {defineNsi(currentNsiType)}
        <button className={`btn btn_type_add btn_type_nsi ${isFormError ? "btn_type_loading" : ""}`} type="submit">Добавить</button>
      </form>
    </Popup>
  )
}

export default AddNsiPopup;