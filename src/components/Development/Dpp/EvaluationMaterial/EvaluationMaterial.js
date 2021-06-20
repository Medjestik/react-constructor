import React from 'react';
import './EvaluationMaterial.css';
import AccordionChoose from '../../../AccordionChoose/AccordionChoose.js';
import KnowledgeMaterial from '../KnowledgeMaterial/KnowledgeMaterial.js';

const data = [
  { id: 1, value: 'Duis ullamcorper purus sagittis elementum vestibulum.', questions: [
    {
      text: 'Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет?',
      type: 'one-answer',
      answers: ['зеленый', 'синий', 'белый', 'красный'],
      id: 7,
    },
    {
      text: 'Какая это буква?',
      type: 'one-answer',
      answers: ['a', 's', 'd', 'h'],
      id: 8,
    }
  ] },
  { id: 2, value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu sagittis quam. Proin risus purus, malesuada ac ipsum id, euismod dapibus sem.', questions: [
    {
      text: 'Какой это цвет?',
      type: 'one-answer',
      answers: ['зеленый', 'синий', 'белый', 'красный'],
      id: 10,
    },
    {
      text: 'Какая это буква?',
      type: 'multi-answer',
      answers: ['a', 's', 'd', 'h'],
      id: 11,
    }, 
    {
      text: 'Сколько сейчас время?',
      type: 'open-answer',
      answers: ['16:00',],
      id: 12,
    },
    {
      text: 'Вопрос вопрос вопрос?',
      type: 'sequence-answer',
      answers: ['5', '2', '3', '4'],
      id: 13,
    },
    {
      text: 'Соответсвие?',
      type: 'conformity-answer',
      answers: [
        {
          firstPart: '1',
          secondPart: '1',
        },
        {
          firstPart: '2',
          secondPart: '2',
        },
        {
          firstPart: '3',
          secondPart: '3',
        },
        {
          firstPart: '4',
          secondPart: '4',
        },
      ],
      id: 14,
    }
  ] },
];

function EvaluationMaterial() {

  const [knowledge, setKnowledge] = React.useState(data);
  const [currentKnowledge, setCurrentKnowledge] = React.useState({});
  const [isRenderKnowledge, setIsRenderKnowledge] = React.useState(false);

  const findKnowledge = (knowledgeId) => {
    knowledge.forEach((elem) => {
      if (knowledgeId === elem.id) {
        setIsRenderKnowledge(true);
        setCurrentKnowledge(elem);
      }
    })
  }

  React.useEffect(() => {
    const newKnowledge = [];
    knowledge.forEach((elem) => {
      if (elem.id === currentKnowledge.id) {
        elem = currentKnowledge;
      }
      newKnowledge.push(elem);
    })
    setKnowledge(newKnowledge);
    // eslint-disable-next-line
  }, [currentKnowledge]);

  return (
    <div className="evaluation-material">
      <h1 className="main__title">Проектирование оценочных материалов</h1>
      <p className="main__subtitle">Для работы с оценочными материалами выберите знание</p>
      
      <AccordionChoose 
        children={knowledge} 
        renderKnowledge={findKnowledge}
      />

      {
        isRenderKnowledge &&
        <KnowledgeMaterial
          currentKnowledge={currentKnowledge}
          setCurrentKnowledge={setCurrentKnowledge}
        />
      }

    </div>
  );
}

export default EvaluationMaterial;