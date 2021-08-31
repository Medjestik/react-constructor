import React from 'react';
import './DragAndDrop.css';
import { DragDropContext } from 'react-beautiful-dnd';
import DroppableColumn from './DroppableColumn/DroppableColumn.js';


function DragAndDrop({ data, onEdit, onRemove, onChangeOrder, isEditRights }) {

  const [dataQuestion, setDataQuestion] = React.useState([]);

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

    setDataQuestion(newData);
    
  }, [data]);

  
  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const column = dataQuestion.column;

    const newPartIds = Array.from(column.partIds);
    newPartIds.splice(source.index, 1);
    newPartIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      partIds: newPartIds,
    };

    const newState = {
      ...dataQuestion,
      column: newColumn,
    };

    setDataQuestion(newState);

    if (isEditRights) {
      onChangeOrder(newState.column.partIds);
    }
    
  }
 
  
  return (
    dataQuestion.length === 0 ?
    <div></div>
    :
    <DragDropContext onDragEnd={onDragEnd} >
      <DroppableColumn 
        parts={dataQuestion.column.partIds.map((partId) => {
          let part = {};
          dataQuestion.parts.find(element => {
            if (element.stringIds === partId) {
              return part = element;
            }
            return undefined;
          });
          return part;
        })}
        onEdit={onEdit}
        onRemove={onRemove}
        isEditRights={isEditRights}
      />
    </DragDropContext>
  )
}

export default DragAndDrop;