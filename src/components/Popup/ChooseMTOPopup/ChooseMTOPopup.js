import React from 'react';
import Popup from '../Popup.js';
import './ChooseMTOPopup.css';
import ChooseMTOItem from './ChooseMTOItem/ChooseMTOItem.js';

function ChooseMTOPopup({ isOpen, onClose, MTO, openAddMTOPopup, onEditMTO, onRemoveMTO, onSelectMTO, currentTask, isLoadingRequest }) {

  const [selectMTO, setSelectMTO] = React.useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(selectMTO);
    onSelectMTO(currentTask.id, selectMTO, onClose);
  }

  function handleChooseMTO(id) {
    let index = selectMTO.indexOf(id);
    let newArray = selectMTO;
    console.log(newArray);
    if (index === -1) {
      newArray.push(id);
    } else {
      newArray.splice(index, 1);
    }
    setSelectMTO(newArray);
  }
  
  React.useEffect(() => {
    const msoId = currentTask.mtos.map((elem) => {return elem.id});
    setSelectMTO(msoId);

    return () => {
      setSelectMTO([]);
    }

    // eslint-disable-next-line
  }, [isOpen, currentTask]);

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="choose-mto-task-form" action="#" noValidate onSubmit={handleSubmit}>
        <h5 className="popup__title choose-mto__title">Материально-техническое обеспечение</h5>
        <p className="popup__subtitle choose-mto__subtitle">Выберите МТО для данного задания</p>
        <button className="btn btn_type_add choose-mto__btn-add" type="button" onClick={openAddMTOPopup}>Добавить новое МТО</button>
        <ul className="choose-mto__list">
          {
            MTO.map((elem, i) => ( 
              <ChooseMTOItem 
              elem={elem}
              i={i}
              key={`${elem.id}mto`}
              onChooseMTO={handleChooseMTO}
              onEditMTO={onEditMTO}
              onRemoveMTO={onRemoveMTO}
              currentTask={currentTask}
              />
            ))
          }

        </ul>
        <button className={`btn btn_type_save initial-popup__btn-save ${isLoadingRequest ? "btn_type_loading" : ""}`} type="submit">{isLoadingRequest ? "Сохранение.." : "Сохранить"}</button>
      
      </form>
    </Popup>
  )
}

export default ChooseMTOPopup; 