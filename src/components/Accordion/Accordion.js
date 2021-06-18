import React, { useState, useRef } from "react";
import Chevron from "./Chevron";
import "./Accordion.css";
import useOnClickOutside from "../../hooks/useOnClickOutside.js";

const Accordion = ({ title, children }) => {
  const [active, setActive] = useState("");
  const [height, setHeight] = useState("0px");
  const [fill, setFill] = useState("#404040");
  const [rotation, setRotation] = useState("accordion__icon");

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

  useOnClickOutside(sensitive, () => {
    setActive("");
    setHeight("0px");
    setRotation("accordion__icon");
    setFill("#404040");
  });

  return (
    <div className="accordion__section" ref={sensitive}>
      <button className={`accordion ${active}`} onClick={toggleAccordion}>
        <p className="accordion__title">{title}</p>
        <Chevron width={10} fill={fill} className={`${rotation}`} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${height}` }}
        className="accordion__content"
      >
        <div className="accordion__text">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;