import React from 'react';
import './KnowledgeItem.css';

function KnowledgeItem({ knowledges, chooseKnowledge, dppDescription, onDown, onUp }) {

  const [searchName, setSearchName] = React.useState('');
  const [currentKnowledges, setCurrentKnowledges] = React.useState([]);

  function handleSearchByName(e) {
    setSearchName(e.target.value);
  }

  function handleChooseKnowledge(knowledge) {
    chooseKnowledge(knowledge);
    setSearchName('');
  }

  React.useEffect(() => {
    const filteredKnowledges = knowledges.filter((item) => {
      return item.name.toLowerCase().includes(searchName.toLowerCase());
    })
    setCurrentKnowledges(filteredKnowledges)
  }, [knowledges, searchName]);

  React.useEffect(() => {
    setSearchName('');
    setCurrentKnowledges([...knowledges]);
    return () => {
      setCurrentKnowledges([]);
    }
  }, [knowledges]);
  
  return (
    <>
    <ul className="knowledge-item__btn_list">
      <li className="knowledge-item__btn_item">  
        <a className="btn knowledge-item__btn knowledge-item__btn_export" href={`https://constructor-api.emiit.ru/dpps/${dppDescription.id}/export_om_questions/${dppDescription.om_version_id}`} target="_blank" rel="noreferrer">Экспорт в Word</a>
      </li>
      <li className="knowledge-item__btn_item">  
        <button className="btn knowledge-item__btn knowledge-item__btn_down" onClick={onDown}>По убыванию</button>
      </li>
      <li className="knowledge-item__btn_item">  
        <button className="btn knowledge-item__btn knowledge-item__btn_up" onClick={onUp}>По возрастанию</button>
      </li>
    </ul>
    <p className="main__subtitle knowledge-item__subtitle">Для работы с оценочными материалами выберите знание</p>
    <div className="search">
      <input
      className="input-search"
      placeholder="поиск по наименованию знания"
      type="text"
      id="search-knowledge-input-name"
      name="search-knowledge-input-name"
      spellCheck="true"
      autoComplete="off"
      value={searchName}
      onChange={handleSearchByName}
      >
      </input>
    </div>
    <ul className="knowledge-item__list">
    {
      currentKnowledges.map((knowledge) => (
        <li key={knowledge.id} className="knowledge-item__item">
          <span 
          className={`
          knowledge-item__count
          ${knowledge.questions.length === 0 ? "knowledge-item__count_color_none" : ""}
          ${knowledge.questions.length > 0 ? "knowledge-item__count_color_progress" : ""}
          ${knowledge.questions.length > 4 ? "knowledge-item__count_color_success" : ""}
          `}
          >
            {knowledge.questions.length}
          </span>
          <h3 className="knowledge-item__name">{knowledge.name}</h3>
          <button className="knowledge-item__btn-choose" onClick={() => handleChooseKnowledge(knowledge)}>Выбрать</button>
        </li>
      ))
    }
    </ul>
    </>
  );
}

export default KnowledgeItem;