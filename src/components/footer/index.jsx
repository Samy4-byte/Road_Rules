import './footer.module.css'
import Style from './footer.module.css'
import { Link } from "react-router-dom";
import LogoSvg from '../../img/logo.png'


const Footer = () => {
  return (
    <div className={Style.footer}>
      <Link to="/">
        <img className={Style.logo} src={LogoSvg} alt="logotype" />
      </Link>
      <p className={Style.text}>2023 "Road Room". Все права защищены.</p>
    </div>
  )
}
export default Footer