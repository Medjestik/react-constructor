import React from 'react';
import './LearningPlan.css';
import LearningPlanPart from './LearningPlanPart/LearningPlanPart.js';

function LearningPlan({ programStructure, onEdit, onChangeOrder, isEditRights, isCurrentTypeChoose }) {

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
            </ul>
          </li>
        </ul> 
      </div>
      <ul className="learning-plan__table-body">
      {
        programStructure.map((elem, elemIndex) => {
          return (
            <li key={`${elem.id}r ${elemIndex}`} className="learning-plan__table-body-item">
              <div className="learning-plan__row-list">
                <div className="learning-plan__table-row">
                  <ul className="learning-plan__table-head">
                    <li className="learning-plan__table-body-row table-body-row_type_name">
                      <span className="learning-plan__table-body-row-name table-body-row-name_type_title">{`${elemIndex + 1}. ${elem.name}`}</span>
                      {
                        isEditRights && 
                        <button className="learning-plan__btn-edit" onClick={() => onEdit(elem)}></button>
                      }
                    </li>
                    <li className="learning-plan__table-body-row table-body-row_type_hours">
                      <ul className="learning-plan__table-head-column-list">
                        <li className="learning-plan__table-head-column-item">
                          <span className={`learning-plan__table-head-column-caption learning-plan__table-head-column-caption_font_weight 
                          ${((isCurrentTypeChoose === "att") && (elem.name === "Итоговая аттестация")) ? "learning-plan__table-head-column-caption_type_total" : ""}`}>{elem.total_hours}</span>
                        </li>
                        <li className="learning-plan__table-head-column-item">
                          <span className="learning-plan__table-head-column-caption">{elem.name === "Итоговая аттестация" ? "" : elem.lection_hours}</span>
                        </li>
                        <li className="learning-plan__table-head-column-item">
                          <span className="learning-plan__table-head-column-caption">{elem.name === "Итоговая аттестация" ? "" : elem.practice_hours}</span>
                        </li>
                        <li className="learning-plan__table-head-column-item">
                          <span className="learning-plan__table-head-column-caption">{elem.name === "Итоговая аттестация" ? "" : elem.lab_hours}</span>
                        </li>
                        <li className="learning-plan__table-head-column-item">
                          <span className="learning-plan__table-head-column-caption">{elem.name === "Итоговая аттестация" ? "" : elem.self_hours}</span>
                        </li>

                      </ul>
                    </li>
                  </ul> 
                </div>
                <LearningPlanPart
                data={elem.themes}
                sectionId={elem.id}
                onChangeOrder={onChangeOrder}
                partIndex={elemIndex}
                onEdit={onEdit}
                isEditRights={isEditRights}
                isCurrentTypeChoose={isCurrentTypeChoose}
                />
              </div>
            </li>
          )
        })
      }     
      </ul>
    </div>
  );
}

export default LearningPlan;