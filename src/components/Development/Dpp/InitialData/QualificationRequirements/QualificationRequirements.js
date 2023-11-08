import React from 'react';
import AddQualificationRequirementsPopup from '../../../../Popup/QualificationRequirementsPopup/AddQualificationRequirementsPopup/AddQualificationRequirementsPopup.js';
import EditQualificationRequirementsPopup from '../../../../Popup/QualificationRequirementsPopup/EditQualificationRequirementsPopup/EditQualificationRequirementsPopup.js';
import ConfirmRemovePopup from '../../../../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';
import List from '../../../../List/List.js';
import ListItem from '../../../../List/ListItem/ListItem.js';

function QualificationRequirements({ qualificationRequirements, onAdd, onEdit, onRemove, isLoading, requestMessage, clearRequestMessage, isEditRights }) {

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

    <h5 className="initial-data__item-title">Требования к уровню подготовленности</h5>
    <p className="initial-data__item-subtitle">Создайте перечень требований для слушателей</p>

    <List>
      {
        qualificationRequirements.map((item, i) => (
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
          <button className="btn btn_type_add" type="button" onClick={openAddPopup}>Добавить требование</button>
        </div>
      </div>
    }

    {
      isOpenAddPopup &&
      <AddQualificationRequirementsPopup
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
      <EditQualificationRequirementsPopup
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
        text={"Вы действительно хотите удалить требование?"}
        onRemove={onRemove}
        isLoading={isLoading}
        requestMessage={requestMessage}
      />
    }

    </>
  );
}

export default QualificationRequirements;
