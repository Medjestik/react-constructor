import React from 'react';

function NsiTextbook({ type, formError }) {

  const [name, setName] = React.useState('');
  const [publishingNumber, setPublishingNumber] = React.useState('');
  const [authors, setAuthors] = React.useState('');
  const [editor, setEditor] = React.useState('');
  const [publishingHouse, setPublishingHouse] = React.useState('');
  const [publishingTown, setPublishingTown] = React.useState('');
  const [publishingYear, setPublishingYear] = React.useState('');
  const [pagesNumber, setPagesNumber] = React.useState('');

  React.useEffect(() => {
    setName('');
    setPublishingNumber('');
    setAuthors('');
    setEditor('');
    setPublishingHouse('');
    setPublishingTown('');
    setPublishingYear('');
    setPagesNumber('');
  }, [type]);

  React.useEffect(() => {
    if (name.length > 0) {
      formError(false);
    } else {
      formError(true);
    }
    // eslint-disable-next-line
  }, [name.length]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  
  function handleChangePublishingNumber(e) {
    setPublishingNumber(e.target.value);
  }

  function handleChangeAuthors(e) {
    setAuthors(e.target.value);
  }

  function handleChangeEditor(e) {
    setEditor(e.target.value);
  }

  function handleChangePublishingHouse(e) {
    setPublishingHouse(e.target.value);
  }

  function handleChangePublishingTown(e) {
    setPublishingTown(e.target.value);
  }

  function handleChangePublishingYear(e) {
    setPublishingYear(e.target.value);
  }

  function handleChangePagesNumber(e) {
    setPagesNumber(e.target.value);
  }

  return (
    <ul className="nsi-popup__list">

      <li className="nsi-popup__item">
        <h5 className="nsi-popup__item-title">Название*</h5>
        <input 
          className="node__input nsi-popup__item-input"
          placeholder="Пример: Основы надежности строительных машин"
          type="text"
          id="textbook-name"
          name="textbook-name"
          autoComplete="off"
          value={name || ""}
          onChange={handleChangeName}
          minLength="1"
          required
          ></input>
      </li>

      <li className="nsi-popup__item">
        <h5 className="nsi-popup__item-title">Издание</h5>
        <input 
          className="node__input nsi-popup__item-input"
          placeholder="Пример: 3-е изд., перераб. и доп."
          type="text"
          id="textbook-name"
          name="textbook-name"
          autoComplete="off"
          value={publishingNumber || ""}
          onChange={handleChangePublishingNumber}
          ></input>
      </li>

      <li className="nsi-popup__item">
        <h5 className="nsi-popup__item-title">Авторы</h5>
        <input 
          className="node__input nsi-popup__item-input"
          placeholder="Пример (если авторов более 4, добавьте «и др.»): Л.П. Краснова, Н.Т. Шалашова, Н.М. Ярцева, Н.П. Гордина, и др."
          type="text"
          id="textbook-name"
          name="textbook-name"
          autoComplete="off"
          value={authors || ""}
          onChange={handleChangeAuthors}
          ></input>
      </li>

      <li className="nsi-popup__item">
        <h5 className="nsi-popup__item-title">Редакторы, составители, переводчики</h5>
        <input 
          className="node__input nsi-popup__item-input"
          placeholder="Пример: пер. с анг. И.Ю.Багровой и Р.З. Пановой, науч. ред. Л.М. Иньковой"
          type="text"
          id="textbook-name"
          name="textbook-name"
          autoComplete="off"
          value={editor || ""}
          onChange={handleChangeEditor}
          ></input>
      </li>

      <li className="nsi-popup__item">
        <h5 className="nsi-popup__item-title">Издательство</h5>
        <input 
          className="node__input nsi-popup__item-input"
          placeholder="Пример: Эксмо"
          type="text"
          id="textbook-name"
          name="textbook-name"
          autoComplete="off"
          value={publishingHouse || ""}
          onChange={handleChangePublishingHouse}
          ></input>
      </li>
      
      <li className="nsi-popup__item">
        <h5 className="nsi-popup__item-title">Город издания</h5>
        <input 
          className="node__input nsi-popup__item-input"
          placeholder="Пример: Москва"
          type="text"
          id="textbook-name"
          name="textbook-name"
          autoComplete="off"
          value={publishingTown || ""}
          onChange={handleChangePublishingTown}
          ></input>
      </li>

      <li className="nsi-popup__item">
        <h5 className="nsi-popup__item-title">Год издания</h5>
        <input 
          className="node__input nsi-popup__item-input"
          placeholder="Пример: 2002"
          type="text"
          id="textbook-name"
          name="textbook-name"
          autoComplete="off"
          value={publishingYear || ""}
          onChange={handleChangePublishingYear}
          ></input>
      </li>

      <li className="nsi-popup__item">
        <h5 className="nsi-popup__item-title">Количество страниц</h5>
        <input 
          className="node__input nsi-popup__item-input"
          placeholder="Пример: 3"
          type="text"
          id="textbook-name"
          name="textbook-name"
          autoComplete="off"
          value={pagesNumber || ""}
          onChange={handleChangePagesNumber}
          ></input>
      </li>

    </ul>
  )
}

export default NsiTextbook;