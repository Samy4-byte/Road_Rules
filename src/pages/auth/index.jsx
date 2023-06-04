import React, { useState } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';


export const RegistrationPage = () => {
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate()
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
const handleSubmit = async (event) => {
  event.preventDefault();
  let nameIsValid = true;
  let passwordIsValid = true;
  if (username.length < 3) {
    setNameError('Имя пользователя должно содержать не менее 3 символов');
    nameIsValid = false;
  } else {
    setNameError('');
  }
  if (password.length < 5) {
    setPasswordError('Пароль должен содержать не менее 5 символов');
    passwordIsValid = false;
  } else {
    setPasswordError('');
  }
  if (nameIsValid && passwordIsValid) {
    setLoading(true)
    const response = await fetch('http://16.16.143.176//api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        password2: confirmPassword,
        email
      })
    });
    const data = await response.json()
    setLoading(false)
    if (response.ok) {
      // регистрация прошла успешно
      console.log('Регистрация прошла успешно!');
      localStorage.setItem('token', data.token)
      localStorage.setItem('name', data.username)

      navigate('/')
    } else {
      // обработка ошибок
      const errorResponse = await response.json();
      console.log(`Произошла ошибка при регистрации: ${errorResponse.error}`);
    }
  }
};
  return (
    <form className="container2" onSubmit={handleSubmit}>
      <h4 className="auth1">Регистрация</h4>
      <input
        className="block1"
        type="text"
        placeholder="Имя пользователя"
        id="name"
        value={username}
        onChange={handleNameChange}
      />
      {nameError && <div style={{ color: '#A10505' }}>{nameError}</div>}
      <input
        className="block1"
        type="password"
        placeholder="Пароль"
        id="password"
        value={password}
        onChange={handlePasswordChange}
      />
      {passwordError && <div style={{ color: '#A10505' }}>{passwordError}</div>}
      <input
        className="block1"
        type="password"
        placeholder="Повторить пароль"
        id="confirmPassword"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      <input
        className="block1"
        type="Email"
        placeholder="Email"
        id="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <button className="enter" type="submit">
        Зарегистрироваться
      </button>
      {loading && 'Loading'}
      <p className="auth1-p">
        Уже есть аккаунт?
        <Link className="registr" to="/login">
           Войти
        </Link>
      </p>
    </form>
  );
};