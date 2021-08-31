import React from 'react';
import Popup from '../../../../Popup/Popup.js';
import './ChooseNsiTaskPopup.css';
import ChooseNsiTaskItem from './ChooseNsiTaskItem/ChooseNsiTaskItem.js';

function ChooseNsiTaskPopup({ isOpen, onClose, openAddNsiPopup, nsi, onEditNsi, onRemoveNsi, currentTask, onSelectNsi, isLoadingRequest }) {

  const [selectNsi, setSelectNsi] = React.useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(selectNsi);
    onSelectNsi(currentTask.id, selectNsi, onClose);
  }

  function handleChooseNsi(id) {
    let index = selectNsi.indexOf(id);
    let newArray = selectNsi;
    console.log(newArray);
    if (index === -1) {
      newArray.push(id);
    } else {
      newArray.splice(index, 1);
    }
    setSelectNsi(newArray);
  }
  
  React.useEffect(() => {
    const nsiId = currentTask.nsis.map((elem) => {return elem.id});
    setSelectNsi(nsiId);

    return () => {
      setSelectNsi([]);
    }

    // eslint-disable-next-line
  }, [isOpen, currentTask]);

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="choose-nsi-task-form" action="#" noValidate onSubmit={handleSubmit}>
        <h5 className="popup__title choose-nsi__title">Источники НСИ</h5>
        <p className="popup__subtitle choose-nsi__subtitle">Выберите источники НСИ для данного задания</p>
        <button className="btn btn_type_add choose-nsi__btn-add" type="button" onClick={openAddNsiPopup}>Добавить новый источник</button>
        <ul className="choose-nsi__list">
          {
            nsi.map((elem, i) => (
              <ChooseNsiTaskItem 
              elem={elem}
              i={i}
              key={`${elem.id}i`}
              onChooseNsi={handleChooseNsi}
              onEditNsi={onEditNsi}
              onRemoveNsi={onRemoveNsi}
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

export default ChooseNsiTaskPopup; 