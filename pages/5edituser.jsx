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
import Cookies from "js-cookie";
import axiosprotect from "../hooks/Axios";
import Hat from "../components/Hat";

const EditUserPage = () => {
  useEffect((event) => {
    getuser(event);
  }, []);

  const [user, setUser] = useState({
    adress: "",
    company: "",
    emailadress: "fff",
    isAdmin: false,
    isSeller: false,
    money: 0,
    name: "",
    phoneNumber: "",
  });

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

  const validationSchemaUser = yup.object().shape({
    email: yup.string().email("Недействительный адрес почты"),
    name: yup.string(),
    password: yup.string().min(8, "Слишком короткий пароль"),
    company: yup.string(),
    adress: yup.string(),
    phoneNumber: yup.string(),
  });

  const edituser = async (
    event,
    piemail,
    piname,
    picompany,
    piadress,
    piphoneNumber
  ) => {
    event.preventDefault();

    let editEmail = "";
    let editName = "";
    let editCompany = "";
    let editAdress = "";
    let editPhoneNumber = "";
    if (piemail == null || piemail == "") {
      editEmail = user.emailadress;
    } else {
      editEmail = piemail;
    }
    if (piname == null || piname == "") {
      editName = user.name;
    } else {
      editName = piname;
    }
    if (picompany == null || picompany == "") {
      editCompany = user.company;
    } else {
      editCompany = picompany;
    }
    if (piadress == null || piadress == "") {
      editAdress = user.adress;
    } else {
      editAdress = piadress;
    }
    if (piphoneNumber == null || piphoneNumber == "") {
      editPhoneNumber = user.phoneNumber;
    } else {
      editPhoneNumber = piphoneNumber;
    }

    let response = await axiosprotect
      .put("https://localhost:7019/user/EditUser?id=" + Cookies.get("userID"), {
        email: editEmail,
        name: editName,
        company: editCompany,
        adress: editAdress,
        phoneNumber: editPhoneNumber,
      })
      .then(function (data) {
        ///console.log(data.response),
        setHasError({ ...hasError, hasError: "" }),
          setHasSuccess({
            ...hasSuccess,
            hasSuccess: "Пользователь успешно изменен!",
          });
      })
      .catch(function (error) {
        //console.log(error.response.data.message),
        setHasError({ ...hasError, hasError: error.response.data.message }),
          setHasSuccess({ ...hasSuccess, hasSuccess: "" });
      });
  };

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
        name: "",
        company: "",
        adress: "",
        phoneNumber: "",
      }}
      onSubmit={(values) => {
        edituser(
          event,
          values.email,
          values.name,
          values.company,
          values.adress,
          values.phoneNumber
        );
      }}
      validationSchema={validationSchemaUser}
    >
      {({ errors, touched }) => (
        <Form>
          <Hat />
          {hasError.hasError != "" && (
            <div className="ErrorMessage">
              <h3 id="errortext">{hasError.hasError}</h3>
            </div>
          )}
          {hasSuccess.hasSuccess != "" && (
            <div className="SuccessMessage">
              <h3 id="successtext">{hasSuccess.hasSuccess}</h3>
            </div>
          )}
          <h2>Редактировать пользователя</h2>
          <h3>Те поля, которые вы не желаете изменять - оставить пустыми</h3>
          <div className="AtRight">
            <fieldset>
              <legend>Введите данные пользователя</legend>
              <CorbaeField name="email" placeholder="Ваша почта"></CorbaeField>
              {errors.email && touched.email && <div>{errors.email}</div>}

              <CorbaeField placeholder="Ваше имя" name="name"></CorbaeField>
              {errors.name && touched.name && <div>{errors.name}</div>}

              <CorbaeField placeholder="Ваш адрес" name="adress"></CorbaeField>
              {errors.adress && touched.adress && <div>{errors.adress}</div>}

              <CorbaeField
                placeholder="Ваш номер телефона"
                name="phoneNumber"
              ></CorbaeField>
              {errors.phoneNumber && touched.phoneNumber && (
                <div>{errors.phoneNumber}</div>
              )}

              <CorbaeField
                placeholder="Ваше место работы"
                name="company"
              ></CorbaeField>
              {errors.company && touched.company && <div>{errors.company}</div>}
            </fieldset>
          </div>
          <CorbaeButton type="submit">Принять изменения</CorbaeButton>
        </Form>
      )}
    </Formik>
  );
};

export default EditUserPage;
