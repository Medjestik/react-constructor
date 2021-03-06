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
import OrderRosStatPopup from './OrderRosStatPopup/OrderRosStatPopup.js';
import DispositionRussiaSciencePopup from './DispositionRussiaSciencePopup/DispositionRussiaSciencePopup.js';
import DispositionRussiaTransportPopup from './DispositionRussiaTransportPopup/DispositionRussiaTransportPopup.js'; 
import DispositionRussiaMinConstructionPopup from './DispositionRussiaMinConstructionPopup/DispositionRussiaMinConstructionPopup.js';
import OrderFederalServicePopup from './OrderFederalServicePopup/OrderFederalServicePopup.js';
import DispositionFederalServicePopup from './DispositionFederalServicePopup/DispositionFederalServicePopup.js';
import GuidelinesPopup from './GuidelinesPopup/GuidelinesPopup.js';
import SampleProgramPopup from './SampleProgramPopup/SampleProgramPopup.js';
import RequirementsPopup from './RequirementsPopup/RequirementsPopup.js';
import CatalogPopup from './??atalogPopup/??atalogPopup.js';
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
import LocalOrganizationAct from './LocalOrganizationAct/LocalOrganizationAct.js';
import DefineNsiImg from '../../Define/DefineNsiImg/DefineNsiImg.js';

function NsiPopup({ isOpen, onClose, nsiTypes, onAdd, isLoading }) {       
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
  const [isOrderRosStatPopupOpen, setIsOrderRosStatPopupOpen] = React.useState(false);
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
  const [isLocalOrganizationActPopupOpen, setIsLocalOrganizationActPopupOpen] = React.useState(false);
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
      case 0: s="????????????"; break;
      case 1: s="??????????????"; break;
      case 2: s="??????????"; break;
      case 3: s="????????????"; break;
      case 4: s="??????"; break;
      case 5: s="????????"; break;
      case 6: s="????????"; break;
      case 7: s="??????????????"; break;
      case 8: s="????????????????"; break;
      case 9: s="??????????????"; break;
      case 10: s="????????????"; break;
      case 11: s="??????????????"; break;
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

  function orderRosStatPopupOpen(id) {
    setIsOrderRosStatPopupOpen(true);
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

  function localOrganizationActPopupOpen(id) {
    setIsLocalOrganizationActPopupOpen(true);
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
    setIsOrderRosStatPopupOpen(false);
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
    setIsLocalOrganizationActPopupOpen(false);
  }

  function defineNsiPopup(type) {  
    switch (type.id) {
      case 9: /* ?????????????????????? ?????????? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => federalLawPopupOpen(type.id)}>??????????????</button>
        )
      case 10: /* ?????????? ???? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => russiaLawPopupOpen(type.id)}>??????????????</button>
        )
      case 11: /* ???????????? ???? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => russiaCodexPopupOpen(type.id)}>??????????????</button>
        )
      case 12: /* ???????? ???????????????????? ???? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => presidentEdictPopupOpen(type.id)}>??????????????</button>
        )
      case 13: /* ?????????????????????????? ?????????????????????????? ???? */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => governmentDecreePopupOpen(type.id)}>??????????????</button>
        )
      case 14: /* ???????????????????????? ?????????????????????????? ???? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => governmentOrderPopupOpen(type.id)}>??????????????</button>
        )
      case 15: /* ?????????????? ?????????????????????????? ?????????????? */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => passportNationalProjectPopupOpen(type.id)}>??????????????</button>
        )
      case 16: /* ?????????????????? ???????????????????? ???? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => presidentAssignmentPopupOpen(type.id)}>??????????????</button>
        )
      case 17: /* ?????????????? ???????????????????????? ?????????????? */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => passportFederalProjectPopupOpen(type.id)}>??????????????</button>
        )
      case 18: /* ?????????????? ?????????????? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => passportProjectPopupOpen(type.id)}>??????????????</button>
        )
      case 19: /* ?????????????? */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => orderPopupOpen(type.id)}>??????????????</button>
        )
      case 20: /* ?????????????????? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => regulationPopupOpen(type.id)}>??????????????</button>
        )
      case 21: /* ?????????????????????? ?????????????????? ?????????????????????? ?????????? */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => technicalRegulationPopupOpen(type.id)}>??????????????</button>
        )
      case 22: /* ?????????????????????????? ???????????????? ???????????? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => russiaConstructionResolutionPopupOpen(type.id)}>??????????????</button>
        )
      case 23: /* ???????????? ?????????????????????? ???????????? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => orderRussiaSciencePopupOpen(type.id)}>??????????????</button>
        )
      case 24: /* ???????????? ?????????????????? ???????????? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => orderRussiaTransportPopupOpen(type.id)}>??????????????</button>
        )
      case 25: /* ???????????? ???????????????? ???????????? */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => orderRussiaGosConstructionPopupOpen(type.id)}>??????????????</button>
        )
      case 26: /* ???????????? ???????????????? ???????????? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => orderRussiaMinConstructionPopupOpen(type.id)}>??????????????</button>
        )
      case 27: /* ???????????? ?????????????????????? ???????????? */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => orderFederalServicePopupOpen(type.id)}>??????????????</button>
        )
      case 28: /* ???????????????????????? ?????????????????????? ???????????? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => dispositionRussiaSciencePopupOpen(type.id)}>??????????????</button>
        )
      case 29: /* ???????????????????????? ?????????????????? ???????????? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => dispositionRussiaTransportPopupOpen(type.id)}>??????????????</button>
        )
      case 30: /* ???????????????????????? ???????????????? ???????????? */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => dispositionRussiaMinConstructionPopupOpen(type.id)}>??????????????</button>
        )
      case 31: /* ???????????????????????? ?????????????????????? ???????????? */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => dispositionFederalServicePopupOpen(type.id)}>??????????????</button>
        )
      case 32: /* ???????????????????????? ???????????????????????? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => guidelinesPopupOpen(type.id)}>??????????????</button>
        )
      case 33: /* ?????????????????? ?????????????????? */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => sampleProgramPopupOpen(type.id)}>??????????????</button>
        )
      case 35: /* ???????????????????? */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => requirementsPopupOpen(type.id)}>??????????????</button>
        )
      case 36: /* ?????????????? */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => catalogPopupOpen(type.id)}>??????????????</button>
        )
      case 37: /* ???????? ?? */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => standardRPopupOpen(type.id)}>??????????????</button>
        )
      case 38: /* ???????? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => standardPopupOpen(type.id)}>??????????????</button>
        )
      case 39: /* ?????? */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => odmPopupOpen(type.id)}>??????????????</button>
        )
      case 40: /* ?????? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => stoPopupOpen(type.id)}>??????????????</button>
        )
      case 41: /* ?????? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => spoPopupOpen(type.id)}>??????????????</button>
        )
      case 42: /* ?????? (??????????????) */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => gsnPopupOpen(type.id)}>??????????????</button>
        )
      case 43: /* ?????????? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => snipPopupOpen(type.id)}>??????????????</button>
        )
      case 44: /* ???? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => spPopupOpen(type.id)}>??????????????</button>
        )
      case 45: /* ???????? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => enirPopupOpen(type.id)}>??????????????</button>
        )
      case 46: /* ???? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => tyPopupOpen(type.id)}>??????????????</button>
        )
      case 47: /* ISO */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => isoPopupOpen(type.id)}>??????????????</button>
        )
      case 48: /* ????????????????, ???????????????????? */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => textbookPopupOpen(type.id)}>??????????????</button>
        )
      case 49: /* ???????? */
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => pnstPopupOpen(type.id)}>??????????????</button>
        )      
      case 50: /* ?????????????????????? ???????? */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => officialSitePopupOpen(type.id)}>??????????????</button>
        )
      case 51: /* ???????????? ???????????????? */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => orderRosStatPopupOpen(type.id)}>??????????????</button>
        )
      case 52: /* ?????????????????? ?????? ?????????????????????? */ 
        return (
          <button className="nsi-popup__item-btn" type="button" onClick={() => localOrganizationActPopupOpen(type.id)}>??????????????</button>
        )   
      default:
        return (<div>?????? ???? ????????????????????</div>) 
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
        <h3 className="initial-popup__title">???????????????? ?????? ??????????????????</h3>
        <div className="search nsi-seacrh">
          <input
          className="input-search"
          placeholder="?????????? ???? ???????????????? ????????"
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
                  <h4 className="nsi-popup__item-name">{type.name || "????????????????"}</h4>
                  <p className="nsi-popup__item-description">{type.description || ""}</p>
                </div>
                {defineNsiPopup(type)}
              </li>
            ))
          }
        </ul>
      </div>
    </Popup>

    {
      isFederalLawPopupOpen && 
      <FederalLawPopup
        isOpen={isFederalLawPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isRussiaLawPopupOpen &&
      <RussiaLawPopup
        isOpen={isRussiaLawPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isRussiaCodexPopupOpen &&
      <RussiaCodexPopup
        isOpen={isRussiaCodexPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isPresidentEdictPopupOpen &&
      <PresidentEdictPopup
        isOpen={isPresidentEdictPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isGovernmentDecreePopupOpen &&
      <GovernmentDecreePopup
        isOpen={isGovernmentDecreePopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isGovernmentOrderPopupOpen &&
      <GovernmentOrderPopup
        isOpen={isGovernmentOrderPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isPresidentAssignmentPopupOpen &&
      <PresidentAssignmentPopup
        isOpen={isPresidentAssignmentPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isPassportNationalProjectPopupOpen &&
      <PassportNationalProjectPopup
        isOpen={isPassportNationalProjectPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isPassportFederalProjectPopupOpen &&
      <PassportFederalProjectPopup
        isOpen={isPassportFederalProjectPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isPassportProjectPopupOpen &&
      <PassportProjectPopup
        isOpen={isPassportProjectPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isOrderPopupOpen &&
      <OrderPopup
        isOpen={isOrderPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isRegulationPopupOpen &&
      <RegulationPopup
        isOpen={isRegulationPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isTechnicalRegulationPopupOpen &&
      <TechnicalRegulationPopup
        isOpen={isTechnicalRegulationPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isRussiaConstructionResolutionPopupOpen &&
      <RussiaConstructionResolutionPopup
        isOpen={isRussiaConstructionResolutionPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isOrderRussiaSciencePopupOpen &&
      <OrderRussiaSciencePopup
        isOpen={isOrderRussiaSciencePopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isOrderRussiaTransportPopupOpen &&
      <OrderRussiaTransportPopup
        isOpen={isOrderRussiaTransportPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isOrderRussiaGosConstructionPopupOpen &&
      <OrderRussiaGosConstructionPopup
        isOpen={isOrderRussiaGosConstructionPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isOrderRussiaMinConstructionPopupOpen &&
      <OrderRussiaMinConstructionPopup
        isOpen={isOrderRussiaMinConstructionPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isOrderRosStatPopupOpen &&
      <OrderRosStatPopup
        isOpen={isOrderRosStatPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isOrderFederalServicePopupOpen &&
      <OrderFederalServicePopup
        isOpen={isOrderFederalServicePopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }


    {
      isDispositionRussiaSciencePopupOpen &&
      <DispositionRussiaSciencePopup
        isOpen={isDispositionRussiaSciencePopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }


    {
      isDispositionRussiaTransportPopupOpen &&
      <DispositionRussiaTransportPopup
        isOpen={isDispositionRussiaTransportPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      <DispositionRussiaMinConstructionPopup
        isOpen={isDispositionRussiaMinConstructionPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }
    
    {
      isDispositionFederalServicePopupOpen &&
      <DispositionFederalServicePopup
        isOpen={isDispositionFederalServicePopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isGuidelinesPopupOpen &&
      <GuidelinesPopup
        isOpen={isGuidelinesPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isSampleProgramPopupOpen &&
      <SampleProgramPopup
        isOpen={isSampleProgramPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isRequirementsPopupOpen &&
      <RequirementsPopup
        isOpen={isRequirementsPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isCatalogPopupOpen &&
      <CatalogPopup
        isOpen={isCatalogPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isStandardRPopupOpen &&
      <StandardRPopup
        isOpen={isStandardRPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isStandardPopupOpen &&
      <StandardPopup
        isOpen={isStandardPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isODMPopupOpen &&
      <ODMPopup
        isOpen={isODMPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isSTOPopupOpen && 
      <STOPopup
        isOpen={isSTOPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isSPOPopupOpen &&
      <SPOPopup
        isOpen={isSPOPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isGSNPopupOpen && 
      <GSNPopup
        isOpen={isGSNPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isSNIPPopupOpen &&
      <SNIPPopup
        isOpen={isSNIPPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isSPPopupOpen &&
      <SPPopup
        isOpen={isSPPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isENIRPopupOpen &&
      <ENIRPopup
        isOpen={isENIRPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isTYPopupOpen &&
      <TYPopup
        isOpen={isTYPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isISOPopupOpen &&
      <ISOPopup
        isOpen={isISOPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isPNSTPopupOpen &&
      <PNSTPopup
        isOpen={isPNSTPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isOfficialSitePopupOpen &&
      <OfficialSitePopup
        isOpen={isOfficialSitePopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />      
    }

    {
      isTextbookPopupPopupOpen &&
      <TextbookPopup
        isOpen={isTextbookPopupPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    {
      isLocalOrganizationActPopupOpen &&
      <LocalOrganizationAct
        isOpen={isLocalOrganizationActPopupOpen}
        onClose={closeAllNsiPopup}
        nsi={emptyNsi}
        onSave={onAdd}
        id={currentElemId}
        printDate={printDate}
        type={"add"}
        isLoading={isLoading}
      />
    }

    </>
  )
}

export default NsiPopup;