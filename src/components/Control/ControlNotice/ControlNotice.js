import React from 'react';
import './ControlNotice.css';
import * as controlApi from '../../../utils/controlApi/controlApi.js';
import Preloader from '../../Preloader/Preloader.js';
import ControlNoticeItem from './ControlNoticeItem/ControlNoticeItem.js';
import ControlNoticeAddPopup from '../ControlNotice/ControlNoticeAddPopup/ControlNoticeAddPopup.js';
import ControlNoticeEditPopup from './ControlNoticeEditPopup/ControlNoticeEditPopup.js';
import ControlNoticeRemovePopup from '../ControlNotice/ControlNoticeRemovePopup/ControlNoticeRemovePopup.js';

function ControlNotice({ loggedIn }) {

  const [isRendering, setIsRendering] = React.useState([]);
  const [notice, setNotice] = React.useState([]);
  const [currentNotice, setCurrentNotice] = React.useState({});
  const [isAddNoticePopupOpen, setIsAddNoticePopupOpen] = React.useState(false);
  const [isEditNoticePopupOpen, setIsEditNoticePopupOpen] = React.useState(false);
  const [isRemoveNoticePopupOpen, setIsRemoveNoticePopupOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isShowError, setIsShowError] = React.useState({ isShow: false, text: "" }); 

  function openAddNoticePopup() {
    setIsAddNoticePopupOpen(true);
  }

  function openEditNoticePopup(elem) {
    setIsEditNoticePopupOpen(true);
    setCurrentNotice(elem);
  }

  function openRemoveNoticePopup(elem) {
    setIsRemoveNoticePopupOpen(true);
    setCurrentNotice(elem);
  }

  function closeNoticePopups() {
    setIsAddNoticePopupOpen(false);
    setIsEditNoticePopupOpen(false);
    setIsRemoveNoticePopupOpen(false);
  }

  function handleAddNotice(announcement) {
    setIsShowError({ isShow: false, text: "" });
    setIsLoading(true);
    const token = localStorage.getItem("token");
    controlApi.addControlNotice({ token: token, announcement: announcement })
    .then((res) => {
      console.log(res);
      setNotice([res.data, ...notice]);
      closeNoticePopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleEditNotice(announcement) {
    setIsShowError({ isShow: false, text: "" });
    setIsLoading(true);
    const token = localStorage.getItem("token");
    controlApi.editControlNotice({ token: token, announcement: announcement })
    .then((res) => {
      const structureIndex = notice.indexOf(notice.find((elem) => (elem.id === res.data.id)));
      setNotice([...notice.slice(0, structureIndex), announcement, ...notice.slice(structureIndex + 1)]);
      closeNoticePopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleRemoveNotice() {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    controlApi.deleteControlNotice({ token: token, notice: currentNotice })
    .then((res) => {
      const newNotice = notice.filter((elem) => elem.id !== res);
      setNotice(newNotice);
      closeNoticePopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => setIsLoading(false));
  }

  React.useEffect(() => {
    if (loggedIn) {
        const token = localStorage.getItem("token");
        controlApi.getControlNotice({ token: token })
        .then((res) => {
          setNotice(res.data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setIsRendering(false));
    }
    return () => {
      setNotice([]);
      setCurrentNotice({});
    }
  }, [loggedIn]);

  return (
    isRendering 
    ?
    <Preloader /> 
    :
    <div className="control">
      <h3 className="main__title control-notice__title">Объявления</h3>
      <button className="btn btn_type_add control-notice__btn-add" type="button" onClick={openAddNoticePopup}>Создать объявление</button>
      <p className="main__subtitle control-notice__subtitle">Ниже представлен список всех объявлений</p>

      <ul className="task__list">
        {
          notice.map((elem, i) => (
            <ControlNoticeItem
            key={elem.id}
            notice={elem}
            index={i}
            onEdit={openEditNoticePopup}
            onRemove={openRemoveNoticePopup} 
            />
          ))
        }
      </ul>

      {
        isAddNoticePopupOpen &&
        <ControlNoticeAddPopup
          isOpen={isAddNoticePopupOpen}
          onClose={closeNoticePopups}
          onAdd={handleAddNotice}
          isLoading={isLoading}
          isShowError={isShowError}
        />
      }

      {
        isEditNoticePopupOpen &&
        <ControlNoticeEditPopup
          isOpen={isEditNoticePopupOpen}
          onClose={closeNoticePopups}
          currentNotice={currentNotice}
          onAdd={handleEditNotice}
          isLoading={isLoading}
          isShowError={isShowError}
        />
      }

      {
        isRemoveNoticePopupOpen &&
        <ControlNoticeRemovePopup
          isOpen={isRemoveNoticePopupOpen}
          onClose={closeNoticePopups}
          currentNotice={currentNotice}
          onRemove={handleRemoveNotice}
          isLoading={isLoading}
          isShowError={isShowError}
        />
      }

    </div>
  )
}

export default ControlNotice;