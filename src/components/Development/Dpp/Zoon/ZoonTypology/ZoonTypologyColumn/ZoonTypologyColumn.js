import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import ZoonTypologyItem from '../ZoonTypologyItem/ZoonTypologyItem.js';

function ZoonTypologyColumn({ parts, knowledgeIndex }) {

  return (
    <div className="droppable-column__container">
      <Droppable droppableId="column-1">
        {provided => (
          <div className="droppable-column">
            <ul className="droppable-column__list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {parts.map((part, indexPart) => ( 
                <ZoonTypologyItem
                key={part.id} 
                part={part} 
                indexPart={indexPart}
                knowledgeIndex={knowledgeIndex}
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

export default ZoonTypologyColumn;
