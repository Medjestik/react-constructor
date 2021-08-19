import React from 'react';
import './Zoon.css';
import * as api from '../../../../utils/api.js';
import ZoonChart from './ZoonChart/ZoonChart.js';
import Preloader from '../../../Preloader/Preloader.js';

function Zoon({ dppDescription, loggedIn }) {

  const [zoon, setZoon] = React.useState([]);
  const [zoonLinks, setZoonLinks] = React.useState([]);
  const [typologyParts, setTypologyParts] = React.useState([]);
  const [nsi, setNsi] = React.useState([]);
  const [isRendering, setIsRendering] = React.useState(true); 

  React.useEffect(() => {
    if (loggedIn) {
        const token = localStorage.getItem("token");
        setIsRendering(true);
        Promise.all([
          api.getZoon({ token: token, dppId: dppDescription.id, zoonVersion: dppDescription.zun_version_id, }),
          api.getNsi({ token: token, initialVersionId: dppDescription.ish_version_id, })
        ])
        .then(([ zoon, nsi ]) => {
          console.log(zoon)
          console.log(nsi)
          setZoon(zoon.zoons);
          setZoonLinks(zoon.links);
          setTypologyParts(zoon.typologyParts);
          setNsi(nsi);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setIsRendering(false));
    }  return () => {
      setZoon([]);
      setNsi([]);
    };
  }, [loggedIn, dppDescription]);
  
  return (
    <div className="zoon">
      <h1 className="main__title">Проектирование ПК и ЗУН</h1>
      {
        isRendering ?
        <Preloader />
        :
        <div className="zoon__container">
          <ZoonChart dppDescription={dppDescription} nodes={zoon} nsi={nsi} zoonLinks={zoonLinks} typologyParts={typologyParts} /> 
        </div>
    }
    </div>
  );
}

export default Zoon;