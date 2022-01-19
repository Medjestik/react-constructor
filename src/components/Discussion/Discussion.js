import React from 'react';
import './Discussion.css';


function Discussion() {

  return (
    <div className="discussion">
      <h1 className="main__title">Обсуждение</h1>
      <p className="main__subtitle">Уважаемые коллеги! В данный момент, все вопросы методического характера, технической поддержки и оперативного взаимодействия обсуждаются в команде MS Teams.</p>
      <h3 className="discussion__title">Ссылка на команду:</h3>
      <a className="discussion__teams-link " href="https://teams.microsoft.com/l/team/19%3alD5YKvK8REDHG_FB_00e3Ons18uZkukXxo5klrGFM0Y1%40thread.tacv2/conversations?groupId=ec7540bf-1bb2-4c9f-bf34-39c5c7cc5e2b&tenantId=4147edf8-825d-42a7-8265-cec936b8e943" alt="ссылка на команду" rel="noreferrer" target="_blank">Перейти</a>
    </div>
  );
}

export default Discussion;