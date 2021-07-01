import React from 'react';
import './JustificationPopup.css';
import tehn from '../../../../../images/nsi/tehn.png';

const source = [
  {
    name: "Учебник",
    type: "textbook",
  },
  {
    name: "Нормативка",
    type: "technical",
  },
  {
    name: "Интернет",
    type: "internet",
  },
  {
    name: "Электронная библиотека Электронная библиотека Электронная библиотека Электронная библиотека Электронная библиотека Электронная библиотека Электронная библиотека Электронная библиотека Электронная библиотека Электронная библиотека",
    type: "library",
  },
  {
    name: "Акты",
    type: "act",
  },
  {
    name: "Отраслевые документы",
    type: "document",
  },
]


function JustificationPopup() {

  const [isJustificationType, setIsJustificationType] = React.useState("");
  const [isExpertOpinion, setIsExpertOpinion] = React.useState("")

  function handleJustificationType(e) {
    setIsJustificationType(e.target.id);
  }

  function handleChangeExpertOpinion(e) {
    setIsExpertOpinion(e.target.value);
  }




  function defineJustification(type) {
    switch(type) {
      case 'nsi':
        return (
          <>
          <h5 className="popup__title add-node__title">Источники НСИ</h5>
          <p className="popup__subtitle add-node__subtitle">Соотнесите элемент с источниками НСИ</p>
          <button className="btn btn_type_add justification__btn_type_add" type="button">Добавить новый источник</button>
          <ul className="justification__source-list">
            {
              source.map((item, i) => (
                <li className="justification__source-item" key={i}>
                  <label className="checkbox justification__checkbox">
                    <input 
                      name="justification"
                      type="checkbox"
                      id={i}
                      defaultChecked={false}
                    >
                    </input>
                    <span></span>
                  </label>
                  <p className="justification__source-name">{item.name}</p>
                  <img className="justification__source-icon" src={tehn} alt="source-icon"></img>
                </li>
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

export default JustificationPopup;