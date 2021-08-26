import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import SwapChildrenItem from '../SwapChildrenItem/SwapChildrenItem.js';

function SwapChildrenColumn({ parts }) {

  return (
    <div className="droppable-column__container">
      <Droppable droppableId="column-1">
        {provided => (
          <div className="droppable-column">
            <ul className="droppable-column__list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {parts.map((part, index) => ( 
                <SwapChildrenItem 
                key={part.id} 
                part={part} 
                index={index}
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

export default SwapChildrenColumn;
