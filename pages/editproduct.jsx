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
import { useParams } from "react-router-dom";

const EditProductPage = () => {
  const params = useParams();

  useEffect((event) => {
    getProduct(event, params.id);
  }, []);

  const [product, setProduct] = useState({
    productID: "",
    name: "",
    description: "",
    price: "",
    quantityInStock: 0,
    category: "string",
    userID: "",
  });

  const validationSchemaProduct = yup.object().shape({
    name: yup.string(),
    description: yup.string(),
    price: yup
      .number()
      .min(1, "Цена товара не должна быть нулевой или отрицательной")
      .max(1000000, "Цена не должна быть выше 1000000"),
    category: yup.string(),
  });

  const validationSchemaquantity = yup.object().shape({
    quantityInStock: yup
      .number()
      .required("Обязательное поле")
      .max(1000000, "Количество на складе не должно быть выше 1000000"),
  });

  const editproduct = async (
    event,
    piname,
    pidescription,
    piprice,
    picategory
  ) => {
    event.preventDefault();

    let editname = "";
    let editdecription = "";
    let editprice = "";
    let editcategory = "";

    if (
      (piname == "") &
      (pidescription == "") &
      (piprice == "") &
      (picategory == "")
    ) {
      setHasError({
        ...hasError,
        hasError: "Ни одно поле не подлежит изменению",
      }),
        setHasSuccess({ ...hasSuccess, hasSuccess: "" });
    } else {
      if (piname == null || piname == "") {
        editname = product.name;
      } else {
        editname = piname;
      }

      if (pidescription == null || pidescription == "") {
        editdecription = product.description;
      } else {
        editdecription = pidescription;
      }

      if (piprice == null || piprice == "") {
        editprice = product.price;
      } else {
        editprice = piprice;
      }

      if (picategory == null || picategory == "") {
        editcategory = product.category;
      } else {
        editcategory = picategory;
      }

      let response = await axiosprotect
        .put("https://localhost:7019/Product/Edit?productID=" + params.id, {
          name: editname,
          category: editcategory,
          description: editdecription,
          price: editprice,
        })
        .then(function (data) {
          ///console.log(data.response),
          setHasError({ ...hasError, hasError: "" }),
            setHasSuccess({
              ...hasSuccess,
              hasSuccess: "Товар успешно изменен!",
            });
        })
        .catch(function (error) {
          //console.log(error.response.data.message),
          setHasError({ ...hasError, hasError: error.response.data.message }),
            setHasSuccess({ ...hasSuccess, hasSuccess: "" });
        });
    }
  };

  const editquantity = async (event, piquantityinstock) => {
    event.preventDefault();

    let response = await axiosprotect
      .put(
        "https://localhost:7019/product/EditQuantityInStock?productID=" +
          params.id +
          "&qantityInStock=" +
          piquantityinstock
      )
      .then(function (data) {
        ///console.log(data.response),
        setHasError({ ...hasError, hasError: "" }),
          setHasSuccess({
            ...hasSuccess,
            hasSuccess: "Количество товара успешно изменено!",
          });
      })
      .catch(function (error) {
        //console.log(error.response.data.message),
        setHasError({ ...hasError, hasError: error.response.data.message }),
          setHasSuccess({ ...hasSuccess, hasSuccess: "" });
      });
  };

  const getProduct = async (event, id) => {
    let response = await axios
      .get("https://localhost:7019/product/GetByID?productId=" + id, {
        headers: {
          Authorization: "Bearer " + Cookies.get("jwt"),
        },
      })
      .then(function (data) {
        ///console.log(data.response),
        setHasError({ ...hasError, hasError: "" });
        setProduct({
          ...product,
          category: data.data.email,
          name: data.data.name,
          price: data.data.price,
          productID: data.data.productID,
          userID: data.data.userID,
          quantityInStock: data.data.quantityInStock,
        });
      })
      .catch(function (error) {
        console.log(error),
          setHasError({ ...hasError, hasError: error.response.data.message });
      });
  };

  const [hasSuccess, setHasSuccess] = useState({
    hasSuccess: "",
  });

  const [hasError, setHasError] = useState({
    hasError: "",
  });

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          description: "",
          price: "",
          quantityInStock: 0,
          category: "",
        }}
        onSubmit={(values) => {
          editproduct(
            event,
            values.name,
            values.description,
            values.price,
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
            <h2>Изменить товар {product.name}</h2>
            <div className="AtRight">
              <fieldset className="fieldset_register">
                <legend className="justify-left_login">
                  Введите данные товара. Поля что не нужно изменять оставьте
                  пустыми
                </legend>

                {errors.name && touched.name && (
                  <div className="marginforerrors">{errors.name}</div>
                )}
                <CorbaeField
                  placeholder="Название товара"
                  name="name"
                ></CorbaeField>

                {errors.description && touched.description && (
                  <div className="marginforerrors">{errors.description}</div>
                )}
                <CorbaeField
                  placeholder="Описание товара"
                  name="description"
                ></CorbaeField>

                {errors.price && touched.price && (
                  <div className="marginforerrors">{errors.price}</div>
                )}
                <CorbaeField
                  placeholder="Стоимость товара в рублях"
                  name="price"
                  type="number"
                ></CorbaeField>

                {errors.category && touched.category && (
                  <div className="marginforerrors">{errors.category}</div>
                )}
                <CorbaeField
                  placeholder="Категория товара"
                  name="category"
                ></CorbaeField>
              </fieldset>
            </div>
            <CorbaeButton type="submit">Изменить</CorbaeButton>
          </Form>
        )}
      </Formik>

      <Formik
        initialValues={{
          quantityInStock: "",
        }}
        onSubmit={(values) => {
          editquantity(event, values.quantityInStock);
        }}
        validationSchema={validationSchemaquantity}
      >
        {({ errors, touched }) => (
          <Form>
            <h2>Изменить количество на складе {}</h2>
            <div className="AtRight">
              <fieldset className="fieldset_register">
                <legend className="justify-left_login"></legend>
                {errors.quantityInStock && touched.quantityInStock && (
                  <div className="marginforerrors">
                    {errors.quantityInStock}
                  </div>
                )}
                <CorbaeField
                  placeholder="Количество товара на складе"
                  name="quantityInStock"
                  type="number"
                ></CorbaeField>
              </fieldset>
            </div>
            <CorbaeButton type="submit">Изменить количество</CorbaeButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProductPage;
