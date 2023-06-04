
import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const CountDown = (props) => {
    const {
        minutes = 20,
        seconds = 0,
        getTimerInfo,
        isOver,
    } = props

  const [[m, s], setTime] = React.useState([minutes, seconds]);
  const [over, setOver] = React.useState(isOver);
  const [showModal, setShowModal] = React.useState(false);

  const tick = () => {
    if (m === 0 && s === 0) {
      setOver(true);
    } else if (s === 0) {
      setTime([m - 1, 59]);
    } else {
      setTime([m, s - 1]);
    }
  };

  const getFinishTime = () => {
    const min = minutes === 0 ? 0 : (minutes - 1) - m;
    const sec = (seconds !== 0 ? seconds : 60) - s;
    return `${min}:${sec}`;
  };

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  }, [m, s]);

  React.useEffect(() => {
    if (over) {
      setShowModal(true);
    }
  }, [over]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="timer-block">
      <p className="timer-block-time">
        Время: {`${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`}
      </p>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Время вышло!</p>
            
            <button onClick={handleModalClose}> <Link to="/">OK</Link></button>

          </div>
        </div>
      )}
    </div>
  );
};

export default CountDown;
