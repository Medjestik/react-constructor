import React from 'react';
import './Zoon.css';
import * as api from '../../../../utils/api.js';
import ZoonChart from './ZoonChart/ZoonChart.js';
import Preloader from '../../../Preloader/Preloader.js';

function Zoon({ dppDescription }) {

  const [zoon, setZoon] = React.useState([]);
  const [isRendering, setIsRendering] = React.useState(true);

  React.useEffect(() => {
    setIsRendering(true);
    const token = localStorage.getItem("token");
    api.getZoon({ token: token, dppId: dppDescription.id, zoonVersion: dppDescription.zun_version_id, })
    .then((res) => {
      console.log(res);
      setZoon(res);
    })
    .catch((err) => {
      console.err(err);
    })
    .finally(() => {
      setIsRendering(false);
    })
  }, [dppDescription]);

  console.log(dppDescription);

  return (
    <div className="zoon">
      <h1 className="main__title">Проектирование ПК и ЗУН</h1>
      {
        isRendering ?
        <Preloader />
        :
        <div className="zoon__container">
          <ZoonChart dppDescription={dppDescription} nodes={zoon} /> 
        </div>
    }
    </div>
  );
}

export default Zoon;