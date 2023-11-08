import React from 'react';
import './InitialData.css';
import * as api from '../../../../utils/api.js';
import Preloader from '../../../Preloader/Preloader.js';
import ReferenceInformation from './ReferenceInformation/ReferenceInformation.js';
import Requirements from './Requirements/Requirements.js';
import Objective from './Objective/Objective.js';
import Annotation from './Annotation/Annotation.js';
import Information from './Information/Information.js';
import QualificationRequirements from './QualificationRequirements/QualificationRequirements.js';
import QualificationField from './QualificationField/QualificationField.js';
import QualificationObject from './QualificationObject/QualificationObject.js';
import Form from './Form/Form.js';
import Hours from './Hours/Hours.js';
import RequirementFgosPopup from '../../../Popup/RequirementFgosPopup/RequirementFgosPopup.js';
import ProfStandartPopup from '../../../Popup/ProfStandartPopup/ProfStandartPopup.js';
import JobСlassificationPopup from '../../../Popup/JobСlassificationPopup/JobСlassificationPopup.js';
import JobDirectoryPopup from '../../../Popup/JobDirectoryPopup/JobDirectoryPopup.js';
import WorldSkillsPopup from '../../../Popup/WorldSkillsPopup/WorldSkillsPopup.js';
import OrganizationRulesPopup from '../../../Popup/OrganizationRulesPopup/OrganizationRulesPopup.js';
import RemoveProgramDocumentPopup from '../../../Popup/RemoveProgramDocumentPopup/RemoveProgramDocumentPopup.js';
import TypicalStructure from './TypicalStructure/TypicalStructure.js';
import EditPartPopup from '../../../Popup/EditPartPopup/EditPartPopup.js';
import RemovePartPopup from '../../../Popup/RemovePartPopup/RemovePartPopup.js';
import AccordionChooseNewDocumentType from '../../../Accordion/AccordionChooseNewDocumentType/AccordionChooseNewDocumentType.js';
import NsiPopup from '../../../Popup/NsiPopup/NsiPopup.js';
import EditNsiPopup from '../../../Popup/EditNsiPopup/EditNsiPopup.js';
import RemoveNsiPopup from '../../../Popup/RemoveNsiPopup/RemoveNsiPopup.js';

import fgosIcon from '../../../../images/documents/fgos.png';
import profstandartIcon from '../../../../images/documents/profstandart.png';
import etkcIcon from '../../../../images/documents/etkc.png';
import ekcIcon from '../../../../images/documents/ekc.png';
import worldskillsIcon from '../../../../images/documents/worldskills.png';
import organizationIcon from '../../../../images/documents/organization.png';

function InitialData({ loggedIn, history, dppDescription, isEditRights }) {

  const [isRendering, setIsRendering] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingPopup, setIsLoadingPopup] = React.useState(false);
  const [isErrorRequest, setIsErrorRequest] = React.useState({
    text: "",
    isShow: false,
  });

  const [currentProgramType, setCurrentProgramType] = React.useState('');

  const [profLevels, setProfLevels] = React.useState([]);
  const [initialData, setInitialData] = React.useState({});

  const [ministries, setMinistries] = React.useState([]);

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

  const [currentProgramDocument, setCurrentProgramDocument] = React.useState({ id: "", type: "", });
  const [isRemoveProgramDocumentPopupOpen, setIsRemoveProgramDocumentPopupOpen] = React.useState(false);

  const [qualificationRequirements, setQualificationRequirements] = React.useState([]);
  const [qualificationObject, setQualificationObject] = React.useState([]);

  const [typologiesParts, setTypologiesParts] = React.useState([]);
  
  const [requestMessage, setRequestMessage] = React.useState({ text: '', isShow: false, type: '', action: '' });

  const [isOpenEditPartPopup, setIsOpenEditPartPopup] = React.useState(false);
  const [isOpenRemovePartPopup, setIsOpenRemovePartPopup] = React.useState(false);
  const [currentPart, setCurrentPart] = React.useState({ name: "", })
  const [currentPartIndex, setCurrentPartIndex] = React.useState(0);

  const [isNsiPopupOpen, setIsNsiPopupOpen] = React.useState(false);
  const [nsiTypes, setNsiTypes] = React.useState([]);
  const [nsiProgram, setNsiProgram] = React.useState([]);
  const [isRemoveNsiPopupOpen, setIsRemoveNsiPopupOpen] = React.useState(false);
  const [isEditNsiPopupOpen, setIsEditNsiPopupOpen] = React.useState(false);
  const [currentNsiItem, setCurrentNsiItem] = React.useState({});
  
  function handleSaveInformation(currentDirection) {
    setIsLoading(true);
    clearRequestMessage();
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.saveInformation({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id,
        currentDirection: currentDirection,
      })
      .then((res) => {
        setInitialData({...initialData, direction: res.data});
        setRequestMessage({ text: 'Данные успешно сохранены!', isShow: true, type: 'success', action: 'info', });
      })
      .catch((err) =>{
        setRequestMessage({ text: 'Произошла ошибка!', isShow: true, type: 'error', action: 'info', });
        console.log(err);
      })
      .finally(() => setIsLoading(false));
    }
  }

  function handleSaveQualificationField(data) {
    setIsLoading(true);
    clearRequestMessage();
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.saveQualification({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id,
        data: data,
      })
      .then(() => {
        setRequestMessage({ text: 'Данные успешно сохранены!', isShow: true, type: 'success', action: 'qualification-field', });
      })
      .catch((err) =>{
        setRequestMessage({ text: 'Произошла ошибка!', isShow: true, type: 'error', action: 'qualification-field', });
        console.log(err);
      })
      .finally(() => setIsLoading(false));
    }
  }

  function handleSaveObjective(data) {
    setIsLoading(true);
    clearRequestMessage();
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.saveObjective({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id,
        digital_sphere: { id: data.value },
      })
      .then(() => {
        setRequestMessage({ text: 'Данные успешно сохранены!', isShow: true, type: 'success', action: 'objective', });
      })
      .catch((err) =>{
        setRequestMessage({ text: 'Произошла ошибка!', isShow: true, type: 'error', action: 'objective', });
        console.log(err);
      })
      .finally(() => setIsLoading(false));
    }
  }

  function handleSaveRequirements(profLevels, qualification, reqQualification) {
    setIsLoading(true);
    clearRequestMessage();
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.saveRequirements({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id,
        profLevels: profLevels,
        qualification: qualification,
        reqQualification: reqQualification,
      })
      .then(() => {
        setRequestMessage({ text: 'Данные успешно сохранены!', isShow: true, type: 'success', action: 'requirement', });
      })
      .catch((err) =>{
        setRequestMessage({ text: 'Произошла ошибка!', isShow: true, type: 'error', action: 'requirement', });
        console.log(err);
      })
      .finally(() => setIsLoading(false));
    }
  }

  function handleSaveForm(form, isDistance, isPractice) {
    setIsLoading(true);
    clearRequestMessage();
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.saveForm({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id,
        edu_form: form,
        edu_form_dot: isDistance,
        edu_practic: isPractice,
      })
      .then(() => {
        setRequestMessage({ text: 'Данные успешно сохранены!', isShow: true, type: 'success', action: 'form', });
      })
      .catch((err) =>{
        setRequestMessage({ text: 'Произошла ошибка!', isShow: true, type: 'error', action: 'form', });
        console.log(err);
      })
      .finally(() => setIsLoading(false));
    }
  }

  function handleSaveHours(hours, durationForm, duration) {
    setIsLoading(true);
    clearRequestMessage();
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.saveHours({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id,
        total_hours: hours,
        edu_period_name: durationForm,
        edu_period_duration: duration,
      })
      .then(() => {
        setRequestMessage({ text: 'Данные успешно сохранены!', isShow: true, type: 'success', action: 'hours', });
      })
      .catch((err) =>{
        setRequestMessage({ text: 'Произошла ошибка!', isShow: true, type: 'error', action: 'hours', });
        console.log(err);
      })
      .finally(() => setIsLoading(false));
    }
  }

  function handleSaveDescription(data) {
    setIsLoading(true);
    clearRequestMessage();
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.saveDescription({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id, 
        programDescription: data,
      })
      .then(() => {
        setRequestMessage({ text: 'Данные успешно сохранены!', isShow: true, type: 'success', action: 'annotation', });
      })
      .catch((err) =>{
        setRequestMessage({ text: 'Произошла ошибка!', isShow: true, type: 'error', action: 'annotation', });
        console.log(err);
      })
      .finally(() => setIsLoading(false));
    }
  }

  function handleSaveNewCompetence(countHours) {
    setIsLoading(true);
    clearRequestMessage();
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.saveCompetence({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id, 
        countHours: countHours,
      })
      .then(() => {
        setRequestMessage({ text: 'Данные успешно сохранены!', isShow: true, type: 'success', action: 'competence', });
      })
      .catch((err) =>{
        setRequestMessage({ text: 'Произошла ошибка!', isShow: true, type: 'error', action: 'competence', });
        console.log(err);
      })
      .finally(() => setIsLoading(false));
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

  function openRemoveProgramDocumentPopup(id, type) {
    setCurrentProgramDocument( { id: id, type: type });
    setIsRemoveProgramDocumentPopupOpen(true);
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
          case "cr":
            setOrganizationRulesProgram(res);
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
    setIsLoadingPopup(true);
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
    .finally(() => setIsLoadingPopup(false));
  }

  function handleAddProfStandart(newDocument, closeAddPopup) {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    api.createProfStandarts({ token: token, document: newDocument })
    .then((res) => {
      closeAddPopup();
      setProfStandarts([...profStandarts, res]);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleEditProfStandart(newDocument, id, closeAddPopup) {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    api.editProfStandarts({ token: token, id: id, document: newDocument })
    .then((res) => {
      closeAddPopup();
      const index = profStandarts.indexOf(profStandarts.find((elem) => (elem.id === id)));
      setProfStandarts([...profStandarts.slice(0, index), res, ...profStandarts.slice(index + 1)]);
      const indexProgram = profStandartsProgram.indexOf(profStandartsProgram.find((elem) => (elem.id === id)));
      if (indexProgram !== -1) {
        setProfStandartsProgram([...profStandartsProgram.slice(0, indexProgram), res, ...profStandartsProgram.slice(indexProgram + 1)]);
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleSelectProfStandart(profStandart) {
    setIsLoading(true);
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
      .finally(() => setIsLoading(false));
    }
  }

  function handleRemoveProfStandart(id, closeRemovePopup) {
    setIsErrorRequest({ text: "", isShow: false });
    setIsLoading(true);
    const token = localStorage.getItem("token");
    api.removeProfStandarts({ token: token, id: id })
    .then((res) => {
      closeRemovePopup();
      const newProfStandart = profStandarts.filter((elem) => elem.id !== res);
      setProfStandarts(newProfStandart);
    })
    .catch((err) => {
      console.error(err);
      if (err.status === 403) {
        setIsErrorRequest({ text: "Удаление невозможно. Данный документ используется в другой программе.", isShow: true });
      }
    })
    .finally(() => setIsLoading(false));
  }

  /* ЕТКС */

  function jobСlassificationPopupOpen() {
    setIsLoadingPopup(true);
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
    .finally(() => setIsLoadingPopup(false));
  }

  function handleAddJobСlassification(newDocument, closeAddPopup) {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    api.createJobClassification({ token: token, document: newDocument })
    .then((res) => {
      closeAddPopup();
      setJobСlassification([...jobСlassification, res]);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleEditJobСlassification(newDocument, id, closeAddPopup) {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    api.editJobClassification({ token: token, id: id, document: newDocument })
    .then((res) => {
      closeAddPopup();
      const index = jobСlassification.indexOf(jobСlassification.find((elem) => (elem.id === id)));
      setJobСlassification([...jobСlassification.slice(0, index), res, ...jobСlassification.slice(index + 1)]);
      const indexProgram = jobСlassificationProgram.indexOf(jobСlassificationProgram.find((elem) => (elem.id === id)));
      if (indexProgram !== -1) {
        setJobСlassificationProgram([...jobСlassificationProgram.slice(0, indexProgram), res, ...jobСlassificationProgram.slice(indexProgram + 1)]);
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleSelectJobСlassification(jobСlassification) {
    setIsLoading(true);
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
      .finally(() => setIsLoading(false));
    }
  }

  function handleRemoveJobСlassification(id, closeRemovePopup) {
    setIsErrorRequest({ text: "", isShow: false });
    setIsLoading(true);
    const token = localStorage.getItem("token");
    api.removeJobClassification({ token: token, id: id })
    .then((res) => {
      closeRemovePopup();
      const newJobСlassification = jobСlassification.filter((elem) => elem.id !== res);
      setJobСlassification(newJobСlassification);
    })
    .catch((err) => {
      console.error(err);
      if (err.status === 403) {
        setIsErrorRequest({ text: "Удаление невозможно. Данный документ используется в другой программе.", isShow: true });
      }
    })
    .finally(() => setIsLoading(false));
  }

  /* ЕКС */

  function jobDirectoryPopupOpen() {
    setIsLoadingPopup(true);
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
    .finally(() => setIsLoadingPopup(false));
  }

  function handleAddJobDirectory(newDocument, closeAddPopup) {
    setIsLoadingPopup(true);
    const token = localStorage.getItem("token");
    api.createDirectoryJob({ token: token, document: newDocument })
    .then((res) => {
      closeAddPopup();
      setJobDirectory([...jobDirectory, res]);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleEditJobDirectory(newDocument, id, closeAddPopup) {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    api.editDirectoryJob({ token: token, id: id, document: newDocument })
    .then((res) => {
      closeAddPopup();
      const index = jobDirectory.indexOf(jobDirectory.find((elem) => (elem.id === id)));
      setJobDirectory([...jobDirectory.slice(0, index), res, ...jobDirectory.slice(index + 1)]);
      const indexProgram = jobDirectoryProgram.indexOf(jobDirectoryProgram.find((elem) => (elem.id === id)));
      if (indexProgram !== -1) {
        setJobDirectoryProgram([...jobDirectoryProgram.slice(0, indexProgram), res, ...jobDirectoryProgram.slice(indexProgram + 1)]);
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleSelectJobDirectory(jobDirectory) {
    setIsLoading(true);
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
      .finally(() => setIsLoading(false));
    }
  }

  function handleRemoveJobDirectory(id, closeRemovePopup) {
    setIsErrorRequest({ text: "", isShow: false });
    setIsLoading(true);
    const token = localStorage.getItem("token");
    api.removeDirectoryJob({ token: token, id: id })
    .then((res) => {
      closeRemovePopup();
      const newJobDirectory = jobDirectory.filter((elem) => elem.id !== res);
      setJobDirectory(newJobDirectory);
    })
    .catch((err) => {
      console.error(err);
      if (err.status === 403) {
        setIsErrorRequest({ text: "Удаление невозможно. Данный документ используется в другой программе.", isShow: true });
      }
    })
    .finally(() => setIsLoading(false));
  }

  /* WorldSkills */

  function handleAddWorldSkills(newDocument, closeAddPopup) {
    setIsLoading(true);
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
    setIsLoadingPopup(true);
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
    .finally(() => setIsLoadingPopup(false));
  }

  function handleSelectWorldSkills(worldSkills) {
    setIsLoading(true);
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
      .finally(() => setIsLoading(false));
    }
  }

  function handleEditWorldSkills(newDocument, id, closeAddPopup) {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    api.editWorldSkills({ token: token, id: id, document: newDocument })
    .then((res) => {
      closeAddPopup();
      const index = worldSkills.indexOf(worldSkills.find((elem) => (elem.id === id)));
      setWorldSkills([...worldSkills.slice(0, index), res, ...worldSkills.slice(index + 1)]);
      const indexProgram = worldSkillsProgram.indexOf(worldSkillsProgram.find((elem) => (elem.id === id)));
      if (indexProgram !== -1) {
        setWorldSkillsProgram([...worldSkillsProgram.slice(0, indexProgram), res, ...worldSkillsProgram.slice(indexProgram + 1)]);
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleRemoveWorldSkills(id, closeRemovePopup) {
    setIsErrorRequest({ text: "", isShow: false });
    setIsLoading(true);
    const token = localStorage.getItem("token");
    api.removeWorldSkills({ token: token, id: id })
    .then((res) => {
      closeRemovePopup();
      const newWorldSkills = worldSkills.filter((elem) => elem.id !== res);
      setWorldSkills(newWorldSkills);
    })
    .catch((err) => {
      console.error(err);
      if (err.status === 403) {
        setIsErrorRequest({ text: "Удаление невозможно. Данный документ используется в другой программе.", isShow: true });
      }
    })
    .finally(() => setIsLoading(false));
  }

  /* Корпоративные требования */

  function organizationRulesPopupOpen() {
    setIsLoadingPopup(true);
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
    .finally(() => setIsLoadingPopup(false));
  }

  function handleAddOrganizationRules(newDocument, closeAddPopup) { 
    setIsLoading(true);
    const token = localStorage.getItem("token");
    api.createOrganizationRules({ token: token, document: newDocument })
    .then((res) => {
      closeAddPopup();
      setOrganizationRules([...organizationRules, res]);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleEditOrganizationRules(newDocument, id, closeAddPopup) {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    api.editOrganizationRules({ token: token, id: id, document: newDocument })
    .then((res) => {
      closeAddPopup();
      const index = organizationRules.indexOf(organizationRules.find((elem) => (elem.id === id)));
      setOrganizationRules([...organizationRules.slice(0, index), res, ...organizationRules.slice(index + 1)]);
      const indexProgram = organizationRulesProgram.indexOf(organizationRulesProgram.find((elem) => (elem.id === id)));
      if (indexProgram !== -1) {
        setOrganizationRulesProgram([...organizationRulesProgram.slice(0, indexProgram), res, ...organizationRulesProgram.slice(indexProgram + 1)]);
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleSelectOrganizationRules(organizationRules) {
    setIsLoading(true);
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
      .finally(() => setIsLoading(false));
    }
  }

  function handleRemoveOrganizationRules(id, closeRemovePopup) {
    setIsErrorRequest({ text: "", isShow: false });
    setIsLoading(true);
    const token = localStorage.getItem("token");
    api.removeOrganizationRules({ token: token, id: id })
    .then((res) => {
      closeRemovePopup();
      const newOrganizationRules = organizationRules.filter((elem) => elem.id !== res);
      setOrganizationRules(newOrganizationRules);
    })
    .catch((err) => {
      console.error(err);
      if (err.status === 403) {
        setIsErrorRequest({ text: "Удаление невозможно. Данный документ используется в другой программе.", isShow: true });
      }
    })
    .finally(() => setIsLoading(false));
  }

  /* Qualification */
  function handleAddQualificationRequirements(data, closePopup) { 
    setIsLoading(true);
    clearRequestMessage();
    const token = localStorage.getItem("token");
    api.createQualificationRequirements({ token: token, initialDataVersion:dppDescription.ish_version_id, text: data.text })
    .then((res) => {
      setQualificationRequirements([...qualificationRequirements, res]);
      closePopup();
    })
    .catch((err) => {
      console.error(err);
      setRequestMessage({ text: 'Произошла ошибка, ваши данные не сохранены!', isShow: true, type: 'error', action: 'popup', });
    })
    .finally(() => setIsLoading(false));
  }

  function handleEditQualificationRequirements(data, closePopup) { 
    setIsLoading(true);
    clearRequestMessage();
    const token = localStorage.getItem("token");
    api.editQualificationRequirements({ token: token, initialDataVersion:dppDescription.ish_version_id, dataId: data.id, text: data.text })
    .then((res) => {
      const index = qualificationRequirements.indexOf(qualificationRequirements.find((elem) => (elem.id === res.id)));
      setQualificationRequirements([...qualificationRequirements.slice(0, index), res, ...qualificationRequirements.slice(index + 1)]);
      closePopup();
    })
    .catch((err) => {
      console.error(err);
      setRequestMessage({ text: 'Произошла ошибка, ваши данные не сохранены!', isShow: true, type: 'error', action: 'popup', });
    })
    .finally(() => setIsLoading(false));
  }

  function handleRemoveQualificationRequirements(data, closePopup) { 
    setIsLoading(true);
    clearRequestMessage();
    const token = localStorage.getItem("token");
    api.removeQualificationRequirements({ token: token, initialDataVersion:dppDescription.ish_version_id, dataId: data.id })
    .then((res) => {
      setQualificationRequirements(qualificationRequirements.filter((elem) => elem.id !== res));
      closePopup();
    })
    .catch((err) => {
      console.error(err);
      setRequestMessage({ text: 'Произошла ошибка, попробуйте позже!', isShow: true, type: 'error', action: 'popup', });
    })
    .finally(() => setIsLoading(false));
  }

  function handleAddQualificationObject(data, closePopup) { 
    setIsLoading(true);
    const token = localStorage.getItem("token");
    api.createQualificationObject({ token: token, initialDataVersion:dppDescription.ish_version_id, text: data.text })
    .then((res) => {
      setQualificationObject([...qualificationObject, res]);
      closePopup();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleEditQualificationObject(data, closePopup) { 
    setIsLoading(true);
    const token = localStorage.getItem("token");
    api.editQualificationObject({ token: token, initialDataVersion:dppDescription.ish_version_id, dataId: data.id, text: data.text })
    .then((res) => {
      const index = qualificationObject.indexOf(qualificationObject.find((elem) => (elem.id === res.id)));
      setQualificationObject([...qualificationObject.slice(0, index), res, ...qualificationObject.slice(index + 1)]);
      closePopup();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleRemoveQualificationObject(data, closePopup) { 
    setIsLoading(true);
    const token = localStorage.getItem("token");
    api.removeQualificationObject({ token: token, initialDataVersion:dppDescription.ish_version_id, dataId: data.id })
    .then((res) => {
      setQualificationObject(qualificationObject.filter((elem) => elem.id !== res));
      closePopup();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
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

  function changeTypologyPartsOrder(order) {
    
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.changeStructurePartsOrder({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id, 
        order: order,
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
    setIsLoadingPopup(true);
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
    .finally(() => setIsLoadingPopup(false));
  }

  function handleAddNsi(elem, closeAllNsiPopup) {
    setIsLoading(true);
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
      .finally(() => setIsLoading(false));
    }
  }

  function openEditNsiPopup(nsi) {
    setCurrentNsiItem(nsi);
    setIsEditNsiPopupOpen(true);
  }

  function handleEditNsi(elem) {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.editNsiElem({ 
        token: token, 
        initialDataVersion:dppDescription.ish_version_id, 
        elem: elem,
        id: currentNsiItem.id
      })
      .then((res) => {
        const index = nsiProgram.indexOf(nsiProgram.find((elem) => (elem.id === currentNsiItem.id)));
        setNsiProgram([...nsiProgram.slice(0, index), res, ...nsiProgram.slice(index + 1)]);
        closeInitialDataPopups();
      })
      .catch((err) =>{
        console.log(err);
      })
      .finally(() => setIsLoading(false));
    }
  }

  function openRemoveNsiPopup(nsi) {
    setCurrentNsiItem(nsi);
    setIsRemoveNsiPopupOpen(true);
  }

  function handleRemoveNsi(id) {
    setIsLoading(true);
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

  function clearRequestMessage() {
    setRequestMessage({ text: '', isShow: false, type: '', action: '', })
  }

  function closeInitialDataPopups() {
    clearRequestMessage();
    setIsProfStandartPopupOpen(false);
    setIsJobСlassificationPopupOpen(false);
    setIsJobDirectoryPopupOpen(false);
    setIsWorldSkillsPopupOpen(false);
    setIsOrganizationRulesPopupOpen(false);
    setIsRequirementFgosPopupOpen(false);
    setIsOpenEditPartPopup(false);
    setIsOpenRemovePartPopup(false);
    setIsNsiPopupOpen(false);
    setIsRemoveNsiPopupOpen(false);
    setIsRemoveProgramDocumentPopupOpen(false);
    setIsEditNsiPopupOpen(false);
  }

  React.useEffect(() => {
    if (loggedIn) {
        const token = localStorage.getItem("token");
        Promise.all([
          api.getProfLevels({ token: token }), 
          api.getInitialData({ token: token, dppId: dppDescription.id, initialDataVersion: dppDescription.ish_version_id, })
        ])
        .then(([ profLevels, initialData ]) => {
          console.log('DppDescription: ', dppDescription);
          console.log('InitialData: ', initialData);
          setProfLevels(profLevels);
          setInitialData(initialData);
          setProfStandartsProgram(initialData.prof_standarts);
          setJobСlassificationProgram(initialData.ektses);
          setJobDirectoryProgram(initialData.ekses);
          setWorldSkillsProgram(initialData.world_skills);
          setRequirementFgos(initialData.fgoses);
          setRequirementFgosProgram(initialData.fgoses);
          setQualificationRequirements(initialData.qualification_requirements);
          setQualificationObject(initialData.qualification_professional_objects);
          setTypologiesParts(initialData.typology_parts);
          setMinistries(initialData.ministries);
          initialData.nsis.sort(function(a,b) {
            return parseInt(a.type.position) - parseInt(b.type.position)
          })
          setNsiProgram(initialData.nsis);
          setOrganizationRulesProgram(initialData.corporate_requirements);
          if (dppDescription.type.id === 1) {
            setCurrentProgramType('pk');
          } else {
            if (dppDescription.is_digital === 0) {
              setCurrentProgramType('pp');
            } else {
              setCurrentProgramType('pp-digital');
            }
          }
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
      setQualificationRequirements([]);
      setQualificationObject([]);
      setTypologiesParts([]);
      setNsiProgram([]);
      setMinistries([]);
      setOrganizationRulesProgram([]);
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
        <p className="main__subtitle">Заполните предложенные поля форм. Для сохранения данных, нажмите кнопку "Сохранить данные".</p>

        <ul className="initial-data__list">

          <li className="initial-data__item initial-data__item_type_direction">
            <Information
              dppDescription={dppDescription}         
              initialData={initialData} 
              onSave={handleSaveInformation}
              isLoading={isLoading}
              requestMessage={requestMessage}
              clearRequestMessage={clearRequestMessage}
              isEditRights={isEditRights} 
            />

          </li>

          <li className="initial-data__item initial-data__item_type_basis">
            <h3 className="initial-data__item-name">Нормативные правовые основания разработки</h3>
            <p className="initial-data__item-subtitle initial-data__item-subtitle_type_basis">Выберите нормативные документы, на основе которых разрабатывается ДПП.</p>
            {
              isEditRights &&
              <AccordionChooseNewDocumentType 
              onChoose={handleAddNewDocument}
              />
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
                        {
                          isEditRights &&
                          <button className="initial-data__documents-delete-btn" type="button" onClick={() => openRemoveProgramDocumentPopup(elem.id, "fgos")}></button>
                        }
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
                        {
                          isEditRights &&
                          <button className="initial-data__documents-delete-btn" type="button" onClick={() => openRemoveProgramDocumentPopup(elem.id, "prof")}></button>
                        }
                      </div>
                      <h4 className="initial-data__documents-name">{elem.nameText || "название"}</h4>
                      <p className="initial-data__documents-order">{`приказ Минтруда России от ${elem.orderDate || "xx.xx.20xx"} г. № ${elem.orderNumber || "xxxx"}н`}</p>
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
                        {
                          isEditRights && 
                          <button className="initial-data__documents-delete-btn" type="button" onClick={() => openRemoveProgramDocumentPopup(elem.id, "etkc")}></button>
                        }
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
                        {
                          isEditRights &&
                          <button className="initial-data__documents-delete-btn" type="button"onClick={() => openRemoveProgramDocumentPopup(elem.id, "ekc")}></button>
                        }
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
                        { 
                          isEditRights &&
                          <button className="initial-data__documents-delete-btn" type="button" onClick={() => openRemoveProgramDocumentPopup(elem.id, "ws")}></button>
                        }
                      </div>
                      <h4 className="initial-data__documents-name">{elem.name || "название"}</h4>
                    </div>
                  </li>
                ))
              }
              {
                organizationRulesProgram.map((elem, i) => (
                  <li className="initial-data__documents-item" key={`organization-${i}`}>
                    <img className="initial-data__documents-img" src={organizationIcon} alt="иконка worldskills"></img>
                    <div className="initial-data__documents-info">
                      <div className="initial-data__documents-tags">
                        <span className="initial-data__documents-type">Корпоративные требования</span>
                        {
                          isEditRights &&
                          <button className="initial-data__documents-delete-btn" type="button" onClick={() => openRemoveProgramDocumentPopup(elem.id, "cr")}></button>
                        }
                      </div>
                      <h4 className="initial-data__documents-name">{elem.name || "<название>"}</h4>
                      <p className="initial-data__documents-order">{`${elem.text || "<описание>"}`}</p>
                    </div>
                  </li>
                ))
              }
            </ul>
          </li>

          {
            currentProgramType.includes('pp') &&
            <>
            <li className="initial-data__item initial-data__item_type_qualification-req">
              <QualificationRequirements
                qualificationRequirements={qualificationRequirements}
                onAdd={handleAddQualificationRequirements}
                onEdit={handleEditQualificationRequirements}
                onRemove={handleRemoveQualificationRequirements}
                isLoading={isLoading}
                requestMessage={requestMessage}
                clearRequestMessage={clearRequestMessage}
                isEditRights={isEditRights}
              />
            </li>
            <li className="initial-data__item initial-data__item_type_qualification-area">
              <QualificationField    
                initialData={initialData}
                onSave={handleSaveQualificationField}
                isLoading={isLoading}
                requestMessage={requestMessage}
                clearRequestMessage={clearRequestMessage}
                isEditRights={isEditRights}
              />

            </li>
            <li className="initial-data__item initial-data__item_type_qualification-obj">
              <QualificationObject
                qualificationObject={qualificationObject}
                onAdd={handleAddQualificationObject}
                onEdit={handleEditQualificationObject}
                onRemove={handleRemoveQualificationObject}
                isLoading={isLoading}
                requestMessage={requestMessage}
                clearRequestMessage={clearRequestMessage}
                isEditRights={isEditRights}
              />
            </li>
            </>
          }

          <li className="initial-data__item initial-data__item_type_requirements">
            <Requirements 
              initialData={initialData}
              profLevels={profLevels}
              currentProgramType={currentProgramType}
              onSave={handleSaveRequirements}
              isLoading={isLoading}
              requestMessage={requestMessage}
              clearRequestMessage={clearRequestMessage}
              isEditRights={isEditRights}
            />
          </li>

          <li className="initial-data__item initial-data__item_type_target">
            <Objective 
              initialData={initialData} 
              currentProgramType={currentProgramType}
              onSave={handleSaveObjective}
              isLoading={isLoading}
              requestMessage={requestMessage}
              clearRequestMessage={clearRequestMessage}
              isEditRights={isEditRights}
            />
          </li>

          { 
            currentProgramType.includes('pp')
            ?
            <>
            <li className="initial-data__item initial-data__item_type_form">
              <Form 
                initialData={initialData} 
                onSave={handleSaveForm}
                isLoading={isLoading}
                requestMessage={requestMessage}
                clearRequestMessage={clearRequestMessage}
                isEditRights={isEditRights}
              />
            </li>
            <li className="initial-data__item initial-data__item_type_hours">
              <Hours 
                initialData={initialData}
                onSave={handleSaveHours}
                isLoading={isLoading}
                requestMessage={requestMessage}
                clearRequestMessage={clearRequestMessage}
                isEditRights={isEditRights}
              />
            </li>
            <li className="initial-data__item initial-data__item_type_description-small">
              <Annotation 
                initialData={initialData}
                onSave={handleSaveDescription}
                isLoading={isLoading}
                requestMessage={requestMessage}
                clearRequestMessage={clearRequestMessage}
                isEditRights={isEditRights}
              />
            </li>
            </>
            :
            <li className="initial-data__item initial-data__item_type_description">
              <Annotation 
                initialData={initialData} 
                onSave={handleSaveDescription}
                isLoading={isLoading}
                requestMessage={requestMessage}
                clearRequestMessage={clearRequestMessage}
                isEditRights={isEditRights}
              />
            </li>
          }

          <li className="initial-data__item initial-data__item_type_structure">
            <h3 className="initial-data__item-name">Типовая структура ДПП</h3>
            <p className="initial-data__item-subtitle initial-data__item-subtitle_type_structure">Типовая структура состоит из разделов, которых следует придерживаться во время разработки ДПП.</p>
            <TypicalStructure 
              typologyParts={typologiesParts}
              initialDataVersion={dppDescription.ish_version_id}
              loggedIn={loggedIn}
              onEdit={openEditPartPopup}
              onRemove={openRemovePartPopup}
              onChangeOrder={changeTypologyPartsOrder}
              isEditRights={isEditRights}
            />
          </li>

          <li className="initial-data__item initial-data__item_type_info">
            <h3 className="initial-data__item-name">Нормативно-справочная информация</h3>
            <p className="initial-data__item-subtitle initial-data__item-subtitle_type_info">Добавьте названия источников НСИ, которые будут использованы в ДПП. Вы также сможете дополнить данный список на последующих этапах разработки ДПП.</p>
            {
              isEditRights && 
              <button className="btn btn_type_add initial-data__btn_type_add-nsi" onClick={openNsiPopup}>Добавить новый источник</button>
            }
            <ReferenceInformation 
              nsi={nsiProgram}
              onEdit={openEditNsiPopup}
              onRemove={openRemoveNsiPopup}
              isEditRights={isEditRights}
            />
          </li>

        </ul>

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
          isLoadingPopup={isLoadingPopup}
          profStandarts={profStandarts}
          profStandartsProgram={profStandartsProgram}
          onSave={handleSelectProfStandart}
          onAdd={handleAddProfStandart}
          onEdit={handleEditProfStandart}
          onRemove={handleRemoveProfStandart}
          isErrorRequest={isErrorRequest}
        />
      } 

      {
        isJobСlassificationPopupOpen &&
        <JobСlassificationPopup
          isOpen={isJobСlassificationPopupOpen}
          onClose={closeInitialDataPopups}
          isLoading={isLoading}
          isLoadingPopup={isLoadingPopup}
          jobСlassification={jobСlassification}
          jobСlassificationProgram={jobСlassificationProgram}
          onSave={handleSelectJobСlassification}
          onAdd={handleAddJobСlassification}
          onEdit={handleEditJobСlassification}
          onRemove={handleRemoveJobСlassification}
          isErrorRequest={isErrorRequest}
        />
      }

      {
        isJobDirectoryPopupOpen &&
        <JobDirectoryPopup
          isOpen={isJobDirectoryPopupOpen}
          onClose={closeInitialDataPopups}
          isLoading={isLoading}
          isLoadingPopup={isLoadingPopup}
          jobDirectory={jobDirectory}
          jobDirectoryProgram={jobDirectoryProgram}
          onSave={handleSelectJobDirectory}
          onAdd={handleAddJobDirectory}
          onEdit={handleEditJobDirectory}
          onRemove={handleRemoveJobDirectory}
          isErrorRequest={isErrorRequest}
        />
      }

      {
        isWorldSkillsPopupOpen &&
        <WorldSkillsPopup
          isOpen={isWorldSkillsPopupOpen}
          onClose={closeInitialDataPopups}
          isLoading={isLoading}
          isLoadingPopup={isLoadingPopup}
          worldSkills={worldSkills}
          worldSkillsProgram={worldSkillsProgram}
          onSave={handleSelectWorldSkills}
          onAdd={handleAddWorldSkills}
          onEdit={handleEditWorldSkills}
          onRemove={handleRemoveWorldSkills}
          isErrorRequest={isErrorRequest}
        />
      }

      {
        isOrganizationRulesPopupOpen &&
        <OrganizationRulesPopup
          isOpen={isOrganizationRulesPopupOpen}
          onClose={closeInitialDataPopups}
          isLoading={isLoading}
          isLoadingPopup={isLoadingPopup}
          organizationRules={organizationRules}
          organizationRulesProgram={organizationRulesProgram}
          onSave={handleSelectOrganizationRules}
          onAdd={handleAddOrganizationRules}
          onEdit={handleEditOrganizationRules}
          onRemove={handleRemoveOrganizationRules}
          isErrorRequest={isErrorRequest}
        />
      }

      {
        isRemoveProgramDocumentPopupOpen &&
        <RemoveProgramDocumentPopup
          isOpen={isRemoveProgramDocumentPopupOpen}
          onClose={closeInitialDataPopups}  
          document={currentProgramDocument}
          onRemove={handleRemoveProgramDocument}
          isLoading={isLoading}
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
        isNsiPopupOpen &&
        <NsiPopup 
          isOpen={isNsiPopupOpen}
          onClose={closeInitialDataPopups} 
          nsiTypes={nsiTypes}
          ministries={ministries}
          onAdd={handleAddNsi}
          isLoading={isLoading}
        />
      }

      {
        isEditNsiPopupOpen &&
        <EditNsiPopup
          isOpen={isEditNsiPopupOpen}
          onClose={closeInitialDataPopups}  
          nsi={currentNsiItem}
          ministries={ministries}
          onEdit={handleEditNsi}
          isLoading={isLoading}
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