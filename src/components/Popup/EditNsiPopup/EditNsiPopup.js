import React from 'react';
import FederalLawPopup from '../NsiPopup/FederalLawPopup/FederalLawPopup.js';
import RussiaLawPopup from '../NsiPopup/RussiaLawPopup/RussiaLawPopup.js';
import RussiaCodexPopup from '../NsiPopup/RussiaCodexPopup/RussiaCodexPopup.js';
import PresidentEdictPopup from '../NsiPopup/PresidentEdictPopup/PresidentEdictPopup.js';
import GovernmentDecreePopup from '../NsiPopup/GovernmentDecreePopup/GovernmentDecreePopup.js';
import GovernmentOrderPopup from '../NsiPopup/GovernmentOrderPopup/GovernmentOrderPopup.js';
import PresidentAssignmentPopup from '../NsiPopup/PresidentAssignmentPopup/PresidentAssignmentPopup.js';
import PassportNationalProjectPopup from '../NsiPopup/PassportNationalProjectPopup/PassportNationalProjectPopup.js';
import PassportFederalProjectPopup from '../NsiPopup/PassportFederalProjectPopup/PassportFederalProjectPopup.js';
import PassportProjectPopup from '../NsiPopup/PassportProjectPopup/PassportProjectPopup.js';
import OrderPopup from '../NsiPopup/OrderPopup/OrderPopup.js';
import RegulationPopup from '../NsiPopup/RegulationPopup/RegulationPopup.js';
import TechnicalRegulationPopup from '../NsiPopup/TechnicalRegulationPopup/TechnicalRegulationPopup.js';
import RussiaConstructionResolutionPopup from '../NsiPopup/RussiaConstructionResolutionPopup/RussiaConstructionResolutionPopup.js';
import OrderRussiaSciencePopup from '../NsiPopup/OrderRussiaSciencePopup/OrderRussiaSciencePopup.js';
import OrderRussiaTransportPopup from '../NsiPopup/OrderRussiaTransportPopup/OrderRussiaTransportPopup.js';
import OrderRussiaGosConstructionPopup from '../NsiPopup/OrderRussiaGosConstructionPopup/OrderRussiaGosConstructionPopup.js'; 
import OrderRussiaMinConstructionPopup from '../NsiPopup/OrderRussiaMinConstructionPopup/OrderRussiaMinConstructionPopup.js';
import OrderRosStatPopup from '../NsiPopup/OrderRosStatPopup/OrderRosStatPopup.js';
import DispositionRussiaSciencePopup from '../NsiPopup/DispositionRussiaSciencePopup/DispositionRussiaSciencePopup.js';
import DispositionRussiaTransportPopup from '../NsiPopup/DispositionRussiaTransportPopup/DispositionRussiaTransportPopup.js'; 
import DispositionRussiaMinConstructionPopup from '../NsiPopup/DispositionRussiaMinConstructionPopup/DispositionRussiaMinConstructionPopup.js';
import OrderFederalServicePopup from '../NsiPopup/OrderFederalServicePopup/OrderFederalServicePopup.js';
import DispositionFederalServicePopup from '../NsiPopup/DispositionFederalServicePopup/DispositionFederalServicePopup.js';
import GuidelinesPopup from '../NsiPopup/GuidelinesPopup/GuidelinesPopup.js';
import SampleProgramPopup from '../NsiPopup/SampleProgramPopup/SampleProgramPopup.js';
import RequirementsPopup from '../NsiPopup/RequirementsPopup/RequirementsPopup.js';
import CatalogPopup from '../NsiPopup/??atalogPopup/??atalogPopup.js';
import StandardRPopup from '../NsiPopup/StandardRPopup/StandardRPopup.js';
import StandardPopup from '../NsiPopup/StandardPopup/StandardPopup.js';
import ODMPopup from '../NsiPopup/ODMPopup/ODMPopup.js';
import STOPopup from '../NsiPopup/STOPopup/STOPopup.js';
import SPOPopup from '../NsiPopup/SPOPopup/SPOPopup.js';
import GSNPopup from '../NsiPopup/GSNPopup/GSNPopup.js';
import SNIPPopup from '../NsiPopup/SNIPPopup/SNIPPopup.js';
import SPPopup from '../NsiPopup/SPPopup/SPPopup.js';
import ENIRPopup from '../NsiPopup/ENIRPopup/ENIRPopup.js';
import TYPopup from '../NsiPopup/TYPopup/TYPopup.js';
import ISOPopup from '../NsiPopup/ISOPopup/ISOPopup.js';
import PNSTPopup from '../NsiPopup/PNSTPopup/PNSTPopup.js';
import OfficialSitePopup from '../NsiPopup/OfficialSitePopup/OfficialSitePopup.js';
import TextbookPopup from '../NsiPopup/TextbookPopup/TextbookPopup.js';
import LocalOrganizationAct from '../NsiPopup/LocalOrganizationAct/LocalOrganizationAct.js';

function EditNsiPopup({ isOpen, onClose, nsi, onEdit, isLoading }) {

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

  function defineType(id) {
    switch (id) {
      case 9: /* ?????????????????????? ?????????? */
        return (
        <FederalLawPopup
          isOpen={isOpen}
          onClose={onClose}
          nsi={nsi}
          onSave={onEdit}
          id={nsi.id}
          printDate={printDate}
          type={"edit"}
          isLoading={isLoading}
        />
      )
      case 10: /* ?????????? ???? */
        return (
          <RussiaLawPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 11: /* ???????????? ???? */
        return (
          <RussiaCodexPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 12: /* ???????? ???????????????????? ???? */
        return (
          <PresidentEdictPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 13: /* ?????????????????????????? ?????????????????????????? ???? */ 
        return (
          <GovernmentDecreePopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 14: /* ???????????????????????? ?????????????????????????? ???? */
        return (
          <GovernmentOrderPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 15: /* ?????????????? ?????????????????????????? ?????????????? */ 
        return (
          <PassportNationalProjectPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 16: /* ?????????????????? ???????????????????? ???? */
        return (
          <PresidentAssignmentPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 17: /* ?????????????? ???????????????????????? ?????????????? */ 
        return (
          <PassportFederalProjectPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 18: /* ?????????????? ?????????????? */
        return (
          <PassportProjectPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 19: /* ?????????????? */ 
        return (
          <OrderPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 20: /* ?????????????????? */
        return (
          <RegulationPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 21: /* ?????????????????????? ?????????????????? ?????????????????????? ?????????? */ 
        return (
          <TechnicalRegulationPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 22: /* ?????????????????????????? ???????????????? ???????????? */
        return (
          <RussiaConstructionResolutionPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 23: /* ???????????? ?????????????????????? ???????????? */
        return (
          <OrderRussiaSciencePopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 24: /* ???????????? ?????????????????? ???????????? */
        return (
          <OrderRussiaTransportPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 25: /* ???????????? ???????????????? ???????????? */ 
        return (
          <OrderRussiaGosConstructionPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 26: /* ???????????? ???????????????? ???????????? */
        return (
          <OrderRussiaMinConstructionPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 27: /* ???????????? ?????????????????????? ???????????? */ 
        return (
          <OrderFederalServicePopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 28: /* ???????????????????????? ?????????????????????? ???????????? */
        return (
          <DispositionRussiaSciencePopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 29: /* ???????????????????????? ?????????????????? ???????????? */
        return (
          <DispositionRussiaTransportPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 30: /* ???????????????????????? ???????????????? ???????????? */ 
        return (
          <DispositionRussiaMinConstructionPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 31: /* ???????????????????????? ?????????????????????? ???????????? */ 
        return (
          <DispositionFederalServicePopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 32: /* ???????????????????????? ???????????????????????? */
        return (
          <GuidelinesPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 33: /* ?????????????????? ?????????????????? */ 
        return (
          <SampleProgramPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 35: /* ???????????????????? */ 
        return (
          <RequirementsPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 36: /* ?????????????? */ 
        return (
          <CatalogPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 37: /* ???????? ?? */ 
        return (
          <StandardRPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 38: /* ???????? */
        return (
          <StandardPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 39: /* ?????? */ 
        return (
          <ODMPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 40: /* ?????? */
        return (
          <STOPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 41: /* ?????? */
        return (
          <SPOPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 42: /* ?????? (??????????????) */
        return (
          <GSNPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 43: /* ?????????? */
        return (
          <SNIPPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 44: /* ???? */
        return (
          <SPPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 45: /* ???????? */
        return (
          <ENIRPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 46: /* ???? */
        return (
          <TYPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 47: /* ISO */
        return (
          <ISOPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 48: /* ????????????????, ???????????????????? */ 
        return (
          <TextbookPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 49: /* ???????? */
        return (
          <PNSTPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )      
      case 50: /* ?????????????????????? ???????? */ 
        return (
          <OfficialSitePopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 51: /* ???????????? ???????????????? */ 
        return (
          <OrderRosStatPopup
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )
      case 52: /* ?????????????????? ?????? ?????????????????????? */ 
        return (
          <LocalOrganizationAct
            isOpen={isOpen}
            onClose={onClose}
            nsi={nsi}
            onSave={onEdit}
            id={nsi.id}
            printDate={printDate}
            type={"edit"}
            isLoading={isLoading}
          />
        )         
      default:
        return (<div>?????? ???? ????????????????????</div>)
    }
  }

  return (
    defineType(nsi.type.id)
  )
}

export default EditNsiPopup;