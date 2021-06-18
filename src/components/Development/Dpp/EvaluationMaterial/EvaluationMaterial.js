import React from 'react';
import './EvaluationMaterial.css';
import AccordionChoose from '../../../AccordionChoose/AccordionChoose.js';
import KnowledgeMaterial from '../KnowledgeMaterial/KnowledgeMaterial.js';

const data = [
  { id: 1, value: 'Duis ullamcorper purus sagittis elementum vestibulum.', count: 12, questions: [
    {
      text: 'Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет?',
      type: 'one-answer',
      answers: ['зеленый', 'синий', 'белый', 'красный'],
    },
    {
      text: 'Какая это буква?',
      type: 'one-answer',
      answers: ['a', 's', 'd', 'h'],
    }
  ] },
  { id: 2, value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu sagittis quam. Proin risus purus, malesuada ac ipsum id, euismod dapibus sem.', count: 132, questions: [
    {
      text: 'Какой это цвет?',
      type: 'one-answer',
      answers: ['зеленый', 'синий', 'белый', 'красный'],
    },
    {
      text: 'Какая это буква?',
      type: 'one-answer',
      answers: ['a', 's', 'd', 'h'],
    }, 
    {
      text: 'Сколько сейчас время?',
      type: 'one-answer',
      answers: ['5', '2', '3', '4'],
    }
  ] },
];

function EvaluationMaterial() {

  const [currentKnowledge, setCurrentKnowledge] = React.useState({});
  const [isRenderKnowledge, setIsRenderKnowledge] = React.useState(false);

  const findKnowledge = (knowledgeId) => {
    data.forEach((elem) => {
      if (knowledgeId === elem.id) {
        setIsRenderKnowledge(true);
        setCurrentKnowledge(elem);
      }
    })
  }

  return (
    <div className="evaluation-material">
      <h1 className="main__title">Проектирование оценочных материалов</h1>
      <p className="main__subtitle">Для работы с оценочными материалами выберите знание</p>
      
      <AccordionChoose 
        children={data} 
        renderKnowledge={findKnowledge} 
      />

      {
        isRenderKnowledge &&
        <KnowledgeMaterial
          knowledge={currentKnowledge} 
        />
      }

    </div>
  );
}

export default EvaluationMaterial;