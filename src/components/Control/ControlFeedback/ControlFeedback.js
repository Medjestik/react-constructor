import React from 'react';
import './ControlFeedback.css';
import * as controlApi from '../../../utils/controlApi/controlApi.js';
import Preloader from '../../Preloader/Preloader.js';

function ControlFeedback({ loggedIn }) {

  const [isRendering, setIsRendering] = React.useState(true);
  const [feedbacks, setFeedbacks] = React.useState([]);


  React.useEffect(() => {
    if (loggedIn) {
        const token = localStorage.getItem("token");
        controlApi.getFeedback({ token: token })
        .then((res) => {
          console.log(res);
          setFeedbacks(res.data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setIsRendering(false));
    }
    return () => {
      setFeedbacks([]);
    }
  }, [loggedIn]);

  return (
      isRendering 
      ?
      <Preloader />
      :
      <>
        <div className="control-feedback">
          <h3 className="main__title control-feedback__title">Обратная связь</h3>
          <p className="main__subtitle control-feedback__subtitle">Ниже представлен список всех сообщений от пользователей</p>
          <ul className="task__list">
            {
              feedbacks.map((elem, index) => (
                <li className="control-feedback__item" key={elem.id}>
                  <span className="control-feedback__item-count">{`${index+ 1}.`}</span>
                  <div className="control-feedback__item-info">
                    <h4 className="control-feedback__item-name">{elem.authorFullname}</h4>
                    <p className="control-feedback__item-text">{elem.description}</p>
                  </div>
                </li>
              ))
            }
            
          </ul>
        </div>
      </>
  );
}

export default ControlFeedback;