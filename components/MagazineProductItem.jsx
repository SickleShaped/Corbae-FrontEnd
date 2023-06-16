import React from "react";
import "./componentstyles.css";
import axios from "axios";
import CorbaeButton from "./UI/Button/button";
import CorbaeField from "./UI/Field/Field";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useState } from "react";
import CorbaeLink from "./UI/Link/Link";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const MagazineProductItem = (props) => {
  var success = props.success;
  var errors = props.error;

  const [hasError, setHasError] = useState({
    hasError: "",
  });

  const validationSchemaQuantity = yup.object().shape({
    quantityInStock: yup
      .number()
      .required("Обязательное поле")
      .max(1000000, "Количество на складе не должно быть выше 1000000"),
  });

  let navigate = useNavigate();

  const AddToCart = async (event) => {
    let response = await axios
      .post(
        "https://localhost:7019/cart/AddProductToCart?productID=" +
          props.product.productID +
          "&userID=" +
          Cookies.get("userID"),
        {},
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("jwt"),
          },
        }
      )
      .then(function (data) {
        ///console.log(data.response),
        success.setHasSuccess({
          ...success.hasSuccess,
          hasSuccess: "Товар успешно добавлен в корзину",
        });
        errors.setHasError({ ...errors.hasError, hasError: "" });
      })
      .catch(function (error) {
        errors.setHasError({
          ...errors.hasError,
          hasError: error.response.data.message,
        });
        // console.log(error);
        success.setHasSuccess({
          ...success.hasSuccess,
          hasSuccess: "",
        });
      });
  };

  const AddToWish = async (event) => {
    let response = await axios
      .post(
        "https://localhost:7019/wish/AddProductToCart?productID=" +
          props.product.productID +
          "&userID=" +
          Cookies.get("userID"),
        {},
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("jwt"),
          },
        }
      )
      .then(function (data) {
        ///console.log(data.response),
        success.setHasSuccess({
          ...success.hasSuccess,
          hasSuccess: "Товар успешно добавлен в желаемое",
        });
        errors.setHasError({ ...errors.hasError, hasError: "" });
      })
      .catch(function (error) {
        console.log(error),
          errors.setHasError({
            ...error.hasError,
            hasError: error.response.data.message,
          });
        success.setHasSuccess({
          ...success,
          hasSuccess: "",
        });
      });
  };

  return (
    <div className="max">
      {hasError.hasError != "" && (
        <div className="ErrorMessage">
          <h3 id="errortext">{hasError.hasError}</h3>
        </div>
      )}
      <div className="product">
        <div className="wrapper4">
          <div className="title">
            <h2
              style={{
                position: "relative",
                top: "3%",
                left: "1em",
                textAlign: "left",
              }}
            >
              {props.product.name}
            </h2>
          </div>
          <div></div>
          <div className="button4">
            <CorbaeButton
              style={{
                position: "relative",
                top: "10%",
                left: "5%",
              }}
              type="button"
              onClick={() => AddToCart()}
            >
              Добавить в корзину
            </CorbaeButton>
          </div>

          <div className="button2">
            <CorbaeButton
              style={{ position: "relative", top: "10%", left: "5%" }}
              type="button"
              onClick={() => AddToWish()}
            >
              Добавить в желаемое
            </CorbaeButton>
          </div>

          <div className="button3">
            <CorbaeButton
              style={{ position: "relative", top: "10%", left: "5%" }}
              type="button"
              onClick={() =>
                navigate("/productPage/" + props.product.productID)
              }
            >
              Открыть страницу
            </CorbaeButton>
          </div>

          <div className="quantity">
            <h3 style={{ position: "relative", top: "15%", left: "2em" }}>
              В наличии: {props.product.quantityInStock}
            </h3>
          </div>

          <div className="price">
            <h3 style={{ position: "relative", top: "15%", left: "2em" }}>
              Цена: {props.product.price}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagazineProductItem;
