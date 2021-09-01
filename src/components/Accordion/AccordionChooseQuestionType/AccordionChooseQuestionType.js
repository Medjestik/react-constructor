import React, { useState, useRef } from "react";
import Chevron from "../Chevron.js";
import "./AccordionChooseQuestionType.css";
import "../AccordionChooseKnowledge/AccordionChooseKnowledge.css";
import useOnClickOutside from "../../../hooks/useOnClickOutside.js";
import oneAnswerIcon from '../../../images/quiz/one-answer-color.png';
import multiAnswerIcon from '../../../images/quiz/multi-answer-color.png';
import openAnswerIcon from '../../../images/quiz/open-answer-color.png';
import sequenceAnswerIcon from '../../../images/quiz/sequence-answer-color.png';
import conformityAnswerIcon from '../../../images/quiz/conformity-answer-color.png';

const AccordionChooseQuestionType = ({ addNewQuestion, questionTypes }) => {
  const [active, setActive] = useState("");
  const [height, setHeight] = useState("0px");
  const [fill, setFill] = useState("#404040");
  const [rotation, setRotation] = useState("accordion__icon");

  const [title, setTitle] = useState('Выберите тип вопроса');

  const content = useRef();
  const sensitive = useRef();

  function defineQuestionImg(type) {
    switch (type) {
      case "one-answer":
        return(<img className="accordion__img_type_choose" src={oneAnswerIcon} alt="иконка"></img>)
      case "multi-answer":
        return(<img className="accordion__img_type_choose" src={multiAnswerIcon} alt="иконка"></img>)
      case "open-answer":
        return(<img className="accordion__img_type_choose" src={openAnswerIcon} alt="иконка"></img>)
      case "sequence-answer":
        return(<img className="accordion__img_type_choose" src={sequenceAnswerIcon} alt="иконка"></img>)
      case "conformity-answer":
        return(<img className="accordion__img_type_choose" src={conformityAnswerIcon} alt="иконка"></img>)

      default:
        return(<div></div>)
    }
  }

  const toggleAccordion = () => {
    setActive(active === "" ? "active" : "");
    setHeight(
      active === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotation(
      active === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
    setFill(
      active === "active" ? "#404040" : "#ffffff"
    );
  };
  
  const handleClick = (elem) => {
    setTitle(elem.text);
    setActive("");
    setHeight("0px");
    setRotation("accordion__icon");
    setFill("#404040");
    addNewQuestion(elem.type);
  }

  useOnClickOutside(sensitive, () => {
    setActive("");
    setHeight("0px");
    setRotation("accordion__icon");
    setFill("#404040");
  });

  return (
    <div className="accordion__section accordion__section_type_choose" ref={sensitive}>
      <button className={`accordion ${active}`} onClick={toggleAccordion} type="button">
        <p className="accordion__title accordion__title_type_choose">{title}</p>
        <Chevron width={10} fill={fill} className={`${rotation}`} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${height}` }}
        className="accordion__content accordion__content_type_choose"
      >
        {
          questionTypes.map((elem, i) => (
            <button key={i} type="button" onClick={() => handleClick(elem)} className="accordion__button">
              {defineQuestionImg(elem.type)}
              <p className="accordion__text_type_choose">{elem.name}</p>
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default AccordionChooseQuestionType;