import React from 'react';
import Preloader from '../../../../Preloader/Preloader.js';
import './EducationalMaterialItem.css';

function EducationalMaterialItem({ isShowItem, content, onUpload, currentThemeId, isLoadingContent, backToStructure, isLoadingRequest, isShowRequestMessage, hideRequestMessage }) {

  const [fileName, setFileName] = React.useState({ isShow: false, name: "", });
  const [isShowWrongType, setIsShowWrongType] = React.useState(false)
  const [contentFile, setContentFile] = React.useState({ file: null, })

  console.log(content)

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
    hideRequestMessage();
    setIsShowWrongType(false);
    setFileName({ isShow: false, name: "" });
    if (e.target.files.length > 0) {
      if (e.target.files[0].name.match(/.(docm)$/i)) {
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
    hideRequestMessage();
    onUpload(content.type, currentThemeId, contentFile.file);
  }

  React.useEffect(() => {
    setContentFile({ file: null, })
    setFileName({ isShow: false, name: "" });
    setIsShowWrongType(false);
    hideRequestMessage();
    // eslint-disable-next-line
  }, [isShowItem]);

  const docs = [{ name: "Загруженный файл", }];
 
  return (
    <div className="educational-material-item">
      <button className="btn btn_type_back educational-material-item__btn-back" type="button" onClick={backToStructure}>К структуре программы</button>
      {
        isLoadingContent ?
        <Preloader />
        :
        <>
        <div className="educational-material-item__theme">
          {
            content.type === "lec" &&
            <span className="educational-material-item__theme-type educational-material-item__theme-type_type_lec">Лекция</span>
          }
          {
            content.type === "pr" &&
            <span className="educational-material-item__theme-type educational-material-item__theme-type_type_pr">Практика</span>
          }
          {
            content.type === "lab" &&
            <span className="educational-material-item__theme-type educational-material-item__theme-type_type_lab">Лабораторная</span>
          }
          <p className="educational-material-item__theme-name">{content.name}</p>
        </div>
        
        <div className="educational-material-item__sections">
          <div className="educational-material-item__section-steps">
            <h3 className="educational-material-item__title">Этапы проектирования контента:</h3>
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
                    <span className="request-node request-node_type_success">Файл {fileName.name} успешно добавлен! Нажмите кнопку сохранить.</span>
                  }
                  {
                    isShowWrongType &&
                    <span className="request-node request-node_type_error">Неправильный тип файла {fileName.name}. Загрузите другой файл!</span>
                  }
                </div>
              </li>

            </ul>

            <button 
            className={`btn btn_type_save educational-material-item__btn-save 
            ${fileName.isShow ? "" : "btn_type_block"} 
            ${isLoadingRequest ? "btn_type_block" : ""}
            `} 
            onClick={onSave}
            type="button"
            >
              {isLoadingRequest ? "Сохранение..." : "Сохранить"}
            </button>
            {
              isShowRequestMessage.isShow && isShowRequestMessage.type === "success" &&
              <span className="request-node request-node_type_success">{isShowRequestMessage.text}</span>
            }
            {
              isShowRequestMessage.isShow && isShowRequestMessage.type === "error" &&
              <span className="request-node request-node_type_error">{isShowRequestMessage.text}</span>
            }
          </div>
          <div className="educational-material-item__section-documents">
            <h3 className="educational-material-item__title">Загруженные документы:</h3>
            <div className="educational-material-item__documents-container">
              {
                content.is_loaded === 1
                ?
                <ul className="educational-material-item__documents-list">
                  {
                    docs.map((docx, i) => (
                      <li key={`docx-${i}`} className="educational-material-item__documents-item">
                        <span className="educational-material-item__documents-item-count">{i + 1}.</span>
                        <a className="educational-material-item__documents-link" href={`https://constructor.emiit.ru:8887/content/${content.id}/download`} target="_blank" rel="noreferrer">{docx.name}</a>
                      </li>
                    ))
                  }
                </ul>
                :
                <p className="educational-material-item__documents-caption">Документы пока не загружены!</p>
              }
            </div>
          </div>
        </div>
        </>
      }
      
    </div>
  );
}

export default EducationalMaterialItem;