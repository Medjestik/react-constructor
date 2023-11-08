import React from 'react';

function ListItem({ number, item, title, subtitle, tag, isEdit, onEdit, isRemove, onRemove }) {

  return (
    <li className='list__item'>
      <span className='list__number'>{number}.</span>
      <div className='list__info'>
        {
          tag &&
          <span className='list__tag'>{tag}</span>
        }
        
        <h3 className='list__title'>{title}</h3>
        {
          subtitle &&
          <p className='list__subtitle'>{subtitle}</p>
        }
      </div>
      {
        ((isEdit) || (isRemove)) &&
        <div className='list__control'>
          {
            isEdit &&
            <button className='list__btn list__btn_type_edit' type='button' onClick={() => onEdit(item)}>Изменить</button>
          }
          {
            isRemove &&
            <button className='list__btn list__btn_type_remove' type='button' onClick={() => onRemove(item)}>Удалить</button>
          }
        </div>
      }
    </li>
  )
}

export default ListItem;