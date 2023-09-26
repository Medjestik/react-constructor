import React from 'react';
import * as evaluationMaterialApi from '../../../../utils/evaluationMaterialApi/evaluationMaterialApi.js';
import Preloader from '../../../Preloader/Preloader.js';

function MaterialParameters({ dppDescription, loggedIn, isEditRights }) {

  const [testPercent, setTestPercent] = React.useState(0);

  const [isLoadingRequest, setIsLoadingRequest] = React.useState(true);
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(false);

  function getMaterialParameters() {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      setIsLoadingRequest(true);
      evaluationMaterialApi.getMaterialParameters({ token: token, omId: dppDescription.om_version_id })
        .then((res) => {
          setTestPercent(res.testPercent);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
    }
  }

  function handleChangeMaterialParameters() {
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    const parameters = { testPercent: testPercent, };
    if (loggedIn) {
      evaluationMaterialApi.changeMaterialParameters({ token: token, omId: dppDescription.om_version_id, parameters: parameters })
        .then((res) => {
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
      }
  }

  function handleChangeTestPercent(e) {
    setTestPercent(e.target.value);
    if (e.target.checkValidity()) {
      setIsBlockSubmitButton(false);
    } else {
      setIsBlockSubmitButton(true);
    }
  }

  React.useEffect(() => {
    setTestPercent(0);
    getMaterialParameters();
    setIsBlockSubmitButton(false);
    // eslint-disable-next-line
  }, []);

  return (
    !isLoadingRequest 
    ?
    <>
    <p className="main__subtitle">В данной вкладке вы можете изменить параметры ОМ.</p>
    {
      isEditRights 
      ?
      <>
      <h5 className="initial-data__item-title">Процент проходного балла для тестовых заданий (0 - 100)</h5>
      <input 
        className="initial-popup__input initial-data__target-input"
        placeholder="введите процент.."
        type="number"
        id="material-parameters-percent"
        name="material-parameters-percent"
        autoComplete="off"
        value={testPercent}
        onChange={handleChangeTestPercent}
        onWheel={(e) => e.target.blur()}
        min="1"
        max="100"
        required
      >
      </input>
      <button className={`btn btn_type_save ${isBlockSubmitButton && 'btn_type_block'}`} type="button" onClick={handleChangeMaterialParameters}>Сохранить данные</button>
      </>
      :
      <div></div>
    }
    </>
    :
    <Preloader />
  );
}

export default MaterialParameters;