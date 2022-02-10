import React from 'react';
import './Justification.css';
import JustificationItem from '../JustificationItem/JustificationItem.js';

function Justification({ nsi, type, onChooseJustificationType, onChangeExpertOpinion, onChangeNsiNote, onChooseNsi, onSwapType, addNsiPopupOpen, onEditNsi, onRemoveNsi, currentActionType, currentNode, isEditRights }) {

  console.log(nsi);

  const [isJustificationType, setIsJustificationType] = React.useState("");
  const [isExpertOpinion, setIsExpertOpinion] = React.useState("");
  const [isNsiNote, setIsNsiNote] = React.useState("");
  const [searchName, setSearchName] = React.useState('');
  const [filteredNsi, setFilteredNsi] = React.useState([]);
 
  function handleJustificationType(e) {
    onSwapType();
    setIsJustificationType(e.target.id);
    if (e.target.id === "nsi") {
      onChooseJustificationType(0);
    } else {
      onChooseJustificationType(1);
    }
  }

  function handleChangeExpertOpinion(e) {
    setIsExpertOpinion(e.target.value);
    onChangeExpertOpinion(e.target.value);
  }

  function handleChangeNsiNote(e) {
    setIsNsiNote(e.target.value);
    onChangeNsiNote(e.target.value);
  }

  function handleSearchByName(e) {
    setSearchName(e.target.value);
  }


  function defineJustification(type) {
    switch(type) {
      case 'nsi':
        return (
          <>
          <h5 className="popup__title add-node__title">Источники НСИ</h5>
          <p className="popup__subtitle add-node__subtitle">Соотнесите элемент с источниками НСИ</p>
          {
            isEditRights &&
            <button className="btn btn_type_add justification__btn_type_add" type="button" onClick={addNsiPopupOpen}>Добавить новый источник</button>
          }
          <div className="search">
            <input
            className="input-search"
            placeholder="поиск по названию"
            type="text"
            id="search-nsi-input-name"
            name="search-nsi-input-name"
            autoComplete="off"
            value={searchName}
            onChange={handleSearchByName}
            >
            </input>
          </div>
          <ul className="justification-source__list">
            {
              filteredNsi.map((elem, i) => (
                <JustificationItem 
                elem={elem}
                i={i}
                key={i}
                onChooseNsi={onChooseNsi}
                onEditNsi={onEditNsi}
                onRemoveNsi={onRemoveNsi}
                currentActionType={currentActionType}
                currentNode={currentNode}
                isEditRights={isEditRights}
                />
              ))
            }
          </ul>
          <h5 className="popup__title add-node__title">Примечание для источников НСИ</h5>
          <textarea 
          className="justification__expert-opinion" 
          name="nsi-note" 
          placeholder="Введите примечание для источников НСИ"
          defaultValue={isNsiNote}
          onChange={handleChangeNsiNote}
          spellCheck="true"
          >
          </textarea>
          </>
        )
      case 'expert':
        return (
          <>
          <h5 className="popup__title add-node__title">Мнение эксперта</h5>
          <textarea 
          className="justification__expert-opinion" 
          name="expert-opinion" 
          placeholder="Введите комментарий, указав Ф.И.О. эксперта и его обоснование"
          defaultValue={isExpertOpinion}
          onChange={handleChangeExpertOpinion}
          >
          </textarea>
          </>
        )
      default: 
        return false;
    }
  }
    
  React.useEffect(() => {
    if ((currentActionType === "edit") && (currentNode.justificationType !== null)) {
      if (currentNode.justificationType === 0) {
        setIsJustificationType("nsi");
        setIsNsiNote(currentNode.note);
      } else {
        setIsJustificationType("expert");
      }
    } else {
      setIsJustificationType("");
    }
    setIsExpertOpinion(currentActionType === "edit" ? currentNode.expertOpinion || "" : "");
  }, [currentNode, currentActionType]);

  React.useEffect(() => {
    const isFilteredNsi = nsi.filter((item) => {
      return item.nsiFullName.toLowerCase().includes(searchName.toLowerCase());
    })
    setFilteredNsi(isFilteredNsi);
    return(() => {
      setFilteredNsi([]);
    })
  }, [nsi, searchName]);

  return (
    <div className="popup__justification">
      <h5 className="popup__title add-node__title">Обоснование</h5>
      <p className="popup__subtitle add-node__subtitle">Выберите на основе какой информации формируется {type || ""}</p>
      <ul className="justification-choose">
        <li key="nsi" className="justification-radio">
          <label className="radio">
          <input 
            name="justification"
            type="radio"
            id="nsi"
            defaultChecked={(currentActionType === "edit" && currentNode.justificationType === 0) ? true : false}
            onChange={handleJustificationType}
          >
          </input>
            <span>На основе источников НСИ</span>
          </label>
        </li>
        <li key="expert" className="justification-radio">
          <label className="radio">
          <input 
            name="justification"
            type="radio"
            id="expert"
            defaultChecked={(currentActionType === "edit" && currentNode.justificationType === 1) ? true : false}
            onChange={handleJustificationType}
          >
          </input>
            <span>На основе мнения эксперта</span>
          </label>
        </li>
      </ul>
      {defineJustification(isJustificationType)}

    </div>
  )
}

export default Justification;