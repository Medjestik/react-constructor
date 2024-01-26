import React from 'react';
import * as evaluationMaterialApi from '../../../../utils/evaluationMaterialApi/evaluationMaterialApi.js';
import Preloader from '../../../Preloader/Preloader.js';
import Select from 'react-select';

function MaterialParameters({ dppDescription, loggedIn, isEditRights }) {

  const [testPercent, setTestPercent] = React.useState(0);
  const [testPercentError, setTestPercentError] = React.useState(false);

  const [testQuestions, setTestQuestions] = React.useState(0);
  const [testQuestionsError, setTestQuestionsError] = React.useState(false);

  const [taskReq, setTaskReq] = React.useState(0);
  const [taskOptionCount, setTaskOptionCount] = React.useState(0);
  const [taskOptionValue, setTaskOptionValue] = React.useState(0);
  const [taskOptionValueError, setTaskOptionValueError] = React.useState(false);

  const [controlOptions, setControlOptions] = React.useState([{value: 1, label: 'Зачет'}, {value: 2, label: 'Экзамен'}]);
  const [currentControlOption, setCurrentControlOption] = React.useState({});

  const [requestMessage, setRequestMessage] = React.useState({ text: '', isShow: false, type: '' });

  const [isLoadingPage, setIsLoadingPage] = React.useState(true);

  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(false);

  function getMaterialParameters() {
    const token = localStorage.getItem("token");
    if (loggedIn) {
      setIsLoadingPage(true);
      evaluationMaterialApi.getMaterialParameters({ token: token, omId: dppDescription.om_version_id })
        .then((res) => {
          console.log(res);
          setTestQuestions(res.testQuestions);
          setTestPercent(res.testPercent);
          setTaskReq(res.requiredTasks);
          setTaskOptionCount(res.maxOptionalTasks);
          setTaskOptionValue(res.optionalTasks);
          setCurrentControlOption(res.attType === 'Экзамен' ? {value: 2, label: 'Экзамен'} :  {value: 1, label: 'Зачет'});
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoadingPage(false);
        });
    }
  }

  function handleChangeMaterialParameters(e) {
    e.preventDefault();
    setIsLoadingRequest(true);
    const token = localStorage.getItem("token");
    const parameters = { 
      testQuestions: testQuestions, 
      testPercent: testPercent, 
      optionalTasks: taskOptionValue, 
      attType: currentControlOption.label 
    };
    if (loggedIn) {
      evaluationMaterialApi.changeMaterialParameters({ token: token, omId: dppDescription.om_version_id, parameters: parameters })
        .then((res) => {
          setRequestMessage({ text: 'Данные успешно сохранены!', isShow: true, type: 'success' });
        })
        .catch((err) => {
          setRequestMessage({ text: 'К сожалению произошла ошибка!', isShow: true, type: 'error' });
          console.error(err);
        })
        .finally(() => {
          setIsLoadingRequest(false);
        });
      }
  }

  function handleChangeTestPercent(e) {
    setTestPercent(e.target.value);
    setRequestMessage({ text: '', isShow: false, type: '' });
    if (e.target.checkValidity()) {
      setTestPercentError(false);
    } else {
      setTestPercentError(true);
    }
  }

  function handleChangeTestQuestion(e) {
    setTestQuestions(e.target.value);
    setRequestMessage({ text: '', isShow: false, type: '' });
    if (e.target.checkValidity()) {
      setTestQuestionsError(false);
    } else {
      setTestQuestionsError(true);
    }
  }

  function handleChangeTaskOptionValue(e) {
    setTaskOptionValue(e.target.value);
    setRequestMessage({ text: '', isShow: false, type: '' });
    if (e.target.checkValidity()) {
      setTaskOptionValueError(false);
    } else {
      setTaskOptionValueError(true);
    }
  }

  function handleChangeControlOption(option) {
    setCurrentControlOption(option);
  }

  React.useEffect(() => {
    setTestQuestions(0);
    setTestPercent(0);
    setTaskReq(0);
    setTaskOptionCount(0);
    setTaskOptionValue(0);
    getMaterialParameters();
    setIsBlockSubmitButton(false);
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (testQuestionsError || testPercentError|| taskOptionValueError) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [testQuestions, testPercent, taskOptionValue])

  return (
    !isLoadingPage 
    ?
    <>

    <form className="popup__form popup__form_type_medium" name="program-data-add-qualification-obj-form" action="#" noValidate onSubmit={handleChangeMaterialParameters}>
      <h3 className="popup__title">В данной вкладке вы можете изменить параметры ОМ</h3>

      <div className="form__field">
        <span className="form__input-caption font_weight_bold">Количество вопросов в итоговом тестировании</span>
        <input 
          className={`form__input ${testQuestionsError && "form__input_type_error"}`}
          placeholder="Введите число.."
          type="number"
          id="material-parameters-question"
          name="material-parameters-question"
          autoComplete="off"
          value={testQuestions}
          onChange={handleChangeTestQuestion}
          onWheel={(e) => e.target.blur()}
          min="1"
          required
        >
        </input>
        <span className={`form__input-error ${testQuestionsError && "form__input-error_active"}`}>Некорректное значение</span>
      </div>

      <div className="form__field form__field_margin_top-8">
        <span className="form__input-caption font_weight_bold">Процент проходного балла для тестовых заданий (0 - 100)</span>
        <input 
          className={`form__input ${testPercentError && "form__input_type_error"}`}
          placeholder="Введите процент.."
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
        <span className={`form__input-error ${testPercentError && "form__input-error_active"}`}>Некорректное значение</span>
      </div>

      <div className="form__field form__field_margin_top-8">
        <span className="form__input-caption font_weight_bold">Форма итоговой аттестации</span>
        <Select 
          className="select" 
          options={controlOptions}
          placeholder="Выберите форму.."
          onChange={handleChangeControlOption}
          defaultValue={currentControlOption}
          theme={(theme) => ({
            ...theme,
            borderRadius: 10,
            borderWidth: 2,
            colors: {
              ...theme.colors,
              primary25: '#DDDDDD',
              primary: '#5EB9AF',
            },
          })}
        />
      </div>

      <div className="form__field form__field_margin_top-8">
        <span className="form__input-caption font_weight_bold">Количество обязательных заданий</span>
        <input 
          className={`form__input form__input_type_block`}
          placeholder=".."
          type="number"
          id="material-parameters-task-req"
          name="material-parameters-task-req"
          autoComplete="off"
          value={taskReq}
          onWheel={(e) => e.target.blur()}
          disabled
        >
        </input>
      </div>

      <div className="form__field form__field_margin_top-8">
        <span className="form__input-caption font_weight_bold">Количество заданий по выбору (всего)</span>
        <input 
          className={`form__input form__input_type_block`}
          placeholder=".."
          type="number"
          id="material-parameters-task-option-count"
          name="material-parameters-task-option-count"
          autoComplete="off"
          value={taskOptionCount}
          onWheel={(e) => e.target.blur()}
          disabled
        >
        </input>
      </div>

      <div className="form__field form__field_margin_top-8">
        <span className="form__input-caption font_weight_bold">Количество заданий по выбору (для прохождения)</span>
        <input 
          className={`form__input ${taskOptionValueError && "form__input_type_error"}`}
          placeholder="Введите число.."
          type="number"
          id="material-parameters-task-option-value"
          name="material-parameters-task-option-value"
          autoComplete="off"
          value={taskOptionValue}
          onChange={handleChangeTaskOptionValue}
          onWheel={(e) => e.target.blur()}
          min="0"
          max={taskOptionCount}
          required
        >
        </input>
        <span className={`form__input-error ${taskOptionValueError && "form__input-error_active"}`}>Некорректное значение</span>
      </div>

      <div className="form__btn-container form__btn-container_margin_top-20">
        <div className="form__btn-item">
          <button className={`btn btn_type_save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoadingRequest ? "btn_type_loading" : ""}`} type="submit">Сохранить данные</button>
        </div>
      </div>

      <span className={`request-message ${(requestMessage.isShow) ? "request-message_type_show" : "request-message_type_hide"} ${requestMessage.type === 'error' ? "request-message_type_error" : "request-message_type_success"}`}>{requestMessage.text}</span>

    </form>

    </>
    :
    <Preloader />
  );
}

export default MaterialParameters;