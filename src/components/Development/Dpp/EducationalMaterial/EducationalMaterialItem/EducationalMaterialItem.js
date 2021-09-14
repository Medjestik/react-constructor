import React from 'react';
import Preloader from '../../../../Preloader/Preloader.js';

function EducationalMaterialItem({ content, isLoadingContent, backToStructure }) {

  console.log(content);

  const [avatarFile, setAvatarFile] = React.useState({
    file: null,
  })

  function defineItemTypeTitle(itemType) {
    switch (itemType) {
      case "lec":
        return ("Скачайте шаблон для заполнения контента лекции");
      case "pr":
        return ("Скачайте шаблон для заполнения контента практической работы");
      case "lab":
        return ("Скачайте шаблон для заполнения контента лабораторной работы");
      default:
        return ("Скачайте шаблон для заполнения контента")
    }
  }

  function handleChangeFile(e) {
    if (e.target.files.length > 0) {
      setAvatarFile({
        file: URL.createObjectURL(e.target.files[0])
      })
    } else {
      setAvatarFile({
        file: null,
      })
    }
  }
 
  return (
    <div className="educational-material-item">
      <button className="btn btn_type_back educational-material-item__btn-back" type="button" onClick={backToStructure}>К структуре программы</button>
      {
        isLoadingContent ?
        <Preloader />
        :
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
            <p className="educational-material-item__name">Вставьте ваш контент в скачанный шаблон</p>
          </li>

          <li className="educational-material-item__step">
            <span className="educational-material-item__step-number">3</span>
            <p className="educational-material-item__name">На последней странице шаблона запустите проверку текста, исправьте все орфографические и пунктуационные ошибки, которые MS Word предложит исправить</p>
          </li>

          <li className="educational-material-item__step">
            <span className="educational-material-item__step-number">4</span>
            <div className="educational-material-item__step-description">
              <p className="educational-material-item__name">Загрузите отформатированный документ</p>
              <div className="input__choose-file">
                <label htmlFor="file-upload" className="btn btn_type_upload">Загрузить файл</label>
                <input onChange={handleChangeFile} id="file-upload" className="popup__file-input" type="file" />
              </div>
            </div>
          </li>

        </ul>
      }
    </div>
  );
}

export default EducationalMaterialItem;