import React from 'react';
import './ZoonTypology.css';
import * as api from '../../../../../utils/api.js';
import Preloader from '../../../../Preloader/Preloader.js';

function ZoonTypology({ dppDescription, loggedIn }) {

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
            zoon.typologyParts.map((elem, i) => (
              <li className="zoon-typology__item" key={elem.id}>
                <div className="zoon-typology__item-info">
                  <span className="zoon-typology__item-count">{`${i + 1}.`}</span>
                  <h3 className="zoon-typology__name">{elem.name}</h3>
                </div>
                <ul className="zoon-typology__knowledge-list">
                  {
                    elem.knowledges.map((elem, i) => (
                      <li key={i} className="zoon-typology__knowledge-item">
                        <span className="zoon-typology__knowledge-symbol"></span>
                        <h5 className="zoon-typology__knowledge-name">{elem.name}</h5>
                      </li>
                    ))
                  }
                </ul>
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