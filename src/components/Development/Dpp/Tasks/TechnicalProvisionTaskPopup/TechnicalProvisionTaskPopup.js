import React from 'react';
import Popup from '../../../../Popup/Popup.js';

function TechnicalProvisionTaskPopup({ isOpen, onClose, currentActionType, currentMTO, onAddMTO, onEditMTO, isLoadingRequest }) {

  const [type, setType] = React.useState(currentActionType === "edit" ? currentMTO.parentId : "placeholder");
  const [isShowFields, setIsShowFields] = React.useState(false);
  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [unit, setUnit] = React.useState('');
  const [unitError, setUnitError] = React.useState(false);
  const [count, setCount] = React.useState('');
  const [countError, setCountError] = React.useState(false);
  const [isShowRoomType, setIsShowRoomType] = React.useState(false);
  const [roomType, setRoomType] = React.useState('');
  const [isShowFurnitureType, setIsShowFurnitureType] = React.useState(false);
  const [furnitureType, setFurnitureType] = React.useState('');
  const [isShowEquipmentType, setIsShowEquipmentType] = React.useState(false);
  const [equipmentType, setEquipmentType] = React.useState('');
  const [isShowSoftwareType, setIsShowSoftwareType] = React.useState(false);
  const [softwareType, setSoftwareType] = React.useState('');
  const [note, setNote] = React.useState('');
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  console.log(currentMTO);
  console.log(type);

  function handleSubmit(e) { 
    e.preventDefault();
    const newData = {
      name: name,
      unit: unit,
      count: count,
      typeId: type,
      roomType: roomType,
      furnitureType: furnitureType,
      equipmentType: equipmentType,
      softwareType: softwareType,
      note: note,
    }
    if (currentActionType === "edit") {
      onEditMTO(newData, currentMTO.id, onClose);
    } else {
      onAddMTO(newData, onClose);
    }
  }

  function handleChangeItemType(e) {
    setType(e.target.value);
  }

  function handleChangeRoomType(e) {
    setRoomType(e.target.value);
  }

  function handleChangeFurnitureType(e) {
    setFurnitureType(e.target.value);
  }

  function handleChangeEquipmentType(e) {
    setEquipmentType(e.target.value);
  }

  function handleChangeSoftwareType(e) {
    setSoftwareType(e.target.value);
  }

  function handleChangeName(e) {
    setName(e.target.value);
    if (e.target.checkValidity()) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  }

  function handleChangeUnit(e) {
    setUnit(e.target.value);
    if (e.target.checkValidity()) {
      setUnitError(false);
    } else {
      setUnitError(true);
    }
  }

  function handleChangeCount(e) {
    setCount(e.target.value);
    if (e.target.checkValidity()) {
      setCountError(false);
    } else {
      setCountError(true);
    }
  }

  function handleNote(e) {
    setNote(e.target.value);
  }

  React.useEffect(() => {
    if (nameError || name.length < 1 || unitError || unit.length < 1 || countError || count.length < 1) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  }, [name, nameError, unit, unitError, count, countError]);

  function hideFields() {
    setIsShowRoomType(false);
    setIsShowFurnitureType(false);
    setIsShowEquipmentType(false);
    setIsShowSoftwareType(false);
  }


  React.useEffect(() => {
    if (type !== "placeholder") {
      setIsShowFields(true);
    } else {
      setIsShowFields(false);
    }

    switch (type) {
      case "1":
        hideFields();
        setIsShowRoomType(true);
        setSoftwareType("placeholder");
        setEquipmentType("placeholder");
        setFurnitureType("placeholder");
        break;
      case "2":
        hideFields();
        setIsShowFurnitureType(true);
        setSoftwareType("placeholder");
        setEquipmentType("placeholder");
        setRoomType("placeholder");
        break;
      case "3":
        hideFields();
        setIsShowEquipmentType(true);
        setSoftwareType("placeholder");
        setFurnitureType("placeholder");
        setRoomType("placeholder");
        break;
      case "4":
        hideFields();
        setSoftwareType("placeholder");
        setEquipmentType("placeholder");
        setFurnitureType("placeholder");
        setRoomType("placeholder");
        break;
      case "5":
        hideFields();
        setIsShowSoftwareType(true);
        setEquipmentType("placeholder");
        setFurnitureType("placeholder");
        setRoomType("placeholder");
        break;
      case "6":
        hideFields();
        setSoftwareType("placeholder");
        setEquipmentType("placeholder");
        setFurnitureType("placeholder");
        setRoomType("placeholder");
        break;
      case "7":
        hideFields();
        setSoftwareType("placeholder");
        setEquipmentType("placeholder");
        setFurnitureType("placeholder");
        setRoomType("placeholder");
        break;
      default:
    }
  }, [type]);

  React.useEffect(() => {
    setType(currentActionType === "edit" ? currentMTO.parentId : "placeholder");
    setIsShowFields(currentActionType === "edit" ? true : false);
    if (currentActionType === "edit") {
      if ((currentMTO.typeId === 8) || (currentMTO.typeId === 9) || (currentMTO.typeId === 10)) {
        setRoomType(currentMTO.typeId);
        setIsShowRoomType(true);
        setFurnitureType("placeholder");
        setIsShowFurnitureType(false);
        setEquipmentType("placeholder");
        setIsShowEquipmentType(false);
        setSoftwareType("placeholder");
        setIsShowSoftwareType(false);
      }
      if ((currentMTO.typeId === 11) || (currentMTO.typeId === 12)) {
        setFurnitureType(currentMTO.typeId);
        setIsShowFurnitureType(true);
        setRoomType("placeholder");
        setIsShowRoomType(false);
        setEquipmentType("placeholder");
        setIsShowEquipmentType(false);
        setSoftwareType("placeholder");
        setIsShowSoftwareType(false);
      }
      if ((currentMTO.typeId === 13) || (currentMTO.typeId === 14)) {
        setEquipmentType(currentMTO.typeId);
        setIsShowEquipmentType(true);
        setRoomType("placeholder");
        setIsShowRoomType(false);
        setFurnitureType("placeholder");
        setIsShowFurnitureType(false);
      }
      if ((currentMTO.typeId === 15) || (currentMTO.typeId === 16)) {
        setSoftwareType(currentMTO.typeId);
        setIsShowSoftwareType(true);
        setRoomType("placeholder");
        setIsShowRoomType(false);
        setFurnitureType("placeholder");
        setIsShowFurnitureType(false);
        setEquipmentType("placeholder");
        setIsShowEquipmentType(false);
      }
    } else {
      setRoomType("placeholder");
      setIsShowRoomType(false);
      setFurnitureType("placeholder");
      setIsShowFurnitureType(false);
      setEquipmentType("placeholder");
      setIsShowEquipmentType(false);
      setSoftwareType("placeholder");
      setIsShowSoftwareType(false);
    }

    setName(currentActionType === "edit" ? currentMTO.name : "");
    setNameError(false);
    setCount(currentActionType === "edit" ? currentMTO.count : "");
    setCountError(false);
    setUnit(currentActionType === "edit" ? currentMTO.unit : "");
    setUnitError(false);
    setNote(currentActionType === "edit" ? currentMTO.note : "");
    return () => {
    }
  }, [isOpen, currentActionType, currentMTO]);
 

  return(
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="add-task-assessment-subject-item-popup-form" action="#" noValidate onSubmit={handleSubmit}>

        <h3 className="initial-popup__title">{`${currentActionType === "edit" ? "Редактирование МТО" : "Добавление нового МТО"}`}</h3>
        <ul className="practical-task__list">
          <li className="practical-task__item">
            <h5 className="practical-task__item-name">Выберите тип МТО</h5>
            <div className="select-wrapper">
              <select           
              id="add-practical-task-mto-item-type"
              name="add-practical-task-mto-item-type"
              onChange={handleChangeItemType}
              defaultValue={type}
              required   
              >
                <option value="placeholder" disabled hidden>Выберите тип МТО</option>
                <option value="1">Помещения</option>
                <option value="2">Мебель</option>
                <option value="3">Оборудование</option>
                <option value="4">Расходные материалы</option>
                <option value="5">Программное обеспечение</option>
                <option value="6">Транспортные средства</option>
                <option value="7">Другое</option>
              </select>
              <div className="select-arrow"></div>
              <div className="select-arrow"></div>
            </div>
          </li>

          {
            isShowRoomType &&
            <li className="practical-task__item">
              <h5 className="practical-task__item-name">Уточните тип МТО</h5>
              <div className="select-wrapper">
                <select           
                id="add-practical-task-mto-item-type-room"
                name="add-practical-task-mto-item-type-room"
                onChange={handleChangeRoomType}
                defaultValue={roomType}
                required   
                >
                  <option value="placeholder" disabled hidden>Уточните тип МТО</option>
                  <option value="8">Для лекционных занятий</option>
                  <option value="9">Для практических занятий</option>
                  <option value="10">Для лабораторных занятий</option>
                </select>
                <div className="select-arrow"></div>
                <div className="select-arrow"></div>
              </div>
            </li>
          }

          {
            isShowFurnitureType &&
            <li className="practical-task__item">
              <h5 className="practical-task__item-name">Уточните тип МТО</h5>
              <div className="select-wrapper">
                <select           
                id="add-practical-task-mto-item-type-furniture"
                name="add-practical-task-mto-item-type-furniture"
                onChange={handleChangeFurnitureType}
                defaultValue={furnitureType}
                required   
                >
                  <option value="placeholder" disabled hidden>Уточните тип МТО</option>
                  <option value="11">Для учебных классов</option>
                  <option value="12">Для производственных помещений</option>
                </select>
                <div className="select-arrow"></div>
                <div className="select-arrow"></div>
              </div>
            </li>
          }

          {
            isShowEquipmentType &&
            <li className="practical-task__item">
              <h5 className="practical-task__item-name">Уточните тип МТО</h5>
              <div className="select-wrapper">
                <select           
                id="add-practical-task-mto-item-type-equipment"
                name="add-practical-task-mto-item-type-equipment"
                onChange={handleChangeEquipmentType}
                defaultValue={equipmentType}
                required   
                >
                  <option value="placeholder" disabled hidden>Уточните тип МТО</option>
                  <option value="13">Для учебных классов</option>
                  <option value="14">Для производственных помещений</option>
                </select>
                <div className="select-arrow"></div>
                <div className="select-arrow"></div>
              </div>
            </li>
          }

          {
            isShowSoftwareType &&
            <li className="practical-task__item">
              <h5 className="practical-task__item-name">Уточните тип МТО</h5>
              <div className="select-wrapper">
                <select           
                id="add-practical-task-mto-item-type-software"
                name="add-practical-task-mto-item-type-software"
                onChange={handleChangeSoftwareType}
                defaultValue={softwareType}
                required   
                >
                  <option value="placeholder" disabled hidden>Уточните тип МТО</option>
                  <option value="15">Офисное</option>
                  <option value="16">Специализированное</option>
                </select>
                <div className="select-arrow"></div>
                <div className="select-arrow"></div>
              </div>
            </li>
          }


          {
            isShowFields &&
            <>
            <li className="practical-task__item">
              <h5 className="practical-task__item-name">Наименование МТО</h5>
              <input 
              className="practical-task__input"
              placeholder="введите наименование МТО"
              type="text"
              id="task-mto-name"
              name="task-mto-name"
              autoComplete="off"
              spellCheck="true"
              value={name}
              onChange={handleChangeName}
              required
              >
              </input>
              <span className={`initial-popup__input-error ${nameError ? "initial-popup__input-error_type_show" : ""}`}>Заполните наименование МТО</span>
            </li>
            <li className="practical-task__item">
              <h5 className="practical-task__item-name">Единица измерения МТО</h5>
              <input 
              className="practical-task__input"
              placeholder="введите единицу измерения МТО"
              type="text"
              id="task-mto-unit"
              name="task-mto-unit"
              autoComplete="off"
              spellCheck="true"
              value={unit}
              onChange={handleChangeUnit}
              required
              >
              </input>
              <span className={`initial-popup__input-error ${unitError ? "initial-popup__input-error_type_show" : ""}`}>Заполните единицу измерения МТО</span>
            </li>

            <li className="practical-task__item">
              <h5 className="practical-task__item-name">Заполните количество МТО</h5>
              <input 
              className="practical-task__item-input"
              placeholder="введите количество МТО"
              type="number"
              id="task-mto-count"
              name="task-mto-count"
              autoComplete="off"
              pattern="[0-9]*"
              value={count}
              onChange={handleChangeCount}
              required
              onWheel={(e) => e.target.blur()}
              >
              </input>
              <span className={`initial-popup__input-error ${countError ? "initial-popup__input-error_type_show" : ""}`}>Заполните количество МТО</span>
            </li>
            <li className="practical-task__item">
              <h5 className="practical-task__item-name">Примечание</h5>
              <textarea 
              className="practical-task__textarea" 
              id="task-mto-note"
              name="task-mto-note"
              placeholder="введите примечание"
              defaultValue={note}
              onChange={handleNote}
              spellCheck="true"
              required
            >
            </textarea>
            </li>
            </>
          }
          
        </ul>
        <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoadingRequest ? "btn_type_loading" : ""}`} type="submit">{isLoadingRequest ? "Сохранение.." : "Сохранить"}</button>

      </form>
    </Popup>
  )
}

export default TechnicalProvisionTaskPopup;