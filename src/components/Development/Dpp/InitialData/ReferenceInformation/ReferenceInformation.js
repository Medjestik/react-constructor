import React from 'react';
import './ReferenceInformation.css';
import ReferenceInformationItem from './ReferenceInformationItem/ReferenceInformationItem.js';

function ReferenceInformation({ nsi, onRemove }) { 


  return (
    <>
      <h3 className="typical-structure__subtitle">{`Текущие источники (${nsi.length})`}</h3>
      <ul className="reference-information__list">
        {
          nsi.map((elem, i) => (
            <ReferenceInformationItem
              elem={elem}
              key={i}
              onRemove={onRemove}
            />
          ))
        }
      </ul>
    </>
  );
}

export default ReferenceInformation;


