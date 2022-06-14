import React from 'react';
import './AdditionalMaterial.css';
import AddAdditionalMaterial from './AddAdditionalMaterial/AddAdditionalMaterial.js';
import RemoveAdditionalMaterial from './RemoveAdditionalMaterial/RemoveAdditionalMaterial.js';

function AdditionalMaterial({ additionalMaterial, onAddAdditionalMaterial, onRemoveAdditionalMaterial, currentTask, isLoadingRequest }) {

  const [isShowAddPopup, setIsShowAddPopup] = React.useState(false);
  const [isShowRemovePopup, setIsShowRemovePopup] = React.useState(false);
  const [currentMaterialId, setCurrentMaterialId] = React.useState('');

  function showAddPopup() {
    setIsShowAddPopup(true);
  }

  function showRemovePopup(id) {
    setIsShowRemovePopup(true);
    setCurrentMaterialId(id);
  }

  function closePopups() {
    setIsShowAddPopup(false);
    setIsShowRemovePopup(false);
  }

  return (
    <>
    <div>
      <p className="main__subtitle">Вы можете добавить дополнительные материалы к практическому заданию.</p>
      <div className="additional-material">
        <h3 className="additional-material__title">Дополнительные материалы:</h3>
          {
            additionalMaterial.length > 0
            ?
            <ul className="additional-material__documents-list">
              {
                additionalMaterial.map((material, i) => (
                  <li key={`docx-${i}`} className="additional-material__documents-item">
                    <span className="additional-material__documents-item-count">{i + 1}.</span>
                    <a className="additional-material__documents-link" href={`https://constructor.emiit.ru:8887/tasks/${currentTask.id}/additional_files/${material.id}/download`} target="_blank" rel="noreferrer">{material.name}</a>
                    <button className="additional-material__btn-remove" type="button" onClick={() => showRemovePopup(material.id)}></button>
                  </li>
                ))
              }
            </ul>
            :
            <p className="additional-material__documents-caption">Материалы пока не загружены!</p>
          }
          <button className="btn btn_type_add additional-material_btn_add_material" type="button" onClick={() => showAddPopup()}>Добавить новый материал</button> 
      </div>
    </div>

    {
      isShowAddPopup &&
      <AddAdditionalMaterial 
      isOpen={isShowAddPopup}
      onClose={closePopups}
      onAddFile={onAddAdditionalMaterial}
      isLoading={isLoadingRequest}
      />
    }

    {
      isShowRemovePopup &&
      <RemoveAdditionalMaterial
      isOpen={isShowRemovePopup}
      onClose={closePopups}
      onRemoveFile={onRemoveAdditionalMaterial}
      currentMaterialId={currentMaterialId}
      isLoading={isLoadingRequest}
      />
    }


    </>
  )
}






export default AdditionalMaterial;