import React from 'react';
import Popup from '../../../../Popup/Popup.js';
import GetBase64File from '../../../../../custom/GetBase64File.js';

function AddImgAnswerPopup({ isOpen, onAdd, onClose, id }) {

  const [blockSubmitButton, setBlockSubmitButton] = React.useState(true); 
  const [fileName, setFileName] = React.useState('');
  const [file, setFile] = React.useState({
    file: null,
  })

  function handleSubmit(e) {
    e.preventDefault();

    let test = file.file;
    GetBase64File(test)
    .then(result => {
      test['base64'] = result;
      onAdd(test.base64, id);
      onClose();
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleChangeFile(e) {
    if (e.target.files.length > 0) {
      setFile({
        file: e.target.files[0],
      })
      setFileName(e.target.files[0].name);
    } else {
      setFile({
        file: null,
      })
      setFileName('');
    }
  }

  React.useEffect(() => {
    setBlockSubmitButton(true);
    setFileName('');
    setFile({
      file: null,
    })
  }, [isOpen]);

  React.useEffect(() => {
    if (file.file != null) {
      setBlockSubmitButton(false);
    } else {
      setBlockSubmitButton(true);
    }
  }, [file]);


  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form" name="add-img-question-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="popup__title">Добавление изображения</h3>
        <div className="popup__choose-file ">
          <label htmlFor="add-img-question-file-upload" className="popup__choose-file-form">{file.file != null ? fileName : 'Загрузите файл' }</label>
          <input onChange={handleChangeFile} id="add-img-question-file-upload" className="popup__file-input" type="file" />
        </div>
        <div className="popup__submit">
          <button 
            className={`popup__submit-button ${blockSubmitButton ? "popup__submit-button_type_block" : ""}`} 
            type="submit"
          >
            Добавить
          </button>
        </div>
      </form>
    </Popup>
  )
}

export default AddImgAnswerPopup;