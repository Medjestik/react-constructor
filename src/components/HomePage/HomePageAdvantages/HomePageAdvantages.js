import React from 'react';
import './HomePageAdvantages.css';
import imgGoal from '../../../images/main-page/advantages-goal.png';
import imgKeyboard from '../../../images/main-page/advantages-keyboard.png';
import imgGears from '../../../images/main-page/advantages-gears.png';
import imgTeam from '../../../images/main-page/advantages-team.png';
import imgCube from '../../../images/main-page/advantages-cube.png';
import imgExport from '../../../images/main-page/advantages-export.png';

function HomePageAdvantages() { 

  return (
    <section className="homepage-аdvantages" id="homepage-аdvantages">
      <div className="container">
        <h3 className="homepage__title">Ключевые преимущества продукта</h3>
        <p className="homepage__subtitle">почему стоит пользоваться нашим продуктом?</p>

        <div className="homepage-аdvantages__container">
          <ul className="homepage-аdvantages__list">
            <li className="homepage-аdvantages__item">
              <img className="homepage-аdvantages__item-img" src={imgGoal} alt="иконка"></img>
              <h5 className="homepage-аdvantages__item-title">Методология «от&nbsp;результата»</h5>
              <p className="homepage-аdvantages__item-text">Применение самых современных методических подходов и&nbsp;принципов позволяет создавать востребованные образовательные программы, без&nbsp;«воды»</p>
            </li>
            <li className="homepage-аdvantages__item">
              <img className="homepage-аdvantages__item-img" src={imgGears} alt="иконка"></img>
              <h5 className="homepage-аdvantages__item-title">Прозрачность и&nbsp;взаимосвязь элементов</h5>
              <p className="homepage-аdvantages__item-text">Компетентностный профиль, оценочные материалы, структура, лекции –&nbsp;все&nbsp;это&nbsp;строго взаимоувязано друг с&nbsp;другом. Больше никаких программ-«мутантов»</p>
            </li>
            <li className="homepage-аdvantages__item">
              <img className="homepage-аdvantages__item-img" src={imgKeyboard} alt="иконка"></img>
              <h5 className="homepage-аdvantages__item-title">Автоматизация рутинных операций</h5>
              <p className="homepage-аdvantages__item-text">Оформление списка литературы по&nbsp;ГОСТ, проверка орфографии, импорт тестов и&nbsp;многие другие раздражающие операции полностью автоматизированы</p>
            </li>
          </ul>
          <div className="homepage-аdvantages__img"></div>
          <ul className="homepage-аdvantages__list">
            <li className="homepage-аdvantages__item">
              <img className="homepage-аdvantages__item-img" src={imgCube} alt="иконка"></img>
              <h5 className="homepage-аdvantages__item-title">Модульность и&nbsp;переиспользуемость</h5>
              <p className="homepage-аdvantages__item-text">Хотите использовать элемент компетентностного профиля, который Вы&nbsp;уже&nbsp;ранее создавали в&nbsp;другой программе? Импортируйте его за&nbsp;3 клика вместе со&nbsp;всеми материалами</p>
            </li>
            <li className="homepage-аdvantages__item">
              <img className="homepage-аdvantages__item-img" src={imgTeam} alt="иконка"></img>
              <h5 className="homepage-аdvantages__item-title">Совместная работа</h5>
              <p className="homepage-аdvantages__item-text">Больше не&nbsp;нужно пересылать документы и&nbsp;материалы по&nbsp;почте! Методист, эксперт, валидатор, нормоконтроллер - все работают в&nbsp;едином приложении</p>
            </li>
            <li className="homepage-аdvantages__item">
              <img className="homepage-аdvantages__item-img" src={imgExport} alt="иконка"></img>
              <h5 className="homepage-аdvantages__item-title">Экспорт документов</h5>
              <p className="homepage-аdvantages__item-text">Вся необходимая документация автоматически формируется в&nbsp;системе  - методист может сосредоточиться на&nbsp;педагогическом дизайне</p>
            </li>
          </ul>
        </div>      
      </div>
    </section>
  )
}

export default HomePageAdvantages;