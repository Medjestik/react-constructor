import React from 'react';
import './HomePageMethodology.css';
import HomePageMethodologyItem from './HomePageMethodologyItem/HomePageMethodologyItem.js';

function HomePageMethodology() {

  const methodology = [
    {
      title: '1. Чему нужно научить?',
      text: 'Вначале мы проектируем компетентностный профиль выпускника образовательной программы, то есть отвечаем на вопрос: «Какими способностями или компетенциями он должен обладать после завершения обучения по программе?». Сами компетенции, в свою очередь, проектируются как совокупность навыков, умений и знаний.',
      link: 'https://edu.emiit.ru/webtutor/rut-2021-bor/video/2/res/index.html',
      type: 'one',
    },
    {
      title: '2. Как проверить?',
      text: 'Когда компетентностный профиль спроектирован, необходимо ответить на вопрос: «А как проверить сформированность всех результатов обучения, которые запроектированы?» Для этого необходимо на следующем этапе разработать оценочные материалы, сразу не дожидаясь разработки контента.',
      link: 'https://edu.emiit.ru/webtutor/rut-2021-bor/video/3/res/index.html',
      type: 'two',
    },
    {
      title: '3. Как научить?',
      text: 'На третьем этапе, для достижения каждого результата обучения, мы проектируем соответствующий контент. Лекции, материалы практических занятий, который позволят при их освоении нашим обучающимся выполнить тестовые задания, теоретические и практические, которые мы запроектировали на предыдущем этапе.',
      link: 'https://edu.emiit.ru/webtutor/rut-2021-bor/video/5/res/index.html',
      type: 'three',
    },
    {
      title: '4. Как организовать?',
      text: 'Следующим этапом уже выступает этап реализации образовательных программ: когда мы планируем расписание учебных занятий, распределяем учебную нагрузку и осуществляем ряд других процедур планирования реализации образовательной программы. Планирование реализации образовательной программы является подчиненным процессом проектирования образовательной программы.',
      link: '',
      type: 'four',
    },
  ]

  return (
    <section className="homepage-methodology" id="homepage-methodology">
      <div className="container">
        <h3 className="homepage__title">Методология проектирования «от&nbsp;результата»</h3>
        <p className="homepage__subtitle">методология проектирования образовательных программ от&nbsp;результата заключается, по&nbsp;сути, в&nbsp;последовательном ответе на&nbsp;4&nbsp;вопроса:</p>
        <ul className="homepage-methodology__list">
          {
            methodology.map((elem, i) => (
              <HomePageMethodologyItem key={i} item={elem} />
            ))
          }
        </ul>
      </div>
    </section>
  )
}

export default HomePageMethodology;