import React, { useState, useRef } from "react";
import Chevron from "../Chevron.js";
import "./AccordionChooseKnowledge.css";
import useOnClickOutside from "../../../hooks/useOnClickOutside.js";

const AccordionChooseKnowledge = ({ children, renderKnowledge }) => {
  const [active, setActive] = useState("");
  const [height, setHeight] = useState("0px");
  const [fill, setFill] = useState("#404040");
  const [rotation, setRotation] = useState("accordion__icon");

  const [title, setTitle] = useState('Знание не выбрано');

  const content = useRef();
  const sensitive = useRef();

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
    setTitle(elem.name);
    setActive("");
    setHeight("0px");
    setRotation("accordion__icon");
    setFill("#404040");
    renderKnowledge(elem.id);
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
          children.map((elem, i) => (
            <button key={i} type="button" onClick={() => handleClick(elem)} className="accordion__button">
              <p className="accordion__text_type_choose">{elem.name}</p>
              <span className="accordion__count">{elem.questions.length}</span>
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default AccordionChooseKnowledge;