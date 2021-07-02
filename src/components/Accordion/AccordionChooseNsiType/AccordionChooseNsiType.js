import React, { useState, useRef } from "react";
import Chevron from "../Chevron.js";
import "./AccordionChooseNsiType.css";
import useOnClickOutside from "../../../hooks/useOnClickOutside.js";
import tehn from '../../../images/nsi/tehn.png';
import book from '../../../images/nsi/book.png';
import website from '../../../images/nsi/website.png';
import library from '../../../images/nsi/library.png';
import act from '../../../images/nsi/act.png';
import document from '../../../images/nsi/document.png';


const AccordionChooseNsiType = ({ chooseNsiType, isOpen }) => {
  const [active, setActive] = useState("");
  const [height, setHeight] = useState("0px");
  const [fill, setFill] = useState("#404040");
  const [rotation, setRotation] = useState("accordion__icon");

  const [title, setTitle] = useState('Выберите тип вопроса');

  const content = useRef();
  const sensitive = useRef();

  const nsi = [
    {
      text: 'Нормативно-техническая документация и ГОСТ',
      type: 'technical',
      id: 1,
      img: tehn,
    },
    {
      text: 'Учебники и монографии',
      type: 'textbook',
      id: 2,
      img: book,
    },
    {
      text: 'Интернет ресурсы',
      type: 'internet',
      id: 3,
      img: website,
    },
    {
      text: 'Электронно-библиотечная система',
      type: 'library',
      id: 4,
      img: library,
    },
    {
      text: 'Нормативно-правовые акты',
      type: 'act',
      id: 5,
      img: act,
    },
    {
      text: 'Отраслевые дорожные методические документы',
      type: 'document',
      id: 6,
      img: document,
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
    setTitle(elem.text);
    setActive("");
    setHeight("0px");
    setRotation("accordion__icon");
    setFill("#404040");
    chooseNsiType(elem.type);
  }

  useOnClickOutside(sensitive, () => {
    setActive("");
    setHeight("0px");
    setRotation("accordion__icon");
    setFill("#404040");
  });

  React.useEffect(() => {
    setTitle('Выберите тип вопроса');
  }, [isOpen]);

  return (
    <div className="accordion__section accordion__section_type_choose accordion__section_type_nsi" ref={sensitive}>
      <button className={`accordion ${active}`} onClick={toggleAccordion} type="button">
        <p className="accordion__title accordion__title_type_choose accordion__section_type_nsi">{title}</p>
        <Chevron width={10} fill={fill} className={`${rotation}`} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${height}` }}
        className="accordion__content accordion__content_type_choose"
      >
        {
          nsi.map((elem, i) => (
            <button key={i} type="button" onClick={() => handleClick(elem)} className="accordion__button">
              <img className="accordion__img_type_nsi" src={elem.img} alt="иконка"></img>
              <p className="accordion__text_type_choose accordion__section_type_nsi">{elem.text}</p>
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default AccordionChooseNsiType;