import React from 'react';
import './LearningPlan.css';

function LearningPlan({ programStructure, onEdit }) {

  return (
    <div className="learning-plan">
      <div className="learning-plan__table">
        <ul className="learning-plan__table-head">
          <li className="learning-plan__table-head-column table-head-column_type_name">
            <span className="learning-plan__table-head-column-name">Наименование разделов</span>
          </li>
          <li className="learning-plan__table-head-column table-head-column_type_hours">
            <span className="learning-plan__table-head-column-name">Трудоемкость, ч</span>
            <ul className="learning-plan__table-head-column-list">
              <li className="learning-plan__table-head-column-item">
                <span className="learning-plan__table-head-column-caption learning-plan__table-head-column-caption_font_weight">Итого</span>
              </li>
              <li className="learning-plan__table-head-column-item">
                <span className="learning-plan__table-head-column-caption">Лек.</span>
              </li>
              <li className="learning-plan__table-head-column-item">
                <span className="learning-plan__table-head-column-caption">Пр.</span>
              </li>
              <li className="learning-plan__table-head-column-item">
                <span className="learning-plan__table-head-column-caption">Лаб.</span>
              </li>
              <li className="learning-plan__table-head-column-item">
                <span className="learning-plan__table-head-column-caption">Сам.</span>
              </li>
              <li className="learning-plan__table-head-column-item">
                <span className="learning-plan__table-head-column-caption">Атт.</span>
              </li>
            </ul>
          </li>
        </ul> 
      </div>
      <ul className="learning-plan__table-body">
      {
        programStructure.map((elem, elemIndex) => {
          return (
            <li key={`${elem.id}r ${elemIndex}`} className="learning-plan__table-body-item">
              <ul className="learning-plan__row-list">
              <li className="learning-plan__table-row">
                <ul className="learning-plan__table-head">
                  <li className="learning-plan__table-body-row table-body-row_type_name">
                    <span className="learning-plan__table-body-row-name table-body-row-name_type_title">{`${elemIndex + 1}. ${elem.name}`}</span>
                    <button className="learning-plan__btn-edit" onClick={() => onEdit(elem)}></button>
                  </li>
                  <li className="learning-plan__table-body-row table-body-row_type_hours">
                    <ul className="learning-plan__table-head-column-list">
                      <li className="learning-plan__table-head-column-item">
                        <span className="learning-plan__table-head-column-caption learning-plan__table-head-column-caption_font_weight">{elem.total_hours}</span>
                      </li>
                      <li className="learning-plan__table-head-column-item">
                        <span className="learning-plan__table-head-column-caption">{elem.lection_hours}</span>
                      </li>
                      <li className="learning-plan__table-head-column-item">
                        <span className="learning-plan__table-head-column-caption">{elem.practice_hours}</span>
                      </li>
                      <li className="learning-plan__table-head-column-item">
                        <span className="learning-plan__table-head-column-caption">{elem.lab_hours}</span>
                      </li>
                      <li className="learning-plan__table-head-column-item">
                        <span className="learning-plan__table-head-column-caption">{elem.self_hours}</span>
                      </li>
                      <li className="learning-plan__table-head-column-item">
                        <span className="learning-plan__table-head-column-caption">{elem.attestation_hours}</span>
                      </li>
                    </ul>
                  </li>
                </ul> 
              </li>
              {
                elem.themes.map((theme, themeIndex) => (
                  <li key={`${elem.id}t ${themeIndex}`} className="learning-plan__table-row">
                    <ul className="learning-plan__table-head">
                      <li className="learning-plan__table-body-row table-body-row_type_name">
                        <span className="learning-plan__table-body-row-name">{`${elemIndex + 1}.${themeIndex + 1} ${theme.name}`}</span>
                        <button className="learning-plan__btn-edit" onClick={() => onEdit(theme)}></button>
                      </li>
                      <li className="learning-plan__table-body-row table-body-row_type_hours">
                        <ul className="learning-plan__table-head-column-list">
                          <li className="learning-plan__table-head-column-item">
                            <span className="learning-plan__table-head-column-caption learning-plan__table-head-column-caption_font_weight">{theme.total_hours}</span>
                          </li>
                          <li className="learning-plan__table-head-column-item">
                            <span className="learning-plan__table-head-column-caption">{theme.lection_hours}</span>
                          </li>
                          <li className="learning-plan__table-head-column-item">
                            <span className="learning-plan__table-head-column-caption">{theme.practice_hours}</span>
                          </li>
                          <li className="learning-plan__table-head-column-item">
                            <span className="learning-plan__table-head-column-caption">{theme.lab_hours}</span>
                          </li>
                          <li className="learning-plan__table-head-column-item">
                            <span className="learning-plan__table-head-column-caption">{theme.self_hours}</span>
                          </li>
                          <li className="learning-plan__table-head-column-item">
                            <span className="learning-plan__table-head-column-caption">{theme.attestation_hours}</span>
                          </li>
                        </ul>
                      </li>
                    </ul> 
                  </li>
                ))
              }
              </ul>
            </li>
          )
        })
      }     
      </ul>
    </div>
  );
}

export default LearningPlan;