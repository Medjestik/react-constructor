import React from 'react';
import '../LearningPlan.css';

function LearningPlanPP({ programStructure, onEdit, isEditRights, isCurrentTypeChoose }) {

  return (
    <div className="learning-plan">
      <div className="learning-plan__table">
        <ul className="learning-plan__table-head">
          <li className="learning-plan__table-head-column table-head-column_type_name">
            <span className="learning-plan__table-head-column-name">Наименование разделов</span>
          </li>
          <li className="learning-plan__table-head-column table-head-column_type_hours">
            <ul className="learning-plan__table-head-column-list">
              <li className="learning-plan__table-head-column-item">
                <span className="learning-plan__table-head-column-caption learning-plan__table-head-column-caption_font_weight">Итого</span>
              </li>
              <li className="learning-plan__table-head-column-item learning-plan__table-head-column-item_type_pp learning-plan__table-head-column-item_border_left">
                <span className="learning-plan__table-head-column-caption learning-plan__table-head-column-caption_font_weight">Лек.</span>
                <div className="learning-plan-pp__cell">
                  <div className='learning-plan-pp__cell-item'>
                    <span className="learning-plan__table-head-column-caption">Оч.</span>
                  </div>
                  <div className='learning-plan-pp__cell-item learning-plan-pp__cell-item_type_border'>
                    <span className="learning-plan__table-head-column-caption">За.</span>
                  </div>
                </div>
              </li>
              <li className="learning-plan__table-head-column-item learning-plan__table-head-column-item_type_pp">
                <span className="learning-plan__table-head-column-caption learning-plan__table-head-column-caption_font_weight">Пр.</span>
                <div className="learning-plan-pp__cell">
                  <div className='learning-plan-pp__cell-item'>
                    <span className="learning-plan__table-head-column-caption">Оч.</span>
                  </div>
                  <div className='learning-plan-pp__cell-item learning-plan-pp__cell-item_type_border'>
                    <span className="learning-plan__table-head-column-caption">За.</span>
                  </div>
                </div>
              </li>
              <li className="learning-plan__table-head-column-item learning-plan__table-head-column-item_type_pp learning-plan__table-head-column-item_type_border">
                <span className="learning-plan__table-head-column-caption learning-plan__table-head-column-caption_font_weight">Конс.</span>
                <div className="learning-plan-pp__cell">
                  <div className='learning-plan-pp__cell-item'>
                    <span className="learning-plan__table-head-column-caption">Оч.</span>
                  </div>
                  <div className='learning-plan-pp__cell-item learning-plan-pp__cell-item_type_border'>
                    <span className="learning-plan__table-head-column-caption">За.</span>
                  </div>
                </div>
              </li>
              <li className="learning-plan__table-head-column-item learning-plan__table-head-column-item_type_pp">
                <span className="learning-plan__table-head-column-caption learning-plan__table-head-column-caption_font_weight">Аттестация</span>
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
                        (elem.name !== "Итоговая аттестация") && (isEditRights) && 
                        <button className="learning-plan__btn-edit" onClick={() => onEdit(elem)}></button>
                      }
                    </li>
                    <li className="learning-plan__table-body-row table-body-row_type_hours">
                      <ul className="learning-plan__table-head-column-list">
                        <li className="learning-plan__table-head-column-item">
                          <span className={`learning-plan__table-head-column-caption learning-plan__table-head-column-caption_font_weight 
                          ${((isCurrentTypeChoose === "att") && (elem.name === "Итоговая аттестация")) ? "learning-plan__table-head-column-caption_type_total" : ""}`}>{elem.total_hours}</span>
                        </li>
                        <li className="learning-plan__table-head-column-item learning-plan__table-head-column-item_type_pp learning-plan__table-head-column-item_border_left">
                          <div className="learning-plan-pp__cell">
                            <div className='learning-plan-pp__cell-item'>
                              <span className="learning-plan__table-head-column-caption">{elem.name === "Итоговая аттестация" ? "" : elem.lection_hours_o || 0}</span>
                            </div>
                            <div className='learning-plan-pp__cell-item learning-plan-pp__cell-item_type_border'>
                              <span className="learning-plan__table-head-column-caption">{elem.name === "Итоговая аттестация" ? "" : elem.lection_hours_z || 0}</span>
                            </div>
                          </div>
                        </li>
                        <li className="learning-plan__table-head-column-item learning-plan__table-head-column-item_type_pp">
                          <div className="learning-plan-pp__cell">
                            <div className='learning-plan-pp__cell-item'>
                              <span className="learning-plan__table-head-column-caption">{elem.name === "Итоговая аттестация" ? "" : elem.practice_hours_o || 0}</span>
                            </div>
                            <div className='learning-plan-pp__cell-item learning-plan-pp__cell-item_type_border'>
                              <span className="learning-plan__table-head-column-caption">{elem.name === "Итоговая аттестация" ? "" : elem.practice_hours_z || 0}</span>
                            </div>
                          </div>
                        </li>
                        <li className="learning-plan__table-head-column-item learning-plan__table-head-column-item_type_pp">
                          <div className="learning-plan-pp__cell">
                            <div className='learning-plan-pp__cell-item'>
                              <span className="learning-plan__table-head-column-caption">{elem.name === "Итоговая аттестация" ? "" : elem.consult_hours_o || 0}</span>
                            </div>
                            <div className='learning-plan-pp__cell-item learning-plan-pp__cell-item_type_border'>
                              <span className="learning-plan__table-head-column-caption">{elem.name === "Итоговая аттестация" ? "" : elem.consult_hours_z || 0}</span>
                            </div>
                          </div>
                        </li>
                        <li className="learning-plan__table-head-column-item learning-plan__table-head-column-item_type_pp">
                          <span 
                          className="learning-plan__table-head-column-caption learning-plan__table-head-column-caption_font_weight">
                            {elem.name === "Итоговая аттестация" ? "" : elem.attestation_form || ''}, {elem.name === "Итоговая аттестация" ? "" : elem.attestation_hours || 0}
                          </span>
                        </li>
                      </ul>
                    </li>
                  </ul> 
                </div>
                <ul className="learning-plan__table-container">
                  {
                    elem.themes.map((theme, themeIndex) => (
                      <div key={theme.id} className='learning-plan__table-row'>
                        <ul className="learning-plan__table-head">
                          <li className="learning-plan__table-body-row table-body-row_type_name">
                            <span className="learning-plan__table-body-row-name learning-plan__table-body-row-name_type_themes">{`${elemIndex + 1}.${themeIndex + 1}. ${theme.name}`}</span>
                            {
                              isEditRights && 
                              <button className="learning-plan__btn-edit" onClick={() => onEdit(theme)}></button>
                            }
                          </li>
                          <li className="learning-plan__table-body-row table-body-row_type_hours">
                            <ul className="learning-plan__table-head-column-list">
                              <li className="learning-plan__table-head-column-item">
                                <span className={`learning-plan__table-head-column-caption learning-plan__table-head-column-caption_font_weight 
                                ${((isCurrentTypeChoose === "att") && (theme.name === "Итоговая аттестация")) ? "learning-plan__table-head-column-caption_type_total" : ""}`}>{theme.total_hours}</span>
                              </li>
                              <li className="learning-plan__table-head-column-item learning-plan__table-head-column-item_type_pp learning-plan__table-head-column-item_border_left">
                                <div className="learning-plan-pp__cell">
                                  <div className='learning-plan-pp__cell-item'>
                                    <span className="learning-plan__table-head-column-caption">{theme.name === "Итоговая аттестация" ? "" : theme.lection_hours_o || 0}</span>
                                  </div>
                                  <div className='learning-plan-pp__cell-item learning-plan-pp__cell-item_type_border'>
                                    <span className="learning-plan__table-head-column-caption">{theme.name === "Итоговая аттестация" ? "" : theme.lection_hours_z || 0}</span>
                                  </div>
                                </div>
                              </li>
                              <li className="learning-plan__table-head-column-item learning-plan__table-head-column-item_type_pp">
                                <div className="learning-plan-pp__cell">
                                  <div className='learning-plan-pp__cell-item'>
                                    <span className="learning-plan__table-head-column-caption">{theme.name === "Итоговая аттестация" ? "" : theme.practice_hours_o || 0}</span>
                                  </div>
                                  <div className='learning-plan-pp__cell-item learning-plan-pp__cell-item_type_border'>
                                    <span className="learning-plan__table-head-column-caption">{theme.name === "Итоговая аттестация" ? "" : theme.practice_hours_z || 0}</span>
                                  </div>
                                </div>
                              </li>
                              <li className="learning-plan__table-head-column-item learning-plan__table-head-column-item_type_pp">
                                <div className="learning-plan-pp__cell">
                                  <div className='learning-plan-pp__cell-item'>
                                    <span className="learning-plan__table-head-column-caption"></span>
                                  </div>
                                  <div className='learning-plan-pp__cell-item learning-plan-pp__cell-item_type_border'>
                                    <span className="learning-plan__table-head-column-caption"></span>
                                  </div>
                                </div>
                              </li>
                              <li className="learning-plan__table-head-column-item learning-plan__table-head-column-item_type_pp">
                                <span 
                                className="learning-plan__table-head-column-caption learning-plan__table-head-column-caption_font_weight"> 
                                </span>
                              </li>
                            </ul>
                          </li>
                        </ul> 
                      </div>
                    ))
                  }
                </ul>
              </div>
            </li>
          )
        })
      }     
      </ul>
    </div>
  );
}

export default LearningPlanPP;