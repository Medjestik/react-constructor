import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import ZoonTypologyColumn from '../ZoonTypologyColumn/ZoonTypologyColumn.js';

function ZoonTypologyPart({ elem, data, onChangeOrder, knowledgeIndex, isEditRights }) {

  const [dataPart, setDataPart] = React.useState([]);

  React.useEffect(() => {

    const newColumnIds = data.map((elem) => {
      return elem.id.toString();
    })

    const dataWithStringIds = data.map((elem) => {
      return { ...elem, stringIds: elem.id.toString() } ;
    })

    const newData = {
      parts: dataWithStringIds,
      column: {
        partIds: newColumnIds,
      },
    }

    setDataPart(newData);
    
  }, [data]);

  
  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const column = dataPart.column;

    const newPartIds = Array.from(column.partIds);
    newPartIds.splice(source.index, 1);
    newPartIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      partIds: newPartIds,
    };

    const newState = {
      ...dataPart,
      column: newColumn,
    };

    setDataPart(newState);

    if (isEditRights) {
      onChangeOrder(newState.column.partIds, elem.id);
    }
  }
 
  
  return (
    dataPart.length === 0 ?
    <div></div>
    :
    <DragDropContext onDragEnd={onDragEnd} >
      <ZoonTypologyColumn
        parts={dataPart.column.partIds.map((partId) => {
          let part = {};
          dataPart.parts.find(element => {
            if (element.stringIds === partId) {
              return part = element;
            }
            return undefined;
          });
          return part;
        })}
        knowledgeIndex={knowledgeIndex}
        isEditRights={isEditRights}
      />
    </DragDropContext>
  )
}

export default ZoonTypologyPart;