import React from 'react';
import '../../../../DragAndDrop/DroppableColumn/DroppableColumn.css';
import { Droppable } from 'react-beautiful-dnd';
import TaskStepItem from '../TaskStepsItem/TaskStepsItem.js';

function TaskStepsColumn({ parts, onEditStep, onRemoveStep }) {

  return (
    <div className="question__answer-container">
      <Droppable droppableId="column-1">
        {provided => (
          <div className="droppable-column">
            <ul className="droppable-column__list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {parts.map((part, index) => (
                <TaskStepItem 
                key={part.id} 
                part={part} 
                index={index}
                onEdit={onEditStep}
                onRemove={onRemoveStep}
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

export default TaskStepsColumn;
