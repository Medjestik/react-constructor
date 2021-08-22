import React from 'react';
import './InitialData.css';
import * as api from '../../../../utils/api.js';
import Preloader from '../../../Preloader/Preloader.js';
import ReferenceInformation from './ReferenceInformation/ReferenceInformation.js';
import useOnPushEsc from '../../../../hooks/useOnPushEsc';
import useOnClickOverlay from '../../../../hooks/useOnClickOverlay.js';
import RequirementFgosPopup from '../../../Popup/RequirementFgosPopup/RequirementFgosPopup.js';
import ProfStandartPopup from '../../../Popup/ProfStandartPopup/ProfStandartPopup.js';
import JobСlassificationPopup from '../../../Popup/JobСlassificationPopup/JobСlassificationPopup.js';
import JobDirectoryPopup from '../../../Popup/JobDirectoryPopup/JobDirectoryPopup.js';
import WorldSkillsPopup from '../../../Popup/WorldSkillsPopup/WorldSkillsPopup.js';
import OrganizationRulesPopup from '../../../Popup/OrganizationRulesPopup/OrganizationRulesPopup.js';
import TypicalStructure from './TypicalStructure/TypicalStructure.js';
import EditPartPopup from '../../../Popup/EditPartPopup/EditPartPopup.js';
import RemovePartPopup from '../../../Popup/RemovePartPopup/RemovePartPopup.js';
import ChoosePartsPopup from '../../../Popup/ChoosePartsPopup/ChoosePartsPopup.js';
import AccordionChooseNewDocumentType from '../../../Accordion/AccordionChooseNewDocumentType/AccordionChooseNewDocumentType.js';
import NsiPopup from '../../../Popup/NsiPopup/NsiPopup.js';
import RemoveNsiPopup from '../../../Popup/RemoveNsiPopup/RemoveNsiPopup.js'

import fgosIcon from '../../../../images/documents/fgos.png';
import profstandartIcon from '../../../../images/documents/profstandart.png';
import etkcIcon from '../../../../images/documents/etkc.png';
import ekcIcon from '../../../../images/documents/ekc.png';
import worldskillsIcon from '../../../../images/documents/worldskills.png';

function InitialData({ loggedIn, history, dppDescription }) {

  const [isRendering, setIsRendering] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const [profLevels, setProfLevels] = React.useState([]);
  const [selectedProfLevels, setSelectedProfLevels] = React.useState([]);

  const [requirementFgos, setRequirementFgos] = React.useState([]);
  const [requirementFgosProgram, setRequirementFgosProgram] = React.useState([]);
  const [isRequirementFgosPopupOpen, setIsRequirementFgosPopupOpen] = React.useState(false);
  
  const [profStandarts, setProfStandarts] = React.useState([]);
  const [profStandartsProgram, setProfStandartsProgram] = React.useState([]);
  const [isProfStandartPopupOpen, setIsProfStandartPopupOpen] = React.useState(false);

  const [jobСlassification, setJobСlassification] = React.useState([]);
  const [jobСlassificationProgram, setJobСlassificationProgram] = React.useState([]);
  const [isJobСlassificationPopupOpen, setIsJobСlassificationPopupOpen] = React.useState(false);

  const [jobDirectory, setJobDirectory] = React.useState([]);
  const [jobDirectoryProgram, setJobDirectoryProgram] = React.useState([]);
  const [isJobDirectoryPopupOpen, setIsJobDirectoryPopupOpen] = React.useState(false);

  const [worldSkills, setWorldSkills] = React.useState([]);
  const [worldSkillsProgram, setWorldSkillsProgram] = React.useState([]);
  const [isWorldSkillsPopupOpen, setIsWorldSkillsPopupOpen] = React.useState(false);

  const [organizationRules, setOrganizationRules] = React.useState([]);
  const [organizationRulesProgram, setOrganizationRulesProgram] = React.useState([]);
  const [isOrganizationRulesPopupOpen, setIsOrganizationRulesPopupOpen] = React.useState(false);

  const [newCompetence, setNewCompetence] = React.useState();
  const [userQualification, setUserQualification] = React.useState('');
  const [typologies, setTypologies] = React.useState([]);
  const [typologiesParts, setTypologiesParts] = React.useState([]);
  const [requestMessageRequirements, setRequestMessageRequirements] = React.useState({ text: '', isShow: false, type: '' });
  const [requestMessageCompetence, setRequestMessageCompetence] = React.useState({ text: '', isShow: false, type: '' });

  const [isOpenEditPartPopup, setIsOpenEditPartPopup] = React.useState(false);
  const [isOpenRemovePartPopup, setIsOpenRemovePartPopup] = React.useState(false);
  const [isOpenChoosePartsPopup, setIsOpenChoosePartsPopup] = React.useState(false);
  const [currentPart, setCurrentPart] = React.useState({ name: "", })
  const [currentPartIndex, setCurrentPartIndex] = React.useState(0);

  const [isNsiPopupOpen, setIsNsiPopupOpen] = React.useState(false);
  const [nsiTypes, setNsiTypes] = React.useState([]);
  const [nsiProgram, setNsiProgram] = React.useState([]);
  const [isRemoveNsiPopupOpen, setIsRemoveNsiPopupOpen] = React.useState(false);
  const [currentNsiItem, setCurrentNsiItem] = React.useState({});

  function handleChangeProfLevels(id) {
    const newLevels = selectedProfLevels;
    if (newLevels.some(elem => elem.id === id)) {
      const index = newLevels.findIndex(elem => elem.id === id);
      newLevels.splice(index, 1);
    } else {
      newLevels.push(profLevels[id - 1])
    }
    setSelectedProfLevels(newLevels);
    setRequestMessageRequirements({ text: '', isShow: false, type: '',});
  }

  function handleChangeUserQualification(e) {
    setUserQualification(e.target.value);
    setRequestMessageRequirements({ text: '', isShow: false, type: '',});
  }

  function handleSaveRequirements() {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.saveRequirements({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id, 
        profLevels: selectedProfLevels,
        userQualification: userQualification
      })
      .then(() => {
        setRequestMessageRequirements({ 
          text: 'Данные успешно сохранены!',
          isShow: true,
          type: 'success',
        })
      })
      .catch((err) =>{
        setRequestMessageRequirements({ 
          text: 'К сожалению произошла ошибка, ваши данные не сохранены!',
          isShow: true,
          type: 'error',
        })
        console.log(err);
      })
    }
  }

  function handleChangeNewCompetence(e) {
    if (e.target.id === "1") {
      setNewCompetence(1);
    } else {
      setNewCompetence(0);
    }
    setRequestMessageCompetence({ text: '', isShow: false, type: '',});
  }

  function handleSaveNewCompetence() {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.saveCompetence({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id, 
        newCompetence: newCompetence,
      })
      .then(() => {
        setRequestMessageCompetence({ 
          text: 'Данные успешно сохранены!',
          isShow: true,
          type: 'success',
        })
      })
      .catch((err) =>{
        setRequestMessageCompetence({ 
          text: 'К сожалению произошла ошибка, ваши данные не сохранены!',
          isShow: true,
          type: 'error',
        })
        console.log(err);
      })
    }
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
        jobСlassificationPopupOpen();
        break;
      case "ekc":
        jobDirectoryPopupOpen();
        break;
      case "worldskills":
        worldSkillsPopupOpen();
        break;
      case "organization":
        organizationRulesPopupOpen();
        break;
      default:
        alert( "Нет таких значений" );
    }
  }

  function handleRemoveProgramDocument(id, type) {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.removeProgramDocument({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id, 
        id: id,
        type: type,
      })
      .then((res) => {
        switch (type) {
          case "fgos":
            setRequirementFgosProgram(res);
            break;
          case "prof":
            setProfStandartsProgram(res);
            break;
          case "etkc":
            setJobСlassificationProgram(res);
            break;
          case "ekc":
            setJobDirectoryProgram(res);
            break;
          case "ws":
            setWorldSkillsProgram(res);
            break;
          default:
            alert( "Нет таких значений" );
        }
        closeInitialDataPopups();
      })
      .catch((err) =>{
        console.log(err);
      })
    }
  }

  /* ФГОСы */

  function requirementFgosPopupOpen() {
    setIsLoading(true);
    closeInitialDataPopups();
    setIsRequirementFgosPopupOpen(true);
    const token = localStorage.getItem("token");
    api.getFgoses({ token: token })
    .then((res) => {
      setRequirementFgos(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleSelectFgoses(fgoses) {
    const fgosesId = fgoses.map(elem => elem.id);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.selectFgoses({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id, 
        data: fgosesId
      })
      .then((res) => {
        setRequirementFgosProgram(res);
        closeInitialDataPopups();
      })
      .catch((err) =>{
        console.log(err);
      })
    }
  }

  /* Профстандарты */

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

  function handleAddProfStandart(newDocument, closeAddPopup) {
    const token = localStorage.getItem("token");
    api.createProfStandarts({ token: token, document: newDocument })
    .then((res) => {
      closeAddPopup();
      setProfStandarts([...profStandarts, res]);
    })
    .catch((err) => {
      console.error(err);
    })
    //.finally(() => setIsLoading(false));
  }

  function handleSelectProfStandart(profStandart) {
    const profStandartId = profStandart.map(elem => elem.id);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.selectProfStandarts({ 
        token: token, 
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

  /* ЕТКС */

  function jobСlassificationPopupOpen() {
    setIsLoading(true);
    closeInitialDataPopups();
    setIsJobСlassificationPopupOpen(true);
    const token = localStorage.getItem("token");
    api.getJobClassification({ token: token })
    .then((res) => {
      setJobСlassification(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleAddJobСlassification(newDocument, closeAddPopup) {
    const token = localStorage.getItem("token");
    api.createJobClassification({ token: token, document: newDocument })
    .then((res) => {
      closeAddPopup();
      setJobСlassification([...jobСlassification, res]);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  function handleSelectJobСlassification(jobСlassification) {
    const jobСlassificationId = jobСlassification.map(elem => elem.id);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.selectJobClassification({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id, 
        data: jobСlassificationId
      })
      .then((res) => {
        setJobСlassificationProgram(res);
        closeInitialDataPopups();
      })
      .catch((err) =>{
        console.log(err);
      })
    }
  }

  /* ЕКС */

  function jobDirectoryPopupOpen() {
    setIsLoading(true);
    closeInitialDataPopups();
    setIsJobDirectoryPopupOpen(true);
    const token = localStorage.getItem("token");
    api.getDirectoryJob({ token: token })
    .then((res) => {
      setJobDirectory(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleAddJobDirectory(newDocument, closeAddPopup) {
    const token = localStorage.getItem("token");
    api.createDirectoryJob({ token: token, document: newDocument })
    .then((res) => {
      closeAddPopup();
      setJobDirectory([...jobDirectory, res]);
    })
    .catch((err) => {
      console.error(err);
    })
    //.finally(() => setIsLoading(false));
  }

  function handleSelectJobDirectory(jobDirectory) {
    const jobDirectoryId = jobDirectory.map(elem => elem.id);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.selectDirectoryJob({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id, 
        data: jobDirectoryId
      })
      .then((res) => {
        setJobDirectoryProgram(res);
        closeInitialDataPopups();
      })
      .catch((err) =>{
        console.log(err);
      })
    }
  }

  /* WorldSkills */

  function handleAddWorldSkills(newDocument, closeAddPopup) { 
    const token = localStorage.getItem("token");
    api.createWorldSkills({ token: token, document: newDocument })
    .then((res) => {
      closeAddPopup();
      setWorldSkills([...worldSkills, res]);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  function worldSkillsPopupOpen() {
    setIsLoading(true);
    closeInitialDataPopups();
    setIsWorldSkillsPopupOpen(true);
    const token = localStorage.getItem("token");
    api.getWorldSkills({ token: token })
    .then((res) => {
      setWorldSkills(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleSelectWorldSkills(worldSkills) {
    const worldSkillsId = worldSkills.map(elem => elem.id);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.selectWorldSkills({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id, 
        data: worldSkillsId
      })
      .then((res) => {
        setWorldSkillsProgram(res);
        closeInitialDataPopups();
      })
      .catch((err) =>{
        console.log(err);
      })
    }
  }

  /* Корпоративные требования */

  function organizationRulesPopupOpen() {
    setIsLoading(true);
    closeInitialDataPopups();
    setIsOrganizationRulesPopupOpen(true);
    const token = localStorage.getItem("token");
    api.getOrganizationRules({ token: token })
    .then((res) => {
      setOrganizationRules(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleAddOrganizationRules(newDocument, closeAddPopup) { 

    const token = localStorage.getItem("token");
    api.createOrganizationRules({ token: token, document: newDocument })
    .then((res) => {
      closeAddPopup();
      setOrganizationRules([...organizationRules, res]);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  function handleSelectOrganizationRules(organizationRules) {
    const organizationRulesId = organizationRules.map(elem => elem.id);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.selectOrganizationRules({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id, 
        data: organizationRulesId
      })
      .then((res) => {
        setOrganizationRulesProgram(res);
        closeInitialDataPopups();
      })
      .catch((err) =>{
        console.log(err);
      })
    }
  }


  /* Typology */

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
    const token = localStorage.getItem("token");
    setIsLoading(true);
    if (loggedIn) {
      api.chooseStructureParts({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id, 
        id: newTypology.id
      })
      .then((res) => {
        setTypologiesParts(res);
        closeInitialDataPopups();
      })
      .catch((err) =>{
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  }

  function changeTypologyPartsOrder(newOrder) {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.changeStructurePartsOrder({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id, 
        order: newOrder
      })
      .then(() => {

      })
      .catch((err) =>{
        console.log(err);
      })
    }
  }
  
  function removeTypologyParts(id) {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    if (loggedIn) {
      api.removeStructurePart({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id, 
        id: id
      })
      .then((res) => {
        const newParts = typologiesParts.filter(part => part.id !== res);
        setTypologiesParts(newParts);
        closeInitialDataPopups();
      })
      .catch((err) =>{
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
    }
  }

  function editTypologyParts(newPart, partIndex) {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.editStructurePart({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id, 
        id: newPart.id,
        name: newPart.name
      })
      .then((res) => {
        console.log(res);
        setTypologiesParts([...typologiesParts.slice(0, partIndex), res, ...typologiesParts.slice(partIndex + 1)]);
        closeInitialDataPopups();
      })
      .catch((err) =>{
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
    }
  }

  /* NSI */

  function openNsiPopup() {
    const token = localStorage.getItem("token");
    api.getNsiType({ token: token })
    .then((res) => {
      setNsiTypes(res);
      closeInitialDataPopups();
      setIsNsiPopupOpen(true);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleAddNsi(elem, closeAllNsiPopup) {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.createNsiElem({ 
        token: token, 
        initialDataVersion:dppDescription.ish_version_id, 
        elem: elem
      })
      .then((res) => {
        setNsiProgram([res, ...nsiProgram]);
        closeAllNsiPopup();
      })
      .catch((err) =>{
        console.log(err);
      })
  }
}

  function openRemoveNsiPopup(nsi) {
    setCurrentNsiItem(nsi);
    setIsRemoveNsiPopupOpen(true);
  }

  function handleRemoveNsi(id) {
    const token = localStorage.getItem("token");
    api.removeNsiElem({ 
      token: token, 
      initialDataVersion: dppDescription.ish_version_id, 
      id: id
    })
    .then((res) => {
      const newNsi = nsiProgram.filter(part => part.id !== res);
      setNsiProgram(newNsi);
      closeInitialDataPopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function closeInitialDataPopups() {
    setIsProfStandartPopupOpen(false);
    setIsJobСlassificationPopupOpen(false);
    setIsJobDirectoryPopupOpen(false);
    setIsWorldSkillsPopupOpen(false);
    setIsOrganizationRulesPopupOpen(false);
    setIsRequirementFgosPopupOpen(false);
    setIsOpenEditPartPopup(false);
    setIsOpenRemovePartPopup(false);
    setIsOpenChoosePartsPopup(false);
    setIsNsiPopupOpen(false);
    setIsRemoveNsiPopupOpen(false);
  }

  function closeOverlayPopups() {
    setIsOpenEditPartPopup(false);
    setIsOpenRemovePartPopup(false);
    setIsOpenChoosePartsPopup(false);
    setIsRemoveNsiPopupOpen(false);
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
          setProfStandartsProgram(initialData.prof_standarts);
          setJobСlassificationProgram(initialData.ektses);
          setJobDirectoryProgram(initialData.ekses);
          setWorldSkillsProgram(initialData.world_skills);
          setRequirementFgos(initialData.fgoses);
          setRequirementFgosProgram(initialData.fgoses);
          setUserQualification(initialData.req_user_kval);
          setNewCompetence(initialData.make_new_competence);
          setSelectedProfLevels(initialData.prof_levels);
          setTypologies(initialData.typologies);
          setTypologiesParts(initialData.typology_parts);
          setNsiProgram(initialData.nsis);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setIsRendering(false));
    }
    return () => {
      setProfLevels([]);
      setProfStandartsProgram([]);
      setJobСlassificationProgram([]);
      setJobDirectoryProgram([]);
      setWorldSkillsProgram([]);
      setRequirementFgos([]);
      setRequirementFgosProgram([]);
      setUserQualification("");
      setNewCompetence(0);
      setSelectedProfLevels([]);
      setTypologies([]);
      setTypologiesParts([]);
      setNsiProgram([]);
  }
  }, [loggedIn, dppDescription]);
  
  return (
    isRendering 
    ?
    <Preloader />
    :
    <section className="initial-data">
      <div>

        <h1 className="main__title">Ввод исходных данных</h1>
        <p className="main__subtitle">Заполните предолженные поля форм. Для сохранения данных, нажмите кнопку "Сохранить данные". Для перехода к следующему этапу нажмите кнопку "Перейти к следующему этапу".</p>

        <ul className="initial-data__list">

          <li className="initial-data__item initial-data__item_type_basis">
            <h3 className="initial-data__item-name">Нормативные правовые основания разработки</h3>
            <p className="initial-data__item-subtitle initial-data__item-subtitle_type_basis">Выберите нормативные документы, на основе которых разрабатывается ДПП.</p>
            <AccordionChooseNewDocumentType 
            onChoose={handleAddNewDocument}
            />

            {
              requirementFgosProgram.length > 0 || 
              profStandartsProgram.length > 0 ||
              jobСlassificationProgram.length > 0 ||
              jobDirectoryProgram.length > 0 ||
              worldSkillsProgram.length > 0 ?
              <h5 className="initial-data__item-title">Требования к квалификации установлены на основе:</h5>
              :
              <div></div>
            }
            
            <ul className="initial-data__documents-list">
              {
                requirementFgosProgram.map((elem, i) => (
                  <li className="initial-data__documents-item" key={`prof-${i}`}>
                    <img className="initial-data__documents-img" src={fgosIcon} alt="иконка фгос"></img>
                    <div className="initial-data__documents-info">
                      <div className="initial-data__documents-tags">
                        <span className="initial-data__documents-type">ФГОС</span>
                        <span className="initial-data__documents-code">{elem.code || "xx.xxx"}</span>
                        <button className="initial-data__documents-delete-btn" type="button" onClick={() => handleRemoveProgramDocument(elem.id, "fgos")}></button>
                      </div>
                      <h4 className="initial-data__documents-name">{elem.name || "название"}</h4>
                    </div>
                  </li>
                ))
              }
              {
                profStandartsProgram.map((elem, i) => (
                  <li className="initial-data__documents-item" key={`prof-${i}`}>
                    <img className="initial-data__documents-img" src={profstandartIcon} alt="иконка профстандарта"></img>
                    <div className="initial-data__documents-info">
                      <div className="initial-data__documents-tags">
                        <span className="initial-data__documents-type">Профстандарт</span>
                        <span className="initial-data__documents-code">{elem.nameCode || "xx.xxx"}</span>
                        <button className="initial-data__documents-delete-btn" type="button" onClick={() => handleRemoveProgramDocument(elem.id, "prof")}></button>
                      </div>
                      <h4 className="initial-data__documents-name">{elem.nameText || "название"}</h4>
                      <p className="initial-data__documents-order">{`приказ Минтруда России от ${elem.orderDate || "xx.xx.20xx"} г. № ${elem.orderNumber || "xxxx"}н (зарегистрирован Министерством юстиции Российской Федерации ${elem.registrationDate || "xx.xx.20xx"} г., регистрационный № ${elem.registrationNumber || "xxxxx"}`}</p>
                    </div>
                  </li>
                ))
              }
              {
                jobСlassificationProgram.map((elem, i) => (
                  <li className="initial-data__documents-item" key={`class-${i}`}>
                    <img className="initial-data__documents-img" src={etkcIcon} alt="иконка еткс"></img>
                    <div className="initial-data__documents-info">
                      <div className="initial-data__documents-tags">
                        <span className="initial-data__documents-type">ЕТКС</span>
                        <span className="initial-data__documents-code">{elem.nameProfession || "xx.xxx"}</span>
                        <button className="initial-data__documents-delete-btn" type="button" onClick={() => handleRemoveProgramDocument(elem.id, "etkc")}></button>
                      </div>
                      <h4 className="initial-data__documents-name">{elem.chapterName || "название"}</h4>
                      <p className="initial-data__documents-order">{`Выпуск № ${elem.issueNumber || "xx"}. Дата редакции ${elem.editionDate || "xx.xx.20xx"} г.`}</p>
                    </div>
                  </li>
                ))
              }
              {
                jobDirectoryProgram.map((elem, i) => (
                  <li className="initial-data__documents-item" key={`direct-${i}`}>
                    <img className="initial-data__documents-img" src={ekcIcon} alt="иконка екс"></img>
                    <div className="initial-data__documents-info">
                      <div className="initial-data__documents-tags">
                        <span className="initial-data__documents-type">ЕКС</span>
                        <span className="initial-data__documents-code">{elem.nameProfession || "xx.xxx"}</span>
                        <button className="initial-data__documents-delete-btn" type="button"onClick={() => handleRemoveProgramDocument(elem.id, "ekc")}></button>
                      </div>
                      <h4 className="initial-data__documents-name">{elem.chapterName || "название"}</h4>
                      <p className="initial-data__documents-order">{`Дата редакции ${elem.editionDate || "xx.xx.20xx"} г.`}</p>
                    </div>
                  </li>
                ))
              }
              {
                worldSkillsProgram.map((elem, i) => (
                  <li className="initial-data__documents-item" key={`world-${i}`}>
                    <img className="initial-data__documents-img" src={worldskillsIcon} alt="иконка worldskills"></img>
                    <div className="initial-data__documents-info">
                      <div className="initial-data__documents-tags">
                        <span className="initial-data__documents-type">WorldSkills</span>
                        <span className="initial-data__documents-code">{elem.code || "xxx"}</span>
                        <button className="initial-data__documents-delete-btn" type="button" onClick={() => handleRemoveProgramDocument(elem.id, "ws")}></button>
                      </div>
                      <h4 className="initial-data__documents-name">{elem.name || "название"}</h4>
                    </div>
                  </li>
                ))
              }
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
            <div className="initial-data__buttons initial-data__buttons_type_requirements">
              <button className="btn btn_type_save" type="button" onClick={handleSaveRequirements}>Сохранить данные</button>
              <span className={`initial-data__buttons-message ${requestMessageRequirements.isShow ? "initial-data__buttons-message_type_show" : "initial-data__buttons-message_type_hide"} ${requestMessageRequirements.type === 'error' ? "initial-data__buttons-message_type_error" : "initial-data__buttons-message_type_success"}`}>{requestMessageRequirements.text}</span>
            </div>
            
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
            <div className="initial-data__buttons initial-data__buttons_type_requirements">
              <button className="btn btn_type_save" type="button" onClick={handleSaveNewCompetence}>Сохранить данные</button>
              <span className={`initial-data__buttons-message ${requestMessageCompetence.isShow ? "initial-data__buttons-message_type_show" : "initial-data__buttons-message_type_hide"} ${requestMessageCompetence.type === 'error' ? "initial-data__buttons-message_type_error" : "initial-data__buttons-message_type_success"}`}>{requestMessageCompetence.text}</span>
            </div>
          </li>

          <li className="initial-data__item initial-data__item_type_structure">
            <h3 className="initial-data__item-name">Типовая структура ДПП</h3>
            <p className="initial-data__item-subtitle initial-data__item-subtitle_type_structure">Выберите наиболее подходящую типовую структуру ДПП или создайте свою. Типовая структура состоит из разделов, которых следует придерживаться во время разработки ДПП.</p>
            <TypicalStructure 
              typologyParts={typologiesParts}
              initialDataVersion={dppDescription.ish_version_id}
              loggedIn={loggedIn}
              onEdit={openEditPartPopup}
              onRemove={openRemovePartPopup}
              onChoose={openChoosePartsPopup}
              onChangeOrder={changeTypologyPartsOrder}
            />
          </li>

          <li className="initial-data__item initial-data__item_type_info">
            <h3 className="initial-data__item-name">Нормативно-справочная информация</h3>
            <p className="initial-data__item-subtitle initial-data__item-subtitle_type_info">Добавьте названия источников НСИ, которые будут использованы в ДПП. Вы также сможете дополнить данный список на последующих этапах разработки ДПП.</p>
            <button className="btn btn_type_add initial-data__btn_type_add-nsi" onClick={openNsiPopup}>Добавить новый источник</button>
            <ReferenceInformation 
              nsi={nsiProgram}
              onRemove={openRemoveNsiPopup}
            />
          </li>

        </ul>

        <button className="btn btn_type_next" type="button" onClick={() => history.push("/main/development/dpp/zoon")}>Перейти к следующему этапу</button>

      </div>

      {
        isRequirementFgosPopupOpen &&
        <RequirementFgosPopup
          isOpen={isRequirementFgosPopupOpen}
          onClose={closeInitialDataPopups}
          isLoading={isLoading}
          requirementFgos={requirementFgos}
          requirementFgosProgram={requirementFgosProgram}
          onSave={handleSelectFgoses}
        />
      }

      {
        isProfStandartPopupOpen &&
        <ProfStandartPopup
          isOpen={isProfStandartPopupOpen}
          onClose={closeInitialDataPopups}
          isLoading={isLoading}
          profStandarts={profStandarts}
          profStandartsProgram={profStandartsProgram}
          onSave={handleSelectProfStandart}
          onAdd={handleAddProfStandart}
        />
      }

      {
        isJobСlassificationPopupOpen &&
        <JobСlassificationPopup
          isOpen={isJobСlassificationPopupOpen}
          onClose={closeInitialDataPopups}
          isLoading={isLoading}
          jobСlassification={jobСlassification}
          jobСlassificationProgram={jobСlassificationProgram}
          onSave={handleSelectJobСlassification}
          onAdd={handleAddJobСlassification}
        />
      }

      {
        isJobDirectoryPopupOpen &&
        <JobDirectoryPopup
          isOpen={isJobDirectoryPopupOpen}
          onClose={closeInitialDataPopups}
          isLoading={isLoading}
          jobDirectory={jobDirectory}
          jobDirectoryProgram={jobDirectoryProgram}
          onSave={handleSelectJobDirectory}
          onAdd={handleAddJobDirectory}
        />
      }

      {
        isWorldSkillsPopupOpen &&
        <WorldSkillsPopup
          isOpen={isWorldSkillsPopupOpen}
          onClose={closeInitialDataPopups}
          isLoading={isLoading}
          worldSkills={worldSkills}
          worldSkillsProgram={worldSkillsProgram}
          onSave={handleSelectWorldSkills}
          onAdd={handleAddWorldSkills}
        />
      }

      {
        isOrganizationRulesPopupOpen &&
        
        <OrganizationRulesPopup
          isOpen={isOrganizationRulesPopupOpen}
          onClose={closeInitialDataPopups}
          isLoading={isLoading}
          organizationRules={organizationRules}
          organizationRulesProgram={organizationRulesProgram}
          onSave={handleSelectOrganizationRules}
          onAdd={handleAddOrganizationRules}
        />
      }

      {
        isOpenEditPartPopup &&
        <EditPartPopup 
          isOpen={isOpenEditPartPopup}
          onClose={closeInitialDataPopups}
          part={currentPart}
          partIndex={currentPartIndex}
          onEdit={editTypologyParts}
          isLoading={isLoading}
        />
      }

      {
        isOpenRemovePartPopup &&
        <RemovePartPopup
          isOpen={isOpenRemovePartPopup}
          onClose={closeInitialDataPopups}  
          part={currentPart}
          onRemove={removeTypologyParts}
          isLoading={isLoading}
        />
      }

      {
        isOpenChoosePartsPopup &&
        <ChoosePartsPopup
          isOpen={isOpenChoosePartsPopup}
          onClose={closeInitialDataPopups}  
          typologies={typologies}
          onChangeTypologyParts={changeTypologyParts}
          isLoading={isLoading}
        />
      }

      {
        isNsiPopupOpen &&
        <NsiPopup 
          isOpen={isNsiPopupOpen}
          onClose={closeInitialDataPopups} 
          nsiTypes={nsiTypes}
          onAdd={handleAddNsi} 
        />

      }
      
      {
        isRemoveNsiPopupOpen &&
        <RemoveNsiPopup
          isOpen={isRemoveNsiPopupOpen}
          onClose={closeInitialDataPopups}  
          nsi={currentNsiItem}
          onRemove={handleRemoveNsi}
          isLoading={isLoading}
        />
      }


    </section>
  );
}

export default InitialData;