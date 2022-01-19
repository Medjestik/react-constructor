import React from 'react';
import './PerformersList.css';
import Preloader from '../../../../Preloader/Preloader.js';
import * as approvalApi from '../../../../../utils/approvalApi/approvalApi.js';
import '../../../../DragAndDrop/DragAndDrop.css';
import { DragDropContext } from 'react-beautiful-dnd';
import PerformersColumn from './PerformersColumn/PerformersColumn.js';
import AddPerformersPopup from './AddPerformersPopup/AddPerformersPopup.js';
import EditPerformersPopup from './EditPerformersPopup/EditPerformersPopup.js';
import RemovePerformersPopup from './RemovePerformersPopup/RemovePerformersPopup.js';

function PerformersList({ dppDescription, loggedIn, isEditRights }) { 

  const [isAddPerformersPopupOpen, setIsAddPerformersPopupOpen] = React.useState(false);
  const [isEditPerformersPopupOpen, setIsEditPerformersPopupOpen] = React.useState(false);
  const [isRemovePerformersPopupOpen, setIsRemovePerformersPopupOpen] = React.useState(false); 
  const [performers, setPerformers] = React.useState([]);
  const [currentPerformer, setCurrentPerformer] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRendering, setIsRendering] = React.useState(true);

  const [dataQuestion, setDataQuestion] = React.useState([]);

  function openAddPerformersPopup() {
    setIsAddPerformersPopupOpen(true);
  }

  function openEditProgramPopup(performer) {
    setCurrentPerformer(performer);
    setIsEditPerformersPopupOpen(true);
  }

  function openRemoveProgramPopup(performer) {
    setCurrentPerformer(performer);
    setIsRemovePerformersPopupOpen(true);
  }

  function closePerformersPopup() {
    setIsAddPerformersPopupOpen(false);
    setIsEditPerformersPopupOpen(false);
    setIsRemovePerformersPopupOpen(false);
  }

  function handleAdd(performer) {
    if (loggedIn) {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      approvalApi.addPerformer({ token: token, dppId: dppDescription.id, performer: performer })
      .then((res) => {
        setPerformers([...performers, res.data]);
        closePerformersPopup();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
    }
  }

  function handleEdit(performer) {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    approvalApi.editPerformer({ token: token, dppId: dppDescription.id, performer: performer })
    .then((res) => {
      const performerIndex = performers.indexOf(performers.find((elem) => (elem.id === res.data.id)));
      setPerformers([...performers.slice(0, performerIndex), res.data, ...performers.slice(performerIndex + 1)]);
      closePerformersPopup();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleRemove(performer) {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    approvalApi.removePerformer({ token: token, dppId: dppDescription.id, performer: performer })
    .then((res) => {
      const newPerformers = performers.filter((elem) => elem.id !== res);
      setPerformers(newPerformers);
      closePerformersPopup();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function onChangeOrder(newOrderIds) {
    const token = localStorage.getItem("token");
    approvalApi.reorderPerformer({ token: token, dppId: dppDescription.id, ids: newOrderIds })
    .then((res) => {
      setPerformers(res.data);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  React.useEffect(() => {

    const newColumnIds = performers.map((elem) => {
      return elem.id.toString();
    })

    const dataWithStringIds = performers.map((elem) => {
      return { ...elem, stringIds: elem.id.toString() } ;
    })

    const newData = {
      parts: dataWithStringIds,
      column: {
        partIds: newColumnIds,
      },
    }

    setDataQuestion(newData);
    
  }, [performers]);

  
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

  React.useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem("token");
      approvalApi.getPerformers({ token: token, dppId: dppDescription.id, })
      .then((res) => {
        console.log(res);
        setPerformers(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsRendering(false));
    }
    return () => {
      setPerformers([]);
      setCurrentPerformer({});
      setDataQuestion([]);
    }
  }, [loggedIn, dppDescription]);

  return (
    isRendering 
    ?
    <Preloader />
    :
    <>
    <div className="performers-list">
      <h2 className="performers-list__title">Список исполнителей по программе</h2>
      <button className="btn btn_type_add performers-list__btn-add" onClick={openAddPerformersPopup}>Добавить исполнителя</button>
      {
        dataQuestion.length === 0 ?
        <div></div>
        :
        <DragDropContext onDragEnd={onDragEnd} >
          <PerformersColumn
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
            onEdit={openEditProgramPopup}
            onRemove={openRemoveProgramPopup}
            isEditRights={isEditRights}
          />
        </DragDropContext>
      }
    </div>

    {
      isAddPerformersPopupOpen &&
      <AddPerformersPopup
        isOpen={isAddPerformersPopupOpen}
        onClose={closePerformersPopup}
        onAdd={handleAdd}
        isLoading={isLoading}
        isShowError={false}
      />
    }

    {
      isEditPerformersPopupOpen &&
      <EditPerformersPopup
        isOpen={isEditPerformersPopupOpen}
        onClose={closePerformersPopup}
        onEdit={handleEdit}
        performer={currentPerformer}
        isLoading={isLoading}
        isShowError={false}
      />
    }

    {
      isRemovePerformersPopupOpen &&
      <RemovePerformersPopup
        isOpen={isRemovePerformersPopupOpen}
        onClose={closePerformersPopup}
        onRemove={handleRemove}
        performer={currentPerformer}
        isLoading={isLoading}
        isShowError={false}
      />
    }

    </>
  );
}

export default PerformersList; 