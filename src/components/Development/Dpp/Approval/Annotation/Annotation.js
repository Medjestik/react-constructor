import React from 'react';
import './Annotation.css';
import TextareaAutosize from 'react-textarea-autosize';

function Annotation({ programData, onSave, isLoading, isShowRequestMessage }) {

  const [description, setDescription] = React.useState("");
  const [requirement, setRequirement] = React.useState("");
  const [objective, setObjective] = React.useState("");
  const [result, setResult] = React.useState("");

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleChangeRequirement(e) {
    setRequirement(e.target.value);
  }

  function handleChangeObjective(e) {
    setObjective(e.target.value);
  }

  function handleChangeResult(e) {
    setResult(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const annotationData = {
      annotationDescription: description,
      annotationRequirements: requirement,
      annotationTargets: objective,
      annotationResults: result,
    }
    onSave(annotationData);
    console.log(annotationData);
  }

  React.useEffect(() => {
    setDescription(programData.ishVersion.annotationDescription);
    setRequirement(programData.ishVersion.annotationRequirements);
    setObjective(programData.ishVersion.annotationTargets);
    setResult(programData.ishVersion.annotationResults);
  }, [programData]);

  return (
    <form className="annotation" onSubmit={handleSubmit}>
      <h2 className="annotation__title">Аннотация программы</h2>
      <p className="annotation__caption">Заполните требуемые поля аннотации программы. Другие поля аннотации сформируются автоматически.</p>
      <ul className="annotation__list-input">
        <li className="annotation__item-input">
          <h5 className="annotation__input-name">Описание программы</h5>
          <TextareaAutosize
            className="annotation__textarea"
            id={`annotation__textarea-description`}
            name={`annotation__textarea-description`}
            placeholder="Введите описание программы..."
            value={description || ""}
            onChange={handleChangeDescription}
          >
          </TextareaAutosize>
        </li>
        <li className="annotation__item-input">
          <h5 className="annotation__input-name">Требования к обучающимся</h5>
          <TextareaAutosize
            className="annotation__textarea"
            id={`annotation__textarea-requirement`}
            name={`annotation__textarea-requirement`}
            placeholder="Эта программа для вас, если вы..."
            value={requirement || ""}
            onChange={handleChangeRequirement}
          >
          </TextareaAutosize>
        </li>
        <li className="annotation__item-input">
          <h5 className="annotation__input-name">Цели и задачи освоения</h5>
          <TextareaAutosize
            className="annotation__textarea"
            id={`annotation__textarea-objective`}
            name={`annotation__textarea-objective`}
            placeholder="Введите цели и задачи освоения программы..."
            value={objective || ""}
            onChange={handleChangeObjective}
          >
          </TextareaAutosize>
        </li>
        <li className="annotation__item-input">
          <h5 className="annotation__input-name">Результаты и перспективы освоения</h5>
          <TextareaAutosize
            className="annotation__textarea"
            id={`annotation__textarea-result`}
            name={`annotation__textarea-result`}
            placeholder="Введите результаты и перспективы освоения программы..."
            value={result || ""}
            onChange={handleChangeResult}
          >
          </TextareaAutosize>
        </li>
      </ul>

      <button className={`btn btn_type_save annotation__btn-save ${isLoading ? "btn_type_loading" : ""}`} type="submit">{isLoading ? "Сохранение.." : "Сохранить"}</button>

      {
        isShowRequestMessage.isShow && isShowRequestMessage.type === "success" &&
        <span className="request-node request-node_type_success">{isShowRequestMessage.text}</span>
      }
      {
        isShowRequestMessage.isShow && isShowRequestMessage.type === "error" &&
        <span className="request-node request-node_type_error">{isShowRequestMessage.text}</span>
      }

    </form>
  );
}

export default Annotation;