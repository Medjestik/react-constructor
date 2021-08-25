import React from 'react';
import Popup from '../../../../Popup/Popup.js';

function AddAssessmentItemPopup({ isOpen, onClose, onAdd, isLoading }) {

  const [type, setType] = React.useState(0);

  function handleSubmit() {
    console.log(type)
  }

  function handleChangeItemType(e) {
    setType(e.target.value);
  }

  React.useEffect(() => {
    setType(0);
  }, [isOpen]);
 

  return(
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="add-task-assessment-item-popup-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Добавление нового предмета оценки</h3>
        <ul className="practical-task__list">
          <li className="practical-task__item">
              <h5 className="practical-task__item-name">Выберите что оценивает задание</h5>
              <div className="select-wrapper">
                <select           
                id="add-practical-task-assessment-item-type"
                name="add-practical-task-assessment-item-type"
                onChange={handleChangeItemType}
                defaultValue="placeholder"
                required   
                >
                  <option value="placeholder" disabled hidden>Выберите что оценивает задание</option>
                  <option value="2">Только умение</option>
                  <option value="3">Только навык</option>
                  <option value="4">Навык и входящие в них умения в совокупности</option>
                </select>
                <div className="select-arrow"></div>
                <div className="select-arrow"></div>
              </div>
            </li>
        </ul>
       
      </form>
    </Popup>
  )
}

export default AddAssessmentItemPopup;