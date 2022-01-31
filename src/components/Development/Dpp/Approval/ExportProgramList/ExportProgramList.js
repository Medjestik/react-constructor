import React from 'react';
import './ExportProgramList.css';

function ExportProgramList({ dppDescription, programData }) {

  return (
    <>
    <h2 className="export-program__title">Экспорт программы</h2>
    <p className="export-program__subtitle">Вы можете экспортировать материалы программы в Word.</p>
    <ul className="export-program__export-list">
      <li className="export-program__export-item">
        <div className="export-program__export-info">
          <span className="export-program__export-count">1.</span>
          <p className="export-program__export-name">Экспорт общей характеристики программы</p>
        </div>
        <a className="btn export-program__btn" href={`https://constructor-api.emiit.ru/dpps/${dppDescription.id}/export_dpp`} target="_blank" rel="noreferrer">Экспорт в Word</a>
      </li>
      <li className="export-program__export-item">
        <div className="export-program__export-info">
          <span className="export-program__export-count">2.</span>
          <p className="export-program__export-name">Экспорт оценочных материалов</p>
        </div>
        <a className="btn export-program__btn" href={`https://constructor-api.emiit.ru/dpps/${dppDescription.id}/export_om`} target="_blank" rel="noreferrer">Экспорт в Word</a>
      </li>
      <li className="export-program__export-item">
        <div className="export-program__export-info">
          <span className="export-program__export-count">3.</span>
          <p className="export-program__export-name">Экспорт конспекта лекций</p>
        </div>
        <a className={`btn export-program__btn ${programData.hours.lec > 0 ? "" : "export-program__btn_type_block"}`} href={`https://constructor-api.emiit.ru/dpps/${dppDescription.id}/export_lection`} target="_blank" rel="noreferrer">Экспорт в Word</a>
      </li>
      <li className="export-program__export-item">
        <div className="export-program__export-info">
          <span className="export-program__export-count">4.</span>
          <p className="export-program__export-name">Экспорт методических указаний к практическим заданиям</p>
        </div>
        <a className={`btn export-program__btn ${programData.hours.pr > 0 ? "" : "export-program__btn_type_block"}`} href={`https://constructor-api.emiit.ru/dpps/${dppDescription.id}/export_practice`} target="_blank" rel="noreferrer">Экспорт в Word</a>
      </li>
      <li className="export-program__export-item">
        <div className="export-program__export-info">
          <span className="export-program__export-count">5.</span>
          <p className="export-program__export-name">Экспорт методических указаний к лабораторным работам</p>
        </div>
        <a className={`btn export-program__btn ${programData.hours.lab > 0 ? "" : "export-program__btn_type_block"}`} href={`https://constructor-api.emiit.ru/dpps/${dppDescription.id}/export_lab`} target="_blank" rel="noreferrer">Экспорт в Word</a>
      </li>
    </ul>
    </>
  );
}

export default ExportProgramList;