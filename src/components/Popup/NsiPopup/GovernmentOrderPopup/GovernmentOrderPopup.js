import React from 'react';
import Popup from '../../Popup.js';

function GovernmentOrderPopup({ isOpen, onClose, emptyNsi, onAdd, id, printDate }) {

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [addDate, setAddDate] = React.useState('');
  const [addDateError, setAddDateError] = React.useState(false);
  const [addNumber, setAddNumber] = React.useState('');
  const [addNumberError, setAddNumberError] = React.useState(false);
  const [addEdition, setAddEdition] = React.useState('');
  const [addFullName, setAddFullName] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const newNsi = { ...emptyNsi, nsiName: addName, nsiDate: addDate, nsiNumber: addNumber, nsiEdit: addEdition, type_id: id, nsiFullName: addFullName };
    onAdd(newNsi, onClose);
  }

  function handleAddName(e) {
    setAddName(e.target.value);
    if (e.target.checkValidity()) {
      setAddNameError(false);
    } else {
      setAddNameError(true);
    }
  }

  function handleAddNumber(e) {
    setAddNumber(e.target.value);
    if (e.target.checkValidity()) {
      setAddNumberError(false);
    } else {
      setAddNumberError(true);
    }
  }

  function handleAddDate(e) {
    setAddDate(e.target.value);
    if (e.target.value.length !== 10) {
      setAddDateError(true);
    } else {
      setAddDateError(false);
    }
  }

  function handleAddEdition(e) {
    setAddEdition(e.target.value);
  }

  React.useEffect(() => {
    setAddName('');
    setAddDate('');
    setAddNumber('')
    setAddEdition('');
    setAddFullName('');
    setAddNameError(false);
    setAddDateError(false);
    setAddNumberError(false)
    setIsBlockSubmitButton(true);
  }, [isOpen]);

  React.useEffect(() => {
    if (
      addNameError || 
      addDateError ||
      addNumberError ||
      addName.length < 1 ||
      addDate.length < 10 ||
      addNumber.length < 1 
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addName, addDate, addNumber])

  React.useEffect(() => {  
    let edition = addEdition.length > 0 ? "(ред. от " + printDate(addEdition) + ")" : "";  
    let number = addNumber.length > 0 ? addNumber : "xxx"  
    let date = addDate.length > 0 ? printDate(addDate) : "xx.xx.xxxx";  
    let name = addName.length > 0 ? addName : "Название"  
    setAddFullName("Распоряжение Правительства Российской Федерации от " + date + " г. № " + number + " " + edition + " «" + name + "»"); 

   // eslint-disable-next-line
    }, [addName, addDate, addNumber, addEdition]) 

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="edit-part-form" action="#" noValidate onSubmit={handleSubmit}>
          <h3 className="nsi-popup__title">Добавление Распоряжения Правительства Российской Федерации</h3>
          <ul className="nsi-popup__list-input">
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Название</h5>
            <input 
            className="nsi-popup__input"
            placeholder="введите название"
            type="text"
            id="add-input-name"
            name="add-input-name"
            autoComplete="off"
            value={addName}
            onChange={handleAddName}
            required
            >
            </input>
            <span className={`nsi-popup__input-error ${addNameError ? "nsi-popup__input-error_type_show" : ""}`}>Заполните название</span>
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Датированный</h5>
            <input  
            className="nsi-popup__input"
            placeholder="введите дату"
            type="date"
            id="add-input-date"
            name="add-input-date"
            autoComplete="off"
            value={addDate}
            onChange={handleAddDate}
            required
            >
            </input>
            <span className={`nsi-popup__input-error ${addDateError ? "nsi-popup__input-error_type_show" : ""}`}>Заполните дату</span>
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Номер</h5>
            <input 
            className="nsi-popup__input"
            placeholder="введите номер"
            type="text"
            id="add-input-name"
            name="add-input-name"
            autoComplete="off"
            value={addNumber}
            onChange={handleAddNumber}
            required
            >
            </input>
            <span className={`nsi-popup__input-error ${addNumberError ? "nsi-popup__input-error_type_show" : ""}`}>Заполните номер</span>
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Редакция (если есть)</h5>
            <input  
            className="nsi-popup__input"
            placeholder="введите редакцию"
            type="date"
            id="add-input-date"
            name="add-input-date"
            autoComplete="off"
            value={addEdition}
            onChange={handleAddEdition}
            >
            </input>
          </li>
        </ul>

        <p className="initial-popup__result-name">
          <span className="initial-popup__result-name_weight_bold">Итоговое название: </span>
          {addFullName}
        </p>

        <button className={`btn btn_type_save nsi-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""}`} type="submit">Добавить</button>
      </form>
    </Popup>
    )
}

export default GovernmentOrderPopup;