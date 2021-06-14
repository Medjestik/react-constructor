import React from 'react';
import './Development.css';
import {Collapse} from 'react-collapse';
import avatar from '../../images/avatars/7.jpg';
import avatar1 from '../../images/avatars/5.jpg';
import avatar2 from '../../images/avatars/12.jpg';
import avatar3 from '../../images/avatars/1.jpg';
import status from '../../images/status.png';
import stage from '../../images/stage.png';
import role from '../../images/role.png';


function Development({ history }) {

  const [isShowPerformers, setIsShowPerformers] = React.useState(false);

  function toggleProgramPerformers () {
    setIsShowPerformers(!isShowPerformers);
  }

  return (
    <div className="development">
      <h1 className="main__title">Разработка ДПП</h1>
      <p className="main__subtitle">Ниже отображаются все ДПП, где Вы назначены как исполнитель</p>
      <ul className="development__list">

        <li className="development__item">
          <div className="development__item-info">
            <h3 className="development__item-title">Информационное сопровождение проектов Информационное сопровождение проектов Информационное сопровождение проектов Информационное сопровождение проектов</h3>
            <ul className="development__item-description">
              <li className="development__item-caption">
                <img className="development__item-caption-img" src={status} alt="статус"></img>
                <div className="development__item-caption-container">
                  <h4 className="development__item-caption-title">Статус программы</h4>
                  <span className="development__item-caption-subtitle">В работе</span>
                </div> 
              </li>
              <li className="development__item-caption">
                <img className="development__item-caption-img" src={stage} alt="этап"></img>
                <div className="development__item-caption-container">
                  <h4 className="development__item-caption-title">Текущий этап</h4>
                  <span className="development__item-caption-subtitle">Проектирование ПК и ЗУН</span>
                </div> 
              </li>
              <li className="development__item-caption">
                <img className="development__item-caption-img" src={role} alt="роль"></img>
                <div className="development__item-caption-container">
                  <h4 className="development__item-caption-title">Ваша роль</h4>
                  <span className="development__item-caption-subtitle">Методист</span>
                </div> 
              </li>
            </ul>
          </div>
          <div className="development__item-control">
            <button className={`development__item-button-performer ${isShowPerformers ? "button-performer_type_show" : "button-performer_type_hide"}`} type="button" onClick={toggleProgramPerformers}>Показать список всех исполнителей</button>
            <button className="development__item-button-proceed" type="button" onClick={() => history.push("/main/development/dpp/initial-data")}>Продолжить работу</button>
          </div>


          <Collapse isOpened={isShowPerformers}>
            <ul className="development__performers-list">
              <li className="development__performers-item">
                <img className="development__performers-img" src={avatar} alt="аватар"></img>
                <div className="development__performers-info">
                  <h5 className="development__performers-name">Костюлин Иван Алексеевич</h5>
                  <span className="development__performers-role performers-role_type_methodist">Методист</span>
                </div>
                <div className="development__performers-contacts">
                  <p className="development__performers-mail">ivan-kostyulin@yandex.ru</p>
                  <p className="development__performers-phone">+7 (925) 781-64-85</p>
                </div>
              </li>
              <li className="development__performers-item">
                <img className="development__performers-img" src={avatar1} alt="аватар"></img>
                <div className="development__performers-info">
                  <h5 className="development__performers-name">Леонова Анна Владимировна</h5>
                  <span className="development__performers-role performers-role_type_methodist">Методист</span>
                </div>
                <div className="development__performers-contacts">
                  <p className="development__performers-mail">leonova@edu.emiit.ru</p>
                  <p className="development__performers-phone">+7 (919) 728-66-69</p>
                </div>
              </li>
              <li className="development__performers-item">
                <img className="development__performers-img" src={avatar2} alt="аватар"></img>
                <div className="development__performers-info">
                  <h5 className="development__performers-name">Соловьев Андрей Дмитриевич</h5>
                  <span className="development__performers-role performers-role_type_expert">Эксперт</span>
                </div>
                <div className="development__performers-contacts">
                  <p className="development__performers-mail">solovev.ad@mail.ru</p>
                  <p className="development__performers-phone">+7 (916) 333-13-11</p>
                </div>
              </li>
              <li className="development__performers-item">
                <img className="development__performers-img" src={avatar3} alt="аватар"></img>
                <div className="development__performers-info">
                  <h5 className="development__performers-name">Гринчар Николай Николаевич</h5>
                  <span className="development__performers-role performers-role_type_validator">Валидатор</span>
                </div>
                <div className="development__performers-contacts">
                  <p className="development__performers-mail">grinchar@edu.emiit.ru</p>
                  <p className="development__performers-phone">+7 (905) 719-26-95</p>
                </div>
              </li>
            </ul>
          </Collapse>
        </li>

      </ul>
    </div>
  );
}

export default Development;