import React, { useState, useRef } from "react";
import Chevron from "../Chevron.js";
import "./AccordionChooseNewDocumentType.css";
import useOnClickOutside from "../../../hooks/useOnClickOutside.js";
import fgosIcon from '../../../images/documents/fgos.png';
import profstandartIcon from '../../../images/documents/profstandart.png';
import etkcIcon from '../../../images/documents/etkc.png';
import ekcIcon from '../../../images/documents/ekc.png';
import worldskillsIcon from '../../../images/documents/worldskills.png';


const AccordionChooseNewDocumentType = ({ onChoose }) => {
  const [active, setActive] = useState("");
  const [height, setHeight] = useState("0px");
  const [fill, setFill] = useState("#404040");
  const [rotation, setRotation] = useState("accordion__icon");

  const content = useRef();
  const sensitive = useRef();

  const questions = [
    {
      text: 'Федеральный государственный образовательный стандарт (ФГОС)',
      type: 'fgos',
      id: 1,
      img: fgosIcon,
    },
    {
      text: 'Профессиональный стандарт',
      type: 'profstandart',
      id: 2,
      img: profstandartIcon,
    },
    {
      text: 'Общероссийский классификатор профессий рабочих, должностей служащих и тарифных разрядов (ЕТКС)',
      type: 'etkc',
      id: 3,
      img: etkcIcon,
    },
    {
      text: 'Единый квалификационный справочник должностей руководителей, специалистов и других служащих (ЕКС)',
      type: 'ekc',
      id: 4,
      img: ekcIcon,
    },
    {
      text: 'Компетенция WorldSkills',
      type: 'worldskills',
      id: 5,
      img: worldskillsIcon,
    },

  ]

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
    setActive("");
    setHeight("0px");
    setRotation("accordion__icon");
    setFill("#404040");
    onChoose(elem.type);
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
        <p className="accordion__title accordion__title_type_choose">Добавить новый документ</p>
        <Chevron width={10} fill={fill} className={`${rotation}`} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${height}` }}
        className="accordion__content accordion__content_type_choose"
      >
        {
          questions.map((elem, i) => (
            <button key={i} type="button" onClick={() => handleClick(elem)} className="accordion__button">
              <img className="accordion__img_type_choose" src={elem.img} alt="иконка"></img>
              <p className="accordion__text_type_choose">{elem.text}</p>
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default AccordionChooseNewDocumentType;