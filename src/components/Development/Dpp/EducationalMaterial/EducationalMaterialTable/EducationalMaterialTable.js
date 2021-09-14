import React from 'react';


function EducationalMaterialTable({ programStructure, onShowItem, isEditRights }) {

  return (

    <div className="educational-material__table">
      <ul className="educational-material__table-head">
        <li className="educational-material__table-head-column table-head-column_type_name">
          <span className="educational-material__table-head-column-name">Наименование разделов</span>
        </li>
        <li className="educational-material__table-head-column table-head-column_type_hours">
          <span className="educational-material__table-head-column-name">Учебно-методические материалы</span>
        </li>
      </ul> 
      <ul className="educational-material__table-body">
      {
        programStructure.map((elem, elemIndex) => {
          return (
            <li key={`${elem.id}r ${elemIndex}`} className="educational-material__table-body-item">
              <div className="educational-material__row-list">
                <div className="educational-material__table-row">
                  <ul className="educational-material__table-head">
                    <li className="educational-material__table-body-row table-body-row_type_name">
                      <span className="educational-material__table-body-row-name table-body-row-name_type_title">{`${elemIndex + 1}. ${elem.name}`}</span>
                    </li>
                    
                  </ul> 
                </div>
                {elem.themes.map((theme, themeIndex) => (
                  <div key={`${theme.id}t ${themeIndex}`} 
                  className={`educational-material__table-row`}
                  >
                    <ul className="educational-material__table-head">
                      <li className={`educational-material__table-body-row table-body-row_type_name`}>
                        <span 
                        className={`educational-material__table-body-row-name educational-material__table-body-row-name_type_themes`}>
                          {`${elemIndex + 1}.${themeIndex + 1} ${theme.name}`}
                        </span>
                      </li>
                      <li className="educational-material__table-body-row table-body-row_type_hours">
                        <ul className="educational-material__table-head-column-list">
                          <li className="educational-material__table-head-column-item">
                            <button 
                            className={`
                            educational-material__item_btn 
                            ${theme.lection_hours > 0 ? "educational-material__item_btn_type_lection" : ""}
                            `}
                            type="button"
                            onClick={() => onShowItem("lec", theme.id)}
                            >
                              Лекция
                            </button>
                          </li>
                          <li className="educational-material__table-head-column-item">
                            <button 
                            className={`
                            educational-material__item_btn 
                            ${theme.practice_hours > 0 ? "educational-material__item_btn_type_practical" : ""}
                            `}
                            type="button"
                            onClick={() => onShowItem("pr", theme.id)}
                            >
                              Практика
                            </button>
                          </li>
                          <li className="educational-material__table-head-column-item">
                            <button 
                            className={`
                            educational-material__item_btn 
                            ${theme.lab_hours > 0 ? "educational-material__item_btn_type_lab" : ""}
                            `}
                            type="button"
                            onClick={() => onShowItem("lab", theme.id)}
                            >
                              Лабораторная
                            </button>
                          </li>
                        </ul>
                      </li>
                    </ul> 
                  </div>
                ))}
              </div>
            </li>
          )
        })
      }     
      </ul>
    </div>
  );
}

export default EducationalMaterialTable;