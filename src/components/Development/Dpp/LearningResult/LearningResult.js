import React from 'react';
import './LearningResult.css';
import * as programStructureApi from '../../../../utils/programStructureApi/programStructureApi.js';
import Preloader from '../../../Preloader/Preloader.js';

function LearningResult({ dppDescription, loggedIn }) { 

  const [programZoons, setProgramZoons] = React.useState();
  const [isLoadingProgramZoons, setIsLoadingProgramZoons] = React.useState(true);

  function getStructure() {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      setIsLoadingProgramZoons(true);
      programStructureApi.getProgramZoons({ token: token, dppId: dppDescription.id, stId: dppDescription.st_version_id })
        .then((res) => {
          setProgramZoons(res);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingProgramZoons(false);
        });
    }
  }

  React.useEffect(() => {
    getStructure();
    return () => {
      setProgramZoons({});
    };
    // eslint-disable-next-line
  }, [loggedIn, dppDescription])

  return (
    <div className="learning-result">
      {
        isLoadingProgramZoons
        ?
        <Preloader />
        :
        <ul className="learning-result__list">
          {
            programZoons.skills.map((elem) => (
              <li className="learning-result__item" key={elem.id}>
                  <div className="learning-result__item-info">
                    <span className="learning-result__symbol learning-result__symbol_type_skill"></span>
                    <h4 className="learning-result__item-title">{elem.name}</h4>
                  </div>
                  <ul className="learning-result__theme-list">
                    {
                      elem.sections.map((theme, i) => (
                        <li className="learning-result__theme-item" key={theme.id}>
                          <span className="learning-result__theme-count">{`${i + 1}. `}</span>
                          <p className="learning-result__theme-name">{theme.name}</p>
                        </li>
                      ))
                    }
                  </ul>
              </li>
            ))
          }
          {
            programZoons.abilities.map((elem) => (
              <li className="learning-result__item" key={elem.id}>
                  <div className="learning-result__item-info">
                    <span className="learning-result__symbol learning-result__symbol_type_ability"></span>
                    <h4 className="learning-result__item-title">{elem.name}</h4>
                  </div>
                  <ul className="learning-result__theme-list">
                    {
                      elem.sections.map((theme, i) => (
                        <li className="learning-result__theme-item" key={theme.id}>
                          <span className="learning-result__theme-count">{`${i + 1}. `}</span>
                          <p className="learning-result__theme-name">{theme.name}</p>
                        </li>
                      ))
                    }
                  </ul>
              </li>
            ))
          }
          {
            programZoons.knowledges.map((elem) => (
              <li className="learning-result__item" key={elem.id}>
                  <div className="learning-result__item-info">
                    <span className="learning-result__symbol learning-result__symbol_type_knowledge"></span>
                    <h4 className="learning-result__item-title">{elem.name}</h4>
                  </div>
                  <ul className="learning-result__theme-list">
                    {
                      elem.sections.map((theme, i) => (
                        <li className="learning-result__theme-item" key={theme.id}>
                          <span className="learning-result__theme-count">{`${i + 1}. `}</span>
                          <p className="learning-result__theme-name">{theme.name}</p>
                        </li>
                      ))
                    }
                  </ul>
              </li>
            ))
          }
        </ul>

      }
    </div>
  );
}

export default LearningResult;