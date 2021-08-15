import React from 'react';
import './InitialData.css';
import * as api from '../../../../utils/api.js';
import Preloader from '../../../Preloader/Preloader.js';
import ReferenceInformation from './ReferenceInformation/ReferenceInformation.js';
import prof from '../../../../images/profession.png';
import qual from '../../../../images/qualification.png';
import fgos from '../../../../images/fgos.png';
import useOnPushEsc from '../../../../hooks/useOnPushEsc';
import useOnClickOverlay from '../../../../hooks/useOnClickOverlay.js';
import ProfStandartPopup from '../../../Popup/ProfStandartPopup/ProfStandartPopup.js';
import RequirementQualificationsPopup from '../../../Popup/RequirementQualificationsPopup/RequirementQualificationsPopup.js';
import RequirementFgosPopup from '../../../Popup/RequirementFgosPopup/RequirementFgosPopup.js';
import TypicalStructure from './TypicalStructure/TypicalStructure.js';
import EditPartPopup from '../../../Popup/EditPartPopup/EditPartPopup.js';
import RemovePartPopup from '../../../Popup/RemovePartPopup/RemovePartPopup.js';
import ChoosePartsPopup from '../../../Popup/ChoosePartsPopup/ChoosePartsPopup.js';
import AccordionChooseNewDocumentType from '../../../Accordion/AccordionChooseNewDocumentType/AccordionChooseNewDocumentType.js';

function InitialData({ loggedIn, history, dppDescription }) {

  const [isRendering, setIsRendering] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const [initialData, setInitialData] = React.useState({});
  const [profLevels, setProfLevels] = React.useState([]);
  const [selectedProfLevels, setSelectedProfLevels] = React.useState([]);
  
  const [profStandarts, setProfStandarts] = React.useState([]);
  const [profStandartsProgram, setProfStandartsProgram] = React.useState([]);
  const [isProfStandartPopupOpen, setIsProfStandartPopupOpen] = React.useState(false);

  const [requirementQualifications, setRequirementQualifications] = React.useState([]);
  const [requirementQualificationProgram, setRequirementQualificationProgram] = React.useState([]);
  const [isRequirementQualificationsPopupOpen, setIsRequirementQualificationsPopupOpen] = React.useState(false);

  const [requirementFgos, setRequirementFgos] = React.useState([]);
  const [requirementFgosProgram, setRequirementFgosProgram] = React.useState([]);
  const [isRequirementFgosPopupOpen, setIsRequirementFgosPopupOpen] = React.useState(false);
  
  const [newCompetence, setNewCompetence] = React.useState();
  const [userQualification, setUserQualification] = React.useState('');
  const [typologies, setTypologies] = React.useState([]);
  const [typologiesParts, setTypologiesParts] = React.useState([]);
  const [requestMessage, setRequestMessage] = React.useState({ text: '', isShow: false, type: '' });

  const [isOpenEditPartPopup, setIsOpenEditPartPopup] = React.useState(false);
  const [isOpenRemovePartPopup, setIsOpenRemovePartPopup] = React.useState(false);
  const [isOpenChoosePartsPopup, setIsOpenChoosePartsPopup] = React.useState(false);
  const [currentPart, setCurrentPart] = React.useState({ name: "", })
  const [currentPartIndex, setCurrentPartIndex] = React.useState(0);

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

  function handleChangeNewCompetence(e) {
    if (e.target.id === "1") {
      setNewCompetence(1);
    } else {
      setNewCompetence(0);
    }
    setRequestMessage({ text: '', isShow: false, type: '',});
  }

  function handleSelectProfStandart(profStandart) {
    const profStandartId = profStandart.map(elem => elem.id);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.updateInitialData({ 
        token: token, 
        dppId: dppDescription.id, 
        initialDataVersion: dppDescription.ish_version_id, 
        data: profStandartId
      })
      .then((res) => {
        setProfStandartsProgram(res);
        closeInitialDataPopups();
      })
      .catch((err) =>{
        console.log(err);
      })
    }
  }

  function handleSelectRequirementQualification(requirementQualification) {
    console.log(requirementQualification);
  }

  function handleSelectRequirementFgos(requirementFgos) {
    console.log(requirementFgos);
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const updateInitialData = {
      ...initialData, 
      req_user_kval: userQualification, 
      prof_levels: selectedProfLevels,
      pl: Array.from(selectedProfLevels, level => level.id),
      make_new_competence: newCompetence,
      //typology: currentTypologiesId,
    }
    if (loggedIn) {
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

  function closeInitialDataPopups() {
    setIsProfStandartPopupOpen(false);
    setIsRequirementQualificationsPopupOpen(false);
    setIsRequirementFgosPopupOpen(false);
    setIsOpenEditPartPopup(false);
    setIsOpenRemovePartPopup(false);
    setIsOpenChoosePartsPopup(false);
  }

  function closeOverlayPopups() {
    setIsOpenEditPartPopup(false);
    setIsOpenRemovePartPopup(false);
    setIsOpenChoosePartsPopup(false);
  }

  function profStandartPopupOpen() {
    setIsLoading(true);
    closeInitialDataPopups();
    setIsProfStandartPopupOpen(true);
    const token = localStorage.getItem("token");
    api.getProfStandarts({ token: token })
    .then((res) => {
      setProfStandarts(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function requirementQualificationsPopupOpen() {
    closeInitialDataPopups();
    setIsRequirementQualificationsPopupOpen(true);
  }

  function requirementFgosPopupOpen() {
    closeInitialDataPopups();
    setIsRequirementFgosPopupOpen(true);
  }

  function openEditPartPopup(part, index) {
    closeInitialDataPopups();
    setIsOpenEditPartPopup(true);
    setCurrentPart(part);
    setCurrentPartIndex(index);
  }

  function openRemovePartPopup(part) {
    closeInitialDataPopups();
    setIsOpenRemovePartPopup(true);
    setCurrentPart(part);
  }

  function openChoosePartsPopup() {
    closeInitialDataPopups();
    setIsOpenChoosePartsPopup(true);
  }

  function changeTypologyParts(newTypology) {
    closeInitialDataPopups();
    setTypologiesParts(newTypology.typology_parts);
  }
  
  function removeTypologyParts(id) {
    const newParts = typologiesParts.filter(part => part.id !== id);
    setTypologiesParts(newParts);
    closeInitialDataPopups();
  }

  function editTypologyParts(newPart, partIndex) {
    setTypologiesParts([...typologiesParts.slice(0, partIndex), newPart, ...typologiesParts.slice(partIndex + 1)]);
    closeInitialDataPopups();
  }

  function handleAddNewDocument(type) {
    switch (type) {
      case "fgos":
        requirementFgosPopupOpen();
        break;
      case "profstandart":
        profStandartPopupOpen();
        break;
      case "etkc":
        
        break;
        case "ekc":
        
          break;
        case "worldskills":
        
          break;
      default:
        alert( "Нет таких значений" );
    }
  }

  useOnClickOverlay(closeOverlayPopups);
  useOnPushEsc(closeOverlayPopups);

  React.useEffect(() => {
    if (loggedIn) {
        const token = localStorage.getItem("token");
        Promise.all([
          api.getProfLevels({ token: token }), 
          api.getInitialData({ token: token, dppId: dppDescription.id, initialDataVersion: dppDescription.ish_version_id, })
        ])
        .then(([ profLevels, initialData ]) => {
          console.log(initialData);
          setProfLevels(profLevels);
          setInitialData(initialData);
          setProfStandartsProgram(initialData.prof_standarts);
          setRequirementQualifications(initialData.dolg_kvals);
          setRequirementQualificationProgram(initialData.dolg_kvals);
          setRequirementFgos(initialData.fgoses);
          setRequirementFgosProgram(initialData.fgoses);
          setUserQualification(initialData.req_user_kval);
          setNewCompetence(initialData.make_new_competence);
          setSelectedProfLevels(initialData.prof_levels);
          setTypologies(initialData.typologies);
          setTypologiesParts(initialData.typology_parts);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setIsRendering(false));
    }
    return () => {
      setProfLevels([]);
      setInitialData({});
      setProfStandartsProgram([]);
      setRequirementQualifications([]);
      setRequirementQualificationProgram([]);
      setRequirementFgos([]);
      setRequirementFgosProgram([]);
      setUserQualification("");
      setNewCompetence(0);
      setSelectedProfLevels([]);
      setTypologies([]);
      setTypologiesParts([]);
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
            <AccordionChooseNewDocumentType 
            onChoose={handleAddNewDocument}
            />
            <h5 className="initial-data__item-title">Требования к квалификации установлены на основе:</h5>

            {/*<ul className="initial-data__basis-list">
              <li className="initial-data__basis-item">
                <img className="initial-data__basis-img" src={prof} alt="prof"></img>
                <h4 className="initial-data__basis-name">{`Профессиональные стандарты (${profStandartsProgram.length})`}</h4>
                <button className="btn_type_basis" type="button">Выбрать</button>
                <ul className="initial-data__basis-el-list">
                  {
                    profStandartsProgram.map((elem, i) => (
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
            </ul>*/}
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
                    <span>{level.text}</span>
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
            <p className="initial-data__item-subtitle initial-data__item-subtitle_type_structure">Выберите наиболее подходящую типовую структуру ДПП или создайте свою. Типовая структура состоит из разделов, которых следует придерживаться во время разработки ДПП.</p>
            <TypicalStructure 
              typologyParts={typologiesParts}
              onEdit={openEditPartPopup}
              onRemove={openRemovePartPopup}
              onChoose={openChoosePartsPopup}
            />
          </li>

          <li className="initial-data__item initial-data__item_type_info">
            <h3 className="initial-data__item-name">Нормативно-справочная информация</h3>
            <p className="initial-data__item-subtitle initial-data__item-subtitle_type_info">Добавьте названия источников НСИ, которые будут использованы в ДПП. Вы также сможете дополнить данный список на последующих этапах разработки ДПП.</p>
            <ReferenceInformation />
          </li>

        </ul>

        <div className="initial-data__buttons">
          <button className="btn btn_type_save" type="submit">Сохранить данные</button>
          <button className="btn btn_type_next" type="button" onClick={() => history.push("/main/development/dpp/zoon")}>Перейти к следующему этапу</button>
          <span className={`request-message ${requestMessage.isShow ? "request-message_type_show" : "request-message_type_hide"} ${requestMessage.type === 'error' ? "request-message_type_error" : "request-message_type_success"}`}>{requestMessage.text}</span>
        </div>

      </form>

      <ProfStandartPopup
        isOpen={isProfStandartPopupOpen}
        onClose={closeInitialDataPopups}
        isLoading={isLoading}
        profStandarts={profStandarts}
        profStandartsProgram={profStandartsProgram}
        onSave={handleSelectProfStandart}
      />

      <RequirementQualificationsPopup
        isOpen={isRequirementQualificationsPopupOpen}
        onClose={closeInitialDataPopups}
        isLoading={isLoading}
        requirementQualifications={requirementQualifications}
        requirementQualificationProgram={requirementQualificationProgram}
        onSave={handleSelectRequirementQualification}
      />

      <RequirementFgosPopup
        isOpen={isRequirementFgosPopupOpen}
        onClose={closeInitialDataPopups}
        isLoading={isLoading}
        requirementFgos={requirementFgos}
        requirementFgosProgram={requirementFgosProgram}
        onSave={handleSelectRequirementFgos}
      />

      <EditPartPopup 
        isOpen={isOpenEditPartPopup}
        onClose={closeInitialDataPopups}
        part={currentPart}
        partIndex={currentPartIndex}
        onEdit={editTypologyParts}
      />

      <RemovePartPopup
        isOpen={isOpenRemovePartPopup}
        onClose={closeInitialDataPopups}  
        part={currentPart}
        onRemove={removeTypologyParts}
      />

      <ChoosePartsPopup
        isOpen={isOpenChoosePartsPopup}
        onClose={closeInitialDataPopups}  
        typologies={typologies}
        onChangeTypologyParts={changeTypologyParts}
      />


    </section>
  );
}

export default InitialData;