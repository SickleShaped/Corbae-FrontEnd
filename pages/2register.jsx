import React, { useState } from "react";
import * as yup from "yup";
import CorbaeButton from "../components/UI/Button/button";
import CorbaeLink from "../components/UI/Link/Link.jsx";
import "../components/Ui/Link/Link.css";
import CorbaeInput from "../components/UI/Input/Input";
import "./pagestyles.css";
import UserService from "../API/UserService";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import CorbaeField from "../components/UI/Field/Field";
import { useEffect } from "react";

const Register = () => {
  const validationSchemaUser = yup.object().shape({
    email: yup
      .string()
      .required("Обязательное поле")
      .email("Недействительный адрес почты"),
    name: yup.string().required("Обязательное поле"),
    password: yup
      .string()
      .required("Обязательное поле")
      .min(8, "Слишком короткий пароль"),
    duplicatepassword: yup
      .string()
      .required("Обязательное поле")
      .oneOf([yup.ref("password")], "Пароли не совпадают"),
    company: yup.string(),
    adress: yup.string(),
    phoneNumber: yup.string(),
  });

  const login = async (
    event,
    piemail,
    pipassword,
    piname,
    picompany,
    piadress,
    piphoneNumber,
    piisSaller
  ) => {
    event.preventDefault();

    let response = await axios
      .post("https://localhost:7019/user/CreateUser", {
        email: piemail,
        password: pipassword,
        name: piname,
        company: picompany,
        adress: piadress,
        phoneNumber: piphoneNumber,
        isSeller: piisSaller,
      })
      .then(function (data) {
        ///console.log(data.response),
        setHasError({ ...hasError, hasError: "" }),
          setHasSuccess({
            ...hasSuccess,
            hasSuccess: "Пользователь успешно создан!",
          });
      })
      .catch(function (error) {
        //console.log(error.response.data.message),
        setHasError({ ...hasError, hasError: error.response.data.message }),
          setHasSuccess({ ...hasSuccess, hasSuccess: "" });
      });
  };

  const [seller, setSeller] = useState({
    isSaller: false,
  });

  const [hasSuccess, setHasSuccess] = useState({
    hasSuccess: "",
  });

  const [hasError, setHasError] = useState({
    hasError: "",
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        duplicatepassword: "",
        name: "",
        company: "",
        adress: "",
        phoneNumber: "",
        isSaller: "",
      }}
      onSubmit={(values) => {
        login(
          event,
          values.email,
          values.password,
          values.name,
          values.company,
          values.adress,
          values.phoneNumber,
          seller.isSaller
        );
      }}
      validationSchema={validationSchemaUser}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="atCenter_register">
            <h1>Зарегистрироваться</h1>
            {hasError.hasError != "" && (
              <div className="ErrorMessage">
                <h3 className="marginforerrors" id="errortext">
                  {hasError.hasError}
                </h3>
              </div>
            )}
            {hasSuccess.hasSuccess != "" && (
              <div className="SuccessMessage">
                <h3 className="marginforerrors" id="successtext">
                  {hasSuccess.hasSuccess}
                </h3>
              </div>
            )}
            <div className="AtCenter">
              <div className="AtCenter">
                <fieldset className="fieldset_register">
                  <legend className="justify-left_login">
                    Введите данные пользователя
                  </legend>
                  {errors.email && touched.email && (
                    <div className="justify-left_register">{errors.email}</div>
                  )}
                  <CorbaeField
                    name="email"
                    placeholder="Ваша почта (обязательно)"
                  ></CorbaeField>

                  {errors.name && touched.name && (
                    <div className="justify-left_register">{errors.name}</div>
                  )}
                  <CorbaeField
                    placeholder="Ваше имя (обязательно)"
                    name="name"
                  ></CorbaeField>

                  {errors.password && touched.password && (
                    <div className="justify-left_register">
                      {errors.password}
                    </div>
                  )}
                  <CorbaeField
                    placeholder="Введите пароль (обязательно)"
                    name="password"
                  ></CorbaeField>

                  {errors.duplicatepassword && touched.duplicatepassword && (
                    <div className="justify-left_register">
                      {errors.duplicatepassword}
                    </div>
                  )}
                  <CorbaeField
                    placeholder="Повторите пароль (обязательно)"
                    name="duplicatepassword"
                  ></CorbaeField>

                  {errors.adress && touched.adress && (
                    <div className="justify-left_register">{errors.adress}</div>
                  )}
                  <CorbaeField
                    placeholder="Ваш адрес"
                    name="adress"
                  ></CorbaeField>

                  {errors.phoneNumber && touched.phoneNumber && (
                    <div className="justify-left_register">
                      {errors.phoneNumber}
                    </div>
                  )}
                  <CorbaeField
                    placeholder="Ваш номер телефона"
                    name="phoneNumber"
                  ></CorbaeField>

                  {errors.company && touched.company && (
                    <div className="justify-left_register">
                      {errors.company}
                    </div>
                  )}
                  <CorbaeField
                    placeholder="Ваше место работы"
                    name="company"
                  ></CorbaeField>

                  <div className="justify-left_register">
                    <input
                      type="checkbox"
                      id="isSaller"
                      name="isSaller"
                      onChange={(e) =>
                        setSeller({ ...seller, isSaller: e.target.checked })
                      }
                    />
                    <label>Продавец</label>
                  </div>
                </fieldset>
              </div>
            </div>
            <CorbaeButton type="submit">Создать аккаунт</CorbaeButton>

            <div className="registermargin_login">
              <h2> Уже есть аккаунт?</h2>
              <CorbaeLink className="CBLink" to="/login">
                Войти
              </CorbaeLink>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
