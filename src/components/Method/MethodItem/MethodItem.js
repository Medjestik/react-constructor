import React from 'react';
import { Collapse } from 'react-collapse';
import videoImg from '../../../images/video-icon.png';
import contentImg from '../../../images/content-icon.png';
import taskImg from '../../../images/task-icon.png';

function MethodItem({ chapter }) {

  const [isShowParts, setIsShowParts] = React.useState(false);

  function toggleProgramPerformers () {
    setIsShowParts(!isShowParts);
  }

  function defineImg(type) {
    switch(type) {
      case"video":
        return (<img className="method__parts-img" src={videoImg} alt="иконка"></img>);
      case"task":
        return (<img className="method__parts-img" src={taskImg} alt="иконка"></img>);
      default:
        return (<img className="method__parts-img" src={contentImg} alt="иконка"></img>);
    }
  }

  return (
    <li className="method__item">
      <div className="method__item-info">
        <h3 className="method__item-title">{chapter.name}</h3>
        <ul className="method__item-description">
          {
            chapter.video > 0 && 
            <li className="method__item-caption">
              <img className="method__item-caption-img" src={videoImg} alt="статус"></img>
              <div className="method__item-caption-container">
                <h4 className="method__item-caption-title">Видеоматериалы: {chapter.video}</h4>
              </div> 
            </li>
          }
          {
            chapter.content > 0 && 
            <li className="method__item-caption">
              <img className="method__item-caption-img" src={contentImg} alt="статус"></img>
              <div className="method__item-caption-container">
                <h4 className="method__item-caption-title">Электронный контент: {chapter.content}</h4>
              </div> 
            </li>
          }
          {
            chapter.task > 0 && 
            <li className="method__item-caption">
              <img className="method__item-caption-img" src={taskImg} alt="статус"></img>
              <div className="method__item-caption-container">
                <h4 className="method__item-caption-title">Практическое задание: {chapter.task}</h4>
              </div> 
            </li>
          }
        </ul>
      </div>
      <div className="method__item-control">
        <button className={`method__item-button-part ${isShowParts ? "button-part_type_show" : "button-part_type_hide"}`} type="button" onClick={toggleProgramPerformers}>Раскрыть список материалов</button>
      </div>


      <Collapse isOpened={isShowParts}>
        <ul className="method__parts-list">
          {
            chapter.parts.map((part, i) => (
              <li key={i} className="method__parts-item">
                {defineImg(part.type)}
                <div className="method__parts-info">
                  <h5 className="method__parts-name">{part.text}</h5>
                </div>
                <a className="method__parts-link" href={part.link} alt="ссылка на материал" rel="noreferrer" target="_blank">Перейти</a>
              </li>
            ))
          }
        </ul>
      </Collapse>
    </li>
  );
}

export default MethodItem;