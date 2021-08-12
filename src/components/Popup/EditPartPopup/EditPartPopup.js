import React from 'react';
import './EditPartPopup.css';
import Popup from '../Popup.js';

function EditPartPopup({ isOpen, onClose, part, partIndex, onEdit }) {

  const [partName, setPartName] = React.useState('');
  const [isChangeName, setIsChangeName] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const newPart = { ...part, name: partName }
    onEdit(newPart, partIndex);
  }

  function handleChangePartName(e) {
    setPartName(e.target.value);
    setIsChangeName(true);
  }

  React.useEffect(() => {
    setPartName(part.name);
    setIsChangeName(false);
  }, [isOpen, part]);

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="edit-part-form" action="#" noValidate onSubmit={handleSubmit}>
      <h3 className="popup__title">Редактирование раздела программы</h3>
      <p className="popup__subtitle">Название раздела</p>
      <textarea 
        className="initial-data__item-qualification-text" 
        name="part-name" 
        placeholder="Введите название раздела программы"
        value={partName}
        onChange={handleChangePartName}
        minLength="1"
        required
      >
      </textarea>
      <button className={`btn btn_type_save initial-popup__btn-save ${partName.length < 1 || !isChangeName ? "btn_type_block" : ""}`} type="submit">Сохранение</button>
      </form>
    </Popup>
  )

}

export default EditPartPopup;