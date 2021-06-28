import React from 'react';
import './Zoon.css';
import * as api from '../../../../utils/api.js';
import ZoonChart from './ZoonChart/ZoonChart.js';

const nodes = [
  { id: "1", tags: ["competence"], name: "Amber McKenzie", title: "Компетенция"},
  { id: "2", pid: "1", tags: ["skill"], name: "Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field Ava FieldAva Field Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field v Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field", title: "Навык"},
  { id: "4", pid: "2", tags: ["ability"], name: "Carol Foster", title: "Умение"},
  { id: "6", pid: "4", tags: ["knowledge"], name: "Avery Hughes", title: "Знание"},
  { id: "7", pid: "4", tags: ["knowledge"], name: "Avery Hughes", title: "Знание"},
]

function Zoon({ dppDescription }) {

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    api.getZoonVersion({ token: token, dppId: dppDescription.id, zoonVersion: dppDescription.zun_version_id, })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.err(err);
    })
  }, [dppDescription]);

  console.log(dppDescription);

  return (
    <div className="zoon">
      <h1 className="main__title">Проектирование ПК и ЗУН</h1>
      <p className="main__subtitle">Этап находится в разработке.</p>
      <div className="zoon__container">
        <ZoonChart nodes={nodes} />
      </div>
    </div>
  );
}

export default Zoon;