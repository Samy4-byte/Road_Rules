
import { useState } from 'react'
import './style.css'

export const Question = (props) => {

  const {
    data,
    handleChangeId,
    lastQuestion,
    questionNumber,
  } = props

  const [disabled, setDisabled] = useState(true)
  const [variant, setVariant] = useState(false)

  const test = () => {
    setDisabled(false)
  }

  const endTest = () => {
    const selectedVariant = data.variants.find((v) => v.isCorrect === variant)
    if (selectedVariant) {
      handleChangeId(selectedVariant.isCorrect)
    } else {
      handleChangeId(false)
    }
  }

  return (
    <div className="q-item">
      <h3 className='test_quest'>{data.questionNumber}. {data.text}</h3>

      <img src={data.image} alt="image" />
      <div className="form">
        {
          data.variants.map((v) => (
            <div key={v.id} className="variant">
              <input
                type="radio"
                name={data.id}
                onClick={test}
                onChange={() => setVariant(v.isCorrect)}
              />
              <label htmlFor={v.id}>{v.text}</label>
            </div>
          ))
        }
      </div>
      <div className="btnContainer">
        {
          questionNumber === lastQuestion ?
            <button
              className="check"
              disabled={disabled}
              onClick={() => endTest()}
            > Закончить тест</button>
            :
            <button
              className="check"
              onClick={() => handleChangeId(variant)}
              disabled={disabled}
            > Далее</button>
        }
      </div>
    </div>
  )
}

export default Question
