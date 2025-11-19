import React from 'react';
import './styles/Login_pc.css'

function Login() {
  return (
    <><h1>Snake Sense</h1><div className="login-container">
          <h1>Авторизация</h1>
          <div className="horizontal-wall"></div>
          <div className="login-inputs-container">
              <input placeholder="Логин"></input>
              <input placeholder="Пароль" type="password" autoComplete="bday-month"></input>
          </div>
          <div className="login-button"> 
            <p>Вход</p>
          </div>
      </div>
    </>
  );
}

export default Login;