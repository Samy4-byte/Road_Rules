
import React, { useState } from "react";
import CountDown from '../../components/timer/index.jsx';
import { Error } from "../../components/error"
import { Loader } from "../../components/loader"
import { Question } from "../../components/question"
import { useTestPage } from "./useTestsPage"
import Style from "./test.module.css"
import { Link } from "react-router-dom";

const ResultsModal = ({ onClose, correctAnswers, allq }) => {
  return (
    <div className={Style.modal}>
      <h2>Результаты теста:</h2>
      <p>Вы ответили правильно на {correctAnswers} из { allq} вопросов.</p>
      <button className={Style.btnClose}><Link to="/">ОК</Link></button>
    </div>
  );
};

export const TestPage = () => {

  const { loading, tests, error } = useTestPage()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const lastQuestion = tests.length
  
  const handleChangeId = (isCorrect) => {
    setQuestionNumber((prev) => prev + 1);
    console.log('iscorrect', isCorrect)
    if (isCorrect=== true) {
      setCorrectAnswers((prev) => prev + 1);
    }

    if (questionNumber === lastQuestion) {
      setIsModalVisible(true);
    }
  };

  const endTest = () => {
    if (questionNumber === lastQuestion) {
      setIsModalVisible(true);
    }
  }

  return (
    <div className={Style.content}>
      {loading ? <Loader /> : null}
      {loading ? null : (
        <div className={Style.bigContainer}>
          <h1>Онлайн-тест ПДД КР 2023</h1>
          <CountDown minutes={20} seconds={0} isOver={false} />
          {error && <Error />}
          {tests.map((e, idx) => {
            if (questionNumber !== e.questionNumber) {
              return;
            }
            return (
              <Question
                key={idx}
                data={e}
                handleChangeId={handleChangeId}
                lastQuestion={lastQuestion}
                questionNumber={questionNumber}
                endTest={endTest}
              />
            );
          })}
        </div>
      )}
      {isModalVisible && <ResultsModal onClose={() => setIsModalVisible(false)} correctAnswers={correctAnswers} allq={lastQuestion}/>}
    </div>
  );
};
