import Style from './header.module.css'
import { Link, NavLink, useNavigate } from "react-router-dom";
import LogoSvg from '../../img/logo.png'
import { useState, useRef, useEffect } from 'react'

const links = [
  {
    id: 1,
    text: 'Главная',
    route: '/'
  },
  {
    id: 2,
    text: 'Пройти тест',
    route: '/test'
  },
]
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const name = localStorage.getItem('name')
  console.log(name);
  const navRef = useRef(null)
  const navigate = useNavigate()
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [navRef])
  const toggleMenu = (e) => {
    setMenuOpen(!menuOpen)
  }


  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <>
      <div className={Style.header_wrapper}>
        <Link to="/">
          <img className={Style.logo} src={LogoSvg} alt="logotype" />
        </Link>


        <nav ref={navRef} className={`${Style.nav} ${menuOpen ? Style.active : ''}`}>
          {
            links.map((link) => (
              <NavLink className={Style.link} key={link.id} to={link.route} onClick={toggleMenu}>
                {link.text}
              </NavLink>
            ))
          }
          <a className={Style.pdd} href="/PDD_KR2021.pdf">ПДД КР </a>
          {
            localStorage.getItem('token')
              ? (
                <div className={Style.enterLogout}>
                  <Link to='/profile'>
                    <button className={Style.enter}>{name}</button>
                  </Link>
                  <button onClick={handleLogout} className={Style.enter}>Выйти</button>
                </div>
              ) : (
                <Link to='/login'>
                  <button className={Style.enter1}>Войти</button>
                </Link>
              )
          }
        </nav>
        <button className={`${Style.burger} ${menuOpen ? Style.active : ''}`} onClick={toggleMenu}>
          <span className={Style.line}></span>
          <span className={Style.line}></span>
          <span className={Style.line}></span>
        </button>
      </div>
    </>
  )
}
export default Header