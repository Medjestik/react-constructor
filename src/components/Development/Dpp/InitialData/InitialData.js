import React from 'react';
import './InitialData.css';
import * as api from '../../../../utils/api.js';
import Preloader from '../../../Preloader/Preloader.js';
import ReferenceInformation from './ReferenceInformation/ReferenceInformation.js';
import prof from '../../../../images/profession.png';
import qual from '../../../../images/qualification.png';
import fgos from '../../../../images/fgos.png';

function InitialData({ loggedIn, history, dppDescription }) {

  const [isRendering, setIsRendering] = React.useState(true);
  const [profLevels, setProfLevels] = React.useState([]);
  const [initialData, setInitialData] = React.useState({});
  const [profStandarts, setProfStandarts] = React.useState([]);
  const [requirementQualifications, setRequirementQualifications] = React.useState([]);
  const [requirementFgos, setRequirementFgos] = React.useState([]);
  const [selectedProfLevels, setSelectedProfLevels] = React.useState([]);
  const [newCompetence, setNewCompetence] = React.useState();
  const [userQualification, setUserQualification] = React.useState('');
  const [typologies, setTypologies] = React.useState([]);
  const [currentTypologiesId, setCurrentTypologiesId] = React.useState();
  const [requestMessage, setRequestMessage] = React.useState({ text: '', isShow: false, type: '' });

  console.log(initialData);

  function handleChangeProfLevels(id) {
    const newLevels = selectedProfLevels;
    if (newLevels.some(elem => elem.id === id)) {
      const index = newLevels.findIndex(elem => elem.id === id);
      newLevels.splice(index, 1);
    } else {
      newLevels.push(profLevels[id - 1])
    }
    setSelectedProfLevels(newLevels);
    setRequestMessage({ text: '', isShow: false, type: '',});
  }

  function handleChangeUserQualification(e) {
    setUserQualification(e.target.value);
    setRequestMessage({ text: '', isShow: false, type: '',});
  }

  function handleChangeTypology(id) {
    setCurrentTypologiesId(id);
    setRequestMessage({ text: '', isShow: false, type: '',});
  }

  function handleChangeNewCompetence(e) {
    if (e.target.id === "1") {
      setNewCompetence(1);
    } else {
      setNewCompetence(0);
    }
    setRequestMessage({ text: '', isShow: false, type: '',});
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const updateInitialData = {
      ...initialData, 
      req_user_kval: userQualification, 
      prof_levels: selectedProfLevels,
      pl: Array.from(selectedProfLevels, x => x.id),
      make_new_competence: newCompetence,
      typology: currentTypologiesId,
    }
    if (loggedIn) {
      console.log(selectedProfLevels);
      api.updateInitialData({ 
        token: token, 
        dppId: dppDescription.id, 
        initialDataVersion: dppDescription.ish_version_id, 
        ish_data: updateInitialData 
      })
      .then((res) => {
        setRequestMessage({ 
          text: 'Данные успешно сохранены!',
          isShow: true,
          type: 'success',
        })
        setInitialData(res);
      })
      .catch((err) => {
        setRequestMessage({ 
          text: 'К сожалению произошла ошибка, ваши данные не сохранены!',
          isShow: true,
          type: 'error',
        })
        console.log(err);
      })
    }
  }

  React.useEffect(() => {
    if (loggedIn) {
        const token = localStorage.getItem("token");
        Promise.all([
          api.getProfLevels({ token: token }), 
          api.getInitialData({ token: token, dppId: dppDescription.id, initialDataVersion: dppDescription.ish_version_id, })
        ])
        .then(([ profLevels, initialData ]) => {
          setProfLevels(profLevels);
          setInitialData(initialData);
          setProfStandarts(initialData.prof_standarts);
          setRequirementQualifications(initialData.dolg_kvals);
          setRequirementFgos(initialData.fgoses);
          setUserQualification(initialData.req_user_kval);
          setNewCompetence(initialData.make_new_competence);
          setSelectedProfLevels(initialData.prof_levels);
          setTypologies(initialData.typologies);
          setCurrentTypologiesId(initialData.typology)
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setIsRendering(false));
    }
  }, [loggedIn, dppDescription]);
  
  return (
    isRendering 
    ?
    <Preloader />
    :
    <section className="initial-data">
      <form onSubmit={handleSubmitForm} name="initial-data" action="#" noValidate>

        <h1 className="main__title">Ввод исходных данных</h1>
        <p className="main__subtitle">Заполните предолженные поля форм. Для сохранения данных, нажмите кнопку "Сохранить данные". Для перехода к следующему этапу нажмите кнопку "Перейти к следующему этапу".</p>

        <ul className="initial-data__list">

          <li className="initial-data__item initial-data__item_type_basis">
            <h3 className="initial-data__item-name">Нормативные правовые основания разработки</h3>
            <p className="initial-data__item-subtitle initial-data__item-subtitle_type_basis">Выберите нормативные документы, на основе которых разрабатывается ДПП.</p>
            <ul className="initial-data__basis-list">
              <li className="initial-data__basis-item">
                <img className="initial-data__basis-img" src={prof} alt="prof"></img>
                <h4 className="initial-data__basis-name">{`Профессиональные стандарты (${profStandarts.length})`}</h4>
                <button className="btn_type_basis" type="button">Выбрать</button>
                <ul className="initial-data__basis-el-list">
                  {
                    profStandarts.map((elem, i) => (
                      <li className="initial-data__basis-el" key={i}>
                        <span className="initial-data__basis-el-code">{elem.code}</span>
                        <p className="initial-data__basis-el-name">{elem.name}</p>
                      </li>
                    ))
                  }
                </ul>
              </li>
              <li className="initial-data__basis-item">
                <img className="initial-data__basis-img" src={qual} alt="qual"></img>
                <h4 className="initial-data__basis-name">{`Квалификационные требования (${requirementQualifications.length})`}</h4>
                <button className="btn_type_basis" type="button">Выбрать</button>
                <ul className="initial-data__basis-el-list">
                  {
                    requirementQualifications.map((elem, i) => (
                      <li className="initial-data__basis-el" key={i}>
                        <span className="initial-data__basis-el-code">{`№ ${i + 1}`}</span>
                        <p className="initial-data__basis-el-name">{elem.name}</p>
                      </li>
                    ))
                  }
                </ul>
              </li>
              <li className="initial-data__basis-item">
                <img className="initial-data__basis-img" src={fgos} alt="fgos"></img>
                <h4 className="initial-data__basis-name">{`Требования ФГОС (${requirementFgos.length})`}</h4>
                <button className="btn_type_basis" type="button">Выбрать</button>
                <ul className="initial-data__basis-el-list">
                  {
                    requirementFgos.map((elem, i) => (
                      <li className="initial-data__basis-el" key={i}>
                        <span className="initial-data__basis-el-code">{elem.code}</span>
                        <p className="initial-data__basis-el-name">{elem.name}</p>
                      </li>
                    ))
                  }
                </ul>
              </li>
            </ul>
          </li>

          <li className="initial-data__item initial-data__item_type_requirements">
            <h3 className="initial-data__item-name">Требования к обучающимся</h3>
            <h5 className="initial-data__item-title">Требования к уровню профессионального образования</h5>
            <ul className="initial-data__item-requirements-list">
              {
                profLevels.map((level) => (
                <li key={level.id} className="initial-data__item-requirements-item">
                  <label className="checkbox">
                  <input 
                    name="prof-levels"
                    type="checkbox"
                    id={level.id}
                    value={level.id}
                    defaultChecked={selectedProfLevels.some(elem => elem.id === level.id)}
                    onChange={() => handleChangeProfLevels(level.id)}
                    >
                  </input>
                    <span className="test">{level.text}</span>
                  </label>
                </li>
                ))
              }
            </ul>
            <h5 className="initial-data__item-title">Требования к квалификации</h5>
            <textarea 
              className="initial-data__item-qualification-text" 
              name="qualification-text" 
              placeholder="Опишите требования к квалификации обучающегося"
              defaultValue={userQualification}
              onChange={handleChangeUserQualification}
            >
            </textarea>
          </li>

          <li className="initial-data__item initial-data__item_type_target">
            <h3 className="initial-data__item-name">Цель и задачи освоения</h3>
            <p className="initial-data__item-subtitle">Укажите, формирует ли ДПП новую компетенцию или совершенствует имеющуюся. Цель и задачи ДПП.</p>
            <h5 className="initial-data__item-title">Цель освоения</h5>
            <p className="initial-data__item-subtitle">Целью освоения программы являются совершенствование и (или) получение новой компетенции, необходимой для профессиональной деятельности, и (или) повышение профессионального уровня в рамках имеющейся квалификации в области профессиональной деятельности.</p>
            <h5 className="initial-data__item-title">Задачи освоения</h5>
            <ul className="initial-data__item-target-tasks">
              <li className="initial-data__item-target-task target-task_type_first">приобретение обучающимися знаний, умений и навыков в соответствии с учебным планом и календарным графиком учебного процесса</li>
              <li className="initial-data__item-target-task target-task_type_second">оценка достижений обучающимися планируемых результатов обучения</li>
            </ul>
            <h5 className="initial-data__item-title">Планируемые результаты освоения</h5>
            <p className="initial-data__item-subtitle">Программа направлена на:</p>
            <ul className="initial-data__item-target-list">
              <li className="initial-data__item-target-item">
                <label className="radio">
                  <input 
                    className="radio"
                    name="developingResult"
                    type="radio"
                    id="1"
                    defaultChecked={newCompetence === 1 ? true : false}
                    onChange={handleChangeNewCompetence}
                  >
                  </input>
                  <span>Получение у обучающихся новой компетенции, необходимой для профессиональной деятельности</span>
                </label>
              </li>
              <li className="initial-data__item-target-item">
                <label className="radio">
                  <input 
                    className="radio"
                    name="developingResult"
                    type="radio"
                    id="0"
                    defaultChecked={newCompetence === 0 ? true : false}
                    onChange={handleChangeNewCompetence}
                  >
                  </input>
                  <span>Совершенствование компетенции, необходимой для профессиональной деятельности и (или) повышение профессионального уровня в рамках имеющейся квалификации</span>
                </label>
              </li>
            </ul>
          </li>

          <li className="initial-data__item initial-data__item_type_structure">
            <h3 className="initial-data__item-name">Типовая структура ДПП</h3>
            <p className="initial-data__item-subtitle">Выберите наиболее подходящую типовую структуру ДПП. Типовая структура состоит из разделов, которых следует придерживаться во время разработки ДПП.</p>
            <h5 className="initial-data__item-title">Виды типовых структур</h5>
            <ul className="initial-data__item-target-list">
            {
              typologies.map((elem) => (
                <li className="initial-data__item-target-item" key={elem.id}>
                  <label className="radio">
                    <input 
                    className="radio" 
                    id={`typologies ${elem.id}`} 
                    name="typologies" 
                    type="radio" 
                    value={elem.name} 
                    defaultChecked={elem.id === currentTypologiesId ? true : false}
                    onChange={() => handleChangeTypology(elem.id)}
                    >
                    </input>
                    <span>{elem.name}</span>
                  </label>
                </li>
              ))
            }
            </ul>
          </li>

          <li className="initial-data__item initial-data__item_type_info">
            <h3 className="initial-data__item-name">Нормативно-справочная информация</h3>
            <ReferenceInformation />
          </li>

        </ul>

        <div className="initial-data__buttons">
          <button className="btn btn_type_save" type="submit">Сохранить данные</button>
          <button className="btn btn_type_next" type="button" onClick={() => history.push("/main/development/dpp/zoon")}>Перейти к следующему этапу</button>
          <span className={`request-message ${requestMessage.isShow ? "request-message_type_show" : "request-message_type_hide"} ${requestMessage.type === 'error' ? "request-message_type_error" : "request-message_type_success"}`}>{requestMessage.text}</span>
        </div>

      </form>
    </section>
  );
}

export default InitialData;