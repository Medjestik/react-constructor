import React from 'react';
import './Zoon.css';
import * as api from '../../../../utils/api.js';
import ZoonChart from './ZoonChart/ZoonChart.js';
import Preloader from '../../../Preloader/Preloader.js';

function Zoon({ dppDescription, loggedIn }) {

  const [zoon, setZoon] = React.useState([]);
  const [nsi, setNsi] = React.useState([]);
  const [isRendering, setIsRendering] = React.useState(true);

  React.useEffect(() => {
    if (loggedIn) {
        const token = localStorage.getItem("token");
        setIsRendering(true);
        Promise.all([
          api.getZoon({ token: token, dppId: dppDescription.id, zoonVersion: dppDescription.zun_version_id, }),
          api.getNsi({ token: token, initialVersionId: dppDescription.ish_version_id,  })
        ])
        .then(([ zoon, nsi ]) => {
          setZoon(zoon);
          setNsi(nsi);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setIsRendering(false));
    }
  }, [loggedIn, dppDescription]);
  
  return (
    <div className="zoon">
      <h1 className="main__title">Проектирование ПК и ЗУН</h1>
      {
        isRendering ?
        <Preloader />
        :
        <div className="zoon__container">
          <ZoonChart dppDescription={dppDescription} nodes={zoon} nsi={nsi} /> 
        </div>
    }
    </div>
  );
}

export default Zoon;