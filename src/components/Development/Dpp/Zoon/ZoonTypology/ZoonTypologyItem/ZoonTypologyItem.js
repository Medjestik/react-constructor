import React from 'react';
import { Draggable } from 'react-beautiful-dnd';


function ZoonTypologyItem ({ part, indexPart, knowledgeIndex }) {

  return (
    <>
    <Draggable draggableId={part.stringIds} index={indexPart}>
      {(provided, snapshot) => (
        <li className={`draggable-item ${snapshot.isDragging ? "draggable-item_type_dragging" : ""}`}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        >
          <span className="zoon-typology__knowledge-symbol"></span>
          <h3 className="draggable-item__text">{`${knowledgeIndex + 1}.${indexPart + 1}. ${part.name}`}</h3>
        </li>
      )}
    </Draggable>
    </>
  )
}

export default ZoonTypologyItem;