import React from 'react';
import './PerformersList.css';
import PerformersItem from './PerformersItem/PerformersItem.js';

function PerformersList() {

  const performers = [
    /*{
    name: "Костюлин Иван Алексеевич",
    text: "тема №12, разработка общей характеристики программы",
    rank: "",
    },
    {
      name: "Гринчар Николай Николаевич",
      text: "тема №6, разработка конспекта лекции",
      rank: "(Доцент, к.э.н.)",
    },*/
  ]

  return (
    <div className="performers-list">
      <h2 className="performers-list__title">Список исполнителей по программе</h2>
      <button className="btn btn_type_add performers-list__btn-add">Добавить исполнителя</button>
      <ul className="performers-list__list">
        {
          performers.map((elem, i) => (
            <PerformersItem
              elem={elem}
              i={i}
            />
          ))
        }
      </ul>
    </div>
  );
}

export default PerformersList; 