import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import MyProductItem from "../components/MyProductItem";
import CorbaeLink from "../components/UI/Link/Link";
import Hat from "../components/Hat";
import CartProduct from "../components/CartProduct";
import CorbaeButton from "../components/UI/Button/button";
import CorbaeInput from "../components/UI/Input/Input";
import { Formik, Form, Field } from "formik";
import CorbaeField from "../components/UI/Field/Field";
import * as yup from "yup";

const CartPage = (props) => {
  useEffect((event) => {
    getCartProducts(event);
  }, []);

  const [hasSuccess, setHasSuccess] = useState({
    hasSuccess: "",
  });

  const [hasError, setHasError] = useState({
    hasError: "",
  });

  const [cartProducts, setCartProducts] = useState([]);

  const getCartProducts = async (event) => {
    let response = await axios
      .get(
        "https://localhost:7019/cart/GetCartProductsByUserId?userID=" +
          Cookies.get("userID"),
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("jwt"),
          },
        }
      )
      .then(function (response) {
        setCartProducts(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error),
          setHasError({ ...hasError, hasError: error.response.data.message });
      });
  };

  const makeAnOrder = async (event, adress) => {
    if (cartProducts.length) {
      let response = await axios
        .post(
          "https://localhost:7019/order/MakeAnOrder?userID=" +
            Cookies.get("userID") +
            "&deliveryPlace=" +
            adress
        )
        .then(function (response) {
          setHasSuccess({ ...hasSuccess, hasSuccess: "Заказ создан" });
          setHasError({ ...hasError, hasError: "" });
        })
        .catch(function (error) {
          setHasError({ ...hasError, hasError: error.response.data.message });
          setHasSuccess({ ...hasSuccess, hasSuccess: "" });
        });
    } else {
      setHasError({ ...hasError, hasError: "В корзине нет товаров" });
      setHasSuccess({ ...hasSuccess, hasSuccess: "" });
    }
    getCartProducts();
  };

  const validationSchemaOrder = yup.object().shape({
    adress: yup.string().required("Обязательное поле"),
  });

  return (
    <div>
      <Hat />
      <Formik
        className="wrapper_login"
        initialValues={{
          adress: "",
        }}
        onSubmit={(values) => {
          makeAnOrder(event, values.adress);
        }}
        validationSchema={validationSchemaOrder}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="userpage_wrapper2">
              <h2 className="name">Корзина</h2>
              <div className="name2">
                {errors.adress && touched.adress && (
                  <div className="justify-left_register">{errors.adress}</div>
                )}
                <CorbaeField
                  placeholder="Введите адресс доставки"
                  name="adress"
                ></CorbaeField>
              </div>
              <div className="button10">
                <CorbaeButton className="CBLink" type="submit">
                  Создать заказ
                </CorbaeButton>
              </div>
            </div>
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
            {cartProducts.length ? (
              <div className="product_wrapper">
                {cartProducts.map((product) => (
                  <CartProduct
                    success={{ hasSuccess, setHasSuccess }}
                    error={{ hasError, setHasError }}
                    product={product}
                    func={getCartProducts}
                    key={product.cartProductID}
                  />
                ))}
              </div>
            ) : (
              <div>
                <h2>Тут пока ничего нет!</h2>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CartPage;
