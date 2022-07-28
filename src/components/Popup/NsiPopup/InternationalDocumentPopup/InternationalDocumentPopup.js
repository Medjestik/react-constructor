import React from 'react';
import Popup from '../../Popup.js';

function InternationalDocumentPopup({ isOpen, onClose, nsi, onSave, id, printDate, type, isLoading }) {

  const [addName, setAddName] = React.useState('');
  const [addNameError, setAddNameError] = React.useState(false);
  const [addEditor, setAddEditor] = React.useState('');
  const [addEditorError, setAddEditorError] = React.useState(false);
  const [addLink, setAddLink] = React.useState('');
  const [addLinkError, setAddLinkError] = React.useState(false);
  const [addFullName, setAddFullName] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const newNsi = { ...nsi, nsiName: addName, nsiEditor: addEditor, nsiLink: addLink, type_id: id, nsiFullName: addFullName };
    onSave(newNsi, onClose);
  }

  function handleAddName(e) {
    setAddName(e.target.value);
    if (e.target.checkValidity()) {
      setAddNameError(false);
    } else {
      setAddNameError(true);
    }
  }

  function handleAddEditor(e) {
    setAddEditor(e.target.value);
    if (e.target.checkValidity()) {
      setAddEditorError(false);
    } else {
      setAddEditorError(true);
    }
  }

  function handleAddLink(e) {
    setAddLink(e.target.value);
    if (e.target.checkValidity()) {
      setAddLinkError(false);
    } else {
      setAddLinkError(true);
    }
  }

  React.useEffect(() => {
    setAddName(nsi.nsiName);
    setAddLink(nsi.nsiLink);
    setAddEditor(nsi.nsiEditor);
    setAddFullName('');
    setAddNameError(false);
    setAddLinkError(false);
    setAddEditorError(false);
    setIsBlockSubmitButton(true);
  }, [nsi, isOpen]);

  React.useEffect(() => {
    if (
      addNameError || 
      addName.length < 1 ||
      addEditorError || 
      addEditor.length < 1 ||
      addLinkError ||
      addLink.length < 1
      ) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [addName, addEditor, addLink])

  React.useEffect(() => { 
    let name = addName.length > 0 ? addName : "<название>"
    let editor = addEditor.length > 0 ? addEditor : "<описание>"
    let link = addLink.length > 0 ? addLink : "<URL>"; 
    setAddFullName(name + " : " + editor + " // " + link);

  // eslint-disable-next-line
  }, [addName, addEditor, addLink])

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name={`${type}-nsi-form-${id}`} action="#" noValidate onSubmit={handleSubmit}>
          <h3 className="nsi-popup__title">{`${type === "edit" ? "Редактирование " : "Добавление "}`}Международного документа</h3>
          <ul className="nsi-popup__list-input">
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Название документа</h5>
            <input 
            className="nsi-popup__input"
            placeholder="введите название документа"
            type="text"
            id={`${type}-nsi-input-name-${id}`}
            name={`${type}-nsi-input-name-${id}`}
            autoComplete="off"
            value={addName}
            onChange={handleAddName}
            required
            >
            </input>
            <span className={`nsi-popup__input-error ${addNameError ? "nsi-popup__input-error_type_show" : ""}`}>Заполните название</span>
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Когда и кем утвержден, одобрен или принят</h5>
            <input 
            className="nsi-popup__input"
            placeholder="введите информацию о документе"
            type="text"
            id={`${type}-nsi-input-editor-${id}`}
            name={`${type}-nsi-input-editor-${id}`}
            autoComplete="off"
            value={addEditor}
            onChange={handleAddEditor}
            required
            >
            </input>
            <span className={`nsi-popup__input-error ${addEditorError ? "nsi-popup__input-error_type_show" : ""}`}>Заполните информацию о документе</span>
          </li>
          <li className="nsi-popup__item-input">
            <h5 className="nsi-popup__input-name">Адрес сайта, URL</h5>
            <input  
            className="nsi-popup__input"
            placeholder="введите url"
            type="url"
            id={`${type}-nsi-input-link-${id}`}
            name={`${type}-nsi-input-link-${id}`}
            autoComplete="off"
            value={addLink}
            onChange={handleAddLink}
            required
            >
            </input>
            <span className={`nsi-popup__input-error ${addLinkError ? "nsi-popup__input-error_type_show" : ""}`}>Введите корректный URL</span>
          </li>
        </ul>

        <p className="initial-popup__result-name">
          <span className="initial-popup__result-name_weight_bold">Итоговое название: </span>
          {addFullName}
        </p>

        {
          type === "edit" ?
          <button 
          className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} 
          type="submit"
          >
            {isLoading ? "Сохранение.." : "Сохранить"}
          </button>
          :
          <button 
          className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} 
          type="submit"
          >
            {isLoading ? "Добавление.." : "Добавить"}
          </button>
        }

      </form>
    </Popup>
    )
}

export default InternationalDocumentPopup;