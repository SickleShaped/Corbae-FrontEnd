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

const MyProductItem = (props) => {
  var fun = props.func;

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

  const deleteproduct = async (event) => {
    let response = await axios
      .delete(
        "https://localhost:7019/product/Delete?productID=" +
          props.product.productID,
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("jwt"),
          },
        }
      )
      .catch(function (error) {
        console.log(error),
          setHasError({ ...hasError, hasError: error.response.data.message });
      });
    fun();
  };

  return (
    <div className="max">
      <Formik
        initialValues={{
          quantityInStock: 10,
        }}
        onSubmit={(values) => {
          editQuantityInStock(event, values.quantityInStock);
        }}
        validationSchema={validationSchemaQuantity}
      >
        {({ errors, touched }) => (
          <Form>
            {hasError.hasError != "" && (
              <div className="ErrorMessage">
                <h3 id="errortext">{hasError.hasError}</h3>
              </div>
            )}
            <div className="product">
              <div className="wrapper3">
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
                <div className="button1">
                  <CorbaeButton
                    style={{
                      position: "relative",
                      top: "10%",
                      left: "5%",
                    }}
                    type="button"
                    onClick={() =>
                      navigate("/editproduct/" + props.product.productID)
                    }
                  >
                    Изменить
                  </CorbaeButton>
                </div>

                <div className="button2">
                  <CorbaeButton
                    style={{ position: "relative", top: "10%", left: "5%" }}
                    type="button"
                    onClick={() => deleteproduct()}
                  >
                    Удалить
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MyProductItem;

/*
<div className="wrapper2">
  <div></div>
  <h2>{props.product.name}</h2>
  <div>
    <div>
      <div className="product--content">
        <h3>{props.product.description}</h3>
      </div>
      <div>
        <CorbaeButton>Изменить</CorbaeButton>
        <CorbaeButton>Удалить</CorbaeButton>
      </div>
      <div>
        
        {errors.quantityInStock && touched.quantityInStock && (
          <div>{errors.quantityInStock}</div>
        )}

        
        <CorbaeButton type="submit">Изменить</CorbaeButton>
      </div>
    </div>
  </div>
</div>;
*/
