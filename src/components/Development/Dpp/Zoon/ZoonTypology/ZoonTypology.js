import React from 'react';
import './ZoonTypology.css';
import * as api from '../../../../../utils/api.js';
import Preloader from '../../../../Preloader/Preloader.js';
import ZoonTypologyPart from './ZoonTypologyPart/ZoonTypologyPart.js';


function ZoonTypology({ dppDescription, loggedIn, isEditRights }) {

  const [zoon, setZoon] = React.useState([]);
  const [isRendering, setIsRendering] = React.useState(true); 

  React.useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem("token");
      setIsRendering(true);
      api.getZoon({ token: token, dppId: dppDescription.id, zoonVersion: dppDescription.zun_version_id, })
      .then((res) => {
        setZoon(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsRendering(false)); 
    }  return () => {
      setZoon([]);
    };
  }, [loggedIn, dppDescription]);

  function handleChangeTypologyKnowledgeOrder(newOrder, id) {
    const token = localStorage.getItem("token");
    console.log(newOrder);
    console.log(id);
    if (loggedIn) {
      api.changeTypologyKnowledgeOrder({ 
        token: token, 
        zoonVersion: dppDescription.zun_version_id,
        dtpId: id,
        order: newOrder
      })
      .then(() => {

      })
      .catch((err) =>{
        console.log(err); 
      })
    }
  }


  return (
    <div className="zoon-typology">
      {
        isRendering ?
        <Preloader />
        :
        <>
        <h3 className="zoon-typology__title">Типовое содержание ДПП</h3>
        <ul className="zoon-typology__list">
          {
            zoon.typologyParts.map((elem, knowledgeIndex) => (
              <li className="zoon-typology__item" key={elem.id}>
                <div className="zoon-typology__item-info">
                  <span className="zoon-typology__item-count">{`${knowledgeIndex + 1}.`}</span>
                  <h3 className="zoon-typology__name">{elem.name}</h3>
                </div>
                <ZoonTypologyPart
                elem={elem}
                data={elem.knowledges}
                onChangeOrder={handleChangeTypologyKnowledgeOrder}
                knowledgeIndex={knowledgeIndex}
                isEditRights={isEditRights}
                />
              </li>
            ))
          }
        </ul>
        </>
      }
    </div>
  );
}

export default ZoonTypology;