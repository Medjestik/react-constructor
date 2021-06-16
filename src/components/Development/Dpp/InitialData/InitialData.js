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
          <p className="initial-data__item-subtitle">Выберите нормативные документы, на основе которых разрабатывается ДПП.</p>
          <p className="initial-data__item-subtitle">Программа разработана на&nbsp;основе:</p>
        </li>
        <li className="initial-data__item initial-data__item_type_requirements">
          <h3 className="initial-data__item-name">Требования к обучающимся</h3>
          <h5 className="initial-data__item-title">Требования к уровню профессионального образования</h5>
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
          <h5 className="initial-data__item-title">Требования к квалификации</h5>
          <textarea className="initial-data__item-qualification-text" name="qualification-text" placeholder="Опишите требования к квалификации обучающегося"></textarea>

        </li>
        <li className="initial-data__item initial-data__item_type_target">
          <h3 className="initial-data__item-name">Цель и задачи освоения</h3>
          <p className="initial-data__item-subtitle">Укажите, формирует ли ДПП новую компетенцию или совершенствует имеющуюся. Цель и задачи ДПП.</p>
          <h5 className="initial-data__item-title">Цель освоения</h5>
          <p className="initial-data__item-subtitle">Целью освоения программы являются совершенствование и (или) получение новой компетенции, необходимой для профессиональной деятельности, и (или) повышение профессионального уровня в рамках имеющейся квалификации в области профессиональной деятельности.</p>
          <h5 className="initial-data__item-title">Задачи освоения</h5>
          <ul className="initial-data__item-target-tasks">
            <li className="initial-data__item-target-task target-task_type_first">приобретение обучающимися знаний, умений и навыков в соответствии с учебным планом и календарным графиком учебного процесса</li>
            <li className="initial-data__item-target-task target-task_type_second">оценка достижений обучающимися планируемых результатов обучения</li>
          </ul>
          <h5 className="initial-data__item-title">Планируемые результаты освоения</h5>
          <p className="initial-data__item-subtitle">Программа направлена на:</p>
          <ul className="initial-data__item-target-list">
            <li className="initial-data__item-target-item">
              <label className="radio">
                <input className="radio" name="5" type="radio" value="Получение у обучающихся новой компетенции, необходимой для профессиональной деятельности" defaultChecked={false}></input>
                <span>Получение у обучающихся новой компетенции, необходимой для профессиональной деятельности</span>
              </label>
            </li>
            <li className="initial-data__item-target-item">
              <label className="radio">
                <input className="radio" name="5" type="radio" value="Совершенствование компетенции, необходимой для профессиональной деятельности и (или) повышение профессионального уровня в рамках имеющейся квалификации" defaultChecked={false}></input>
                <span>Совершенствование компетенции, необходимой для профессиональной деятельности и (или) повышение профессионального уровня в рамках имеющейся квалификации</span>
              </label>
            </li>
          </ul>
        </li>
        <li className="initial-data__item initial-data__item_type_structure">
          <h3 className="initial-data__item-name">Типовая структура ДПП</h3>
          <p className="initial-data__item-subtitle">Выберите наиболее подходящую типовую структуру ДПП. Типовая структура состоит из разделов, которых следует придерживаться во время разработки ДПП.</p>
          <h5 className="initial-data__item-title">Виды типовых структур</h5>
          <ul className="initial-data__item-target-list">
            <li className="initial-data__item-target-item">
              <label className="radio">
                <input className="radio" name="6" type="radio" value="Тестовая структура №1" defaultChecked={false}></input>
                <span>Тестовая структура №1</span>
              </label>
            </li>
            <li className="initial-data__item-target-item">
              <label className="radio">
                <input className="radio" name="6" type="radio" value="Тестовая структура №2" defaultChecked={false}></input>
                <span>Тестовая структура №2</span>
              </label>
            </li>
            <li className="initial-data__item-target-item">
              <label className="radio">
                <input className="radio" name="6" type="radio" value="Тестовая структура №3" defaultChecked={false}></input>
                <span>Тестовая структура №3</span>
              </label>
            </li>
            <li className="initial-data__item-target-item">
              <label className="radio">
                <input className="radio" name="6" type="radio" value="Тестовая структура №4" defaultChecked={false}></input>
                <span>Тестовая структура №4</span>
              </label>
            </li>
            <li className="initial-data__item-target-item">
              <label className="radio">
                <input className="radio" name="6" type="radio" value="Тестовая структура №5" defaultChecked={false}></input>
                <span>Тестовая структура №5</span>
              </label>
            </li>
          </ul>
        </li>
        <li className="initial-data__item initial-data__item_type_info">
          <h3 className="initial-data__item-name">Нормативно-справочная информация</h3>
        </li>
      </ul>

      <div className="initial-data__buttons">
        <button className="btn btn_type_save" type="button">Сохранить данные</button>
        <button className="btn btn_type_next" type="button">Перейти к следующему этапу</button>
      </div>

    </section>
  );
}

export default InitialData;