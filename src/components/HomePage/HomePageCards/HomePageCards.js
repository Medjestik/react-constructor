import React from 'react';
import './HomePageCards.css';
import book from '../../../images/book.png';
import idea from '../../../images/idea.png';
import pencil from '../../../images/pencil.png';

function HomePageCards() {

  return (
    <ul className="homepage__cards">
      <li className="homepage__card homepage__card_color_red">
        <img className="homepage__card-img" alt="знать" src={book}></img>
        <span className="homepage__card-caption">Знать</span>
      </li>
      <li className="homepage__card homepage__card_color_blue">
        <img className="homepage__card-img" alt="уметь" src={pencil}></img>
        <span className="homepage__card-caption">Уметь</span>
      </li>
      <li className="homepage__card homepage__card_color_green">
        <img className="homepage__card-img" alt="владеть" src={idea}></img>
        <span className="homepage__card-caption">Владеть</span>
      </li>
    </ul>
  )
}

export default HomePageCards;