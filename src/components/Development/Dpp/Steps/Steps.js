import React from 'react';
import './Steps.css';
import { NavLink } from 'react-router-dom';

const steps = [
  {
    name: 'Исходные данные',
    count: 1,
    link: '/main/development/dpp/initial-data',
    approved: false,
  },
  {
    name: 'Компетентностный профиль',
    count: 2,
    link: '/main/development/dpp/zoon',
    approved: false,
  },
  {
    name: 'Оценочные материалы',
    count: 3,
    link: '/main/development/dpp/evaluation-material',
    approved: false,
  }, 
  {
    name: 'Структура',
    count: 4,
    link: '/main/development/dpp/program-structure',
    approved: false,
  },
  {
    name: 'Учебно-методические материалы',
    count: 5,
    link: '/main/development/dpp/educational-material',
    approved: false,
  },
  {
    name: 'Утверждение',
    count: 6,
    link: '/main/development/dpp/approval',
    approved: false,
  },
]

function Steps({ pathname }) {

  const [currentStep, setCurrentStep] = React.useState(1);

  React.useEffect(() => {
    steps.find((elem) => {
      if (elem.link === pathname) {
        setCurrentStep(elem.count);
      }
      return false;
    })
  }, [pathname]);

  function previousStepHandler (count) {
    setCurrentStep(count);
  }

  return (
    <div className="steps">
      <ul className="steps__list">
        {steps.map((step) => (
        <li className={`steps__item ${currentStep >= step.count ? "steps__item_type_previous" : ""}`} key={step.count}>
          <NavLink 
          className={`steps__number ${currentStep > step.count ? "steps__number_type_previous" : ""}`}
          activeClassName="steps__number_type_active"
          to={`${step.link}`}
          onClick={() => previousStepHandler(step.count)}
          exact
          >
            {step.count}
          </NavLink>
          <p className="steps__caption">{step.name}</p>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default Steps;