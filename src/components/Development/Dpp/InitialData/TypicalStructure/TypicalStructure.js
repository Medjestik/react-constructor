import React from 'react';
import './TypicalStructure.css';
import DragAndDrop from '../../../../DragAndDrop/DragAndDrop.js';

function TypicalStructure({ typologyParts, onEdit, onRemove, onChoose, }) {

  const [currentTypologiesParts, setCurrentTypologiesParts] = React.useState(typologyParts);
  const [addStructurePartName, setAddStructurePartName] = React.useState('');
  const [showAddFormStructurePart, setShowAddFormStructurePart] = React.useState(false);


  function handleChangeStructurePartName(e) {
    setAddStructurePartName(e.target.value);
  }

  function handleShowAddFormStructurePart() {
    setShowAddFormStructurePart(!showAddFormStructurePart);
  }

  function handleAddStructurePart() {
    setAddStructurePartName('');
    const newStructurePart = {
      name: addStructurePartName,
      id: parseInt(new Date().getTime()),
    }
    setCurrentTypologiesParts([...currentTypologiesParts, newStructurePart]);
    handleShowAddFormStructurePart();
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
      <div className="typical-structure__buttons">
        <button className={`btn btn_type_add initial-popup__btn-add ${showAddFormStructurePart ? "typical-structure__btn-add_type_show" : "typical-structure__btn-add_type_hide"}`} type="button" onClick={handleShowAddFormStructurePart}>Добавить новый раздел</button>
        <button className="btn btn_type_choose" type="button" onClick={onChoose}>Выбрать существующую структуру</button>
      </div>
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
          <button className={`btn btn_type_save typical-structure__btn-type-add ${addStructurePartName.length < 1 ? "btn_type_block" : ""}`} type="button" onClick={handleAddStructurePart}>Добавить</button>
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
              />
          </div>
      }
    </div>
  )
}

export default TypicalStructure;