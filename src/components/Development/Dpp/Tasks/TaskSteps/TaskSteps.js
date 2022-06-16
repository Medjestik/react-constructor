import React from 'react';
import './TaskSteps.css';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskStepsColumn from '../TaskStepsColumn/TaskStepsColumn.js';

function TaskSteps({ stepsTask, onAddStep, onEditStep, onRemoveStep, onChangeOrder }) {

  const [dataQuestion, setDataQuestion] = React.useState([]);

  React.useEffect(() => {

    const newColumnIds = stepsTask.map((elem) => {
      return elem.id.toString();
    })

    const dataWithStringIds = stepsTask.map((elem) => {
      return { ...elem, stringIds: elem.id.toString() };
    })

    const newData = {
      parts: dataWithStringIds,
      column: {
        partIds: newColumnIds,
      },
    }

    setDataQuestion(newData);
    
  }, [stepsTask]);

  
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

    onChangeOrder(newState.column.partIds);
  }

  return (
    <div className="task-steps">
      <button className="btn btn_type_add" type="button" onClick={() => onAddStep()}>Добавить объект оценки</button>
      {
        dataQuestion.length === 0 ?
        <div></div>
        :
        <DragDropContext onDragEnd={onDragEnd} >
          <TaskStepsColumn 
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
            onEditStep={onEditStep}
            onRemoveStep={onRemoveStep}
          />
        </DragDropContext>
      }
    </div>
  )
}

export default TaskSteps; 