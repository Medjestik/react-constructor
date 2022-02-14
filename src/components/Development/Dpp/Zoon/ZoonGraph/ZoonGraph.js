import React from 'react';
import './ZoonGraph.css';
import * as api from '../../../../../utils/api.js';
import ZoonChart from '../ZoonChart/ZoonChart.js';
import Preloader from '../../../../Preloader/Preloader.js';
import EditNsiPopup from '../../../../Popup/EditNsiPopup/EditNsiPopup.js';
import RemoveNsiPopup from '../../../../Popup/RemoveNsiPopup/RemoveNsiPopup.js';

function ZoonGraph({ dppDescription, loggedIn, isEditRights }) {

  const [zoon, setZoon] = React.useState([]);
  const [zoonLinks, setZoonLinks] = React.useState([]);
  const [typologyParts, setTypologyParts] = React.useState([]);
  const [nsiProgram, setNsiProgram] = React.useState([]);
  const [nsiTypes, setNsiTypes] = React.useState([]);
  const [isRemoveNsiPopupOpen, setIsRemoveNsiPopupOpen] = React.useState(false);
  const [isEditNsiPopupOpen , setIsEditNsiPopupOpen] = React.useState(false);
  const [currentNsiItem, setCurrentNsiItem] = React.useState({});
  const [isRendering, setIsRendering] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (loggedIn) {
        const token = localStorage.getItem("token"); 
        setIsRendering(true);
        Promise.all([
          api.getZoon({ token: token, dppId: dppDescription.id, zoonVersion: dppDescription.zun_version_id, }),
          api.getNsi({ token: token, initialVersionId: dppDescription.ish_version_id, }),
          api.getNsiType({ token: token }),
        ])
        .then(([ zoon, nsi, nsiTypes ]) => {
          setZoon(zoon.zoons);
          setZoonLinks(zoon.links);
          setTypologyParts(zoon.typologyParts);
          nsi.sort(function(a,b) {
            return parseInt(a.type.position) - parseInt(b.type.position)
          })
          setNsiProgram(nsi);
          setNsiTypes(nsiTypes);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setIsRendering(false));
    }  return () => {
      setZoon([]);
      setNsiProgram([]);
      setNsiTypes([]);
    };
  }, [loggedIn, dppDescription]);

  function handleAddNsi(elem, closeAllNsiPopup) {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.createNsiElem({ 
        token: token, 
        initialDataVersion:dppDescription.ish_version_id, 
        elem: elem
      })
      .then((res) => {
        setNsiProgram([...nsiProgram, res]);
        closeAllNsiPopup();
      })
      .catch((err) =>{
        console.log(err);
      })
    }
  }

  function handleEditNsi(elem) {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (loggedIn) {
      api.editNsiElem({ 
        token: token, 
        initialDataVersion:dppDescription.ish_version_id, 
        elem: elem,
        id: currentNsiItem.id
      })
      .then((res) => {
        const index = nsiProgram.indexOf(nsiProgram.find((elem) => (elem.id === currentNsiItem.id)));
        setNsiProgram([...nsiProgram.slice(0, index), res, ...nsiProgram.slice(index + 1)]);
        closeZoonPopups();
      })
      .catch((err) =>{
        console.log(err);
      })
      .finally(() => setIsLoading(false));
    }
  }

  function openRemoveNsiPopup(nsi) {
    setCurrentNsiItem(nsi);
    setIsRemoveNsiPopupOpen(true);
  }

  function openEditNsiPopup(nsi) {
    setCurrentNsiItem(nsi);
    setIsEditNsiPopupOpen(true);
  }

  function handleRemoveNsi(id) {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    api.removeNsiElem({ 
      token: token, 
      initialDataVersion: dppDescription.ish_version_id, 
      id: id
    })
    .then((res) => {
      const newNsi = nsiProgram.filter(part => part.id !== res);
      setNsiProgram(newNsi);
      closeZoonPopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleImportNsi(nsi) {
    setNsiProgram(nsi);
  }

  function closeZoonPopups() {
    setIsRemoveNsiPopupOpen(false);
    setIsEditNsiPopupOpen(false);
  }

  return (
    <div>
      {
        isRendering ?
        <Preloader />
        :
        <ZoonChart 
          dppDescription={dppDescription} 
          nodes={zoon} 
          nsi={nsiProgram} 
          nsiTypes={nsiTypes}
          onAddNsi={handleAddNsi}
          onEditNsi={openEditNsiPopup}
          onRemoveNsi={openRemoveNsiPopup}
          onImportNsi={handleImportNsi}
          zoonLinks={zoonLinks} 
          typologyParts={typologyParts}
          isEditRights={isEditRights}
        /> 
      }
      {
      isEditNsiPopupOpen &&
      <EditNsiPopup
        isOpen={isEditNsiPopupOpen}
        onClose={closeZoonPopups}  
        nsi={currentNsiItem}
        onEdit={handleEditNsi}
        isLoading={isLoading}
      />
      }
      {
        isRemoveNsiPopupOpen &&
        <RemoveNsiPopup
          isOpen={isRemoveNsiPopupOpen}
          onClose={closeZoonPopups}  
          nsi={currentNsiItem}
          onRemove={handleRemoveNsi}
          isLoading={isLoading}
        />
      }
    </div>
  );
}

export default ZoonGraph;