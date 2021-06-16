import React from 'react';
import './Program.css';
import { Collapse } from 'react-collapse';
import avatar from '../../../../images/avatars/7.jpg';
import status from '../../../../images/status.png';
import stage from '../../../../images/stage.png';
import role from '../../../../images/role.png';


function Program({ program, history }) {

  const [isShowPerformers, setIsShowPerformers] = React.useState(false);

  function toggleProgramPerformers () {
    setIsShowPerformers(!isShowPerformers);
  }

  const definePerformerRole = (role) => {
    if (role === 'Методист') {
      return (<span className="development__performers-role performers-role_type_methodist">{role}</span>)
    }
    if (role === 'Эксперт') {
      return (<span className="development__performers-role performers-role_type_expert ">{role}</span>)
    }
    if (role === 'Валидатор') {
      return (<span className="development__performers-role performers-role_type_validator">{role}</span>)
    }
    if (role === 'Супервайзер') {
      return (<span className="development__performers-role performers-role_type_supervisor">{role}</span>)
    }
    return (<span className="development__performers-role performers-role_type_methodist">{role}</span>);
  }

  return (
    <li className="development__item">
      <div className="development__item-info">
        <h3 className="development__item-title">{program.name}</h3>
        <ul className="development__item-description">
          <li className="development__item-caption">
            <img className="development__item-caption-img" src={status} alt="статус"></img>
            <div className="development__item-caption-container">
              <h4 className="development__item-caption-title">Статус программы</h4>
              <span className="development__item-caption-subtitle">{program.status_name}</span>
            </div> 
          </li>
          <li className="development__item-caption">
            <img className="development__item-caption-img" src={stage} alt="этап"></img>
            <div className="development__item-caption-container">
              <h4 className="development__item-caption-title">Текущий этап</h4>
              <span className="development__item-caption-subtitle">{program.current_stage_name}</span>
            </div> 
          </li>
          <li className="development__item-caption">
            <img className="development__item-caption-img" src={role} alt="роль"></img>
            <div className="development__item-caption-container">
              <h4 className="development__item-caption-title">Ваша роль</h4>
              <span className="development__item-caption-subtitle">{program.user_role}</span>
            </div> 
          </li>
        </ul>
      </div>
      <div className="development__item-control">
        <button className={`development__item-button-performer ${isShowPerformers ? "button-performer_type_show" : "button-performer_type_hide"}`} type="button" onClick={toggleProgramPerformers}>Показать список всех исполнителей</button>
        <button className="btn btn_type_next" type="button" onClick={() => history.push("/main/development/dpp/initial-data")}>Продолжить работу</button>
      </div>


      <Collapse isOpened={isShowPerformers}>
        <ul className="development__performers-list">
          {
            program.participants.map((performer, i) => (
              <li key={i} className="development__performers-item">
                <img className="development__performers-img" src={avatar} alt="аватар"></img>
                <div className="development__performers-info">
                  <h5 className="development__performers-name">{performer.fullname}</h5>
                  {definePerformerRole(performer.rolename)}
                </div>
                <div className="development__performers-contacts">
                  <p className="development__performers-mail">{performer.email}</p>
                  <p className="development__performers-phone">{performer.phone}</p>
                </div>
              </li>
            ))
          }
        </ul>
      </Collapse>
    </li>
  );
}

export default Program;