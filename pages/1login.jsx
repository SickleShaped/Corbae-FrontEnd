import CorbaeButton from "../components/UI/Button/button";
import CorbaeLink from "../components/UI/Link/Link.jsx";
import CorbaeInput from "../components/UI/Input/Input";
import "../components/Ui/Link/Link.css";
import React, { useState } from "react";
import * as yup from "yup";
import "../components/Ui/Link/Link.css";
import "./pagestyles.css";
import UserService from "../API/UserService";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import CorbaeField from "../components/UI/Field/Field";
import Cookies from "js-cookie";
import { Component } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  var prop = props.value;
  const navigate = useNavigate();

  const login = async (event, piemail, pipassword) => {
    event.preventDefault();

    let response = await axios
      .get(
        "https://localhost:7019/auth/Login?email=" +
          piemail +
          "&password=" +
          pipassword,
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("jwt"),
          },
        }
      )
      .then(function (response) {
        Cookies.set("jwt", response.data.jwt, {
          expires: 29,
          secure: true,
          sameSite: "none",
        }),
          Cookies.set("userID", response.data.userId, {
            expires: 29,
            secure: true,
            sameSite: "none",
          }),
          prop.setAuth(true),
          navigate("/magazine");
      })
      .catch(function (error) {
        console.log(error.response.data),
          setHasError({ ...hasError, hasError: error.response.data.message });
      });
  };

  const [hasError, setHasError] = useState({
    hasError: "",
  });

  //const [auth, setAuth] = useState(false);

  const validationSchemaLogin = yup.object().shape({
    email: yup
      .string()
      .required("Обязательное поле")
      .email("Недействительный адрес почты"),
    password: yup.string().required("Обязательное поле"),
  });

  return (
    <Formik
      className="wrapper_login"
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => {
        login(event, values.email, values.password);
      }}
      validationSchema={validationSchemaLogin}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <h1>CORBAE</h1>
            {hasError.hasError != "" && (
              <div className="ErrorMessage">
                <h3 className="marginforerrors" id="errortext">
                  {hasError.hasError}
                </h3>
              </div>
            )}
            <div>
              <h2 className="AtCenter">Войти в аккаунт</h2>
              <fieldset className="margin_login">
                <legend className="justify-left_login">
                  Введите данные пользователя
                </legend>
                {errors.email && touched.email && (
                  <div className="justify-left_register">{errors.email}</div>
                )}
                <CorbaeField
                  placeholder="Ваша почта"
                  name="email"
                ></CorbaeField>
                {errors.password && touched.password && (
                  <div className="justify-left_register">{errors.password}</div>
                )}
                <CorbaeField
                  placeholder="Введите пароль (обязательно)"
                  name="password"
                  type="password"
                ></CorbaeField>
              </fieldset>
            </div>

            <div className="justify-right_login">
              <CorbaeButton type="submit">Войти</CorbaeButton>
              <div className="registermargin_login">
                <h3>Нет аккаунта?</h3>
                <CorbaeLink className="CBLink" to="/register">
                  Зарегестрироваться
                </CorbaeLink>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginPage;
