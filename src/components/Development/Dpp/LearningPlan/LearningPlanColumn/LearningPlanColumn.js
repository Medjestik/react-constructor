import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import LearningPlanItem from '../LearningPlanItem/LearningPlanItem.js';

function LearningPlanColumn({ parts, partIndex, onEdit, isEditRights, isCurrentTypeChoose }) {

  return (
    <div className="droppable-column__container">
      <Droppable droppableId="column-1">
        {provided => (
          <div>
            <ul className="droppable-column__list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {parts.map((theme, themeIndex) => ( 
                <LearningPlanItem
                  key={theme.id} 
                  theme={theme} 
                  partIndex={partIndex}
                  themeIndex={themeIndex}
                  onEdit={onEdit}
                  isEditRights={isEditRights}
                  isCurrentTypeChoose={isCurrentTypeChoose}
                />
              ))}
                {provided.placeholder} 
            </ul>
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default LearningPlanColumn;