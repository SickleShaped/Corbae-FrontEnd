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

const CreateProductPage = () => {
  const validationSchemaProduct = yup.object().shape({
    name: yup.string().required("Обязательное поле"),
    description: yup.string().required("Обязательное поле"),
    price: yup
      .number()
      .required("Обязательное поле")
      .min(1, "Цена товара не должна быть нулевой или отрицательной")
      .max(1000000, "Цена не должна быть выше 1000000"),
    quantityInStock: yup
      .number()
      .required("Обязательное поле")
      .max(1000000, "Количество на складе не должно быть выше 1000000"),
    category: yup.string(),
  });

  const createproduct = async (
    event,
    piname,
    pidescription,
    piprice,
    piquantityinstock,
    picategory
  ) => {
    event.preventDefault();

    let response = await axiosprotect
      .post(
        "https://localhost:7019/product/Create?userid=" + Cookies.get("userID"),
        {
          name: piname,
          description: pidescription,
          price: piprice,
          quantityInStock: piquantityinstock,
          category: picategory,
        }
      )
      .then(function (data) {
        ///console.log(data.response),
        setHasError({ ...hasError, hasError: "" }),
          setHasSuccess({
            ...hasSuccess,
            hasSuccess: "Товар успешно создан!",
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
        name: "",
        description: "",
        price: 0,
        quantityInStock: 0,
        category: "",
      }}
      onSubmit={(values) => {
        createproduct(
          event,
          values.name,
          values.description,
          values.price,
          values.quantityInStock,
          values.category
        );
      }}
      validationSchema={validationSchemaProduct}
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
          {hasSuccess.hasSuccess != "" && (
            <div className="SuccessMessage">
              <h3 className="marginforerrors" id="successtext">
                {hasSuccess.hasSuccess}
              </h3>
            </div>
          )}
          <h2>Создать товар</h2>
          <div className="AtRight">
            <fieldset>
              <legend>Введите данные товара</legend>

              <CorbaeField
                placeholder="Название товара (обязательно)"
                name="name"
              ></CorbaeField>
              {errors.name && touched.name && <div>{errors.name}</div>}

              <CorbaeField
                placeholder="Описание товара (обязательно)"
                name="description"
              ></CorbaeField>
              {errors.description && touched.description && (
                <div>{errors.description}</div>
              )}

              <CorbaeField
                placeholder="Стоимость товара в рублях (обязательно)"
                name="price"
                type="number"
              ></CorbaeField>
              {errors.price && touched.price && <div>{errors.price}</div>}

              <CorbaeField
                placeholder="Количество товара на складе (обязательно)"
                name="quantityInStock"
                type="number"
              ></CorbaeField>
              {errors.quantityInStock && touched.quantityInStock && (
                <div>{errors.quantityInStock}</div>
              )}

              <CorbaeField
                placeholder="Категория товара"
                name="category"
              ></CorbaeField>
              {errors.category && touched.category && (
                <div>{errors.category}</div>
              )}
            </fieldset>
          </div>
          <CorbaeButton type="submit">Создать товар</CorbaeButton>
        </Form>
      )}
    </Formik>
  );
};

export default CreateProductPage;
