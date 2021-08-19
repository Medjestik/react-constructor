import React from 'react';
import './Justification.css';
import JustificationItem from '../JustificationItem/JustificationItem.js';

function Justification({ openAddJustificationPopup, nsi, onChooseJustificationType, onChangeExpertOpinion, onChooseNsi,  onSwapType }) {

  const [isJustificationType, setIsJustificationType] = React.useState("");
  const [isExpertOpinion, setIsExpertOpinion] = React.useState("")
  

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
          <button className="btn btn_type_add justification__btn_type_add" type="button">Добавить новый источник</button>
          <ul className="justification-source__list">
            {
              nsi.map((elem, i) => (
                <JustificationItem 
                elem={elem}
                i={i}
                key={i}
                onChooseNsi={onChooseNsi}
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
    setIsJustificationType("");
    setIsExpertOpinion("");
  }, []);

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
            defaultChecked={false}
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
            defaultChecked={false}
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