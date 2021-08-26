import React from 'react';
import './SwapChildrenPopup.css';
import Popup from '../../../../Popup/Popup.js';
import { DragDropContext } from 'react-beautiful-dnd';
import SwapChildrenColumn from './SwapChildrenColumn/SwapChildrenColumn.js';

function SwapChildrenPopup({ isOpen, onClose, nodeChildren, onSave, isLoadingRequest }) {

  const [data, setData] = React.useState([]);

  React.useEffect(() => {

    const newColumnIds = nodeChildren.map((elem) => {
      return elem.id.toString();
    })

    const dataWithStringIds = nodeChildren.map((elem) => {
      return { ...elem, stringIds: elem.id.toString() } ;
    })

    const newData = {
      parts: dataWithStringIds,
      column: {
        partIds: newColumnIds,
      },
    }

    setData(newData);
    
  }, [nodeChildren]);

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const column = data.column;

    const newPartIds = Array.from(column.partIds);
    newPartIds.splice(source.index, 1);
    newPartIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      partIds: newPartIds,
    };

    const newState = {
      ...data,
      column: newColumn,
    };

    setData(newState);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(data.column.partIds);
  }
  
  React.useEffect(() => {
    return () => {
      setData([]);
    };
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="new-link-zoon-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="popup__title">Упорядочивание дочерних элементов</h3>
        <p className="popup__subtitle">Расставьте элементы в правильном порядке, перетаскивая их с помощью мыши.</p>
        {
          data.length === 0 ?
          <div></div>
          :
          <DragDropContext onDragEnd={onDragEnd} >
            <SwapChildrenColumn 
              parts={data.column.partIds.map((partId) => { 
                let part = {};
                data.parts.find(element => {
                  if (element.stringIds === partId) {
                    return part = element;
                  }
                  return undefined;
                });
                return part;
              })}
            />
          </DragDropContext>
        }

        <button className={`btn btn_type_save swap-children__btn-save ${isLoadingRequest ? "btn_type_loading" : ""}`} type="submit">{isLoadingRequest ? "Сохранение.." : "Сохранить"}</button>
              
      </form>
    </Popup>
  )
}

export default SwapChildrenPopup;