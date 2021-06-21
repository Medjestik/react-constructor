import React from 'react';
import './EvaluationMaterial.css';
import AccordionChoose from '../../../AccordionChoose/AccordionChoose.js';
import KnowledgeMaterial from '../KnowledgeMaterial/KnowledgeMaterial.js';

const data = [
  { id: 1, value: 'Duis ullamcorper purus sagittis elementum vestibulum.', questions: [
    {
      text: 'Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет?',
      type: 'one-answer',
      answers: [
        {
          id: 1,
          answerText: 'зеленый',
        },
        {
          id: 2,
          answerText: 'красный',
        },
        {
          id: 3,
          answerText: 'синий',
        },
        {
          id: 4,
          answerText: 'белый',
        },
      ],
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
      text: 'Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет? Какой это цвет?',
      type: 'one-answer',
      answers: [
        {
          id: 1,
          answerText: 'зеленый',
          isCorrect: false,
        },
        {
          id: 2,
          answerText: 'красный',
          isCorrect: false,
        },
        {
          id: 3,
          answerText: 'синий',
          isCorrect: true,
        },
        {
          id: 4,
          answerText: 'белый',
          isCorrect: false,
        },
      ],
      id: 15,
    },
    {
      text: 'Какая это буква?',
      type: 'multi-answer',
      answers: [
        {
          id: 30,
          answerText: 'A',
          isCorrect: true,
        },
        {
          id: 31,
          answerText: 'B',
          isCorrect: false,
        },
        {
          id: 32,
          answerText: 'C',
          isCorrect: true,
        },
        {
          id: 33,
          answerText: 'D',
          isCorrect: false,
        },
      ],
      id: 11,
    }, 
    {
      text: 'Расставьте цифры в порядке убивания?',
      type: 'sequence-answer',
      answers: [
        {
          id: 20,
          answerText: '7',
        },
        {
          id: 21,
          answerText: '6',
        },
        {
          id: 22,
          answerText: '4',
        },
        {
          id: 23,
          answerText: '2',
        },
      ],
      id: 12,
    },
    {
      text: 'Вопрос вопрос вопрос?',
      type: 'open-answer',
      answers: [
        {
          id: 12,
          answerText: '16:00',
        },
      ],
      id: 13,
    },
    {
      text: 'Соответсвие?',
      type: 'conformity-answer',
      answers: [
        {
          id: 40,
          firstPart: '1',
          secondPart: '1',
        },
        {
          id: 41,
          firstPart: '2',
          secondPart: '2',
        },
        {
          id: 42,
          firstPart: '3',
          secondPart: '3',
        },
        {
          id: 43,
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
          currentKnowledgeQuestions={currentKnowledge.questions}
          setCurrentKnowledge={setCurrentKnowledge}
        />
      }

    </div>
  );
}

export default EvaluationMaterial;