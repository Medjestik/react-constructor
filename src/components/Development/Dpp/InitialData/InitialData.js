import React from 'react';
import './InitialData.css';
import * as api from '../../../../utils/api.js';
import Preloader from '../../../Preloader/Preloader.js';
import ReferenceInformation from './ReferenceInformation/ReferenceInformation.js';
import useOnPushEsc from '../../../../hooks/useOnPushEsc';
import useOnClickOverlay from '../../../../hooks/useOnClickOverlay.js';
import RequirementFgosPopup from '../../../Popup/RequirementFgosPopup/RequirementFgosPopup.js';
import ProfStandartPopup from '../../../Popup/ProfStandartPopup/ProfStandartPopup.js';
import Job–°lassificationPopup from '../../../Popup/Job–°lassificationPopup/Job–°lassificationPopup.js';
import JobDirectoryPopup from '../../../Popup/JobDirectoryPopup/JobDirectoryPopup.js';
import WorldSkillsPopup from '../../../Popup/WorldSkillsPopup/WorldSkillsPopup.js';
import OrganizationRulesPopup from '../../../Popup/OrganizationRulesPopup/OrganizationRulesPopup.js';
import RemoveProgramDocumentPopup from '../../../Popup/RemoveProgramDocumentPopup/RemoveProgramDocumentPopup.js';
import TypicalStructure from './TypicalStructure/TypicalStructure.js';
import EditPartPopup from '../../../Popup/EditPartPopup/EditPartPopup.js';
import RemovePartPopup from '../../../Popup/RemovePartPopup/RemovePartPopup.js';
import ChoosePartsPopup from '../../../Popup/ChoosePartsPopup/ChoosePartsPopup.js';
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
  })

  const [countHours, setCountHours] = React.useState(0);
  const [currentProgramType, setCurrentProgramType] = React.useState({ class: "", text: "", type: "", })

  const [profLevels, setProfLevels] = React.useState([]);
  const [selectedProfLevels, setSelectedProfLevels] = React.useState([]);

  const [requirementFgos, setRequirementFgos] = React.useState([]);
  const [requirementFgosProgram, setRequirementFgosProgram] = React.useState([]);
  const [isRequirementFgosPopupOpen, setIsRequirementFgosPopupOpen] = React.useState(false);
  
  const [profStandarts, setProfStandarts] = React.useState([]);
  const [profStandartsProgram, setProfStandartsProgram] = React.useState([]);
  const [isProfStandartPopupOpen, setIsProfStandartPopupOpen] = React.useState(false);

  const [job–°lassification, setJob–°lassification] = React.useState([]);
  const [job–°lassificationProgram, setJob–°lassificationProgram] = React.useState([]);
  const [isJob–°lassificationPopupOpen, setIsJob–°lassificationPopupOpen] = React.useState(false);

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

  const [userQualification, setUserQualification] = React.useState('');
  const [typologies, setTypologies] = React.useState([]);
  const [typologiesParts, setTypologiesParts] = React.useState([]);
  const [requestMessageRequirements, setRequestMessageRequirements] = React.useState({ text: '', isShow: false, type: '' });
  const [requestMessageCompetence, setRequestMessageCompetence] = React.useState({ text: '', isShow: false, type: '' });
  const [requestMessageDescription, setRequestMessageDescription] = React.useState({ text: '', isShow: false, type: '' });

  const [isOpenEditPartPopup, setIsOpenEditPartPopup] = React.useState(false);
  const [isOpenRemovePartPopup, setIsOpenRemovePartPopup] = React.useState(false);
  const [isOpenChoosePartsPopup, setIsOpenChoosePartsPopup] = React.useState(false);
  const [currentPart, setCurrentPart] = React.useState({ name: "", })
  const [currentPartIndex, setCurrentPartIndex] = React.useState(0);

  const [isNsiPopupOpen, setIsNsiPopupOpen] = React.useState(false);
  const [nsiTypes, setNsiTypes] = React.useState([]);
  const [nsiProgram, setNsiProgram] = React.useState([]);
  const [isRemoveNsiPopupOpen, setIsRemoveNsiPopupOpen] = React.useState(false);
  const [isEditNsiPopupOpen, setIsEditNsiPopupOpen] = React.useState(false);
  const [currentNsiItem, setCurrentNsiItem] = React.useState({});

  const [programDescription, setProgramDescription] = React.useState('');

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

  function handleChangeProgramDescription(e) {
    setProgramDescription(e.target.value);
    setRequestMessageDescription({ text: '', isShow: false, type: '',});
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
          text: '–Ē–į–Ĺ–Ĺ—č–Ķ —É—Ā–Ņ–Ķ—ą–Ĺ–ĺ —Ā–ĺ—Ö—Ä–į–Ĺ–Ķ–Ĺ—č!',
          isShow: true,
          type: 'success',
        })
      })
      .catch((err) =>{
        setRequestMessageRequirements({ 
          text: '–ö —Ā–ĺ–∂–į–Ľ–Ķ–Ĺ–ł—é –Ņ—Ä–ĺ–ł–∑–ĺ—ą–Ľ–į –ĺ—ą–ł–Ī–ļ–į, –≤–į—ą–ł –ī–į–Ĺ–Ĺ—č–Ķ –Ĺ–Ķ —Ā–ĺ—Ö—Ä–į–Ĺ–Ķ–Ĺ—č!',
          isShow: true,
          type: 'error',
        })
        console.log(err);
      })
    }
  }

  function handleSaveDescription() {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.saveDescription({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id, 
        programDescription: programDescription,
      })
      .then(() => {
        setRequestMessageDescription({ 
          text: '–Ē–į–Ĺ–Ĺ—č–Ķ —É—Ā–Ņ–Ķ—ą–Ĺ–ĺ —Ā–ĺ—Ö—Ä–į–Ĺ–Ķ–Ĺ—č!',
          isShow: true,
          type: 'success',
        })
      })
      .catch((err) =>{
        setRequestMessageDescription({ 
          text: '–ö —Ā–ĺ–∂–į–Ľ–Ķ–Ĺ–ł—é –Ņ—Ä–ĺ–ł–∑–ĺ—ą–Ľ–į –ĺ—ą–ł–Ī–ļ–į, –≤–į—ą–ł –ī–į–Ĺ–Ĺ—č–Ķ –Ĺ–Ķ —Ā–ĺ—Ö—Ä–į–Ĺ–Ķ–Ĺ—č!',
          isShow: true,
          type: 'error',
        })
        console.log(err);
      })
    }
  }

  function handleChangeCountHours(e) {
    setCountHours(e.target.value);
    setRequestMessageCompetence({ 
      text: '',
      isShow: false,
      type: 'success',
    })
  }

  function handleSaveNewCompetence() {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.saveCompetence({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id, 
        countHours: countHours,
        type: currentProgramType.type,
      })
      .then(() => {
        setRequestMessageCompetence({ 
          text: '–Ē–į–Ĺ–Ĺ—č–Ķ —É—Ā–Ņ–Ķ—ą–Ĺ–ĺ —Ā–ĺ—Ö—Ä–į–Ĺ–Ķ–Ĺ—č!',
          isShow: true,
          type: 'success',
        })
      })
      .catch((err) =>{
        setRequestMessageCompetence({ 
          text: '–ö —Ā–ĺ–∂–į–Ľ–Ķ–Ĺ–ł—é –Ņ—Ä–ĺ–ł–∑–ĺ—ą–Ľ–į –ĺ—ą–ł–Ī–ļ–į, –≤–į—ą–ł –ī–į–Ĺ–Ĺ—č–Ķ –Ĺ–Ķ —Ā–ĺ—Ö—Ä–į–Ĺ–Ķ–Ĺ—č!',
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
        job–°lassificationPopupOpen();
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
        alert( "–Ě–Ķ—ā —ā–į–ļ–ł—Ö –∑–Ĺ–į—á–Ķ–Ĺ–ł–Ļ" );
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
            setJob–°lassificationProgram(res);
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
            alert( "–Ě–Ķ—ā —ā–į–ļ–ł—Ö –∑–Ĺ–į—á–Ķ–Ĺ–ł–Ļ" );
        }
        closeInitialDataPopups();
      })
      .catch((err) =>{
        console.log(err);
      })
    }
  }

  /* –§–ď–ě–°—č */

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

  /* –ü—Ä–ĺ—Ą—Ā—ā–į–Ĺ–ī–į—Ä—ā—č */

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
        setIsErrorRequest({ text: "–£–ī–į–Ľ–Ķ–Ĺ–ł–Ķ –Ĺ–Ķ–≤–ĺ–∑–ľ–ĺ–∂–Ĺ–ĺ. –Ē–į–Ĺ–Ĺ—č–Ļ –ī–ĺ–ļ—É–ľ–Ķ–Ĺ—ā –ł—Ā–Ņ–ĺ–Ľ—Ć–∑—É–Ķ—ā—Ā—Ź –≤ –ī—Ä—É–≥–ĺ–Ļ –Ņ—Ä–ĺ–≥—Ä–į–ľ–ľ–Ķ.", isShow: true });
      }
    })
    .finally(() => setIsLoading(false));
  }

  /* –ē–Ę–ö–° */

  function job–°lassificationPopupOpen() {
    setIsLoadingPopup(true);
    closeInitialDataPopups();
    setIsJob–°lassificationPopupOpen(true);
    const token = localStorage.getItem("token");
    api.getJobClassification({ token: token })
    .then((res) => {
      setJob–°lassification(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoadingPopup(false));
  }

  function handleAddJob–°lassification(newDocument, closeAddPopup) {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    api.createJobClassification({ token: token, document: newDocument })
    .then((res) => {
      closeAddPopup();
      setJob–°lassification([...job–°lassification, res]);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleEditJob–°lassification(newDocument, id, closeAddPopup) {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    api.editJobClassification({ token: token, id: id, document: newDocument })
    .then((res) => {
      closeAddPopup();
      const index = job–°lassification.indexOf(job–°lassification.find((elem) => (elem.id === id)));
      setJob–°lassification([...job–°lassification.slice(0, index), res, ...job–°lassification.slice(index + 1)]);
      const indexProgram = job–°lassificationProgram.indexOf(job–°lassificationProgram.find((elem) => (elem.id === id)));
      if (indexProgram !== -1) {
        setJob–°lassificationProgram([...job–°lassificationProgram.slice(0, indexProgram), res, ...job–°lassificationProgram.slice(indexProgram + 1)]);
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleSelectJob–°lassification(job–°lassification) {
    setIsLoading(true);
    const job–°lassificationId = job–°lassification.map(elem => elem.id);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.selectJobClassification({ 
        token: token, 
        initialDataVersion: dppDescription.ish_version_id, 
        data: job–°lassificationId
      })
      .then((res) => {
        setJob–°lassificationProgram(res);
        closeInitialDataPopups();
      })
      .catch((err) =>{
        console.log(err);
      })
      .finally(() => setIsLoading(false));
    }
  }

  function handleRemoveJob–°lassification(id, closeRemovePopup) {
    setIsErrorRequest({ text: "", isShow: false });
    setIsLoading(true);
    const token = localStorage.getItem("token");
    api.removeJobClassification({ token: token, id: id })
    .then((res) => {
      closeRemovePopup();
      const newJob–°lassification = job–°lassification.filter((elem) => elem.id !== res);
      setJob–°lassification(newJob–°lassification);
    })
    .catch((err) => {
      console.error(err);
      if (err.status === 403) {
        setIsErrorRequest({ text: "–£–ī–į–Ľ–Ķ–Ĺ–ł–Ķ –Ĺ–Ķ–≤–ĺ–∑–ľ–ĺ–∂–Ĺ–ĺ. –Ē–į–Ĺ–Ĺ—č–Ļ –ī–ĺ–ļ—É–ľ–Ķ–Ĺ—ā –ł—Ā–Ņ–ĺ–Ľ—Ć–∑—É–Ķ—ā—Ā—Ź –≤ –ī—Ä—É–≥–ĺ–Ļ –Ņ—Ä–ĺ–≥—Ä–į–ľ–ľ–Ķ.", isShow: true });
      }
    })
    .finally(() => setIsLoading(false));
  }

  /* –ē–ö–° */

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
        setIsErrorRequest({ text: "–£–ī–į–Ľ–Ķ–Ĺ–ł–Ķ –Ĺ–Ķ–≤–ĺ–∑–ľ–ĺ–∂–Ĺ–ĺ. –Ē–į–Ĺ–Ĺ—č–Ļ –ī–ĺ–ļ—É–ľ–Ķ–Ĺ—ā –ł—Ā–Ņ–ĺ–Ľ—Ć–∑—É–Ķ—ā—Ā—Ź –≤ –ī—Ä—É–≥–ĺ–Ļ –Ņ—Ä–ĺ–≥—Ä–į–ľ–ľ–Ķ.", isShow: true });
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
        setIsErrorRequest({ text: "–£–ī–į–Ľ–Ķ–Ĺ–ł–Ķ –Ĺ–Ķ–≤–ĺ–∑–ľ–ĺ–∂–Ĺ–ĺ. –Ē–į–Ĺ–Ĺ—č–Ļ –ī–ĺ–ļ—É–ľ–Ķ–Ĺ—ā –ł—Ā–Ņ–ĺ–Ľ—Ć–∑—É–Ķ—ā—Ā—Ź –≤ –ī—Ä—É–≥–ĺ–Ļ –Ņ—Ä–ĺ–≥—Ä–į–ľ–ľ–Ķ.", isShow: true });
      }
    })
    .finally(() => setIsLoading(false));
  }

  /* –ö–ĺ—Ä–Ņ–ĺ—Ä–į—ā–ł–≤–Ĺ—č–Ķ —ā—Ä–Ķ–Ī–ĺ–≤–į–Ĺ–ł—Ź */

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
        setIsErrorRequest({ text: "–£–ī–į–Ľ–Ķ–Ĺ–ł–Ķ –Ĺ–Ķ–≤–ĺ–∑–ľ–ĺ–∂–Ĺ–ĺ. –Ē–į–Ĺ–Ĺ—č–Ļ –ī–ĺ–ļ—É–ľ–Ķ–Ĺ—ā –ł—Ā–Ņ–ĺ–Ľ—Ć–∑—É–Ķ—ā—Ā—Ź –≤ –ī—Ä—É–≥–ĺ–Ļ –Ņ—Ä–ĺ–≥—Ä–į–ľ–ľ–Ķ.", isShow: true });
      }
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

  function closeInitialDataPopups() {
    setIsProfStandartPopupOpen(false);
    setIsJob–°lassificationPopupOpen(false);
    setIsJobDirectoryPopupOpen(false);
    setIsWorldSkillsPopupOpen(false);
    setIsOrganizationRulesPopupOpen(false);
    setIsRequirementFgosPopupOpen(false);
    setIsOpenEditPartPopup(false);
    setIsOpenRemovePartPopup(false);
    setIsOpenChoosePartsPopup(false);
    setIsNsiPopupOpen(false);
    setIsRemoveNsiPopupOpen(false);
    setIsRemoveProgramDocumentPopupOpen(false);
    setIsEditNsiPopupOpen(false);
  }

  function closeOverlayPopups() {
    //setIsOpenEditPartPopup(false);
    //setIsOpenRemovePartPopup(false);
    //setIsOpenChoosePartsPopup(false);
    //setIsRemoveNsiPopupOpen(false);
    //setIsEditNsiPopupOpen(false);
    //setIsRemoveProgramDocumentPopupOpen(false);
  }

  useOnClickOverlay(closeOverlayPopups);
  useOnPushEsc(closeOverlayPopups);

  function changeProgramType() {
    if (currentProgramType.type === "1") {
      setCurrentProgramType({ class: "second", text: "–ü—Ä–ĺ—Ą–Ķ—Ā—Ā–ł–ĺ–Ĺ–į–Ľ—Ć–Ĺ–į—Ź –Ņ–Ķ—Ä–Ķ–Ņ–ĺ–ī–≥–ĺ—ā–ĺ–≤–ļ–į", type: "2" });
    } else {
      setCurrentProgramType({ class: "first", text: "–ü–ĺ–≤—č—ą–Ķ–Ĺ–ł–Ķ –ļ–≤–į–Ľ–ł—Ą–ł–ļ–į—Ü–ł–ł", type: "1" });
    }
  }

  React.useEffect(() => {
    if (countHours > 249) {
      setCurrentProgramType({ class: "second", text: "–ü—Ä–ĺ—Ą–Ķ—Ā—Ā–ł–ĺ–Ĺ–į–Ľ—Ć–Ĺ–į—Ź –Ņ–Ķ—Ä–Ķ–Ņ–ĺ–ī–≥–ĺ—ā–ĺ–≤–ļ–į", type: "2" });
    } else {
      setCurrentProgramType({ class: "first", text: "–ü–ĺ–≤—č—ą–Ķ–Ĺ–ł–Ķ –ļ–≤–į–Ľ–ł—Ą–ł–ļ–į—Ü–ł–ł", type: "1" });
    }
  }, [countHours]);

  React.useEffect(() => {
    if (loggedIn) {
        const token = localStorage.getItem("token");
        Promise.all([
          api.getProfLevels({ token: token }), 
          api.getInitialData({ token: token, dppId: dppDescription.id, initialDataVersion: dppDescription.ish_version_id, })
        ])
        .then(([ profLevels, initialData ]) => {
          console.log(initialData)
          setProfLevels(profLevels);
          setCountHours(initialData.total_hours);
          setProfStandartsProgram(initialData.prof_standarts);
          setJob–°lassificationProgram(initialData.ektses);
          setJobDirectoryProgram(initialData.ekses);
          setWorldSkillsProgram(initialData.world_skills);
          setRequirementFgos(initialData.fgoses);
          setRequirementFgosProgram(initialData.fgoses);
          setUserQualification(initialData.req_user_kval);
          setSelectedProfLevels(initialData.prof_levels);
          setTypologies(initialData.typologies);
          setTypologiesParts(initialData.typology_parts);
          setProgramDescription(initialData.annotationDescription);
          initialData.nsis.sort(function(a,b) {
            return parseInt(a.type.position) - parseInt(b.type.position)
          })
          setNsiProgram(initialData.nsis);
          setOrganizationRulesProgram(initialData.corporate_requirements);
          if (initialData.type === 2) {
            setCurrentProgramType({ class: "second", text: "–ü—Ä–ĺ—Ą–Ķ—Ā—Ā–ł–ĺ–Ĺ–į–Ľ—Ć–Ĺ–į—Ź –Ņ–Ķ—Ä–Ķ–Ņ–ĺ–ī–≥–ĺ—ā–ĺ–≤–ļ–į", type: "2" });
          } else {
            setCurrentProgramType({ class: "first", text: "–ü–ĺ–≤—č—ą–Ķ–Ĺ–ł–Ķ –ļ–≤–į–Ľ–ł—Ą–ł–ļ–į—Ü–ł–ł", type: "1" });
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setIsRendering(false));
    }
    return () => {
      setCountHours(0);
      setProfLevels([]);
      setProfStandartsProgram([]);
      setJob–°lassificationProgram([]);
      setJobDirectoryProgram([]);
      setWorldSkillsProgram([]);
      setRequirementFgos([]);
      setRequirementFgosProgram([]);
      setUserQualification("");
      setSelectedProfLevels([]);
      setTypologies([]);
      setTypologiesParts([]);
      setNsiProgram([]);
      setOrganizationRulesProgram([]);
      setProgramDescription("");
      setCurrentProgramType({ class: "", text: "", type: "" });
  }
  }, [loggedIn, dppDescription]);
  
  return (
    isRendering 
    ?
    <Preloader />
    :
    <section className="initial-data">
      <div>

        <h1 className="main__title">–í–≤–ĺ–ī –ł—Ā—Ö–ĺ–ī–Ĺ—č—Ö –ī–į–Ĺ–Ĺ—č—Ö</h1>
        <p className="main__subtitle">–ó–į–Ņ–ĺ–Ľ–Ĺ–ł—ā–Ķ –Ņ—Ä–Ķ–ī–Ľ–ĺ–∂–Ķ–Ĺ–Ĺ—č–Ķ –Ņ–ĺ–Ľ—Ź —Ą–ĺ—Ä–ľ. –Ē–Ľ—Ź —Ā–ĺ—Ö—Ä–į–Ĺ–Ķ–Ĺ–ł—Ź –ī–į–Ĺ–Ĺ—č—Ö, –Ĺ–į–∂–ľ–ł—ā–Ķ –ļ–Ĺ–ĺ–Ņ–ļ—É "–°–ĺ—Ö—Ä–į–Ĺ–ł—ā—Ć –ī–į–Ĺ–Ĺ—č–Ķ".</p>

        <ul className="initial-data__list">

          <li className="initial-data__item initial-data__item_type_basis">
            <h3 className="initial-data__item-name">–Ě–ĺ—Ä–ľ–į—ā–ł–≤–Ĺ—č–Ķ –Ņ—Ä–į–≤–ĺ–≤—č–Ķ –ĺ—Ā–Ĺ–ĺ–≤–į–Ĺ–ł—Ź —Ä–į–∑—Ä–į–Ī–ĺ—ā–ļ–ł</h3>
            <p className="initial-data__item-subtitle initial-data__item-subtitle_type_basis">–í—č–Ī–Ķ—Ä–ł—ā–Ķ –Ĺ–ĺ—Ä–ľ–į—ā–ł–≤–Ĺ—č–Ķ –ī–ĺ–ļ—É–ľ–Ķ–Ĺ—ā—č, –Ĺ–į –ĺ—Ā–Ĺ–ĺ–≤–Ķ –ļ–ĺ—ā–ĺ—Ä—č—Ö —Ä–į–∑—Ä–į–Ī–į—ā—č–≤–į–Ķ—ā—Ā—Ź –Ē–ü–ü.</p>
            {
              isEditRights &&
              <AccordionChooseNewDocumentType 
              onChoose={handleAddNewDocument}
              />
            }

            {
              requirementFgosProgram.length > 0 || 
              profStandartsProgram.length > 0 ||
              job–°lassificationProgram.length > 0 ||
              jobDirectoryProgram.length > 0 ||
              worldSkillsProgram.length > 0 ?
              <h5 className="initial-data__item-title">–Ę—Ä–Ķ–Ī–ĺ–≤–į–Ĺ–ł—Ź –ļ –ļ–≤–į–Ľ–ł—Ą–ł–ļ–į—Ü–ł–ł —É—Ā—ā–į–Ĺ–ĺ–≤–Ľ–Ķ–Ĺ—č –Ĺ–į –ĺ—Ā–Ĺ–ĺ–≤–Ķ:</h5>
              :
              <div></div>
            }
            
            <ul className="initial-data__documents-list">
              {
                requirementFgosProgram.map((elem, i) => (
                  <li className="initial-data__documents-item" key={`prof-${i}`}>
                    <img className="initial-data__documents-img" src={fgosIcon} alt="–ł–ļ–ĺ–Ĺ–ļ–į —Ą–≥–ĺ—Ā"></img>
                    <div className="initial-data__documents-info">
                      <div className="initial-data__documents-tags">
                        <span className="initial-data__documents-type">–§–ď–ě–°</span>
                        <span className="initial-data__documents-code">{elem.code || "xx.xxx"}</span>
                        {
                          isEditRights &&
                          <button className="initial-data__documents-delete-btn" type="button" onClick={() => openRemoveProgramDocumentPopup(elem.id, "fgos")}></button>
                        }
                      </div>
                      <h4 className="initial-data__documents-name">{elem.name || "–Ĺ–į–∑–≤–į–Ĺ–ł–Ķ"}</h4>
                    </div>
                  </li>
                ))
              }
              {
                profStandartsProgram.map((elem, i) => (
                  <li className="initial-data__documents-item" key={`prof-${i}`}>
                    <img className="initial-data__documents-img" src={profstandartIcon} alt="–ł–ļ–ĺ–Ĺ–ļ–į –Ņ—Ä–ĺ—Ą—Ā—ā–į–Ĺ–ī–į—Ä—ā–į"></img>
                    <div className="initial-data__documents-info">
                      <div className="initial-data__documents-tags">
                        <span className="initial-data__documents-type">–ü—Ä–ĺ—Ą—Ā—ā–į–Ĺ–ī–į—Ä—ā</span>
                        <span className="initial-data__documents-code">{elem.nameCode || "xx.xxx"}</span>
                        {
                          isEditRights &&
                          <button className="initial-data__documents-delete-btn" type="button" onClick={() => openRemoveProgramDocumentPopup(elem.id, "prof")}></button>
                        }
                      </div>
                      <h4 className="initial-data__documents-name">{elem.nameText || "–Ĺ–į–∑–≤–į–Ĺ–ł–Ķ"}</h4>
                      <p className="initial-data__documents-order">{`–Ņ—Ä–ł–ļ–į–∑ –ú–ł–Ĺ—ā—Ä—É–ī–į –†–ĺ—Ā—Ā–ł–ł –ĺ—ā ${elem.orderDate || "xx.xx.20xx"} –≥. ‚ĄĖ ${elem.orderNumber || "xxxx"}–Ĺ`}</p>
                    </div>
                  </li>
                ))
              }
              {
                job–°lassificationProgram.map((elem, i) => (
                  <li className="initial-data__documents-item" key={`class-${i}`}>
                    <img className="initial-data__documents-img" src={etkcIcon} alt="–ł–ļ–ĺ–Ĺ–ļ–į –Ķ—ā–ļ—Ā"></img>
                    <div className="initial-data__documents-info">
                      <div className="initial-data__documents-tags">
                        <span className="initial-data__documents-type">–ē–Ę–ö–°</span>
                        <span className="initial-data__documents-code">{elem.nameProfession || "xx.xxx"}</span>
                        {
                          isEditRights && 
                          <button className="initial-data__documents-delete-btn" type="button" onClick={() => openRemoveProgramDocumentPopup(elem.id, "etkc")}></button>
                        }
                      </div>
                      <h4 className="initial-data__documents-name">{elem.chapterName || "–Ĺ–į–∑–≤–į–Ĺ–ł–Ķ"}</h4>
                      <p className="initial-data__documents-order">{`–í—č–Ņ—É—Ā–ļ ‚ĄĖ ${elem.issueNumber || "xx"}. –Ē–į—ā–į —Ä–Ķ–ī–į–ļ—Ü–ł–ł ${elem.editionDate || "xx.xx.20xx"} –≥.`}</p>
                    </div>
                  </li>
                ))
              }
              {
                jobDirectoryProgram.map((elem, i) => (
                  <li className="initial-data__documents-item" key={`direct-${i}`}>
                    <img className="initial-data__documents-img" src={ekcIcon} alt="–ł–ļ–ĺ–Ĺ–ļ–į –Ķ–ļ—Ā"></img>
                    <div className="initial-data__documents-info">
                      <div className="initial-data__documents-tags">
                        <span className="initial-data__documents-type">–ē–ö–°</span>
                        <span className="initial-data__documents-code">{elem.nameProfession || "xx.xxx"}</span>
                        {
                          isEditRights &&
                          <button className="initial-data__documents-delete-btn" type="button"onClick={() => openRemoveProgramDocumentPopup(elem.id, "ekc")}></button>
                        }
                      </div>
                      <h4 className="initial-data__documents-name">{elem.chapterName || "–Ĺ–į–∑–≤–į–Ĺ–ł–Ķ"}</h4>
                      <p className="initial-data__documents-order">{`–Ē–į—ā–į —Ä–Ķ–ī–į–ļ—Ü–ł–ł ${elem.editionDate || "xx.xx.20xx"} –≥.`}</p>
                    </div>
                  </li>
                ))
              }
              {
                worldSkillsProgram.map((elem, i) => (
                  <li className="initial-data__documents-item" key={`world-${i}`}>
                    <img className="initial-data__documents-img" src={worldskillsIcon} alt="–ł–ļ–ĺ–Ĺ–ļ–į worldskills"></img>
                    <div className="initial-data__documents-info">
                      <div className="initial-data__documents-tags">
                        <span className="initial-data__documents-type">WorldSkills</span>
                        <span className="initial-data__documents-code">{elem.code || "xxx"}</span>
                        { 
                          isEditRights &&
                          <button className="initial-data__documents-delete-btn" type="button" onClick={() => openRemoveProgramDocumentPopup(elem.id, "ws")}></button>
                        }
                      </div>
                      <h4 className="initial-data__documents-name">{elem.name || "–Ĺ–į–∑–≤–į–Ĺ–ł–Ķ"}</h4>
                    </div>
                  </li>
                ))
              }
              {
                organizationRulesProgram.map((elem, i) => (
                  <li className="initial-data__documents-item" key={`organization-${i}`}>
                    <img className="initial-data__documents-img" src={organizationIcon} alt="–ł–ļ–ĺ–Ĺ–ļ–į worldskills"></img>
                    <div className="initial-data__documents-info">
                      <div className="initial-data__documents-tags">
                        <span className="initial-data__documents-type">–ö–ĺ—Ä–Ņ–ĺ—Ä–į—ā–ł–≤–Ĺ—č–Ķ —ā—Ä–Ķ–Ī–ĺ–≤–į–Ĺ–ł—Ź</span>
                        {
                          isEditRights &&
                          <button className="initial-data__documents-delete-btn" type="button" onClick={() => openRemoveProgramDocumentPopup(elem.id, "cr")}></button>
                        }
                      </div>
                      <h4 className="initial-data__documents-name">{elem.name || "<–Ĺ–į–∑–≤–į–Ĺ–ł–Ķ>"}</h4>
                      <p className="initial-data__documents-order">{`${elem.text || "<–ĺ–Ņ–ł—Ā–į–Ĺ–ł–Ķ>"}`}</p>
                    </div>
                  </li>
                ))
              }
            </ul>
          </li>

          <li className="initial-data__item initial-data__item_type_requirements">
            <h3 className="initial-data__item-name">–Ę—Ä–Ķ–Ī–ĺ–≤–į–Ĺ–ł—Ź –ļ –ĺ–Ī—É—á–į—é—Č–ł–ľ—Ā—Ź</h3>
            <h5 className="initial-data__item-title">–Ę—Ä–Ķ–Ī–ĺ–≤–į–Ĺ–ł—Ź –ļ —É—Ä–ĺ–≤–Ĺ—é –Ņ—Ä–ĺ—Ą–Ķ—Ā—Ā–ł–ĺ–Ĺ–į–Ľ—Ć–Ĺ–ĺ–≥–ĺ –ĺ–Ī—Ä–į–∑–ĺ–≤–į–Ĺ–ł—Ź</h5>
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
            <h5 className="initial-data__item-title">–Ę—Ä–Ķ–Ī–ĺ–≤–į–Ĺ–ł—Ź –ļ –ļ–≤–į–Ľ–ł—Ą–ł–ļ–į—Ü–ł–ł</h5>
            <textarea 
              className="initial-data__item-qualification-text" 
              name="qualification-text" 
              placeholder="–ě–Ņ–ł—ą–ł—ā–Ķ —ā—Ä–Ķ–Ī–ĺ–≤–į–Ĺ–ł—Ź –ļ –ļ–≤–į–Ľ–ł—Ą–ł–ļ–į—Ü–ł–ł –ĺ–Ī—É—á–į—é—Č–Ķ–≥–ĺ—Ā—Ź"
              defaultValue={userQualification}
              onChange={handleChangeUserQualification}
            >
            </textarea>
            {
              isEditRights &&
              <div className="initial-data__buttons initial-data__buttons_type_requirements">
                <button className="btn btn_type_save" type="button" onClick={handleSaveRequirements}>–°–ĺ—Ö—Ä–į–Ĺ–ł—ā—Ć –ī–į–Ĺ–Ĺ—č–Ķ</button>
                <span className={`initial-data__buttons-message ${requestMessageRequirements.isShow ? "initial-data__buttons-message_type_show" : "initial-data__buttons-message_type_hide"} ${requestMessageRequirements.type === 'error' ? "initial-data__buttons-message_type_error" : "initial-data__buttons-message_type_success"}`}>{requestMessageRequirements.text}</span>
              </div>
            }
          </li>

          <li className="initial-data__item initial-data__item_type_target">
            <h3 className="initial-data__item-name">–¶–Ķ–Ľ—Ć –ł –∑–į–ī–į—á–ł</h3>
            <p className="initial-data__item-subtitle">–£–ļ–į–∂–ł—ā–Ķ, —Ą–ĺ—Ä–ľ–ł—Ä—É–Ķ—ā –Ľ–ł –Ē–ü–ü –Ĺ–ĺ–≤—É—é –ļ–ĺ–ľ–Ņ–Ķ—ā–Ķ–Ĺ—Ü–ł—é –ł–Ľ–ł —Ā–ĺ–≤–Ķ—Ä—ą–Ķ–Ĺ—Ā—ā–≤—É–Ķ—ā –ł–ľ–Ķ—é—Č—É—é—Ā—Ź. –¶–Ķ–Ľ—Ć –ł –∑–į–ī–į—á–ł –Ē–ü–ü.</p>
            <h5 className="initial-data__item-title">–¶–Ķ–Ľ—Ć</h5>
            <p className="initial-data__item-subtitle">–¶–Ķ–Ľ—Ć—é –Ņ—Ä–ĺ–≥—Ä–į–ľ–ľ—č —Ź–≤–Ľ—Ź—é—ā—Ā—Ź —Ā–ĺ–≤–Ķ—Ä—ą–Ķ–Ĺ—Ā—ā–≤–ĺ–≤–į–Ĺ–ł–Ķ –ł (–ł–Ľ–ł) –Ņ–ĺ–Ľ—É—á–Ķ–Ĺ–ł–Ķ –Ĺ–ĺ–≤–ĺ–Ļ –ļ–ĺ–ľ–Ņ–Ķ—ā–Ķ–Ĺ—Ü–ł–ł, –Ĺ–Ķ–ĺ–Ī—Ö–ĺ–ī–ł–ľ–ĺ–Ļ –ī–Ľ—Ź –Ņ—Ä–ĺ—Ą–Ķ—Ā—Ā–ł–ĺ–Ĺ–į–Ľ—Ć–Ĺ–ĺ–Ļ –ī–Ķ—Ź—ā–Ķ–Ľ—Ć–Ĺ–ĺ—Ā—ā–ł, –ł (–ł–Ľ–ł) –Ņ–ĺ–≤—č—ą–Ķ–Ĺ–ł–Ķ –Ņ—Ä–ĺ—Ą–Ķ—Ā—Ā–ł–ĺ–Ĺ–į–Ľ—Ć–Ĺ–ĺ–≥–ĺ —É—Ä–ĺ–≤–Ĺ—Ź –≤ —Ä–į–ľ–ļ–į—Ö –ł–ľ–Ķ—é—Č–Ķ–Ļ—Ā—Ź –ļ–≤–į–Ľ–ł—Ą–ł–ļ–į—Ü–ł–ł –≤ –ĺ–Ī–Ľ–į—Ā—ā–ł –Ņ—Ä–ĺ—Ą–Ķ—Ā—Ā–ł–ĺ–Ĺ–į–Ľ—Ć–Ĺ–ĺ–Ļ –ī–Ķ—Ź—ā–Ķ–Ľ—Ć–Ĺ–ĺ—Ā—ā–ł.</p>
            <h5 className="initial-data__item-title">–ó–į–ī–į—á–ł</h5>
            <ul className="initial-data__item-target-tasks">
              <li className="initial-data__item-target-task target-task_type_first">–Ņ—Ä–ł–ĺ–Ī—Ä–Ķ—ā–Ķ–Ĺ–ł–Ķ –ĺ–Ī—É—á–į—é—Č–ł–ľ–ł—Ā—Ź –∑–Ĺ–į–Ĺ–ł–Ļ, —É–ľ–Ķ–Ĺ–ł–Ļ –ł –Ĺ–į–≤—č–ļ–ĺ–≤ –≤ —Ā–ĺ–ĺ—ā–≤–Ķ—ā—Ā—ā–≤–ł–ł —Ā —É—á–Ķ–Ī–Ĺ—č–ľ –Ņ–Ľ–į–Ĺ–ĺ–ľ –ł –ļ–į–Ľ–Ķ–Ĺ–ī–į—Ä–Ĺ—č–ľ –≥—Ä–į—Ą–ł–ļ–ĺ–ľ —É—á–Ķ–Ī–Ĺ–ĺ–≥–ĺ –Ņ—Ä–ĺ—Ü–Ķ—Ā—Ā–į</li>
              <li className="initial-data__item-target-task target-task_type_second">–ĺ—Ü–Ķ–Ĺ–ļ–į –ī–ĺ—Ā—ā–ł–∂–Ķ–Ĺ–ł–Ļ –ĺ–Ī—É—á–į—é—Č–ł–ľ–ł—Ā—Ź –Ņ–Ľ–į–Ĺ–ł—Ä—É–Ķ–ľ—č—Ö —Ä–Ķ–∑—É–Ľ—Ć—ā–į—ā–ĺ–≤ –ĺ–Ī—É—á–Ķ–Ĺ–ł—Ź</li>
            </ul>

            <h5 className="initial-data__item-title">–Ę—Ä—É–ī–ĺ–Ķ–ľ–ļ–ĺ—Ā—ā—Ć –ĺ—Ā–≤–ĺ–Ķ–Ĺ–ł—Ź –Ņ—Ä–ĺ–≥—Ä–į–ľ–ľ—č (–≤ —á–į—Ā–į—Ö)</h5>

            <input 
              className="initial-popup__input initial-data__target-input"
              placeholder="–≤–≤–Ķ–ī–ł—ā–Ķ –ļ–ĺ–Ľ–ł—á–Ķ—Ā—ā–≤–ĺ —á–į—Ā–ĺ–≤ —ā—Ä—É–ī–ĺ–Ķ–ľ–ļ–ĺ—Ā—ā–ł"
              type="number"
              id="initial-data-target-input-hours"
              name="initial-data-target-input-hours"
              autoComplete="off"
              value={countHours}
              onChange={handleChangeCountHours}
              onWheel={(e) => e.target.blur()}
              min="0"
              required
            >
            </input>

            {
              countHours > 15 &&
              <>
                <div className={`initial-data__target-info target-info_type_${currentProgramType.class}`}>
                  <h6 className="initial-data__target-title">{currentProgramType.text}</h6>
                  {
                    countHours > 249 &&
                    <button className=" btn initial-data__btn-change" onClick={changeProgramType}>–ė–∑–ľ–Ķ–Ĺ–ł—ā—Ć —ā–ł–Ņ</button>
                  }
                </div>
              </>
            }
            
            {
              isEditRights &&
              <div className="initial-data__buttons initial-data__buttons_type_requirements">
                <button className={`btn btn_type_save ${countHours > 15 ? "" : "btn_type_block" }`} type="button" onClick={handleSaveNewCompetence}>–°–ĺ—Ö—Ä–į–Ĺ–ł—ā—Ć –ī–į–Ĺ–Ĺ—č–Ķ</button>
                <span className={`initial-data__buttons-message ${requestMessageCompetence.isShow ? "initial-data__buttons-message_type_show" : "initial-data__buttons-message_type_hide"} ${requestMessageCompetence.type === 'error' ? "initial-data__buttons-message_type_error" : "initial-data__buttons-message_type_success"}`}>{requestMessageCompetence.text}</span>
              </div>
            }
          </li>

          <li className="initial-data__item initial-data__item_type_description">
            <h3 className="initial-data__item-name">–ź–Ĺ–Ĺ–ĺ—ā–į—Ü–ł—Ź –Ņ—Ä–ĺ–≥—Ä–į–ľ–ľ—č</h3>
            <p className="initial-data__item-subtitle initial-data__item-subtitle_type_structure">–£–ļ–į–∂–ł—ā–Ķ –ł–Ĺ—Ą–ĺ—Ä–ľ–į—Ü–ł—é –ĺ –Ņ—Ä–ĺ–≥—Ä–į–ľ–ľ–Ķ (–į–ļ—ā—É–į–Ľ—Ć–Ĺ–ĺ—Ā—ā—Ć, –Ĺ–ĺ–≤–ł–∑–Ĺ–į, —ā–Ķ–ĺ—Ä–Ķ—ā–ł—á–Ķ—Ā–ļ–į—Ź –ł –Ņ—Ä–į–ļ—ā–ł—á–Ķ—Ā–ļ–į—Ź –∑–Ĺ–į—á–ł–ľ–ĺ—Ā—ā—Ć).</p>
            <textarea 
              className="initial-data__item-qualification-text" 
              name="description-text" 
              placeholder="–í–≤–Ķ–ī–ł—ā–Ķ –ĺ–Ņ–ł—Ā–į–Ĺ–ł–Ķ –Ņ—Ä–ĺ–≥—Ä–į–ľ–ľ—č.."
              defaultValue={programDescription}
              onChange={handleChangeProgramDescription}
            >
            </textarea>
            {
              isEditRights &&
              <div className="initial-data__buttons initial-data__buttons_type_requirements">
                <button className="btn btn_type_save" type="button" onClick={handleSaveDescription}>–°–ĺ—Ö—Ä–į–Ĺ–ł—ā—Ć –ī–į–Ĺ–Ĺ—č–Ķ</button>
                <span className={`initial-data__buttons-message ${requestMessageDescription.isShow ? "initial-data__buttons-message_type_show" : "initial-data__buttons-message_type_hide"} ${requestMessageDescription.type === 'error' ? "initial-data__buttons-message_type_error" : "initial-data__buttons-message_type_success"}`}>{requestMessageDescription.text}</span>
              </div>
            }
          </li>

          <li className="initial-data__item initial-data__item_type_structure">
            <h3 className="initial-data__item-name">–Ę–ł–Ņ–ĺ–≤–į—Ź —Ā—ā—Ä—É–ļ—ā—É—Ä–į –Ē–ü–ü</h3>
            <p className="initial-data__item-subtitle initial-data__item-subtitle_type_structure">–í—č–Ī–Ķ—Ä–ł—ā–Ķ –Ĺ–į–ł–Ī–ĺ–Ľ–Ķ–Ķ –Ņ–ĺ–ī—Ö–ĺ–ī—Ź—Č—É—é —ā–ł–Ņ–ĺ–≤—É—é —Ā—ā—Ä—É–ļ—ā—É—Ä—É –Ē–ü–ü –ł–Ľ–ł —Ā–ĺ–∑–ī–į–Ļ—ā–Ķ —Ā–≤–ĺ—é. –Ę–ł–Ņ–ĺ–≤–į—Ź —Ā—ā—Ä—É–ļ—ā—É—Ä–į —Ā–ĺ—Ā—ā–ĺ–ł—ā –ł–∑ —Ä–į–∑–ī–Ķ–Ľ–ĺ–≤, –ļ–ĺ—ā–ĺ—Ä—č—Ö —Ā–Ľ–Ķ–ī—É–Ķ—ā –Ņ—Ä–ł–ī–Ķ—Ä–∂–ł–≤–į—ā—Ć—Ā—Ź –≤–ĺ –≤—Ä–Ķ–ľ—Ź —Ä–į–∑—Ä–į–Ī–ĺ—ā–ļ–ł –Ē–ü–ü.</p>
            <TypicalStructure 
              typologyParts={typologiesParts}
              initialDataVersion={dppDescription.ish_version_id}
              loggedIn={loggedIn}
              onEdit={openEditPartPopup}
              onRemove={openRemovePartPopup}
              onChoose={openChoosePartsPopup}
              onChangeOrder={changeTypologyPartsOrder}
              isEditRights={isEditRights}
            />
          </li>

          <li className="initial-data__item initial-data__item_type_info">
            <h3 className="initial-data__item-name">–Ě–ĺ—Ä–ľ–į—ā–ł–≤–Ĺ–ĺ-—Ā–Ņ—Ä–į–≤–ĺ—á–Ĺ–į—Ź –ł–Ĺ—Ą–ĺ—Ä–ľ–į—Ü–ł—Ź</h3>
            <p className="initial-data__item-subtitle initial-data__item-subtitle_type_info">–Ē–ĺ–Ī–į–≤—Ć—ā–Ķ –Ĺ–į–∑–≤–į–Ĺ–ł—Ź –ł—Ā—ā–ĺ—á–Ĺ–ł–ļ–ĺ–≤ –Ě–°–ė, –ļ–ĺ—ā–ĺ—Ä—č–Ķ –Ī—É–ī—É—ā –ł—Ā–Ņ–ĺ–Ľ—Ć–∑–ĺ–≤–į–Ĺ—č –≤ –Ē–ü–ü. –í—č —ā–į–ļ–∂–Ķ —Ā–ľ–ĺ–∂–Ķ—ā–Ķ –ī–ĺ–Ņ–ĺ–Ľ–Ĺ–ł—ā—Ć –ī–į–Ĺ–Ĺ—č–Ļ —Ā–Ņ–ł—Ā–ĺ–ļ –Ĺ–į –Ņ–ĺ—Ā–Ľ–Ķ–ī—É—é—Č–ł—Ö —ć—ā–į–Ņ–į—Ö —Ä–į–∑—Ä–į–Ī–ĺ—ā–ļ–ł –Ē–ü–ü.</p>
            {
              isEditRights && 
              <button className="btn btn_type_add initial-data__btn_type_add-nsi" onClick={openNsiPopup}>–Ē–ĺ–Ī–į–≤–ł—ā—Ć –Ĺ–ĺ–≤—č–Ļ –ł—Ā—ā–ĺ—á–Ĺ–ł–ļ</button>
            }
            <ReferenceInformation 
              nsi={nsiProgram}
              onEdit={openEditNsiPopup}
              onRemove={openRemoveNsiPopup}
              isEditRights={isEditRights}
            />
          </li>

        </ul>

        <button className="btn btn_type_next" type="button" onClick={() => history.push("/main/development/dpp/zoon")}>–ü–Ķ—Ä–Ķ–Ļ—ā–ł –ļ —Ā–Ľ–Ķ–ī—É—é—Č–Ķ–ľ—É —ć—ā–į–Ņ—É</button>

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
        isJob–°lassificationPopupOpen &&
        <Job–°lassificationPopup
          isOpen={isJob–°lassificationPopupOpen}
          onClose={closeInitialDataPopups}
          isLoading={isLoading}
          isLoadingPopup={isLoadingPopup}
          job–°lassification={job–°lassification}
          job–°lassificationProgram={job–°lassificationProgram}
          onSave={handleSelectJob–°lassification}
          onAdd={handleAddJob–°lassification}
          onEdit={handleEditJob–°lassification}
          onRemove={handleRemoveJob–°lassification}
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
          isLoading={isLoading}
        />

      }

      {
        isEditNsiPopupOpen &&
        <EditNsiPopup
          isOpen={isEditNsiPopupOpen}
          onClose={closeInitialDataPopups}  
          nsi={currentNsiItem}
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