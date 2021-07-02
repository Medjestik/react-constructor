import React from 'react';

function NsiTechnicalDocumentation({ type, formError }) {

  const [name, setName] = React.useState('');
  const [previousDocument, setPreviousDocument] = React.useState('');
  const [dateDocument, setDateDocument] = React.useState('');
  const [publishingHouse, setPublishingHouse] = React.useState('');
  const [publishingTown, setPublishingTown] = React.useState('');
  const [publishingYear, setPublishingYear] = React.useState('');
  const [pagesNumber, setPagesNumber] = React.useState('');

  React.useEffect(() => {
    setName('');
    setPreviousDocument('');
    setDateDocument('');
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
  
  function handleChangePreviousDocument(e) {
    setPreviousDocument(e.target.value);
  }

  function handleChangeDateDocument(e) {
    setDateDocument(e.target.value);
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
        <h5 className="nsi-popup__item-title">Ранее действовавший документ</h5>
        <input 
          className="node__input nsi-popup__item-input"
          placeholder="Пример: Взамен ГОСТ 7.53 – 86"
          type="text"
          id="textbook-name"
          name="textbook-name"
          autoComplete="off"
          value={previousDocument || ""}
          onChange={handleChangePreviousDocument}
          ></input>
      </li>

      <li className="nsi-popup__item">
        <h5 className="nsi-popup__item-title">Когда введен документ</h5>
        <input 
          className="node__input nsi-popup__item-input"
          placeholder="Пример: Введ. 2002 – 07 – 01"
          type="text"
          id="textbook-name"
          name="textbook-name"
          autoComplete="off"
          value={dateDocument || ""}
          onChange={handleChangeDateDocument}
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

export default NsiTechnicalDocumentation;