import React from 'react';
import './EvaluationMaterial.css';
import * as evaluationMaterialApi from '../../../../utils/evaluationMaterialApi/evaluationMaterialApi.js';
import AccordionChooseKnowledge from '../../../Accordion/AccordionChooseKnowledge/AccordionChooseKnowledge.js';
import KnowledgeMaterial from '../KnowledgeMaterial/KnowledgeMaterial.js';

function EvaluationMaterial({ dppDescription, loggedIn }) {

  const [knowledges, setKnowledges] = React.useState([]);
  const [questionTypes, setQuestionTypes] = React.useState([]);
  const [currentKnowledge, setCurrentKnowledge] = React.useState({});
  const [isRenderKnowledge, setIsRenderKnowledge] = React.useState(false);

  const [isLoadingKnowledges, setIsLoadingKnowledges] = React.useState(false);

  function getKnowledges() {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      setIsLoadingKnowledges(true);
      evaluationMaterialApi.getKnowledges({ token: token, dppId: dppDescription.id, omId: dppDescription.om_version_id })
        .then((res) => {
          console.log(res);
          setKnowledges(res.knowledges);
          setQuestionTypes(res.questionTypes);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingKnowledges(false);
        });
    }
  }

  React.useEffect(() => {
    getKnowledges();
    return () => {
      setKnowledges([]);
      setQuestionTypes([]);
    };
    // eslint-disable-next-line
  },[loggedIn, dppDescription])

  
  const findKnowledge = (knowledgeId) => {
    knowledges.forEach((elem) => {
      if (knowledgeId === elem.id) {
        setIsRenderKnowledge(true);
        setCurrentKnowledge(elem);
      }
    })
  }

  React.useEffect(() => {
    const newKnowledge = [];
    knowledges.forEach((elem) => {
      if (elem.id === currentKnowledge.id) {
        elem = currentKnowledge;
      }
      newKnowledge.push(elem);
    })
    setKnowledges(newKnowledge);
    // eslint-disable-next-line
  }, [currentKnowledge]);

  return (
    <div className="evaluation-material">
      <h1 className="main__title">Проектирование оценочных материалов</h1>
      <p className="main__subtitle">Для работы с оценочными материалами выберите знание</p>

      {
        !isLoadingKnowledges &&
        <AccordionChooseKnowledge 
          children={knowledges} 
          renderKnowledge={findKnowledge}
        />
      }
      
      {
        isRenderKnowledge &&

        <KnowledgeMaterial
          dppDescription={dppDescription}
          currentKnowledge={currentKnowledge}
          questionTypes={questionTypes}
          loggedIn={loggedIn}
        />
      }

    </div>
  );
}

export default EvaluationMaterial;