import React from 'react';
import './Zoon.css';
import ZoonChart from './ZoonChart/ZoonChart.js';

const nodes = [
  { id: "1", tags: ["competence"], name: "Amber McKenzie", title: "Компетенция"},
  { id: "2", pid: "1", tags: ["skill"], name: "Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field Ava FieldAva Field Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field v Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field Ava Field", title: "Навык"},
  { id: "4", pid: "2", tags: ["ability"], name: "Carol Foster", title: "Умение"},
  { id: "6", pid: "4", tags: ["knowledge"], name: "Avery Hughes", title: "Знание"},
  { id: "7", pid: "4", tags: ["knowledge"], name: "Avery Hughes", title: "Знание"},
]

function Zoon() {

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