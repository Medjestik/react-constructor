import React from 'react';
import Popup from '../../../../Popup/Popup.js';

function AddNewLinkPopup({ isOpen, onClose, currentNode, nodes, onConfirm, zoonLinks }) {

  const [abilities, setAbilities] = React.useState([]);
  const [newAbilitiesId, setNewAbilitiesId] = React.useState("");

  const isLoadingRequest = false;

  function handleSubmit(e) {
    e.preventDefault()
    onConfirm(currentNode.id, newAbilitiesId);
  }

  function onChoose(e) {
    setNewAbilitiesId(e.target.id);
  }
  
  React.useEffect(() => {

    const newArr = nodes.filter((elem) => (elem.type === "Умение" && elem.id !== currentNode.pid));
    const newLinks = zoonLinks.filter((elem) => (elem.from === currentNode.id));
    const newLinksId = newLinks.map((elem) => (elem.to));
    const filteredArr = newArr.filter((elem) => (!newLinksId.includes(elem.id)));
    setAbilities(filteredArr);
    setNewAbilitiesId("");
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Popup 
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form popup__form_type_large" name="new-link-zoon-form" action="#" noValidate onSubmit={handleSubmit}>
        <h3 className="popup__title">Добавление дополнительной связи</h3>
        <p>{currentNode.name}</p>
        <p>Выберите умение, к которому необходимо добавить дополнительную связь от знания.</p>
        <ul className="initial-data__item-target-list">
          {
            abilities.map((elem, i) => (
              <li className="initial-data__item-target-item" key={i}>
                <label className="radio radio_margin_top radio_margin_bottom">
                  <input 
                    className="radio"
                    name="developingResult"
                    type="radio"
                    id={elem.id}
                    //defaultChecked={newCompetence === 1 ? true : false}
                    onChange={onChoose}
                  >
                  </input>
                  <span>{elem.name}</span>
                </label>
              </li>
            ))
          }
        </ul>

        <button className={`btn btn_type_save ${isLoadingRequest ? "btn_type_loading" : ""}`} type="submit">{isLoadingRequest ? "Сохранение.." : "Сохранить"}</button>
              

      </form>
    </Popup>
  )
}

export default AddNewLinkPopup;