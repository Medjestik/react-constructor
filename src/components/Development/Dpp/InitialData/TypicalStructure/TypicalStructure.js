import React from 'react';
import './TypicalStructure.css';
import DragAndDrop from '../../../../DragAndDrop/DragAndDrop.js';
import * as api from '../../../../../utils/api.js';

function TypicalStructure({ typologyParts, initialDataVersion, loggedIn, onEdit, onRemove, onChangeOrder, isEditRights }) {

  const [currentTypologiesParts, setCurrentTypologiesParts] = React.useState(typologyParts);
  const [addStructurePartName, setAddStructurePartName] = React.useState('');
  const [showAddFormStructurePart, setShowAddFormStructurePart] = React.useState(false);
  const [isBlockSaveButton, setIsBlockSaveButton] = React.useState(false);


  function handleChangeStructurePartName(e) {
    setAddStructurePartName(e.target.value);
  }

  function handleShowAddFormStructurePart() {
    setShowAddFormStructurePart(!showAddFormStructurePart);
  }

  function handleAddStructurePart() {
    setIsBlockSaveButton(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.createStructurePart({ 
        token: token, 
        initialDataVersion: initialDataVersion, 
        name: addStructurePartName
      })
      .then((res) => {
        setAddStructurePartName('');
        setCurrentTypologiesParts([...currentTypologiesParts, res]);
        handleShowAddFormStructurePart();
      })
      .catch((err) =>{
        console.log(err);
      })
      .finally(() => {
        setIsBlockSaveButton(false);
      });
    }
  }

  React.useEffect(() => {
    setAddStructurePartName('');
  }, [showAddFormStructurePart])

  React.useEffect(() => {
    setAddStructurePartName('');
    setCurrentTypologiesParts(typologyParts);
  }, [typologyParts])
  

  return (
    <div className="typical-structure">
      {
        isEditRights &&
        <button className={`btn btn_type_add ${showAddFormStructurePart ? "typical-structure__btn-add_type_show" : "typical-structure__btn-add_type_hide"}`} type="button" onClick={handleShowAddFormStructurePart}>Добавить новый раздел</button>
      }
      <div className={`typical-structure__add ${showAddFormStructurePart ? "typical-structure__add_type_show" : "typical-structure__add_type_hide"}`}>
        <div className="typical-structure__add-container">
          <input 
          className="typical-structure__add-input"
          placeholder="введите название раздела"
          type="text"
          id="add-input-part-name"
          name="add-input-part-name"
          autoComplete="off"
          value={addStructurePartName}
          onChange={handleChangeStructurePartName}
          >
          </input>
          <button className={`btn btn_type_save typical-structure__btn-type-add ${((addStructurePartName.length < 1) || (isBlockSaveButton)) ? "btn_type_block" : ""}`} type="button" onClick={handleAddStructurePart}>{isBlockSaveButton ? "Добавление.." : "Добавить"}</button>
        </div>
      </div>

      {
        currentTypologiesParts.length === 0 ?
          <div></div>
          :
          <div className="typical-structure__container">
            <h5 className="typical-structure__subtitle">{`Разделы типологии (${currentTypologiesParts.length})`}</h5>
              <DragAndDrop 
                data={currentTypologiesParts}
                onEdit={onEdit}
                onRemove={onRemove}
                onChangeOrder={onChangeOrder}
                isEditRights={isEditRights}
              />
          </div>
      }
    </div>
  )
}

export default TypicalStructure;