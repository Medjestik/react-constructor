import React from 'react';

function HomePageMethodologyItem({ item }) {

  const [isShowInfo, setIsShowInfo] = React.useState(false);

  return (
    <li className="homepage-methodology__item" onClick={() => setIsShowInfo(!isShowInfo)}>
      <div className="homepage-methodology__item-info"></div>
      <h5 className="homepage-methodology__item-title">{item.title}</h5>
      {
        isShowInfo ?
        <>
        <p className="homepage-methodology__item-text">{item.text}</p>
        {
          item.link.length > 0 &&
          <a className="homepage-methodology__item-link" rel='norefferer' target='_blanc' href={item.link}>Видео</a>
        }
        </>
        :
        <div className={`homepage-methodology__item-img homepage-methodology__item-img_type_${item.type}`}></div>
      }

    </li>
  )
}

export default HomePageMethodologyItem;