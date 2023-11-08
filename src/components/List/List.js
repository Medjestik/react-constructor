import React from 'react';
import './List.css';

function List({ children }) {
  return (
    <ul className='list'>
      {children}
    </ul>
  )
}

export default List;