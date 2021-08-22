import React from 'react';
import InputMask from "react-input-mask";
import Popup from '../../Popup.js';
import './AddJobСlassificationPopup.css';

function AddJobСlassificationPopup({ isOpen, onClose, onAdd, printDate }) {

  const [addNameChapter, setAddNameChapter] = React.useState('');
  const [addNameChapterError, setAddNameChapterError] = React.useState(false);
  const [addNameProfession, setAddNameProfession] = React.useState('');
  const [addNameProfessionError, setAddNameProfessionError] = React.useState(false);
  const [addIssueNumber, setAddIssueNumber] = React.useState('');
  const [addIssueNumberError, setAddIssueNumberError] = React.useState(false);
  const [addRank, setAddRank] = React.useState('');
  const [addRankError, setAddRankError] = React.useState(false);

  const [addDocumentTypeSelect, setAddDocumentTypeSelect] = React.useState('');
  const [addDocumentType, setAddDocumentType] = React.useState('');

  const [addOrganTypeSelect, setAddOrganTypeSelect] = React.useState('');
  const [addOrganType, setAddOrganType] = React.useState('');

  const [addEditionNumber, setAddEditionNumber] = React.useState('');
  const [addEditionNumberError, setAddEditionNumberError] = React.useState(false);

  const [addEditionDate, setAddEditionDate] = React.useState('');
  const [addEditionDateError, setAddEditionDateError] = React.useState(false);

  const [addFullName, setAddFullName] = React.useState('');
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  const [isShowMoreFields, setIsShowMoreFields] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const newJobСlassification = {
     chapterName: addNameChapter,
     nameProfession: addNameProfession,
     issueNumber: addIssueNumber,
     editionDate: addEditionDate,
    }

    onAdd(newJobСlassification, onClose);
  }

  function handleAddNameChapter(e) {
    setAddNameChapter(e.target.value);
    if (e.target.checkValidity()) {
      setAddNameChapterError(false);
    } else {
      setAddNameChapterError(true);
    }
  }

  function handleAddNameProfession(e) {
    setAddNameProfession(e.target.value);
    if (e.target.checkValidity()) {
      setAddNameProfessionError(false);
    } else {
      setAddNameProfessionError(true);
    }
  }

  function handleAddIssueNumber(e) {
    setAddIssueNumber(e.target.value);
    if (e.target.checkValidity()) {
      setAddIssueNumberError(false);
    } else {
      setAddIssueNumberError(true);
    }
  }

  function handleAddRank(e) {
    setAddRank(e.target.value);
    if (e.target.value.indexOf("x") === -1) {
      if (e.target.value.length === 0) {
        setAddRankError(true);
      } else {
        setAddRankError(false);
      }
    } else {
      setAddRankError(true);
    }
  }

  function handleAddDocumentType(e) {
    setAddDocumentTypeSelect(e.target.value);
    switch (e.target.value) {
      case "decree":
        setAddDocumentType("Постановлением");
        setIsShowMoreFields(true);
        break;
      case "order":
        setAddDocumentType("Приказом");
        setIsShowMoreFields(true);
        break;
      case "null":
        setAddDocumentType("");
        setIsShowMoreFields(false);
        setAddEditionDate("");
        setAddEditionNumber("");
        setAddOrganType("");
        setAddOrganTypeSelect('placeholder');
        break;
      default:
        setAddDocumentType("");
    }
  }

  function handleAddOrganType(e) {
    setAddOrganTypeSelect(e.target.value);
    switch (e.target.value) {
      case "1":
        setAddOrganType("Госкомтруда СССР");
        break;
      case "2":
        setAddOrganType("Секретариата ВЦСПС");
        break;
      case "3":
        setAddOrganType("ВЦСПС");
        break;
      case "4":
        setAddOrganType("Минтруда РФ");
        break;
      case "5":
        setAddOrganType("Минздравсоцразвития РФ");
        break;
      case "6":
        setAddOrganType("Госкомтруда СССР");
        break;
      default:
        setAddOrganType("placeholder");
    }
  }

  function handleAddEditionNumber(e) {
    setAddEditionNumber(e.target.value);
    if (e.target.checkValidity()) {
      setAddEditionNumberError(false);
    } else {
      setAddEditionNumberError(true);
    }
  }


  function handleAddEditionDate(e) {
    setAddEditionDate(e.target.value);
    if (e.target.value.length !== 10) {
      setAddEditionDateError(true);
    } else {
      setAddEditionDateError(false);
    }
  }

  React.useEffect(() => {
    setAddNameChapter('');
    setAddNameProfession('');
    setAddIssueNumber('');
    setAddEditionNumber('');
    setAddRank('');
    setAddEditionDate('');
    setAddDocumentType('');
    setAddDocumentTypeSelect('placeholder');
    setAddOrganType('');
    setAddOrganTypeSelect('placeholder');
    setAddNameChapterError(false);
    setAddNameProfessionError(false);
    setAddIssueNumberError(false);
    setAddRankError(false);
    setAddEditionNumberError(false);
    setAddEditionDateError(false);
    setIsBlockSubmitButton(true);
    setIsShowMoreFields(false);
  }, [isOpen]);

  console.log()

  React.useEffect(() => {
    if (
      addNameChapterError || 
      addNameProfessionError || 
      addIssueNumberError || 
      addRankError ||
      addNameChapter.length < 1 ||
      addNameProfession.length < 1 ||
      addIssueNumber.length < 1 ||
      addRank.length < 1 ||
      addDocumentTypeSelect === "placeholder"
      ) {
      setIsBlockSubmitButton(true);
    } else {
      if (addDocumentTypeSelect !== "null") {
        if (addOrganType === "placeholder" || addEditionNumber.length < 1 || addEditionNumberError || addEditionDateError || addEditionDate.length < 10)
        {
          setIsBlockSubmitButton(true);
        } else {
          setIsBlockSubmitButton(false);
        }
      } else {
        setIsBlockSubmitButton(false);
      }
    }

    // eslint-disable-next-line
  }, [addNameChapter, addNameProfession, addIssueNumber, addRank, addEditionDate, addDocumentType, addOrganType, addEditionNumber, addDocumentTypeSelect, addOrganTypeSelect])

  React.useEffect(() => { 
    let chapter = addNameChapter.length > 0 ? addNameChapter : "<название раздела>";
    let job = addNameProfession.length > 0 ? addNameProfession : "<наименование профессии>";
    let issueNumber = addIssueNumber.length > 0 ? addIssueNumber : "xx";
    let rank = addRank.length > 0 ? addRank : "x";
    let documentType = addDocumentType !== "" ? " (утв. " + addDocumentType : " ";
    let organType;
    let editionNumber;
    let editionDate;
    if (addDocumentType === "") {
      organType = "";
      editionDate = "";
      editionNumber = "";
    } else {
      organType = addOrganType !== "placeholder" ? addOrganType : "<Название органа>";
      editionNumber = addEditionNumber > 0 ? " № " + addEditionNumber : " № xxxxx"
      editionDate = addEditionDate.length > 0 ? " от " + printDate(addEditionDate) : " от xx.xx.xxxx";
    }
     
    setAddFullName("Единый тарифно-квалификационный справочник работ и профессий рабочих. Выпуск " + issueNumber + documentType + " " + organType + editionDate + editionNumber + ". Раздел «" + chapter + "». Профессия « " + job + " (" + rank + "-й разряд)»");


    // eslint-disable-next-line
  }, [addNameChapter, addNameProfession, addIssueNumber, addRank, addEditionDate, addDocumentType, addOrganType, addEditionNumber])

  return(
    <Popup isOpen={isOpen} onClose={onClose} >
      <form className="popup__form popup__form_type_large" name="add-etks-popup-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="initial-popup__title">Добавление нового документа ЕТКС</h3>
        <ul className="initial-popup__list-input">
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Название раздела</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите название раздела"
            type="text"
            id="add-etks-input-name"
            name="add-etks-input-name"
            autoComplete="off"
            value={addNameChapter}
            onChange={handleAddNameChapter}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${addNameChapterError ? "initial-popup__input-error_type_show" : ""}`}>Заполните название раздела</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Наименование профессии</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите наименование профессии"
            type="text"
            id="add-etks-input-profession"
            name="add-etks-input-profession"
            autoComplete="off"
            value={addNameProfession}
            onChange={handleAddNameProfession}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${addNameProfessionError ? "initial-popup__input-error_type_show" : ""}`}>Заполните наименование профессии</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Разряд</h5>
            <InputMask  
            className="initial-popup__input"
            placeholder="введите разряд"
            type="text"
            id="add-etks-input-rank"
            name="add-etks-input-rank"
            autoComplete="off"
            value={addRank}
            onChange={handleAddRank}
            mask="9"
            maskPlaceholder="x"
            required
            >
            </InputMask>
            <span className={`initial-popup__input-error ${addRankError ? "initial-popup__input-error_type_show" : ""}`}>Заполните разряд</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Номер выпуска</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите номер выпуска"
            type="number"
            id="add-etks-input-number"
            name="add-etks-input-number"
            autoComplete="off"
            value={addIssueNumber}
            onChange={handleAddIssueNumber}
            required
            onWheel={(e) => e.target.blur()}
            >
            </input>
            <span className={`initial-popup__input-error ${addIssueNumberError ? "initial-popup__input-error_type_show" : ""}`}>Заполните номер выпуска</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Тип документа, утвердившего выпуск</h5>
            <div className="select-wrapper">
              <select           
              id="add-etks-input-document-type"
              name="add-etks-input-document-type"

              onChange={handleAddDocumentType}
              defaultValue="placeholder"
              required   
              >
                <option value="placeholder" disabled hidden>Выберите тип документа</option>
                <option value="decree">Постановление</option>
                <option value="order">Приказ</option>
                <option value="null">Документ отсутствует</option>
              </select>
              <div className="select-arrow"></div>
              <div className="select-arrow"></div>
            </div>
          </li>
        </ul>
        <ul className={`initial-popup__list-input ${isShowMoreFields ? "list-input_type_show" : "list-input_type_hide" }`}>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Орган, выпустивший документ</h5>
            <div className="select-wrapper">
              <select           
              id="add-etks-input-organ-type"
              name="add-etks-input-organ-type"

              onChange={handleAddOrganType}
              defaultValue="placeholder"
              required
              >
                <option value="placeholder" disabled hidden>Выберите орган, выпустивший документ</option>
                <option value="1">Госкомтруд СССР</option>
                <option value="2">Секретариат ВЦСПС</option>
                <option value="3">ВЦСПС</option>
                <option value="4">Минтруд РФ </option>
                <option value="5">Минздравсоцразвития РФ</option>
                <option value="6">утв. Госкомтрудом СССР</option>
              </select>
              <div className="select-arrow"></div>
              <div className="select-arrow"></div>
            </div>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Номер редакции</h5>
            <input 
            className="initial-popup__input"
            placeholder="введите номер редакции"
            type="text"
            id="add-etks-input-edition-number"
            name="add-etks-input-edition-number"
            autoComplete="off"
            value={addEditionNumber}
            onChange={handleAddEditionNumber}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${addEditionNumberError ? "initial-popup__input-error_type_show" : ""}`}>Заполните номер редакции</span>
          </li>
          <li className="initial-popup__item-input">
            <h5 className="initial-popup__input-name">Дата редакции</h5>
            <input  
            className="initial-popup__input"
            placeholder="введите дату редакции"
            type="date"
            id="add-etks-input-edition-date"
            name="add-etks-input-edition-date"
            autoComplete="off"
            value={addEditionDate}
            onChange={handleAddEditionDate}
            required
            >
            </input>
            <span className={`initial-popup__input-error ${addEditionDateError ? "initial-popup__input-error_type_show" : ""}`}>Заполните дату редакции</span>
          </li>
        </ul>

              
        <p className="initial-popup__result-name">
          <span className="initial-popup__result-name_weight_bold">Итоговое название: </span>
          {addFullName}
        </p>
       
        <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""}`} type="submit">Добавить</button>

      </form>
    </Popup>
  )
}

export default AddJobСlassificationPopup;