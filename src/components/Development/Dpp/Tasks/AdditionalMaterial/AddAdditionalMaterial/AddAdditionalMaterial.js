import React from 'react';
import Popup from '../../../../../Popup/Popup.js';
import "../../../EducationalMaterial/EducationalMaterialItemAddMaterialPopup/EducationalMaterialItemAddMaterialPopup.css";

function AddAdditionalMaterial({ isOpen, onClose, onAddFile, isLoading }) {

  const [name, setName] = React.useState("");
  const [materialName, setMaterialName] = React.useState({ isShow: false, name: "", });
  const [materialFile, setMaterialFile] = React.useState({ file: null, });
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeMaterialFile(e) {
    setMaterialName({ isShow: false, name: "" });
    if (e.target.files.length > 0) {
      setMaterialFile({ file: e.target.files[0] });
      setMaterialName({ isShow: true, name: e.target.files[0].name });
    } else {
      setMaterialFile({ file: null, });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const material = {
      name: name,
      file: materialFile.file
    }
    onAddFile(material, onClose);
  }

  React.useEffect(() => {
    if (name.length > 0 && materialFile.file !== null) {
      setIsBlockSubmitButton(false);
    } else {
      setIsBlockSubmitButton(true);
    }

  }, [name, materialFile]);

  React.useEffect(() => {
    setName("");
  }, [isOpen]);

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_small" name="add-content-material-file" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="popup__title">Загрузка дополнительного материала</h3>
        <ul className="add-material__list">
          <li className="add-material__item-input">
            <h5 className="add-material__input-name">Название материала</h5>
            <input  
            className="add-material__input"
            placeholder="введите название материала"
            type="text"
            id="material-content-name"
            name="material-content-name"
            autoComplete="off"
            value={name}
            onChange={handleChangeName}
            >
            </input>
          </li>
          <li className="add-material__item-input">
            <h5 className="add-material__input-name">Загружаемый файл</h5>
            <label htmlFor="material-upload" className="add-material__input add-material__input-file">{materialName.isShow ? materialName.name : "загрузите файл"}</label>
            <input onChange={handleChangeMaterialFile} id="material-upload" className="popup__file-input" type="file" />
          </li>
        </ul>
        <button className={`btn btn_type_save add-material__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Сохранение.." : "Сохранить"}</button>
      </form>
    </Popup>
    )
}

export default AddAdditionalMaterial; 