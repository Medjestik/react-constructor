import React from 'react';
import Preloader from '../../../../Preloader/Preloader.js';

function EducationalMaterialItem({ content, onUpload, currentThemeId, isLoadingContent, backToStructure }) {

  console.log(content);

  const [fileName, setFileName] = React.useState({
    isShow: false,
    name: "",
  });
  const [isShowWrongType, setIsShowWrongType] = React.useState(false)
  const [contentFile, setContentFile] = React.useState({
    file: null,
  })

  function defineItemTypeTitle(itemType) {
    switch (itemType) {
      case "lec":
        return ("Скачайте шаблон для заполнения контента лекции.");
      case "pr":
        return ("Скачайте шаблон для заполнения контента практической работы.");
      case "lab":
        return ("Скачайте шаблон для заполнения контента лабораторной работы.");
      default:
        return ("Скачайте шаблон для заполнения контента.")
    }
  }

  function handleChangeFile(e) {
    setIsShowWrongType(false);
    setFileName({ isShow: false, name: "" });
    if (e.target.files.length > 0) {
      if (e.target.files[0].name.match(/.(doc|docx)$/i)) {
        setContentFile({ file: e.target.files[0] });
        setFileName({ isShow: true, name: e.target.files[0].name });
      } else {
        setFileName({ isShow: false, name: e.target.files[0].name });
        setIsShowWrongType(true);
        setContentFile({ file: null, })
      }
    } else {
      setContentFile({ file: null, })
    }
  }

  function onSave() {
    onUpload(content.type, currentThemeId, contentFile.file);
    console.log(contentFile.file);
  }

  React.useEffect(() => {
    setContentFile({
      file: null,
    })
    setFileName({
      isShow: false,
      name: ""
    });
    setIsShowWrongType(false);
  }, [content]);
 
  return (
    <div className="educational-material-item">
      <button className="btn btn_type_back educational-material-item__btn-back" type="button" onClick={backToStructure}>К структуре программы</button>
      {
        isLoadingContent ?
        <Preloader />
        :
        <>
        <h3 className="educational-material-item__title">Этапы проектирования:</h3>
        <ul className="educational-material-item__steps">

          <li className="educational-material-item__step">
            <span className="educational-material-item__step-number">1</span>
            <div className="educational-material-item__step-description">
              <p className="educational-material-item__name">{defineItemTypeTitle(content.type)}</p>
              <a className="btn btn_type_export-word educational-material-item__btn-export" href={`https://constructor.emiit.ru:8887/content/${content.id}/template`} target="_blank" rel="noreferrer">Скачать шаблон</a>
            </div>
          </li>

          <li className="educational-material-item__step">
            <span className="educational-material-item__step-number">2</span>
            <p className="educational-material-item__name">Вставьте ваш контент в скачанный шаблон.</p>
          </li>

          <li className="educational-material-item__step">
            <span className="educational-material-item__step-number">3</span>
            <p className="educational-material-item__name">На последней странице шаблона запустите проверку текста, исправьте все орфографические и пунктуационные ошибки, которые MS Word предложит исправить.</p>
          </li>

          <li className="educational-material-item__step">
            <span className="educational-material-item__step-number">4</span>
            <div className="educational-material-item__step-description">
              <p className="educational-material-item__name">Загрузите отформатированный документ.</p>
              <div className="educational-material-item__choose-file">
                <label htmlFor="file-upload" className="btn btn_type_upload">Загрузить файл</label>
                <input onChange={handleChangeFile} id="file-upload" className="popup__file-input" type="file" />
              </div>
              {
                fileName.isShow &&
                <span className="educational-material-item__choose-file-success">Файл {fileName.name} успешно добавлен! Нажмите кнопку сохранить.</span>
              }
              {
                isShowWrongType &&
                <span className="educational-material-item__choose-file-error">Неправильный тип файла {fileName.name}. Загрузите другой файл!</span>
              }
            </div>
          </li>

        </ul>

        <button 
        className={`btn btn_type_save educational-material-item__btn-save ${fileName.isShow ? "" : "btn_type_block"}`} 
        onClick={onSave}
        type="button"
        >
          Сохранить
        </button>
        </>
      }
    </div>
  );
}

export default EducationalMaterialItem;