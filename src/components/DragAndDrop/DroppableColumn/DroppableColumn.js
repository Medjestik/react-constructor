import React from 'react';
import './DroppableColumn.css';
import { Droppable } from 'react-beautiful-dnd';
import DraggableItem from '../DraggableItem/DraggableItem.js';

function DroppableColumn({ parts, onEdit, onRemove }) {

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
                <DraggableItem 
                key={part.id} 
                part={part} 
                index={index}
                onEdit={onEdit}
                onRemove={onRemove}
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

export default DroppableColumn;
