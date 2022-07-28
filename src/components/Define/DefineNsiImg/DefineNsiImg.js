import React from 'react';
import './DefineNsiImg.css';
import edict from '../../../images/nsi/edict.png';
import catalog from '../../../images/nsi/catalog.png';
import law from '../../../images/nsi/law.png';
import assignment from '../../../images/nsi/assignment.png';
import guidelines from '../../../images/nsi/guidelines.png';
import iso from '../../../images/nsi/iso.png';
import gost from '../../../images/nsi/gost.png';
import requirements from '../../../images/nsi/requirements.png';
import fedOrder from '../../../images/nsi/fed-order.png';
import books from '../../../images/nsi/books.png';
import passport from '../../../images/nsi/passport.png';
import order from '../../../images/nsi/order.png';
import disposition from '../../../images/nsi/disposition.png';
import program from '../../../images/nsi/program.png';
import organization from '../../../images/nsi/organization.png';
import resolution from '../../../images/nsi/resolution.png';
import regulation from '../../../images/nsi/regulation.png';
import standard from '../../../images/nsi/standard.png';
import codex from '../../../images/nsi/codex.png';
import ty from '../../../images/nsi/ty.png';
import customs from '../../../images/nsi/customs.png';
import web from '../../../images/nsi/web.png';
import course from '../../../images/nsi/course.png';
import estimate from '../../../images/nsi/estimate.png';
import odm from '../../../images/nsi/odm.png';
import snip from '../../../images/nsi/snip.png';

function DefineNsiImg({ nsiId }) {

  function defineNsiImg(id) 
  {
    switch (id) {
      case 9: /* Федеральный закон */
        return (
          <img className="nsi-img" src={fedOrder} alt="иконка"></img>
        )
      case 10: /* Закон РФ */
        return (
          <img className="nsi-img" src={law} alt="иконка"></img>
        )
      case 11: /* Кодекс РФ */
        return (
          <img className="nsi-img" src={codex} alt="иконка"></img>
        )
      case 12: /* Указ Президента РФ */
        return (
          <img className="nsi-img" src={edict} alt="иконка"></img>
        )
      case 13: /* Постановление Правительства РФ */ 
        return (
          <img className="nsi-img" src={resolution} alt="иконка"></img>
        )
      case 14: /* Распоряжение Правительства РФ */
        return (
          <img className="nsi-img" src={disposition} alt="иконка"></img>
        )
      case 15: /* Паспорт национального проекта */ 
        return (
          <img className="nsi-img" src={passport} alt="иконка"></img>
        )
      case 16: /* Поручение Президента РФ */
        return (
          <img className="nsi-img" src={assignment} alt="иконка"></img>
        )
      case 17: /* Паспорт федерального проекта */ 
        return (
          <img className="nsi-img" src={passport} alt="иконка"></img>
        )
      case 18: /* Паспорт проекта */
        return (
          <img className="nsi-img" src={passport} alt="иконка"></img>
        )
      case 19: /* Порядок */ 
        return (
          <img className="nsi-img" src={course} alt="иконка"></img>
        )
      case 20: /* Регламент */
        return (
          <img className="nsi-img" src={regulation} alt="иконка"></img>
        )
      case 21: /* Технический регламент таможенного союза */ 
        return (
          <img className="nsi-img" src={customs} alt="иконка"></img>
        )
      case 22: /* Постановление Госстроя России */
        return (
          <img className="nsi-img" src={resolution} alt="иконка"></img>
        )
      case 23: /* Приказ Минобрнауки России */
        return (
          <img className="nsi-img" src={order} alt="иконка"></img>
        )
      case 24: /* Приказ Минтранса России */
        return (
          <img className="nsi-img" src={order} alt="иконка"></img>
        )
      case 25: /* Приказ Госстроя России */ 
        return (
          <img className="nsi-img" src={order} alt="иконка"></img>
        )
      case 26: /* Приказ Минстроя России */
        return (
          <img className="nsi-img" src={order} alt="иконка"></img>
        )
      case 27: /* Приказ Федеральной службы */ 
        return (
          <img className="nsi-img" src={order} alt="иконка"></img>
        )
      case 28: /* Распоряжение Минобрнауки России */
        return (
          <img className="nsi-img" src={disposition} alt="иконка"></img>
        )
      case 29: /* Распоряжение Минтранса России */
        return (
          <img className="nsi-img" src={disposition} alt="иконка"></img>
        )
      case 30: /* Распоряжение Минстроя России */ 
        return (
          <img className="nsi-img" src={disposition} alt="иконка"></img>
        )
      case 31: /* Распоряжение Федеральной службы */ 
        return (
          <img className="nsi-img" src={disposition} alt="иконка"></img>
        )
      case 32: /* Методические рекомендации */
        return (
          <img className="nsi-img" src={guidelines} alt="иконка"></img>
        )
      case 33: /* Примерная программа */ 
        return (
          <img className="nsi-img" src={program} alt="иконка"></img>
        )
      case 35: /* Требования */ 
        return (
          <img className="nsi-img" src={requirements} alt="иконка"></img>
        )
      case 36: /* Каталог */ 
        return (
          <img className="nsi-img" src={catalog} alt="иконка"></img>
        )
      case 37: /* ГОСТ Р */ 
        return (
          <img className="nsi-img" src={gost} alt="иконка"></img>
        )
      case 38: /* ГОСТ */
        return (
          <img className="nsi-img" src={gost} alt="иконка"></img>
        )
      case 39: /* ОДМ */ 
        return (
          <img className="nsi-img" src={odm} alt="иконка"></img>
        )
      case 40: /* СТО */
        return (
          <img className="nsi-img" src={organization} alt="иконка"></img>
        )
      case 41: /* СПО */
        return (
          <img className="nsi-img" src={organization} alt="иконка"></img>
        )
      case 42: /* ГСН (Сборник) */
        return (
          <img className="nsi-img" src={estimate} alt="иконка"></img>
        )
      case 43: /* СНиПы */
        return (
          <img className="nsi-img" src={snip} alt="иконка"></img>
        )
      case 44: /* СП */
        return (
          <img className="nsi-img" src={organization} alt="иконка"></img>
        )
      case 45: /* ЕНИР */
        return (
          <img className="nsi-img" src={estimate} alt="иконка"></img>
        )
      case 46: /* ТУ */
        return (
          <img className="nsi-img" src={ty} alt="иконка"></img>
        )
      case 47: /* ISO */
        return (
          <img className="nsi-img" src={iso} alt="иконка"></img>
        )
      case 48: /* Учебники, монографии */ 
        return (
          <img className="nsi-img" src={books} alt="иконка"></img>
        )
      case 49: /* ПНСТ */
        return (
          <img className="nsi-img" src={standard} alt="иконка"></img>
        )      
      case 50: /* Официальный сайт */ 
        return (
          <img className="nsi-img" src={web} alt="иконка"></img>
        )
      case 51: /* Приказ Росстата */ 
        return (
          <img className="nsi-img" src={order} alt="иконка"></img>
        )
      case 52: /* Локальный акт организации */ 
        return (
          <img className="nsi-img" src={organization} alt="иконка"></img>
        )
      case 53: /* Статья из журнала */ 
        return (
          <img className="nsi-img" src={books} alt="иконка"></img>
        )
      case 54: /* Статья из сборника */ 
        return (
          <img className="nsi-img" src={books} alt="иконка"></img>
        )
      case 55: /* Приказ Министерства */ 
        return (
          <img className="nsi-img" src={order} alt="иконка"></img>
        )
      case 56: /* Распоряжение Министерства */ 
        return (
          <img className="nsi-img" src={disposition} alt="иконка"></img>
        )
      case 57: /* Международный документ */ 
        return (
          <img className="nsi-img" src={web} alt="иконка"></img>
        )       
        default:
        return (<div>Тип не загрузился</div>)
    }
  }

  return (
    defineNsiImg(nsiId)
  );
}

export default DefineNsiImg;
