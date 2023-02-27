import React from "react";
import CorbaeButton from "../components/UI/Button/button";
import CorbaeLink from "../components/UI/Link/Link.jsx";
import "../components/Ui/Link/Link.css";
import CorbaeInput from "../components/UI/Input/Input";
import "./pagestyles.css";

const Register = () => {
  return (
    <div>
      <h1>Зарегестрироваться</h1>
      <div className="AtRight">
        <CorbaeInput placeholder="Ваша почта (обязательно)"></CorbaeInput>
        <CorbaeInput placeholder="Ваше имя (обязательно)"></CorbaeInput>
        <CorbaeInput placeholder="Введите пароль (обязательно)"></CorbaeInput>
        <CorbaeInput placeholder="Повторите пароль (обязательно)"></CorbaeInput>
        <CorbaeInput placeholder="Ваш адресс"></CorbaeInput>
        <CorbaeInput placeholder="Ваш номер телефона"></CorbaeInput>
        <CorbaeInput placeholder="Ваше место работы"></CorbaeInput>
      </div>
      <CorbaeButton>Создать аккаунт</CorbaeButton>
      <h2> Уже есть аккаунт?</h2>
      <CorbaeLink className="CBLink" to="/login">
        Войти
      </CorbaeLink>
    </div>
  );
};

export default Register;
