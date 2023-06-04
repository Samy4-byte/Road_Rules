import React from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import axios from 'axios';


const InputWithError = ({ errorMessage, id, type, placeholder, value, onChange }) => {
  return (
    <>
      <input
        className="block1"
        type={type}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
      />
      {errorMessage && <p style={{ color: 'red', marginBottom: 0, fontSize: '14px' }}>{errorMessage}</p>}
    </>
  )
}

export const AuthorizationPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setUsernameError('')
    setPasswordError('')
    if (!username) {
      setUsernameError('Введите логин')
      return
    }
    if (!password) {
      setPasswordError('Введите пароль')
      return
    }
    axios.post('http://16.16.143.176/api/auth_token/', {
      username, password
    })
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('name', res.data.username)

        if (res.data.username === 'admin') {
          navigate('/admin')
        }else {
          navigate('/')
        }
      })
      .catch(err => {
        setUsernameError('Такого пользователя не существует')
        setPasswordError('Неправильный пароль')
      })
  }

  return (
    <form className="container">
      <h4 className='auth1' >Вход</h4>
      <InputWithError
        errorMessage={usernameError}
        id="name"
        type="text"
        placeholder="Логин"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputWithError
        errorMessage={passwordError}
        id="password"
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='enter' onClick={handleLogin}>Войти</button>
      <p className='auth1-p' >Нет аккаунта? <Link className='registr' to="/auth">Зарегистрируйся</Link></p>
    </form>
  );
}
