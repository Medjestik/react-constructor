import React from 'react';

function Feedback({ onFeedback, isLoading, feedbackMessage, setFeedbackMessage }) {

  const [feedbackText, setFeedbackText] = React.useState('');
  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleChangeFeedback(e) {
    setFeedbackText(e.target.value);
    setFeedbackMessage({text: '', isShow: false,});
  }

  function handleSendFeedback() {
    const newFeedback = {
      description: feedbackText,
    }
    onFeedback(newFeedback);
  }

  React.useEffect(() => {
    setFeedbackText('');
  }, []);

  React.useEffect(() => {
    if (feedbackText.length < 1) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
    // eslint-disable-next-line
  }, [feedbackText]);

  return (
    <>
    <textarea 
      className="initial-data__item-qualification-text" 
      name="feedback-text" 
      placeholder="Введите текст"
      value={feedbackText}
      onChange={handleChangeFeedback}
      minLength="1"
      required
    >
    </textarea>
    <button className={`btn btn_type_save initial-popup__btn-save ${isBlockSubmitButton ? "btn_type_block" : ""} ${isLoading ? "btn_type_loading" : ""}`} type="button" onClick={handleSendFeedback}>{isLoading ? "Отправка.." : "Отправить"}</button>
    <span className={`popup__submit-error main-page__section-feedback-message ${feedbackMessage.isShow ? "popup__submit-error_type_show" : "popup__submit-error_type_hide"}`}>{feedbackMessage.isShow ? feedbackMessage.text : ""}</span>
    </>
  );
}

export default Feedback;