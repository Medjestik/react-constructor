import React from 'react';
import './NsiPopup.css';
import Popup from '../Popup.js';
import FederalLawPopup from './FederalLawPopup/FederalLawPopup.js';
import RussiaLawPopup from './RussiaLawPopup/RussiaLawPopup.js';
import RussiaCodexPopup from './RussiaCodexPopup/RussiaCodexPopup.js';
import PresidentEdictPopup from './PresidentEdictPopup/PresidentEdictPopup.js';
import GovernmentDecreePopup from './GovernmentDecreePopup/GovernmentDecreePopup.js';
import GovernmentOrderPopup from './GovernmentOrderPopup/GovernmentOrderPopup.js';
import PresidentAssignmentPopup from './PresidentAssignmentPopup/PresidentAssignmentPopup.js';
import PassportNationalProjectPopup from './PassportNationalProjectPopup/PassportNationalProjectPopup.js';
import PassportFederalProjectPopup from './PassportFederalProjectPopup/PassportFederalProjectPopup.js';
import PassportProjectPopup from './PassportProjectPopup/PassportProjectPopup.js';
import OrderPopup from './OrderPopup/OrderPopup.js';
import RegulationPopup from './RegulationPopup/RegulationPopup.js';
import TechnicalRegulationPopup from './TechnicalRegulationPopup/TechnicalRegulationPopup.js';
import RussiaConstructionResolutionPopup from './RussiaConstructionResolutionPopup/RussiaConstructionResolutionPopup.js';
import OrderRussiaSciencePopup from './OrderRussiaSciencePopup/OrderRussiaSciencePopup.js';
import OrderRussiaTransportPopup from './OrderRussiaTransportPopup/OrderRussiaTransportPopup.js';
import OrderRussiaGosConstructionPopup from './OrderRussiaGosConstructionPopup/OrderRussiaGosConstructionPopup.js'; 
import OrderRussiaMinConstructionPopup from './OrderRussiaMinConstructionPopup/OrderRussiaMinConstructionPopup.js';
import DispositionRussiaSciencePopup from './DispositionRussiaSciencePopup/DispositionRussiaSciencePopup.js';
import DispositionRussiaTransportPopup from './DispositionRussiaTransportPopup/DispositionRussiaTransportPopup.js'; 
import DispositionRussiaMinConstructionPopup from './DispositionRussiaMinConstructionPopup/DispositionRussiaMinConstructionPopup.js';
import OrderFederalServicePopup from './OrderFederalServicePopup/OrderFederalServicePopup.js';
import DispositionFederalServicePopup from './DispositionFederalServicePopup/DispositionFederalServicePopup.js';
import GuidelinesPopup from './GuidelinesPopup/GuidelinesPopup.js';
import SampleProgramPopup from './SampleProgramPopup/SampleProgramPopup.js';
import RequirementsPopup from './RequirementsPopup/RequirementsPopup.js';
import CatalogPopup from './СatalogPopup/СatalogPopup.js';
import StandardRPopup from './StandardRPopup/StandardRPopup.js';
import StandardPopup from './StandardPopup/StandardPopup.js';
import ODMPopup from './ODMPopup/ODMPopup.js';
import STOPopup from './STOPopup/STOPopup.js';
import SPOPopup from './SPOPopup/SPOPopup.js';
import GSNPopup from './GSNPopup/GSNPopup.js';
import SNIPPopup from './SNIPPopup/SNIPPopup.js';
import SPPopup from './SPPopup/SPPopup.js';
import ENIRPopup from './ENIRPopup/ENIRPopup.js';
import TYPopup from './TYPopup/TYPopup.js';
import ISOPopup from './ISOPopup/ISOPopup.js';
import PNSTPopup from './PNSTPopup/PNSTPopup.js';
import OfficialSitePopup from './OfficialSitePopup/OfficialSitePopup.js';
import TextbookPopup from './TextbookPopup/TextbookPopup.js';
import DefineNsiImg from '../../Define/DefineNsiImg/DefineNsiImg.js';

function NsiPopup({ isOpen, onClose, nsiTypes, onAdd }) {       
  const [isFederalLawPopupOpen, setIsFederalLawPopupOpen] = React.useState(false);  
  const [isRussiaLawPopupOpen, setIsRussiaLawPopupOpen] = React.useState(false);
  const [isRussiaCodexPopupOpen, setIsRussiaCodexPopupOpen] = React.useState(false);
  const [isPresidentEdictPopupOpen, setIsPresidentEdictPopupOpen] = React.useState(false);
  const [isGovernmentDecreePopupOpen, setIsGovernmentDecreePopupOpen] = React.useState(false); 
  const [isGovernmentOrderPopupOpen, setIsGovernmentOrderPopupOpen] = React.useState(false);
  const [isPresidentAssignmentPopupOpen, setIsPresidentAssignmentPopupOpen] = React.useState(false);
  const [isPassportNationalProjectPopupOpen, setIsPassportNationalProjectPopupOpen] = React.useState(false); 
  const [isPassportFederalProjectPopupOpen, setIsPassportFederalProjectPopupOpen] = React.useState(false); 
  const [isPassportProjectPopupOpen, setIsPassportProjectPopupOpen] = React.useState(false);
  const [isOrderPopupOpen, setIsOrderPopupOpen] = React.useState(false);
  const [isRegulationPopupOpen, setIsRegulationPopupOpen] = React.useState(false);
  const [isTechnicalRegulationPopupOpen, setIsTechnicalRegulationPopupOpen] = React.useState(false);
  const [isRussiaConstructionResolutionPopupOpen, setIsRussiaConstructionResolutionPopupOpen] = React.useState(false);
  const [isOrderRussiaSciencePopupOpen, setIsOrderRussiaSciencePopupOpen] = React.useState(false);
  const [isOrderRussiaTransportPopupOpen, setIsOrderRussiaTransportPopupOpen] = React.useState(false);
  const [isOrderRussiaGosConstructionPopupOpen, setIsOrderRussiaGosConstructionPopupOpen] = React.useState(false);
  const [isOrderRussiaMinConstructionPopupOpen, setIsOrderRussiaMinConstructionPopupOpen] = React.useState(false);
  const [isDispositionRussiaSciencePopupOpen, setIsDispositionRussiaSciencePopupOpen] = React.useState(false);
  const [isDispositionRussiaTransportPopupOpen, setIsDispositionRussiaTransportPopupOpen] = React.useState(false);
  const [isDispositionRussiaMinConstructionPopupOpen, setIsDispositionRussiaMinConstructionPopupOpen] = React.useState(false);  
  const [isOrderFederalServicePopupOpen, setIsOrderFederalServicePopupOpen] = React.useState(false);
  const [isDispositionFederalServicePopupOpen, setIsDispositionFederalServicePopupOpen] = React.useState(false);
  const [isGuidelinesPopupOpen, setIsGuidelinesPopupOpen] = React.useState(false);
  const [isSampleProgramPopupOpen, setIsSampleProgramPopupOpen] = React.useState(false);
  const [isRequirementsPopupOpen, setIsRequirementsPopupOpen] = React.useState(false);
  const [isCatalogPopupOpen, setIsCatalogPopupOpen] = React.useState(false);
  const [isStandardRPopupOpen, setIsStandardRPopupOpen] = React.useState(false);
  const [isStandardPopupOpen, setIsStandardPopupOpen] = React.useState(false);
  const [isODMPopupOpen, setIsODMPopupOpen] = React.useState(false);
  const [isSTOPopupOpen, setIsSTOPopupOpen] = React.useState(false);
  const [isSPOPopupOpen, setIsSPOPopupOpen] = React.useState(false);
  const [isGSNPopupOpen, setIsGSNPopupOpen] = React.useState(false);
  const [isSNIPPopupOpen, setIsSNIPPopupOpen] = React.useState(false);
  const [isSPPopupOpen, setIsSPPopupOpen] = React.useState(false);
  const [isENIRPopupOpen, setIsENIRPopupOpen] = React.useState(false);
  const [isTYPopupOpen, setIsTYPopupOpen] = React.useState(false);
  const [isISOPopupOpen, setIsISOPopupOpen] = React.useState(false);
  const [isPNSTPopupOpen, setIsPNSTPopupOpen] = React.useState(false);
  const [isOfficialSitePopupOpen, setIsOfficialSitePopupOpen] = React.useState(false);
  const [isTextbookPopupPopupOpen, setIsTextbookPopupPopupOpen] = React.useState(false);
  const [currentElemId, setCurrentElemId] = React.useState(0);
  const [searchText, setSearchText] = React.useState('');
  const [filteredNsiTypes, setFilteredNsiTypes] = React.useState([]);

  const emptyNsi = {
    nsiDate: "",
    nsiNumber: "",
    nsiEdit: "",
    nsiName: "",
    nsiApproveName: "",
    nsiProtocolDate: "",
    nsiProtocolNumber: "",
    nsiCode: "",
    nsiPeriod: "",
    nsiBasis: "",
    nsiAuthors: "",
    nsiEditor: "",
    nsiCity: "",
    nsiYear: "",
    nsiPages: "",
    nsiLink: "",
    nsiFullName: "",
  }

  function printDate(obj) {
    let t=new Date(obj);
    let y=t.getFullYear();
    let d=t.getDate();
    let mon=t.getMonth();
    let s = "";
    switch (mon)
    {
      case 0: s="января"; break;
      case 1: s="февраля"; break;
      case 2: s="марта"; break;
      case 3: s="апреля"; break;
      case 4: s="мая"; break;
      case 5: s="июня"; break;
      case 6: s="июля"; break;
      case 7: s="августа"; break;
      case 8: s="сентября"; break;
      case 9: s="октября"; break;
      case 10: s="ноября"; break;
      case 11: s="декабря"; break;
      default: s=""
    }
    return d+" "+s+" "+y;
  }
  

  function searchByType(e) {
    setSearchText(e.target.value);
  }

  React.useEffect(() => {
    const currentNsi = nsiTypes.filter((item) => {
      return item.name.toLowerCase().includes(searchText.toLocaleLowerCase());
    })
    console.log(currentNsi);
    setFilteredNsiTypes(currentNsi);
  }, [nsiTypes, searchText]);

  React.useEffect(() => {
    setFilteredNsiTypes(nsiTypes);
    setSearchText('');
    return () => {
      setFilteredNsiTypes([]);
    };
    // eslint-disable-next-line
  }, [isOpen]);

  function federalLawPopupOpen(id) {
    setIsFederalLawPopupOpen(true);
    setCurrentElemId(id);
  }

  function russiaLawPopupOpen(id) {
    setIsRussiaLawPopupOpen(true);
    setCurrentElemId(id);
  }

  function russiaCodexPopupOpen(id) {
    setIsRussiaCodexPopupOpen(true);
    setCurrentElemId(id);
  }

  function presidentEdictPopupOpen(id) {
    setIsPresidentEdictPopupOpen(true);
    setCurrentElemId(id);
  }

  function governmentDecreePopupOpen(id) {
    setIsGovernmentDecreePopupOpen(true);
    setCurrentElemId(id);
  }

  function governmentOrderPopupOpen(id) {
    setIsGovernmentOrderPopupOpen(true);
    setCurrentElemId(id);
  }

  function presidentAssignmentPopupOpen(id) {
    setIsPresidentAssignmentPopupOpen(true);
    setCurrentElemId(id);
  }

  function passportNationalProjectPopupOpen(id) {
    setIsPassportNationalProjectPopupOpen(true);
    setCurrentElemId(id);
  }

  function passportFederalProjectPopupOpen(id) {
    setIsPassportFederalProjectPopupOpen(true);
    setCurrentElemId(id);
  }

  function passportProjectPopupOpen(id) {
    setIsPassportProjectPopupOpen(true);
    setCurrentElemId(id);
  }

  function orderPopupOpen(id) {
    setIsOrderPopupOpen(true);
    setCurrentElemId(id);
  }

  function regulationPopupOpen(id) {
    setIsRegulationPopupOpen(true);
    setCurrentElemId(id);
  }

  function technicalRegulationPopupOpen(id) {
    setIsTechnicalRegulationPopupOpen(true);
    setCurrentElemId(id);
  }

  function russiaConstructionResolutionPopupOpen(id) {
    setIsRussiaConstructionResolutionPopupOpen(true);
    setCurrentElemId(id);
  }

  function orderRussiaSciencePopupOpen(id) {
    setIsOrderRussiaSciencePopupOpen(true);
    setCurrentElemId(id);
  }

  function orderRussiaTransportPopupOpen(id) {
    setIsOrderRussiaTransportPopupOpen(true);
    setCurrentElemId(id);
  }

  function orderRussiaGosConstructionPopupOpen(id) {
    setIsOrderRussiaGosConstructionPopupOpen(true);
    setCurrentElemId(id);
  }

  function orderRussiaMinConstructionPopupOpen(id) {
    setIsOrderRussiaMinConstructionPopupOpen(true);
    setCurrentElemId(id);
  }

  function dispositionRussiaSciencePopupOpen(id) {
    setIsDispositionRussiaSciencePopupOpen(true);
    setCurrentElemId(id);
  }

  function dispositionRussiaTransportPopupOpen(id) {
    setIsDispositionRussiaTransportPopupOpen(true);
    setCurrentElemId(id);
  }

  function dispositionRussiaMinConstructionPopupOpen(id) {
    setIsDispositionRussiaMinConstructionPopupOpen(true);
    setCurrentElemId(id);
  }

  function orderFederalServicePopupOpen(id) {
    setIsOrderFederalServicePopupOpen(true);
    setCurrentElemId(id);
  }

  function dispositionFederalServicePopupOpen(id) {
    setIsDispositionFederalServicePopupOpen(true);
    setCurrentElemId(id);
  }

  function guidelinesPopupOpen(id) {
    setIsGuidelinesPopupOpen(true);
    setCurrentElemId(id);
  }

  function sampleProgramPopupOpen(id) {
    setIsSampleProgramPopupOpen(true);
    setCurrentElemId(id);
  }

  function requirementsPopupOpen(id) {
    setIsRequirementsPopupOpen(true);
    setCurrentElemId(id);
  }

  function catalogPopupOpen(id) {
    setIsCatalogPopupOpen(true);
    setCurrentElemId(id);
  }

  function standardRPopupOpen(id) {
    setIsStandardRPopupOpen(true);
    setCurrentElemId(id);
  }

  function standardPopupOpen(id) {
    setIsStandardPopupOpen(true);
    setCurrentElemId(id);
  }

  function odmPopupOpen(id) {
    setIsODMPopupOpen(true);
    setCurrentElemId(id);
  }

  function stoPopupOpen(id) {
    setIsSTOPopupOpen(true);
    setCurrentElemId(id);
  }

  function spoPopupOpen(id) {
    setIsSPOPopupOpen(true);
    setCurrentElemId(id);
  }

  function gsnPopupOpen(id) {
    setIsGSNPopupOpen(true);
    setCurrentElemId(id);
  }

  function snipPopupOpen(id) {
    setIsSNIPPopupOpen(true);
    setCurrentElemId(id);
  }

  function spPopupOpen(id) {
    setIsSPPopupOpen(true);
    setCurrentElemId(id);
  }

  function enirPopupOpen(id) {
    setIsENIRPopupOpen(true);
    setCurrentElemId(id);
  }

  function tyPopupOpen(id) {
    setIsTYPopupOpen(true);
    setCurrentElemId(id);
  }

  function isoPopupOpen(id) {
    setIsISOPopupOpen(true);
    setCurrentElemId(id);
  }

  function pnstPopupOpen(id) {
    setIsPNSTPopupOpen(true);
    setCurrentElemId(id);
  }

  function officialSitePopupOpen(id) {
    setIsOfficialSitePopupOpen(true);
    setCurrentElemId(id);
  }

  function textbookPopupOpen(id) {
    setIsTextbookPopupPopupOpen(true);
    setCurrentElemId(id);
  }

  function closeAllNsiPopup() {
    setIsFederalLawPopupOpen(false);
    setIsRussiaLawPopupOpen(false);
    setIsRussiaCodexPopupOpen(false);
    setIsPresidentEdictPopupOpen(false);
    setIsGovernmentDecreePopupOpen(false);
    setIsGovernmentOrderPopupOpen(false)
    setIsPresidentAssignmentPopupOpen(false);
    setIsPassportNationalProjectPopupOpen(false);
    setIsPassportFederalProjectPopupOpen(false);
    setIsPassportProjectPopupOpen(false);
    setIsOrderPopupOpen(false);
    setIsRegulationPopupOpen(false);
    setIsTechnicalRegulationPopupOpen(false);
    setIsRussiaConstructionResolutionPopupOpen(false);
    setIsOrderRussiaSciencePopupOpen(false);
    setIsOrderRussiaTransportPopupOpen(false);
    setIsOrderRussiaGosConstructionPopupOpen(false);
    setIsOrderRussiaMinConstructionPopupOpen(false);
    setIsDispositionRussiaSciencePopupOpen(false);
    setIsDispositionRussiaTransportPopupOpen(false);
    setIsDispositionRussiaMinConstructionPopupOpen(false);
    setIsOrderFederalServicePopupOpen(false);
    setIsDispositionFederalServicePopupOpen(false);
    setIsGuidelinesPopupOpen(false);
    setIsSampleProgramPopupOpen(false);
    setIsRequirementsPopupOpen(false);
    setIsCatalogPopupOpen(false);
    setIsStandardRPopupOpen(false);
    setIsStandardPopupOpen(false);
    setIsODMPopupOpen(false);
    setIsSTOPopupOpen(false);
    setIsSPOPopupOpen(false);
    setIsGSNPopupOpen(false);
    setIsSNIPPopupOpen(false);
    setIsSPPopupOpen(false);
    setIsENIRPopupOpen(false);
    setIsTYPopupOpen(false);
    setIsISOPopupOpen(false);
    setIsPNSTPopupOpen(false);
    setIsOfficialSitePopupOpen(false);
    setIsTextbookPopupPopupOpen(false);
  }

  function defineNsiPopup(type) {  
    switch (type.id) {
      case 9: /* Федеральный закон */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => federalLawPopupOpen(type.id)}>Выбрать</button>
        )
      case 10: /* Закон РФ */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => russiaLawPopupOpen(type.id)}>Выбрать</button>
        )
      case 11: /* Кодекс РФ */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => russiaCodexPopupOpen(type.id)}>Выбрать</button>
        )
      case 12: /* Указ Президента РФ */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => presidentEdictPopupOpen(type.id)}>Выбрать</button>
        )
      case 13: /* Постановление Правительства РФ */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => governmentDecreePopupOpen(type.id)}>Выбрать</button>
        )
      case 14: /* Распоряжение Правительства РФ */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => governmentOrderPopupOpen(type.id)}>Выбрать</button>
        )
      case 15: /* Паспорт национального проекта */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => passportNationalProjectPopupOpen(type.id)}>Выбрать</button>
        )
      case 16: /* Поручение Президента РФ */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => presidentAssignmentPopupOpen(type.id)}>Выбрать</button>
        )
      case 17: /* Паспорт федерального проекта */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => passportFederalProjectPopupOpen(type.id)}>Выбрать</button>
        )
      case 18: /* Паспорт проекта */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => passportProjectPopupOpen(type.id)}>Выбрать</button>
        )
      case 19: /* Порядок */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => orderPopupOpen(type.id)}>Выбрать</button>
        )
      case 20: /* Регламент */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => regulationPopupOpen(type.id)}>Выбрать</button>
        )
      case 21: /* Технический регламент таможенного союза */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => technicalRegulationPopupOpen(type.id)}>Выбрать</button>
        )
      case 22: /* Постановление Госстроя России */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => russiaConstructionResolutionPopupOpen(type.id)}>Выбрать</button>
        )
      case 23: /* Приказ Минобрнауки России */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => orderRussiaSciencePopupOpen(type.id)}>Выбрать</button>
        )
      case 24: /* Приказ Минтранса России */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => orderRussiaTransportPopupOpen(type.id)}>Выбрать</button>
        )
      case 25: /* Приказ Госстроя России */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => orderRussiaGosConstructionPopupOpen(type.id)}>Выбрать</button>
        )
      case 26: /* Приказ Минстроя России */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => orderRussiaMinConstructionPopupOpen(type.id)}>Выбрать</button>
        )
      case 27: /* Приказ Федеральной службы */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => orderFederalServicePopupOpen(type.id)}>Выбрать</button>
        )
      case 28: /* Распоряжение Минобрнауки России */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => dispositionRussiaSciencePopupOpen(type.id)}>Выбрать</button>
        )
      case 29: /* Распоряжение Минтранса России */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => dispositionRussiaTransportPopupOpen(type.id)}>Выбрать</button>
        )
      case 30: /* Распоряжение Минстроя России */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => dispositionRussiaMinConstructionPopupOpen(type.id)}>Выбрать</button>
        )
      case 31: /* Распоряжение Федеральной службы */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => dispositionFederalServicePopupOpen(type.id)}>Выбрать</button>
        )
      case 32: /* Методические рекомендации */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => guidelinesPopupOpen(type.id)}>Выбрать</button>
        )
      case 33: /* Примерная программа */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => sampleProgramPopupOpen(type.id)}>Выбрать</button>
        )
      case 35: /* Требования */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => requirementsPopupOpen(type.id)}>Выбрать</button>
        )
      case 36: /* Каталог */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => catalogPopupOpen(type.id)}>Выбрать</button>
        )
      case 37: /* ГОСТ Р */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => standardRPopupOpen(type.id)}>Выбрать</button>
        )
      case 38: /* ГОСТ */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => standardPopupOpen(type.id)}>Выбрать</button>
        )
      case 39: /* ОДМ */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => odmPopupOpen(type.id)}>Выбрать</button>
        )
      case 40: /* СТО */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => stoPopupOpen(type.id)}>Выбрать</button>
        )
      case 41: /* СПО */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => spoPopupOpen(type.id)}>Выбрать</button>
        )
      case 42: /* ГСН (Сборник) */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => gsnPopupOpen(type.id)}>Выбрать</button>
        )
      case 43: /* СНиПы */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => snipPopupOpen(type.id)}>Выбрать</button>
        )
      case 44: /* СП */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => spPopupOpen(type.id)}>Выбрать</button>
        )
      case 45: /* ЕНИР */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => enirPopupOpen(type.id)}>Выбрать</button>
        )
      case 46: /* ТУ */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => tyPopupOpen(type.id)}>Выбрать</button>
        )
      case 47: /* ISO */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => isoPopupOpen(type.id)}>Выбрать</button>
        )
      case 48: /* Учебники, монографии */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => textbookPopupOpen(type.id)}>Выбрать</button>
        )
      case 49: /* ПНСТ */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => pnstPopupOpen(type.id)}>Выбрать</button>
        )      
      case 50: /* Официальный сайт */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => officialSitePopupOpen(type.id)}>Выбрать</button>
        )    
      default:
        return (<div>Тип не загрузился</div>)
    }
  }

  React.useEffect(() => {
    setCurrentElemId(0);
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <>
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="popup__form popup__form_type_large">
        <h3 className="initial-popup__title">Выберите тип источника</h3>
          <div className="search nsi-seacrh">
            <input
            className="input-search"
            placeholder="поиск по названию типа"
            type="text"
            id="search-input-nsi-type"
            name="search-input-nsi-name"
            autoComplete="off"
            value={searchText}
            onChange={searchByType}
            >
            </input>
          </div>
        <ul className="nsi-popup__list">
          {
            filteredNsiTypes.map((type, i) => (
              <li className="nsi-popup__item" key={i}>
                <DefineNsiImg nsiId={type.id} />
                <div className="nsi-popup__item-info">
                  <h4 className="nsi-popup__item-name">{type.name || "Название"}</h4>
                  <p className="nsi-popup__item-description">{type.description || ""}</p>
                </div>
                {defineNsiPopup(type)}
              </li>
            ))
          }
        </ul>
      </div>
    </Popup>

    <FederalLawPopup
      isOpen={isFederalLawPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <RussiaLawPopup
      isOpen={isRussiaLawPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <RussiaCodexPopup
      isOpen={isRussiaCodexPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <PresidentEdictPopup
      isOpen={isPresidentEdictPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <GovernmentDecreePopup
      isOpen={isGovernmentDecreePopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <GovernmentOrderPopup
      isOpen={isGovernmentOrderPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <PresidentAssignmentPopup
      isOpen={isPresidentAssignmentPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <PassportNationalProjectPopup
      isOpen={isPassportNationalProjectPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <PassportFederalProjectPopup
      isOpen={isPassportFederalProjectPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <PassportProjectPopup
      isOpen={isPassportProjectPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <OrderPopup
      isOpen={isOrderPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <RegulationPopup
      isOpen={isRegulationPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <TechnicalRegulationPopup
      isOpen={isTechnicalRegulationPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <RussiaConstructionResolutionPopup
      isOpen={isRussiaConstructionResolutionPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <OrderRussiaSciencePopup
      isOpen={isOrderRussiaSciencePopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <OrderRussiaTransportPopup
      isOpen={isOrderRussiaTransportPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <OrderRussiaGosConstructionPopup
      isOpen={isOrderRussiaGosConstructionPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <OrderRussiaMinConstructionPopup
      isOpen={isOrderRussiaMinConstructionPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

  <DispositionRussiaSciencePopup
      isOpen={isDispositionRussiaSciencePopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <DispositionRussiaTransportPopup
      isOpen={isDispositionRussiaTransportPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <DispositionRussiaMinConstructionPopup
      isOpen={isDispositionRussiaMinConstructionPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <OrderFederalServicePopup
      isOpen={isOrderFederalServicePopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />
    
    <DispositionFederalServicePopup
      isOpen={isDispositionFederalServicePopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <GuidelinesPopup
      isOpen={isGuidelinesPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <SampleProgramPopup
      isOpen={isSampleProgramPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <RequirementsPopup
      isOpen={isRequirementsPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <CatalogPopup
      isOpen={isCatalogPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <StandardRPopup
      isOpen={isStandardRPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <StandardPopup
      isOpen={isStandardPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <ODMPopup
      isOpen={isODMPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />
    
    <STOPopup
      isOpen={isSTOPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <SPOPopup
      isOpen={isSPOPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <GSNPopup
      isOpen={isGSNPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <SNIPPopup
      isOpen={isSNIPPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <SPPopup
      isOpen={isSPPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <ENIRPopup
      isOpen={isENIRPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <TYPopup
      isOpen={isTYPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <ISOPopup
      isOpen={isISOPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <PNSTPopup
      isOpen={isPNSTPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <OfficialSitePopup
      isOpen={isOfficialSitePopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />

    <TextbookPopup
      isOpen={isTextbookPopupPopupOpen}
      onClose={closeAllNsiPopup}
      emptyNsi={emptyNsi}
      onAdd={onAdd}
      id={currentElemId}
      printDate={printDate}
    />
    
    </>
  )
}

export default NsiPopup;