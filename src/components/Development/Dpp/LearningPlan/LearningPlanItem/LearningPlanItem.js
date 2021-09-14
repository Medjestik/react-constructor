import React from 'react';
import { Draggable } from 'react-beautiful-dnd';


function LearningPlanItem ({ theme, partIndex, themeIndex, onEdit, isEditRights }) {

  return (
    <>
    <Draggable draggableId={theme.stringIds} index={themeIndex}>
      {(provided, snapshot) => (
        <div key={`${theme.id}t ${themeIndex}`} 
        className={`learning-plan__table-row ${snapshot.isDragging ? "draggable-item_type_dragging" : ""}`}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        >
          <ul className="learning-plan__table-head">
            <li className={`learning-plan__table-body-row table-body-row_type_name ${snapshot.isDragging ? "learning-plan__table-body-row_type_dragging" : ""}`}>
              <span 
              className={`learning-plan__table-body-row-name learning-plan__table-body-row-name_type_themes ${snapshot.isDragging ? "learning-plan__table-body-row-name_type_dragging" : ""}`}>
                {`${partIndex + 1}.${themeIndex + 1} ${theme.name}`}
              </span>
              <button className={`learning-plan__btn-edit ${snapshot.isDragging ? "learning-plan__btn-edit_type_dragging" : ""}`} onClick={() => onEdit(theme)}></button>
            </li>
            <li className="learning-plan__table-body-row table-body-row_type_hours">
              <ul className="learning-plan__table-head-column-list">
                <li className="learning-plan__table-head-column-item">
                  <span className={`learning-plan__table-head-column-caption learning-plan__table-head-column-caption_font_weight ${snapshot.isDragging ? "learning-plan__table-head-column-caption_type_dragging" : ""}`}>{theme.total_hours}</span>
                </li>
                <li className="learning-plan__table-head-column-item">
                  <span className={`learning-plan__table-head-column-caption ${snapshot.isDragging ? "learning-plan__table-head-column-caption_type_dragging" : ""}`}>{theme.lection_hours}</span>
                </li>
                <li className="learning-plan__table-head-column-item">
                  <span className={`learning-plan__table-head-column-caption ${snapshot.isDragging ? "learning-plan__table-head-column-caption_type_dragging" : ""}`}>{theme.practice_hours}</span>
                </li>
                <li className="learning-plan__table-head-column-item">
                  <span className={`learning-plan__table-head-column-caption ${snapshot.isDragging ? "learning-plan__table-head-column-caption_type_dragging" : ""}`}>{theme.lab_hours}</span>
                </li>
                <li className="learning-plan__table-head-column-item">
                  <span className={`learning-plan__table-head-column-caption ${snapshot.isDragging ? "learning-plan__table-head-column-caption_type_dragging" : ""}`}>{theme.self_hours}</span>
                </li>
                <li className="learning-plan__table-head-column-item">
                  <span className={`learning-plan__table-head-column-caption ${snapshot.isDragging ? "learning-plan__table-head-column-caption_type_dragging" : ""}`}>{theme.attestation_hours}</span>
                </li>
              </ul>
            </li>
          </ul> 
        </div>
      )}
    </Draggable>
    </>
  )
}

export default LearningPlanItem;