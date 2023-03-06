import React from "react";
import CorbaeButton from "../components/UI/Button/button";
import CorbaeLink from "../components/UI/Link/Link.jsx";
import "../components/Ui/Link/Link.css";

const StartPage = () => {
  return (
    <div>
      <h1>CORBAE</h1>
      <CorbaeLink className="CBLink" to="/login">
        Войти
      </CorbaeLink>
      <h3>Или</h3>
      <CorbaeLink className="CBLink" to="/register">
        Зарегестрироваться
      </CorbaeLink>
    </div>
  );
};

export default StartPage;
