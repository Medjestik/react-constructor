import React from 'react';
import Preloader from '../../../../Preloader/Preloader.js';
import './EducationalMaterialItem.css';

function EducationalMaterialItem({ isShowItem, content, onUpload, currentThemeId, isLoadingContent, backToStructure, isLoadingRequest, isShowRequestMessage, hideRequestMessage, onRemoveFile, onAddMaterial, onRemoveMaterial }) {

  const [fileName, setFileName] = React.useState({ isShow: false, name: "", });
  const [isShowWrongType, setIsShowWrongType] = React.useState(false);
  const [contentFile, setContentFile] = React.useState({ file: null, });

  const formRef = React.createRef();

  function defineItemTypeTitle(itemType) {
    switch (itemType) {
      case "lec":
        return ("Скачайте шаблон для заполнения контента лекции.");
      case "pr":
        return ("Скачайте шаблон для заполнения контента практической работы.");
      case "lab":
        return ("Скачайте шаблон для заполнения контента лабораторной работы.");
      default:
        return ("Скачайте шаблон для заполнения контента.");
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
        setContentFile({ file: null, });
      }
      formRef.current.reset();
    } else {
      setContentFile({ file: null, });
    }
  }

  function onSave() {
    setContentFile({ file: null, });
    hideRequestMessage();
    onUpload(content.type, currentThemeId, contentFile.file);
  }

  function onRemove(id, type) {
    onRemoveFile(id, type);
    setContentFile({ file: null, });
    setFileName({ isShow: false, name: "" });
    hideRequestMessage();
  }

  function onAdd(id, type) {
    onAddMaterial(id, type);
    setContentFile({ file: null, });
    setFileName({ isShow: false, name: "" });
    hideRequestMessage();
  }

  React.useEffect(() => {
    setContentFile({ file: null, });
    setFileName({ isShow: false, name: "" });
    setIsShowWrongType(false);
    hideRequestMessage();
    // eslint-disable-next-line
  }, [isShowItem]);

  const contentArr = [{ name: "Скачать контент", }];
 
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
            <ul className="educational-material-item__grid">

              <li className="educational-material-item__grid-item educational-material-item__grid-item_type_one">
                <div className="educational-material-item__step">
                  <span className="educational-material-item__step-number">1</span>
                  <div className="educational-material-item__step-description">
                    <p className="educational-material-item__name">{defineItemTypeTitle(content.type)}</p>
                    <a className="btn btn_type_export-word educational-material-item__btn-export" href={`https://constructor-api.emiit.ru/content/${content.id}/template`} target="_blank" rel="noreferrer">Скачать шаблон</a>
                  </div>
                </div>
              </li>

              <li className="educational-material-item__grid-item educational-material-item__grid-item_type_two">
                <div className="educational-material-item__step">
                  <span className="educational-material-item__step-number">2</span>
                  <p className="educational-material-item__name">Вставьте ваш контент в скачанный шаблон, следуя инструкции в нём.</p>
                </div>
              </li>

              <li className="educational-material-item__grid-item educational-material-item__grid-item_type_three">
                <div className="educational-material-item__step">
                  <span className="educational-material-item__step-number">3</span>
                  <div className="educational-material-item__step-description">
                    <p className="educational-material-item__name">Загрузите отформатированный документ.</p>
                    <div className="educational-material-item__choose-file">
                      <form ref={formRef}>
                        <label htmlFor="file-upload" className="btn btn_type_upload">Загрузить файл</label>
                        <input onChange={handleChangeFile} id="file-upload" className="popup__file-input" type="file" />
                      </form>
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
                </div>
              </li>

              <li className="educational-material-item__grid-item educational-material-item__grid-item_type_four">
                <div className="educational-material-item__step">
                  <span className="educational-material-item__step-number">4</span>
                  <p className="educational-material-item__name">Вы можете загрузить дополнительные материалы в&nbsp;окне «Дополнительные материалы».</p>
                </div>
              </li>

              <li className="educational-material-item__grid-item educational-material-item__grid-item_type_five">
                <div className="educational-material-item__upload-document">
                  {
                    content.type === "lec" &&
                    <h3 className="educational-material-item__document-title">Загруженный контент лекции:</h3>
                  }
                  {
                    content.type === "pr" &&
                    <h3 className="educational-material-item__document-title">Загруженный контент практики:</h3>
                  }
                  {
                    content.type === "lab" &&
                    <h3 className="educational-material-item__document-title">Загруженный контент лабораторной:</h3>
                  }
                  {
                    content.is_loaded === 1
                    ?
                    <ul className="educational-material-item__documents-list">
                      {
                        contentArr.map((docx, i) => (
                          <li key={`docx-${i}`} className="educational-material-item__documents-item">
                            <span className="educational-material-item__documents-item-count">{i + 1}.</span>
                            <a className="educational-material-item__documents-link" href={`https://constructor-api.emiit.ru/content/${content.id}/download`} target="_blank" rel="noreferrer">{docx.name}</a>
                            <button className="educational-material-item__btn-remove" type="button" onClick={() => onRemove(currentThemeId, content.type)}></button>
                          </li>
                        ))
                      }
                    </ul>
                    :
                    <p className="educational-material-item__documents-caption">Документ пока не загружен!</p>
                  }
                </div>
              </li>

              
              <li className="educational-material-item__grid-item educational-material-item__grid-item_type_six">
              <div className="educational-material-item__upload-document">
                  <h3 className="educational-material-item__document-title">Дополнительные материалы:</h3>
                    {
                     content.additional_files.length > 0
                      ?
                      <ul className="educational-material-item__documents-list">
                        {
                          content.additional_files.map((material, i) => (
                            <li key={`docx-${i}`} className="educational-material-item__documents-item">
                              <span className="educational-material-item__documents-item-count">{i + 1}.</span>
                              <a className="educational-material-item__documents-link" href={`https://constructor-api.emiit.ru/content/${content.id}/additional_files/${material.id}/download`} target="_blank" rel="noreferrer">{material.name}</a>
                              <button className="educational-material-item__btn-remove" type="button" onClick={() => onRemoveMaterial(currentThemeId, content.type, material.id)}></button>
                            </li>
                          ))
                        }
                      </ul>
                      :
                      <p className="educational-material-item__documents-caption">Материалы пока не загружены!</p>
                    }
                  <button className="btn btn_type_add educational-material-item_btn_add_material" type="button" onClick={() => onAdd(currentThemeId, content.type)}>Добавить новый материал</button> 
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
          
        </div>
        </>
      }
      
    </div>
  );
}

export default EducationalMaterialItem;