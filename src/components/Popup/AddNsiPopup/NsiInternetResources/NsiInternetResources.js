import React from 'react';

function NsiInternetResources({ type, formError }) {

  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [authors, setAuthors] = React.useState('');
  const [note, setNote] = React.useState('');
  const [publishingHouse, setPublishingHouse] = React.useState('');
  const [publishingTown, setPublishingTown] = React.useState('');
  const [publishingYear, setPublishingYear] = React.useState('');

  React.useEffect(() => {
    setName('');
    setUrl('');
    setAuthors('');
    setNote('');
    setPublishingHouse('');
    setPublishingTown('');
    setPublishingYear('');
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
  
  function handleChangeUrl(e) {
    setUrl(e.target.value);
  }

  function handleChangeAuthors(e) {
    setAuthors(e.target.value);
  }

  function handleChangeNote(e) {
    setNote(e.target.value);
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
        <h5 className="nsi-popup__item-title">Адрес сайта(URL)</h5>
        <input 
          className="node__input nsi-popup__item-input"
          placeholder="https://"
          type="text"
          id="textbook-name"
          name="textbook-name"
          autoComplete="off"
          value={url || ""}
          onChange={handleChangeUrl}
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
        <h5 className="nsi-popup__item-title">Примечание</h5>
        <input 
          className="node__input nsi-popup__item-input"
          placeholder="Пример: Электрон. версия печ. публикации"
          type="text"
          id="textbook-name"
          name="textbook-name"
          autoComplete="off"
          value={note || ""}
          onChange={handleChangeNote}
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

    </ul>
  )
}

export default NsiInternetResources;