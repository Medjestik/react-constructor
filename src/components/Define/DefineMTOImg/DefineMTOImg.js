import React from 'react';
import './DefineMTOImg.css';
import room from '../../../images/mto/room.png';
import furniture from '../../../images/mto/furniture.png';
import equipment from '../../../images/mto/equipment.png';
import materials from '../../../images/mto/materials.png';
import software from '../../../images/mto/software.png';
import transport from '../../../images/mto/transport.png';
import other from '../../../images/mto/other.png';

function DefineMTOImg({ mtoId }) {

  function defineMTOImg(id) 
  {
    switch (id) {
      case 1: /* Помещение */
        return (
          <img className="nsi-img" src={room} alt="иконка"></img>
        )
      case 2: /* Мебель */
        return (
          <img className="nsi-img" src={furniture} alt="иконка"></img>
        )
      case 3: /* Оборудование */
        return (
          <img className="nsi-img" src={equipment} alt="иконка"></img>
        )
      case 4: /* Расходные материалы */
        return (
          <img className="nsi-img" src={materials} alt="иконка"></img>
        )
      case 5: /* Программное обеспечение */
        return (
          <img className="nsi-img" src={software} alt="иконка"></img>
        )
      case 6: /* Транспорт */
        return (
          <img className="nsi-img" src={transport} alt="иконка"></img>
        )
      case 7: /* Другое */
        return (
          <img className="nsi-img" src={other} alt="иконка"></img>
        )

      default:
        return (<div>Тип не загрузился</div>)
      }
    }
  
    return (
      defineMTOImg(mtoId)
    );
  }
  
  export default DefineMTOImg;