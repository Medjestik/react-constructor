import React from 'react';
import './SwapChildrenItem.css';
import { Draggable } from 'react-beautiful-dnd';


function SwapChildrenItem ({ part, index }) {

  return (
    <>
    <Draggable draggableId={part.stringIds} index={index}>
      {(provided, snapshot) => (
        <li className={`draggable-item ${snapshot.isDragging ? "draggable-item_type_dragging" : ""}`}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        >
          <span className="draggable-item__count">{`${index + 1}.`}</span>
          <h3 className="draggable-item__text">{part.name}</h3>
        </li>
      )}
    </Draggable>
    </>
  )
}

export default SwapChildrenItem;