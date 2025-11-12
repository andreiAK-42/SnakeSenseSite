import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Login_pc.css'

function Login() {
  return (
    <><h1>Snake Sense</h1><div class="login-container">
          <h1>Авторизация</h1>
          <div class="horizontal-wall"></div>
          <div class="login-inputs-container">
              <input v-model="login" placeholder="Логин"></input>
              <input v-model="password" placeholder="Пароль" type="password" autocomplete="bday-month"></input>
          </div>
          <div  class="login-button"> 
            <p>Вход</p>
          </div>
      </div>
    </>
  );
}

export default Login;