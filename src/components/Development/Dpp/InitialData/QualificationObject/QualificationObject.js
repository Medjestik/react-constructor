import React from 'react';
import AddQualificationObjectPopup from '../../../../Popup/QualificationObjectPopup/AddQualificationObjectPopup/AddQualificationObjectPopup.js';
import EditQualificationObjectPopup from '../../../../Popup/QualificationObjectPopup/EditQualificationObjectPopup/EditQualificationObjectPopup.js';
import ConfirmRemovePopup from '../../../../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';
import List from '../../../../List/List.js';
import ListItem from '../../../../List/ListItem/ListItem.js';

function QualificationObject({ qualificationObject, onAdd, onEdit, onRemove, isLoading, requestMessage, clearRequestMessage, isEditRights }) {

  const [isOpenAddPopup, setIsOpenAddPopup] = React.useState(false);
  const [isOpenEditPopup, setIsOpenEditPopup] = React.useState(false);
  const [isOpenRemovePopup, setIsOpenRemovePopup] = React.useState(false);

  const [currentData, setCurrentData] = React.useState({}); 

  function openAddPopup() {
    setIsOpenAddPopup(true);
  }

  function openEditPopup(data) {
    setCurrentData(data);
    setIsOpenEditPopup(true);
  }

  function openRemovePopup(data) {
    setCurrentData(data);
    setIsOpenRemovePopup(true);
  }

  function closePopup() {
    clearRequestMessage();
    setIsOpenAddPopup(false);
    setIsOpenEditPopup(false);
    setIsOpenRemovePopup(false);
  }

  React.useEffect(() => {
    return (() => {
      setCurrentData({});
    })
  }, []);

  return (
    <>

    <h5 className="initial-data__item-title">Объекты профессиональной деятельности</h5>
    <p className="initial-data__item-subtitle">Создайте объекты профессиональной деятельности</p>

    <List>
      {
        qualificationObject.map((item, i) => (
          <ListItem
            number={i + 1}
            key={i}
            item={item} 
            title={item.text} 
            subtitle=''
            tag=''
            isEdit={true}
            onEdit={openEditPopup}
            isRemove={true} 
            onRemove={openRemovePopup}
          >
          </ListItem>
        ))
      }
    </List>

    {
      isEditRights &&
      <div className="form__btn-container form__btn-container_margin_top-20">
        <div className="form__btn-item">
          <button className="btn btn_type_add" type="button" onClick={openAddPopup}>Добавить объект</button>
        </div>
      </div>
    }

    {
      isOpenAddPopup &&
      <AddQualificationObjectPopup
        isOpen={isOpenAddPopup}
        onClose={closePopup}
        onAdd={onAdd}
        isLoading={isLoading}
        requestMessage={requestMessage}
        clearRequestMessage={clearRequestMessage}
      />
    }

    {
      isOpenEditPopup &&
      <EditQualificationObjectPopup
        isOpen={isOpenEditPopup}
        onClose={closePopup}
        data={currentData}
        onEdit={onEdit}
        isLoading={isLoading}
        requestMessage={requestMessage}
        clearRequestMessage={clearRequestMessage}
      />
    }

    {
      isOpenRemovePopup &&
      <ConfirmRemovePopup
        isOpen={isOpenRemovePopup}
        onClose={closePopup}
        data={currentData}
        text={"Вы действительно хотите удалить объект?"}
        onRemove={onRemove}
        isLoading={isLoading}
        requestMessage={requestMessage}
      />
    }

    </>
  );
}

export default QualificationObject;
