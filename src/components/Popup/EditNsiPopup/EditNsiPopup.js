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
import DispositionRussiaSciencePopup from '../NsiPopup/DispositionRussiaSciencePopup/DispositionRussiaSciencePopup.js';
import DispositionRussiaTransportPopup from '../NsiPopup/DispositionRussiaTransportPopup/DispositionRussiaTransportPopup.js'; 
import DispositionRussiaMinConstructionPopup from '../NsiPopup/DispositionRussiaMinConstructionPopup/DispositionRussiaMinConstructionPopup.js';
import OrderFederalServicePopup from '../NsiPopup/OrderFederalServicePopup/OrderFederalServicePopup.js';
import DispositionFederalServicePopup from '../NsiPopup/DispositionFederalServicePopup/DispositionFederalServicePopup.js';
import GuidelinesPopup from '../NsiPopup/GuidelinesPopup/GuidelinesPopup.js';
import SampleProgramPopup from '../NsiPopup/SampleProgramPopup/SampleProgramPopup.js';
import RequirementsPopup from '../NsiPopup/RequirementsPopup/RequirementsPopup.js';
import CatalogPopup from '../NsiPopup/СatalogPopup/СatalogPopup.js';
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

function EditNsiPopup({ isOpen, onClose, nsi, onEdit, isLoading }) {

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

  function defineType(id) {
    switch (id) {
      case 9: /* Федеральный закон */
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
      case 10: /* Закон РФ */
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
      case 11: /* Кодекс РФ */
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
      case 12: /* Указ Президента РФ */
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
      case 13: /* Постановление Правительства РФ */ 
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
      case 14: /* Распоряжение Правительства РФ */
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
      case 15: /* Паспорт национального проекта */ 
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
      case 16: /* Поручение Президента РФ */
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
      case 17: /* Паспорт федерального проекта */ 
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
      case 18: /* Паспорт проекта */
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
      case 19: /* Порядок */ 
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
      case 20: /* Регламент */
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
      case 21: /* Технический регламент таможенного союза */ 
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
      case 22: /* Постановление Госстроя России */
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
      case 23: /* Приказ Минобрнауки России */
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
      case 24: /* Приказ Минтранса России */
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
      case 25: /* Приказ Госстроя России */ 
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
      case 26: /* Приказ Минстроя России */
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
      case 27: /* Приказ Федеральной службы */ 
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
      case 28: /* Распоряжение Минобрнауки России */
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
      case 29: /* Распоряжение Минтранса России */
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
      case 30: /* Распоряжение Минстроя России */ 
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
      case 31: /* Распоряжение Федеральной службы */ 
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
      case 32: /* Методические рекомендации */
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
      case 33: /* Примерная программа */ 
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
      case 35: /* Требования */ 
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
      case 36: /* Каталог */ 
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
      case 37: /* ГОСТ Р */ 
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
      case 38: /* ГОСТ */
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
      case 39: /* ОДМ */ 
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
      case 40: /* СТО */
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
      case 41: /* СПО */
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
      case 42: /* ГСН (Сборник) */
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
      case 43: /* СНиПы */
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
      case 44: /* СП */
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
      case 45: /* ЕНИР */
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
      case 46: /* ТУ */
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
      case 47: /* ISO */
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
      case 48: /* Учебники, монографии */ 
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
      case 49: /* ПНСТ */
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
      case 50: /* Официальный сайт */ 
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
      default:
        return (<div>Тип не загрузился</div>)
    }
  }

  return (
    defineType(nsi.type.id)
  )
}

export default EditNsiPopup;