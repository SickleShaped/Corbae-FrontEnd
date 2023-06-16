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
import { useEffect } from "react";
import Hat from "../components/Hat";

const UserPage = (props) => {
  var prop = props.value;

  const navigate = useNavigate();

  const logout = async (event) => {
    event.preventDefault();
    Cookies.remove("jwt");
    Cookies.remove("userID");
    prop.setAuth(false);
    navigate("/login");
  };

  const [hasError, setHasError] = useState({
    hasError: "",
  });

  const [tryDelete, setTryDelete] = useState({
    tried: false,
  });

  const [user, setUser] = useState({
    adress: "",
    company: "",
    emailadress: "email@example.com",
    isAdmin: false,
    isSeller: false,
    money: 0,
    name: "",
    phoneNumber: "",
  });

  useEffect((event) => {
    getuser(event);
  }, []);

  const getuser = async (event) => {
    let response = await axios
      .get(
        "https://localhost:7019/user/GetUserByID?userId=" +
          Cookies.get("userID"),
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("jwt"),
          },
        }
      )
      .then(function (response) {
        setUser({
          ...user,
          emailadress: response.data.email,
          name: response.data.name,
          adress: response.data.adress,
          isSeller: response.data.isSeller,
          money: response.data.money,
          phoneNumber: response.data.phoneNumber,
        });
      })
      .catch(function (error) {
        console.log(error.response.data),
          setHasError({ ...hasError, hasError: error.response.data.message });
      });
  };

  const deleteuser = async (event) => {
    navigate("/login");
    let response = await axios
      .delete(
        "https://localhost:7019/user/DeleteUser?id=" + Cookies.get("userID"),
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("jwt"),
          },
        }
      )
      .then(function (response) {
        logout(event);
      })
      .catch(function (error) {
        console.log(error.response.data),
          setHasError({ ...hasError, hasError: error.response.data.message });
      });
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          logout(event);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Hat />
            {hasError.hasError != "" && (
              <div className="ErrorMessage">
                <h3 className="marginforerrors" id="errortext">
                  {hasError.hasError}
                </h3>
              </div>
            )}
            <div className="userpage_wrapper">
              <div className="AtRight">
                <h2>Ваша страница, {user.name}</h2>
                <h3>{user.emailadress}</h3>
              </div>
              <div>
                <div className="AtLeft">
                  <CorbaeLink className="CBLink" to="/orders">
                    Заказы
                  </CorbaeLink>
                </div>

                <div className="AtLeft">
                  <CorbaeLink className="CBLink" to="/wish">
                    Желаемое
                  </CorbaeLink>
                </div>
              </div>

              <div className="AtRight">
                <h3>Баланс: {user.money} руб.</h3>
                <CorbaeLink className="CBLink" to="/addmoney">
                  Пополнить счет
                </CorbaeLink>
                <CorbaeLink className="CBLink" to="/reducemoney">
                  Списать деньги
                </CorbaeLink>
              </div>
            </div>
            <div>
              <div className="marginnext">
                <div className="AtLeft">
                  <CorbaeLink className="CBLink" to="/edituser">
                    Изменить данные пользователя
                  </CorbaeLink>
                </div>

                <div className="AtLeft">
                  {user.isSeller == true && (
                    <div>
                      <CorbaeLink className="CBLink" to="/myproducts">
                        Мои товары
                      </CorbaeLink>
                    </div>
                  )}
                </div>
              </div>
              <div className="marginnext2">
                <div className="atReallyRight">
                  <CorbaeButton type="submit">Выйти из аккаунта</CorbaeButton>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Formik
        initialValues={{}}
        onSubmit={() => {
          deleteuser(event);
        }}
      >
        {({ errors, touched }) => (
          <Form className="marginnext2">
            <div className="atReallyRight">
              <CorbaeButton type="submit">Удалить аккаунт</CorbaeButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserPage;
