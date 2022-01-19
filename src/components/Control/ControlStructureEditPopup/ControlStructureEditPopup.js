import React from 'react';
import Popup from '../../Popup/Popup.js';
import DragAndDrop from '../../DragAndDrop/DragAndDrop.js';
import ControlStructureAddPartPopup from '../ControlStructureAddPartPopup/ControlStructureAddPartPopup.js';
import ControlStructureEditPartPopup from '../ControlStructureEditPartPopup/ControlStructureEditPartPopup.js';
import ControlStructureRemovePartPopup from '../ControlStructureRemovePartPopup/ControlStructureRemovePartPopup.js';

function ControlStructureEditPopup({ isOpen, onClose, structure, onEdit, isLoading, isShowError }) { 

  const [name, setName] = React.useState("");
  const [errorName, setErrorName] = React.useState(false);
  const [isAddStructurePartsPopupOpen, setIsAddStructurePartsPopupOpen] = React.useState(false);
  const [isEditStructurePartsPopupOpen, setIsEditStructurePartsPopupOpen] = React.useState(false);
  const [isRemoveStructurePartsPopupOpen, setIsRemoveStructurePartsPopupOpen] = React.useState(false);
  const [parts, setParts] = React.useState([]);
  const [currentPart, setCurrentPart] = React.useState({});
  
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    const newStructure = {
      ...structure,
      name: name,
      parts: parts
    }

    onEdit(newStructure , onClose);
  }

  function openAddStructureParticipantPopup() {
    setIsAddStructurePartsPopupOpen(true);
  }

  function openRemoveStructureParticipantPopup(part) {
    setIsRemoveStructurePartsPopupOpen(true);
    setCurrentPart(part);
  }

  function openEditStructureParticipantPopup(part) {
    setIsEditStructurePartsPopupOpen(true);
    setCurrentPart(part);
  }

  function closeAddStructurePartsPopup() {
    setIsAddStructurePartsPopupOpen(false);
    setIsEditStructurePartsPopupOpen(false);
    setIsRemoveStructurePartsPopupOpen(false);
  }

  function handleAddPart(part) {
    setParts([...parts, part]);
    closeAddStructurePartsPopup();
  }

  function handleEditPart(part) {
    const partIndex = parts.indexOf(parts.find((elem) => (elem.id === part.id)));
    setParts([...parts.slice(0, partIndex), part, ...parts.slice(partIndex + 1)]);
  }

  function handleRemovePart(part) {
    const newParts = parts.filter((elem) => elem.id !== part.id);
    setParts(newParts);
  }

  function handleChangePart(partsId) {
    const newPartsOrder = parts.sort(function(a, b) {  
      return partsId.indexOf(a.id.toString()) - partsId.indexOf(b.id.toString());
    });
    setParts(newPartsOrder);
  }

  function handleAddName(e) {
    setName(e.target.value);
    if (e.target.checkValidity()) {
      setErrorName(false);
    } else {
      setErrorName(true);
    }
  }

  React.useEffect(() => {
    setName(structure.name);
    setParts(structure.parts);
    setErrorName(false);
    setIsBlockSubmitButton(true);
    return () => {
      setParts([]);
      setCurrentPart({});
    }
  }, [isOpen, structure]);

  React.useEffect(() => {
    if (
      errorName || 
      name.length < 2
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [name]);

  return (
    <>
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="control-structure-add-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Создание новой структуры</h3>
        <ul className="initial-popup__list-input">
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Название*</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите название типовой структуры"
            type="text"
            id="add-new-structure-name"
            name="add-new-structure-name"
            autoComplete="off"
            minLength="2"
            value={name}
            onChange={handleAddName}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${errorName ? "initial-popup__input-error_type_show" : ""}`}>Название должно быть не короче 2 символов</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Список разделов</h5>
            {
              parts.length < 1 
              ?
              <span className="control-structure__participant-caption">Разделы пока не добавлены!</span>
              :
              <DragAndDrop 
              data={parts}
              onEdit={openEditStructureParticipantPopup}
              onRemove={openRemoveStructureParticipantPopup}
              onChangeOrder={handleChangePart}
              isEditRights={true}
            />
            }
            
          </li>
        </ul>

        <span className={`popup__submit-error ${isShowError.isShow ? "popup__submit-error_type_show" : "popup__submit-error_type_hide"}`}>{isShowError.isShow ? isShowError.text : ""}</span>
        <div className="control-program__popup-buttons">
          <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Сохранение.." : "Сохранить"}</button>
          <button className="btn btn_type_add control-program__participant-btn-add" type="button" onClick={openAddStructureParticipantPopup}>Добавить раздел</button>
        </div>

      </form>
    </Popup>

    {
      isAddStructurePartsPopupOpen && 
      <ControlStructureAddPartPopup
        isOpen={isAddStructurePartsPopupOpen}
        onClose={closeAddStructurePartsPopup}
        onAdd={handleAddPart}
        isLoading={isLoading}
        isShowError={isShowError}
      />
    }

    {
      isEditStructurePartsPopupOpen && 
      <ControlStructureEditPartPopup
        isOpen={isEditStructurePartsPopupOpen}
        onClose={closeAddStructurePartsPopup}
        part={currentPart}
        onEdit={handleEditPart}
        isLoading={false}
        isShowError={false}
      />
    }

    {
      isRemoveStructurePartsPopupOpen && 
      <ControlStructureRemovePartPopup
        isOpen={isRemoveStructurePartsPopupOpen}
        onClose={closeAddStructurePartsPopup}
        part={currentPart}
        onRemove={handleRemovePart}
        isLoading={false}
        isShowError={false}
      />
    }

    </>
  )
}

export default ControlStructureEditPopup;