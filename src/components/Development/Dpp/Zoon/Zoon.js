import React from 'react';
import './Zoon.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import * as api from '../../../../utils/api.js';
import ZoonChart from './ZoonChart/ZoonChart.js';
import ZoonList from './ZoonList/ZoonList.js';
import ZoonTypology from './ZoonTypology/ZoonTypology.js';
import ZoonExport from './ZoonExport/ZoonExport.js';
import Preloader from '../../../Preloader/Preloader.js';
import RemoveNsiPopup from '../../../Popup/RemoveNsiPopup/RemoveNsiPopup.js';

function Zoon({ dppDescription, loggedIn }) {

  const [zoon, setZoon] = React.useState([]);
  const [zoonLinks, setZoonLinks] = React.useState([]);
  const [typologyParts, setTypologyParts] = React.useState([]);
  const [nsiProgram, setNsiProgram] = React.useState([]);
  const [nsiTypes, setNsiTypes] = React.useState([]);
  const [isRemoveNsiPopupOpen, setIsRemoveNsiPopupOpen] = React.useState(false);
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

  function openRemoveNsiPopup(nsi) {
    setCurrentNsiItem(nsi);
    setIsRemoveNsiPopupOpen(true);
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

  function closeZoonPopups() {
    setIsRemoveNsiPopupOpen(false);
  }


  return (
    <div className="zoon">
      <h1 className="main__title">Проектирование ПК и ЗУН</h1>
      {
        isRendering ?
        <Preloader />
        :
        <Tabs className="tabs">
          <TabList className="tab-list">
            <Tab className="tab">В виде графа</Tab>
            <Tab className="tab">В виде списка</Tab>
            <Tab className="tab">Типология ДПП</Tab>
            <Tab className="tab">Экспорт</Tab>
          </TabList>
          <TabPanel>
            <div className="zoon__container">
              <ZoonChart 
              dppDescription={dppDescription} 
              nodes={zoon} 
              nsi={nsiProgram} 
              nsiTypes={nsiTypes}
              onAddNsi={handleAddNsi}
              onRemoveNsi={openRemoveNsiPopup}
              zoonLinks={zoonLinks} 
              typologyParts={typologyParts} 
              /> 
            </div>
          </TabPanel>
          <TabPanel>
            <ZoonList dppDescription={dppDescription} loggedIn={loggedIn} />
          </TabPanel>
          <TabPanel>
            <ZoonTypology dppDescription={dppDescription} loggedIn={loggedIn} />
          </TabPanel>
          <TabPanel>
            <ZoonExport dppDescription={dppDescription} /> 
          </TabPanel>
        </Tabs>
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

export default Zoon;