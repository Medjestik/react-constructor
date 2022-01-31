import React from 'react';
import './ExportProgram.css';
import ExportProgramList from '../ExportProgramList/ExportProgramList.js';

function ExportProgram({ dppDescription, programData }) {

  return (
    <div className="export-program">

      <h2 className="export-program__title">Анализ этапов на ошибки</h2>
      <p className="export-program__subtitle">Мы рекомендуем вам исправить ошибки найденные системой перед экспортом программы.</p>
      <ul className="export-program__errors-list">
        {
          programData.stages.map((elem, i) => (
            <li className="export-program__errors-item" key={i}>
              <h4>Этап №{i + 1}. {elem.name}</h4>
              {
                elem.errors.length === 0 && elem.warnings.length === 0 &&
                <div className="export-program__errors-alert alert_type_success">Ошибки не обнаружены</div>
              }
              {
                elem.errors.length > 0 &&
                elem.errors.map((error, i) => (
                  <div className="export-program__errors-alert alert_type_errors" key={i}>{error}</div>
                ))
              }
              {
                elem.warnings.length > 0 &&
                elem.warnings.map((warning, i) => (
                  <div className="export-program__errors-alert alert_type_warnings" key={i}>{warning}</div>
                ))
              }
            </li>
          ))
        }
      </ul>

      <ExportProgramList 
      dppDescription={dppDescription}
      programData={programData}
      />

    </div>
  );
}

export default ExportProgram;