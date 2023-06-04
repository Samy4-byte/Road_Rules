import LoaderImg  from '../../images/wheel.png'
import './loader.module.css'

export const Loader = () => {
  return (
    <div className='parent' >
      <img className='wheel' src={ LoaderImg } alt="loader" />
    </div>
  )
}