import React from 'react';
import './EducationalMaterial.css';
import * as educationalMaterialApi from '../../../../utils/educationalMaterialApi/educationalMaterialApi.js';
import Preloader from '../../../Preloader/Preloader.js';
import EducationalMaterialTable from './EducationalMaterialTable/EducationalMaterialTable.js';
import EducationalMaterialItem from './EducationalMaterialItem/EducationalMaterialItem.js';
import EducationalMaterialItemRemoveFilePopup from './EducationalMaterialItemRemoveFilePopup/EducationalMaterialItemRemoveFilePopup.js';

function EducationalMaterial({ dppDescription, loggedIn, isEditRights }) {

  const [programStructure, setProgramStructure] = React.useState([]);
  const [content, setContent] = React.useState({});
  const [currentChapterId, setCurrentChapterId] = React.useState("");
  const [currentThemeId, setCurrentThemeId] = React.useState("");
  const [currentType, setCurrentType] = React.useState("");
  const [isLoadingProgramStructure, setIsLoadingProgramStructure] = React.useState(true);
  const [isLoadingContent, setIsLoadingContent] = React.useState(false);
  const [isShowProgramStructure, setIsShowProgramStructure] = React.useState(true);
  const [isShowItem, setIsShowItem] = React.useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestMessage, setIsShowRequestMessage] = React.useState({ isShow: false, text: "", type: "" });
  const [isRemoveFilePopupOpen, setIsRemoveFilePopupOpen] = React.useState(false);

  function getStructure() {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      setIsLoadingProgramStructure(true);
      educationalMaterialApi.getProgramStructure({ token: token, dppId: dppDescription.id, ctId: dppDescription.ct_version_id })
        .then((res) => {
          setProgramStructure(res);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingProgramStructure(false); 
        });
    }
  }

  function getContent(currentType, themeId) {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      setIsLoadingContent(true);
      educationalMaterialApi.getContent({ token: token, ctId: dppDescription.ct_version_id, themeId: themeId, type: currentType  })
        .then((res) => {
          setContent(res);
        })
        .catch(() => {
          setIsShowProgramStructure(true);
          setIsShowItem(false);
          setCurrentThemeId("");
        })
        .finally(() => {
          setIsLoadingContent(false); 
        });
    }
  }

  function uploadContent(currentType, themeId, file) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      const formData = new FormData();
      formData.append('file', file);
      educationalMaterialApi.uploadContent({ token: token, ctId: dppDescription.ct_version_id, themeId: themeId, type: currentType, file: formData })
        .then(() => {
          const chapter = programStructure.find((ch) => (ch.id === currentChapterId));
          const chapterIndex = programStructure.indexOf(programStructure.find((ch) => (ch.id === currentChapterId)));
          const theme = chapter.themes.find((th) => (th.id === currentThemeId));
          const themeIndex = chapter.themes.indexOf(chapter.themes.find((th) => (th.id === currentThemeId)));
          const contentIndex = theme.contents.indexOf(theme.contents.find((ct) => (ct.id === content.id)));
          const newContents = [...theme.contents.slice(0, contentIndex), {...content, is_loaded: 1}, ...theme.contents.slice(contentIndex + 1)];
          const newThemes = [...chapter.themes.slice(0, themeIndex), {...theme, contents: newContents}, ...chapter.themes.slice(themeIndex + 1)];
          const newChapters = [...programStructure.slice(0, chapterIndex), {...chapter, themes: newThemes}, ...programStructure.slice(chapterIndex + 1)];
          setProgramStructure(newChapters);
          setContent({...content, is_loaded: 1});
          setIsShowRequestMessage({ isShow: true, text: "Данные успешно сохранены!", type: "success" });
        })
        .catch((err) => {
          if(err.status === 403) {
            setIsShowRequestMessage({ isShow: true, text: "Документ не прошел проверку и не может быть загружен, следуйте инструкции в шаблоне!", type: "error" });
          } else {
            setIsShowRequestMessage({ isShow: true, text: "К сожалению, на сервере произошла ошибка!", type: "error" });
          }
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
    }
  }

  function hideRequestMessage() {
    setIsShowRequestMessage({ isShow: false, text: "", type: "" });
  }

  function showItem(type, chapterId, themeId) {
    if (isEditRights) {
      setCurrentChapterId(chapterId);
      setCurrentThemeId(themeId);
      getContent(type, themeId);
      setIsShowItem(true);
      setIsShowProgramStructure(false);
    }
  }

  function backToStructure() {
    setIsShowProgramStructure(true);
    setIsShowItem(false);
    setCurrentThemeId("");
  }

  function removeFile(themeId, type) {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      educationalMaterialApi.removeFile({ token: token, ctId: dppDescription.ct_version_id, themeId: themeId, type: type })
        .then(() => {
          const chapter = programStructure.find((ch) => (ch.id === currentChapterId));
          const chapterIndex = programStructure.indexOf(programStructure.find((ch) => (ch.id === currentChapterId)));
          const theme = chapter.themes.find((th) => (th.id === currentThemeId));
          const themeIndex = chapter.themes.indexOf(chapter.themes.find((th) => (th.id === currentThemeId)));
          const contentIndex = theme.contents.indexOf(theme.contents.find((ct) => (ct.id === content.id)));
          const newContents = [...theme.contents.slice(0, contentIndex), {...content, is_loaded: 0}, ...theme.contents.slice(contentIndex + 1)];
          const newThemes = [...chapter.themes.slice(0, themeIndex), {...theme, contents: newContents}, ...chapter.themes.slice(themeIndex + 1)];
          const newChapters = [...programStructure.slice(0, chapterIndex), {...chapter, themes: newThemes}, ...programStructure.slice(chapterIndex + 1)];
          setProgramStructure(newChapters);
          setContent({...content, is_loaded: 0});
          closeAllEducationalMaterialPopup();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
      }
  }

  function openRemoveFilePopup(themeId, type) {
    setCurrentThemeId(themeId);
    setCurrentType(type);
    setIsRemoveFilePopupOpen(true);
  }

  function closeAllEducationalMaterialPopup() {
    setIsRemoveFilePopupOpen(false);
  }

  React.useEffect(() => {
    getStructure();
    setIsShowProgramStructure(true);
    setIsShowItem(false);
    setCurrentChapterId("");
    setCurrentThemeId("");
    setIsLoadingRequest(false);
    setIsShowRequestMessage({ isShow: false, text: "", type: "" });
    return () => {
      setProgramStructure([]);
      setIsShowProgramStructure(true);
      setIsShowItem(false);
      setCurrentChapterId("");
      setCurrentThemeId("");
      setIsLoadingRequest(false);
      setIsShowRequestMessage({ isShow: false, text: "", type: "" });
    };
    // eslint-disable-next-line
  }, [loggedIn, dppDescription])

  return (
    <div className="educational-material">
      <h1 className="main__title">Проектирование учебно-методических материалов</h1>
        {
          isShowProgramStructure &&
          <>
          {
            isLoadingProgramStructure
            ?
            <Preloader />
            :
            <EducationalMaterialTable 
            programStructure={programStructure}
            onShowItem={showItem}
            />
          }
          </>
        }
        {
          isShowItem &&
          <EducationalMaterialItem
          isShowItem={isShowItem}
          content={content}
          currentThemeId={currentThemeId}
          onUpload={uploadContent}
          isLoadingContent={isLoadingContent}
          backToStructure={backToStructure}
          isLoadingRequest={isLoadingRequest}
          isShowRequestMessage={isShowRequestMessage}
          hideRequestMessage={hideRequestMessage}
          onRemoveFile={openRemoveFilePopup}
          />
        }
        {
          isRemoveFilePopupOpen &&
          <EducationalMaterialItemRemoveFilePopup
          isOpen={isRemoveFilePopupOpen}
          onClose={closeAllEducationalMaterialPopup}
          onRemove={removeFile}
          themeId={currentThemeId}
          type={currentType}
          isLoading={isLoadingRequest}
          />
        }
    </div>
  );
}

export default EducationalMaterial;