import React from 'react';
import './EducationalMaterial.css';
import * as educationalMaterialApi from '../../../../utils/educationalMaterialApi/educationalMaterialApi.js';
import Preloader from '../../../Preloader/Preloader.js';
import EducationalMaterialTable from './EducationalMaterialTable/EducationalMaterialTable.js';
import EducationalMaterialItem from './EducationalMaterialItem/EducationalMaterialItem.js';

function EducationalMaterial({ dppDescription, loggedIn, isEditRights }) {

  const [programStructure, setProgramStructure] = React.useState([]);
  const [content, setContent] = React.useState({});
  const [currentThemeId, setCurrentThemeId] = React.useState("");
  const [isLoadingProgramStructure, setIsLoadingProgramStructure] = React.useState(true);
  const [isLoadingContent, setIsLoadingContent] = React.useState(false);
  const [isShowProgramStructure, setIsShowProgramStructure] = React.useState(true);
  const [isShowItem, setIsShowItem] = React.useState(false);

  console.log(programStructure)

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
        .catch((err) => {
          setIsShowProgramStructure(true);
          setIsShowItem(false);
          setCurrentThemeId("");
        })
        .finally(() => {
          setIsLoadingContent(false); 
        });
    }
  }

  function showItem(type, id) {
    setCurrentThemeId(id);
    getContent(type, id);
    setIsShowItem(true);
    setIsShowProgramStructure(false);
  }

  function backToStructure() {
    setIsShowProgramStructure(true);
    setIsShowItem(false);
    setCurrentThemeId("");
  }

  React.useEffect(() => {
    getStructure();
    setIsShowProgramStructure(true);
    setIsShowItem(false);
    setCurrentThemeId("");
    return () => {
      setProgramStructure([]);
      setIsShowProgramStructure(true);
      setIsShowItem(false);
      setCurrentThemeId("");
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
            isEditRights={isEditRights}
            />
          }
          </>
        }
        {
          isShowItem &&
          <EducationalMaterialItem
          content={content}
          isLoadingContent={isLoadingContent}
          backToStructure={backToStructure}
          />
        }
    </div>
  );
}

export default EducationalMaterial;