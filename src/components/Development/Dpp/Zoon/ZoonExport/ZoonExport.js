import React from 'react';
import './ZoonExport.css';

function ZoonExport({ dppDescription }) {

  return (
    <div className="zoon-export">
      <h3 className="zoon-export__title">Выберите формат экспортируемого файла</h3>
      <ul className="zoon-export__list">
        <li className="zoon-export__item">
          <a className="btn btn_type_export-word" href={`https://constructor.emiit.ru:8887/dpps/${dppDescription.id}/export_zun/${dppDescription.zun_version_id}/word`} target="_blank" rel="noreferrer">Экспорт в Word</a>
        </li>
        <li className="zoon-export__item">
          <a className="btn btn_type_export-pdf" href={`https://constructor.emiit.ru:8887/dpps/${dppDescription.id}/export_zun/${dppDescription.zun_version_id}/pdf`} target="_blank" rel="noreferrer">Экспорт в PDF</a>
        </li>
        <li className="zoon-export__item">
          <a className="btn btn_type_export-word" href={`https://constructor.emiit.ru:8887/dpps/${dppDescription.id}/export_zun_justification`} target="_blank" rel="noreferrer">Экспорт обоснования ЗУН</a>
        </li>
      </ul>
    </div>
  );
}

export default ZoonExport;