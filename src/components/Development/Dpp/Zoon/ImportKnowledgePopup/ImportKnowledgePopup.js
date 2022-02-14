import React from 'react';
import './ImportKnowledgePopup.css';
import Popup from '../../../../Popup/Popup.js';
import PreloaderPopup from '../../../../Preloader/PreloaderPopup/PreloaderPopup.js';

function ImportKnowledgePopup({ isOpen, onClose, zoon, onSearch, onAdd, isFoundKnowledge, foundKnowledge, isFindingKnowledge, isLoadingRequest }) {

  const [keyword, setKeyword] = React.useState('');
  const [currentKnowledgeId, setCurrentKnowledgeId] = React.useState('');
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(zoon, currentKnowledgeId);
  }

  function handleChooseKnowledge(id) {
    setCurrentKnowledgeId(id);
    setIsBlockSubmitButton(false);
  }

  function handleSearch() {
    setCurrentKnowledgeId('');
    onSearch(keyword);
    setIsBlockSubmitButton(true);
  }

  function handleInputChange(e) {
    setKeyword(e.target.value);
  }

  React.useEffect(() => {
    setIsBlockSubmitButton(true);
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="import-knowledge-zoon-form" action="#" noValidate onSubmit={handleSubmit}>
        
        <h3 className="popup__title">Импортирование существующего знания</h3>
        <h4 className="import-knowledge__title">Введите ключевые слова для поиска существующего знания</h4>
        <div className="import-knowledge__field">
            <input 
            className="import-knowledge__import"
            placeholder="Введите ключевые слова..."
            type="text" 
            id="import-knowledge__search"
            name="import-knowledge__search"
            minLength="2" 
            maxLength="100" 
            required 
            pattern="[A-Za-zА-Яа-яЁё -]{1,}"
            onChange={handleInputChange}
            />
            <button className="import-knowledge__search-btn" type="button" onClick={handleSearch}>Искать</button>
        </div>

        {
          isFoundKnowledge ?
            isFindingKnowledge ?
              <PreloaderPopup />
              :
              foundKnowledge.length > 0 ?
              <>
                <h4 className="import-knowledge__title">Найдено {foundKnowledge.length} знаний. Выбериет одно для импорта в программу.</h4>
                <ul className="import-knowledge__list">
                  {
                    foundKnowledge.map((elem) => (
                      <li 
                      className={`import-knowledge__item ${elem.id === currentKnowledgeId ? "import-knowledge__item_type_current" : ""}`} 
                      key={elem.id}
                      onClick={() => handleChooseKnowledge(elem.id)}
                      >
                        <ul className="import-knowledge__tags-container">
                          <li className={`import-knowledge__tag ${elem.nsis < 1 ? "import-knowledge__tag_type_block" : "" }`}>Нормативно-справочная информация</li>
                          <li className={`import-knowledge__tag ${elem.questions < 1 ? "import-knowledge__tag_type_block" : "" }`}>Оценочные материалы</li>
                          <li className={`import-knowledge__tag ${elem.lection === false ? "import-knowledge__tag_type_block" : "" }`}>Учебно-методические материалы</li>
                        </ul>
                        <h5 className="import-knowledge__item-name">{elem.name}</h5>
                        <p className="import-knowledge__item-description">Программа: {elem.dppName}</p>
                      </li>
                    ))
                  }
                </ul>
              </>
            :
            <p className="import-knowledge__caption">По данным ключевым словам знания не найдены, попробуйте ввести другие.</p>
          :
          <div></div>
        }

        <button className={`btn btn_type_save import-knowledge__btn-save ${isBlockSubmitButton ? "btn_type_loading" : ""} ${isLoadingRequest ? "btn_type_loading" : ""}`} type="submit">{isLoadingRequest ? "Сохранение.." : "Сохранить"}</button>
              
      </form>
    </Popup>
  )
}

export default ImportKnowledgePopup;