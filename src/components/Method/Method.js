import React from 'react';
import './Method.css';
import { CHAPTER_ONE, CHAPTER_TWO, CHAPTER_THREE, CHAPTER_FOUR, CHAPTER_FIVE, CHAPTER_SIX } from '../../utils/course.js';
import MethodItem from './MethodItem/MethodItem';

function Method() {

  

  return (
    <div className="method">
      <h1 className="main__title">Методическая база</h1>
      <p className="main__subtitle">Ниже представлены методические указания для проектирования образовательных программ от результата профессиональной деятельности выпускника.</p>
      <ul className="method__list">
        <MethodItem
          chapter={CHAPTER_ONE}
        />
        <MethodItem
          chapter={CHAPTER_TWO}
        />
        <MethodItem
          chapter={CHAPTER_THREE}
        />
        <MethodItem
          chapter={CHAPTER_FOUR}
        />
        <MethodItem
          chapter={CHAPTER_FIVE}
        />
        <MethodItem
          chapter={CHAPTER_SIX}
        />
      </ul>
    </div>
  );
}

export default Method;