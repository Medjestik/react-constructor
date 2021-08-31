import React from 'react';
import { Collapse } from 'react-collapse';

function PracticalTaskSubjectItem({ item, onAddObject, onRemoveSubject, onRemoveObject }) {
  
  const [isShowObjects, setIsShowObjects] = React.useState(false);

  function toggleShowObjects () {
    setIsShowObjects(!isShowObjects);
  }

  return (
    <li className="practical-task__subject-item">
      <button className="practical-task__btn-delete" type="button" onClick={() => onRemoveSubject(item)}></button>
      <span className={`practical-task__subject-type ${item.type === "Умение" ? "practical-task__subject-type_type_ability" : ""}`}>{item.type}</span>
      <h4 className="practical-task__subject-name">{item.name}</h4>
      <div className="development__item-control">
      <button className={`development__item-button-performer ${isShowObjects ? "button-performer_type_show" : "button-performer_type_hide"}`} type="button" onClick={toggleShowObjects}>Показать объекты оценки</button>
        <button className="btn btn_type_add" type="button" onClick={() => onAddObject(item)}>Добавить объект оценки</button>
      </div>
      <Collapse isOpened={isShowObjects}>
        <ul className="practical-task__object-list">
          {
            item.objects.map((object) => (
              <li key={`${object.id}o`} className="practical-task__object-item">
                <button className="practical-task__btn-delete" type="button" onClick={() => onRemoveObject(item, object)}></button>
                <h5 className="practical-task__object-name">{object.name}</h5>
                <p className="practical-task__object-description">{object.modelAnswer}</p>
              </li>
            ))
          }

        </ul>

      </Collapse>

    </li>
  ) 
}

export default PracticalTaskSubjectItem;
