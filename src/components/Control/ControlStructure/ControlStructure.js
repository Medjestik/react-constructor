import React from 'react';
import './ControlStructure.css';
import * as controlApi from '../../../utils/controlApi/controlApi.js';
import Preloader from '../../Preloader/Preloader.js';
import ControlStructureItem from '../ControlStructureItem/ControlStructureItem.js';
import ControlStructureAddPopup from '../ControlStructureAddPopup/ControlStructureAddPopup.js';
import ControlStructureEditPopup from '../ControlStructureEditPopup/ControlStructureEditPopup';
import ControlStructureRemovePopup from '../ControlStructureRemovePopup/ControlStructureRemovePopup.js';

function ControlStructure({ loggedIn }) {

  const [isRendering, setIsRendering] = React.useState(true);
  const [structures, setStructures] = React.useState([]);
  const [filteredStructures, setFilteredStructures] = React.useState([]);
  const [searchStructureName, setSearchStructureName] = React.useState("");
  const [currentStructure, setCurrentStructure] = React.useState({});
  const [isAddStructurePopupOpen, setIsAddStructurePopupOpen] = React.useState(false);
  const [isEditStructurePopupOpen, setIsEditStructurePopupOpen] = React.useState(false);
  const [isRemoveStructurePopupOpen, setIsRemoveStructurePopupOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isShowError, setIsShowError] = React.useState({ isShow: false, text: "" }); 

  function handleSearchStructureByName(e) {
    setSearchStructureName(e.target.value);
  }

  function openAddStructurePopup() {
    setIsAddStructurePopupOpen(true);
  }

  function handleAddStructure(structure) {
    setIsShowError({ isShow: false, text: "" });
    setIsLoading(true);
    const token = localStorage.getItem("token");
    controlApi.addControlTypology({ token: token, typology: structure })
    .then((res) => {
      setStructures([...structures, res.data]);
      closeControlStructurePopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function openEditStructurePopup(structure) {
    setCurrentStructure(structure);
    setIsEditStructurePopupOpen(true);
  }

  function handleEditStructure(structure) {
    setIsShowError({ isShow: false, text: "" });
    setIsLoading(true);
    const token = localStorage.getItem("token");
    controlApi.editControlTypology({ token: token, typology: structure })
    .then((res) => {
      const structureIndex = structures.indexOf(structures.find((elem) => (elem.id === res.data.id)));
      setStructures([...structures.slice(0, structureIndex), structure, ...structures.slice(structureIndex + 1)]);
      closeControlStructurePopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function openRemoveStructurePopup(structure) {
    setCurrentStructure(structure);
    setIsRemoveStructurePopupOpen(true);
  }

  function handleRemoveStructure(structure) {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    controlApi.deleteControlTypology({ token: token, structure: structure })
    .then((res) => {
      const newStructures = structures.filter((elem) => elem.id !== res);
      setStructures(newStructures);
      closeControlStructurePopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  
  function closeControlStructurePopups() {
    setIsShowError({ isShow: false, text: "" });
    setIsAddStructurePopupOpen(false);
    setIsEditStructurePopupOpen(false);
    setIsRemoveStructurePopupOpen(false);
  }

  React.useEffect(() => {
    if (loggedIn) {
        const token = localStorage.getItem("token");
        controlApi.getControlTypology({ token: token })
        .then((res) => {
          setStructures(res.data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setIsRendering(false));
    }
    return () => {
      setStructures([]);
      setCurrentStructure({});
      setFilteredStructures([]);
      setSearchStructureName("");
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const changeUsers = structures.filter((item) => {
      return item.name.toLowerCase().includes(searchStructureName.toLowerCase());
    })
    setFilteredStructures(changeUsers);
  }, [structures, searchStructureName]);

  return (
    isRendering 
    ?
    <Preloader />
    :
    <>
      <div className="control">
        <h3 className="main__title control-structure__title">Типологии содержания ДПП</h3>
        <button className="btn btn_type_add control-structure__btn-add" type="button" onClick={openAddStructurePopup}>Создать типовую структуру</button>
        <p className="main__subtitle control-structure__subtitle">Ниже представлен список всех типовых структур ДПП</p>

        <div className="search">
            <input
            className="input-search"
            placeholder="поиск по названию"
            type="text"
            id="search-structure-input-name"
            name="search-structure-input-name"
            autoComplete="off"
            onChange={handleSearchStructureByName}
            value={searchStructureName}
            >
            </input>
          </div>

        <ul className="task__list">
          {
            filteredStructures.map((elem, i) => (
              <ControlStructureItem
              key={elem.id}
              structure={elem}
              index={i}
              onEdit={openEditStructurePopup}
              onRemove={openRemoveStructurePopup}
              />
            ))
          }

        </ul>
      </div>

      {
        isAddStructurePopupOpen &&
        <ControlStructureAddPopup
          isOpen={isAddStructurePopupOpen}
          onClose={closeControlStructurePopups}
          onAdd={handleAddStructure}
          isLoading={isLoading}
          isShowError={isShowError}
        />
      }

      {
        isEditStructurePopupOpen &&
        <ControlStructureEditPopup
          isOpen={isEditStructurePopupOpen}
          onClose={closeControlStructurePopups}
          structure={currentStructure}
          onEdit={handleEditStructure}
          isLoading={isLoading}
          isShowError={isShowError}
        />
      }

      {
        isRemoveStructurePopupOpen &&
        <ControlStructureRemovePopup
          isOpen={isRemoveStructurePopupOpen}
          onClose={closeControlStructurePopups}
          structure={currentStructure}
          onRemove={handleRemoveStructure}
          isLoading={isLoading}
          isShowError={isShowError}
        />
      }

    </>
  )
}

export default ControlStructure;
