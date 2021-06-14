import React from 'react';
import './InitialData.css';

function InitialData() {

  return (
    <section className="initial-data">
      <h1 className="main__title">Ввод исходных данных</h1>
      <p className="main__subtitle">Заполните предолженные поля форм. Для сохранения данных, нажмите кнопку "Сохранить данные". Для перехода к следующему этапу нажмите кнопку "Перейти к следующему этапу".</p>

      <ul className="initial-data__list">
        <li className="initial-data__item initial-data__item_type_basis">
          <h3 className="initial-data__item-name">Нормативные правовые основания разработки</h3>
        </li>
        <li className="initial-data__item initial-data__item_type_requirements">
          <h3 className="initial-data__item-name">Требования к обучающимся</h3>
          <h5 className="initial-data__item-requirements-title">Требования к уровню профессионального образования</h5>
          <ul className="initial-data__item-requirements-list">
            <li className="initial-data__item-requirements-item">
              <label className="checkbox">
                <input name="1" type="checkbox" value="лица, имеющие высшее образование"></input>
                <span className="test">лица, имеющие высшее образование</span>
              </label>
            </li>
            <li className="initial-data__item-requirements-item">
              <label className="checkbox">
                <input name="2" type="checkbox" value="лица, получающие высшее образование"></input>
                <span className="test">лица, получающие высшее образование</span>
              </label>
            </li>
            <li className="initial-data__item-requirements-item">
              <label className="checkbox">
                <input name="3" type="checkbox" value="лица, имеющие среднее профессиональное образование"></input>
                <span className="test">лица, имеющие среднее профессиональное образование</span>
              </label>
            </li>
            <li className="initial-data__item-requirements-item">
              <label className="checkbox">
                <input name="4" type="checkbox" value="лица, получающие среднее профессиональное образование"></input>
                <span className="test">лица, получающие среднее профессиональное образование</span>
              </label>
            </li>
          </ul>
          <h5 className="initial-data__item-requirements-title">Требования к квалификации</h5>
          <textarea className="initial-data__item-qualification-text" name="qualification-text" placeholder="Опишите требования к квалификации обучающегося"></textarea>

        </li>
        <li className="initial-data__item initial-data__item_type_target">
          <h3 className="initial-data__item-name">Цель и задачи освоения</h3>
          <p className="initial-data__item-target-subtitle">Укажите, формирует ли ДПП новую компетенцию или совершенствует имеющуюся. Цель и задачи ДПП.</p>
          <h5 className="initial-data__item-target-title">Цель освоения</h5>
          <p className="initial-data__item-target-subtitle">Целью освоения программы являются совершенствование и (или) получение новой компетенции, необходимой для профессиональной деятельности, и (или) повышение профессионального уровня в рамках имеющейся квалификации в области профессиональной деятельности.</p>
          <h5 className="initial-data__item-target-title">Задачи освоения</h5>
          <ul className="initial-data__item-target-tasks">
            <li className="initial-data__item-target-task target-task_type_first">приобретение обучающимися знаний, умений и навыков в соответствии с учебным планом и календарным графиком учебного процесса</li>
            <li className="initial-data__item-target-task target-task_type_second">оценка достижений обучающимися планируемых результатов обучения</li>
          </ul>
          <h5 className="initial-data__item-target-title">Планируемые результаты освоения</h5>
          <p className="initial-data__item-target-subtitle">Программа направлена на:</p>
          <ul className="initial-data__item-target-list">
            <li className="initial-data__item-target-item">
              <label className="radio">
                <input className="radio" name="5" type="radio" value="Получение у обучающихся новой компетенции, необходимой для профессиональной деятельности" defaultChecked={false}></input>
                <span>Получение у обучающихся новой компетенции, необходимой для профессиональной деятельности</span>
              </label>
            </li>
            <li className="initial-data__item-target-item">
              <label className="radio">
                <input className="radio" name="6" type="radio" value="Совершенствование компетенции, необходимой для профессиональной деятельности и (или) повышение профессионального уровня в рамках имеющейся квалификации" defaultChecked={false}></input>
                <span>Совершенствование компетенции, необходимой для профессиональной деятельности и (или) повышение профессионального уровня в рамках имеющейся квалификации</span>
              </label>
            </li>
          </ul>
        </li>
        <li className="initial-data__item initial-data__item_type_structure">
          <h3 className="initial-data__item-name">Типовая структура ДПП</h3>
          <p className="initial-data__item-structure-subtitle">Выберите наиболее подходящую типовую структуру ДПП. Типовая структура состоит из разделов, которых следует придерживаться во время разработки ДПП.</p>
          <h5 className="initial-data__item-target-title">Виды типовых структур</h5>
        </li>
        <li className="initial-data__item initial-data__item_type_info">
          <h3 className="initial-data__item-name">Нормативно-справочная информация</h3>
        </li>
      </ul>

      <div className="initial-data__buttons">
        <button className="initial-data__button initial-data__button_type_save" type="button">Сохранить данные</button>
        <button className="initial-data__button initial-data__button_type_next" type="button">Перейти к следующему этапу</button>
      </div>

    </section>
  );
}

export default InitialData;