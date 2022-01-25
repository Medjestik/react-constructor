import React from 'react';
import './MainPage.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Feedback from '../Feedback/Feedback.js';

function MainPage({ onFeedback, isLoading, feedbackMessage, setFeedbackMessage }) {

  const user = React.useContext(CurrentUserContext);

  return (
    <div className="main-page">
      <h1 className="main__title">Добро пожаловать, {user.fullname}</h1>
      <div className="main-page__container">
        <section className="main-page__section main-page__news">
          <h3 className="main-page__section-title main-page__title-news">Объявления</h3>
          <p className="main-page__section-subtitle">Ниже представлен список всех обяъявлений.</p>
          <p className="main-page__section-news-caption">Список объявлений пока пуст!</p>
        </section>
        <section className="main-page__section main-page__support">
          <h3 className="main-page__section-title main-page__title-support">Поддержка</h3>
          <p className="main-page__section-subtitle">Уважаемые коллеги! В данный момент, все вопросы методического характера, технической поддержки и оперативного взаимодействия обсуждаются в команде MS Teams.</p>
          <h5 className="discussion__title">Ссылка на команду:</h5>
          <a className="discussion__teams-link " href="https://teams.microsoft.com/l/team/19%3alD5YKvK8REDHG_FB_00e3Ons18uZkukXxo5klrGFM0Y1%40thread.tacv2/conversations?groupId=ec7540bf-1bb2-4c9f-bf34-39c5c7cc5e2b&tenantId=4147edf8-825d-42a7-8265-cec936b8e943" alt="ссылка на команду" rel="noreferrer" target="_blank">Перейти</a>
        </section>
        <section className="main-page__section main-page__feedback">
          <h3 className="main-page__section-title main-page__title-feedback">Обратная связь</h3>
          <p className="main-page__section-subtitle">Вы можете поделиться с нами своими пожеланиями по развитию функционала программного продукта.</p>
          <Feedback onFeedback={onFeedback} isLoading={isLoading} feedbackMessage={feedbackMessage} setFeedbackMessage={setFeedbackMessage} />
        </section>
      </div>
      <p className="main-page__version">Версия программы v25.01.2022</p>
    </div>
  );
}

export default MainPage;