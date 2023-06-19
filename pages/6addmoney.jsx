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
import Cookies from "js-cookie";
import axiosprotect from "../hooks/Axios";
import Hat from "../components/Hat";

const AddMoneyPage = () => {
  const validationSchemaLogin = yup.object().shape({
    almount: yup
      .number()
      .max(100000, "Сумма не должна превышать 100000 рублей")
      .min(10, "Минимальная сумма пополнения должна быть 10 рублей")
      .required("Обязательное поле"),
  });

  const addMoney = async (event, almount) => {
    event.preventDefault();

    const bearer = "Bearer " + Cookies.get("jwt");

    let headers = {
      "Content-Type": "application/json",
      Authorization: bearer,
    };

    let response = await axiosprotect
      .put(
        "https://localhost:7019/user/AddMoney?id=" +
          Cookies.get("userID") +
          "&almount=" +
          almount
      )
      .then(function (data) {
        ///console.log(data.response),
        setHasError({ ...hasError, hasError: "" }),
          setHasSuccess({
            ...hasSuccess,
            hasSuccess: "Деньги зачислены!",
          });
      })
      .catch(function (error) {
        //console.log(error.response.data.message),
        setHasError({ ...hasError, hasError: error.response }),
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
        almount: "",
      }}
      onSubmit={(values) => {
        addMoney(event, values.almount);
      }}
      validationSchema={validationSchemaLogin}
    >
      {({ errors, touched }) => (
        <Form>
          <Hat />
          {hasError.hasError != "" && (
            <div className="ErrorMessage">
              <h3 className="marginforerrors" id="errortext">{hasError.hasError}</h3>
            </div>
          )}
          {hasSuccess.hasSuccess != "" && (
            <div className="SuccessMessage">
              <h3 className="marginforerrors" id="successtext">{hasSuccess.hasSuccess}</h3>
            </div>
          )}
          <h2>Внести деньги</h2>
          <div className="AtRight">
            <fieldset>
              <CorbaeField
                name="almount"
                type="number"
                placeholder="Введите сумму пополнения"
              ></CorbaeField>
              {errors.almount && touched.almount && <div>{errors.almount}</div>}
            </fieldset>
          </div>
          <CorbaeButton type="submit">Пополнить счет</CorbaeButton>
        </Form>
      )}
    </Formik>
  );
};

export default AddMoneyPage;
