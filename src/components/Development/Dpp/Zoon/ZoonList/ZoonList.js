import React from 'react';
import './ZoonList.css';
import * as api from '../../../../../utils/api.js';
import Preloader from '../../../../Preloader/Preloader.js';

function ZoonList({ dppDescription, loggedIn }) {

  const [zoon, setZoon] = React.useState([]);
  const [isRendering, setIsRendering] = React.useState(true); 

  React.useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem("token");
      setIsRendering(true);
      api.getZoon({ token: token, dppId: dppDescription.id, zoonVersion: dppDescription.zun_version_id, })
      .then((res) => {
        console.log(res)
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
    <div className="zoon-list">
      {
        isRendering ?
        <Preloader />
        :
        <>
        <ul className="zoon-list__symbol-list">
          <li className="zoon-list__symbol-item">
            <span className="zoon-list__symbol symbol-competence"></span>
            <h5 className="zoon-list__symbol-name">Компетенция</h5>
          </li>
          <li className="zoon-list__symbol-item">
            <span className="zoon-list__symbol symbol-skill"></span>
            <h5 className="zoon-list__symbol-name">Навык</h5>
          </li>
          <li className="zoon-list__symbol-item">
            <span className="zoon-list__symbol symbol-ability"></span>
            <h5 className="zoon-list__symbol-name">Умение</h5>
          </li>
          <li className="zoon-list__symbol-item">
            <span className="zoon-list__symbol symbol-knowledge"></span>
            <h5 className="zoon-list__symbol-name">Знание</h5>
          </li>
          <li className="zoon-list__symbol-item">
            <span className="zoon-list__symbol symbol-cross-knowledge"></span>
            <h5 className="zoon-list__symbol-name">Сквозное знание</h5>
          </li>
        </ul>

        <h3 className="zoon-list__title">Компоненты ЗУН</h3>
        <ul>
          {
            zoon.zoons.map((elem) => (
              <li key={elem.id}>{elem.name}</li>
            ))
          }
        </ul>
        </>
      }
    </div>
  );
}

export default ZoonList;