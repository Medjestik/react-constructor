import React from 'react';
import './Justification.css';
import JustificationItem from '../JustificationItem/JustificationItem.js';

function Justification({ nsi, onChooseJustificationType, onChangeExpertOpinion, onChooseNsi, onSwapType, addNsiPopupOpen, onEditNsi, onRemoveNsi, currentActionType, currentNode, isEditRights }) {

  const [isJustificationType, setIsJustificationType] = React.useState("");
  const [isExpertOpinion, setIsExpertOpinion] = React.useState("");
 
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
          <ul className="justification-source__list">
            {
              nsi.map((elem, i) => (
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
      } else {
        setIsJustificationType("expert");
      }
    } else {
      setIsJustificationType("");
    }
    setIsExpertOpinion(currentActionType === "edit" ? currentNode.expertOpinion || "" : "");
  }, [currentNode, currentActionType]);

  return (
    <div className="popup__justification">
      <h5 className="popup__title add-node__title">Обоснование</h5>
      <p className="popup__subtitle add-node__subtitle">Выберите на основе какой информации формируется навык</p>
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