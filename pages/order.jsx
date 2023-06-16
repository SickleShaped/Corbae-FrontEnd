import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import MyProductItem from "../components/MyProductItem";
import CorbaeLink from "../components/UI/Link/Link";
import Hat from "../components/Hat";
import { useParams } from "react-router-dom";
import CorbaeButton from "../components/UI/Button/button";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import CorbaeField from "../components/UI/Field/Field";
import CommentItem from "../components/Comment";
import OrderProduct from "../components/OrderProduct";

const OrderPage = (props) => {
  const params = useParams();

  useEffect((event) => {
    getOrder(event);
  }, []);

  useEffect((event) => {
    getProducts(event);
  }, []);

  const [product, setProduct] = useState({
    orderID: "",
    price: 0,
    creationDate: "",
    status: 1,
    deliveryPlace: "",
    userID: "",
  });

  const [hasError, setHasError] = useState({
    hasError: "",
  });

  const validationSchemaComment = yup.object().shape({
    text: yup.string().required("Обязательное поле"),
  });

  const getOrder = async (event, id) => {
    let response = await axios
      .get("https://localhost:7019/order/GetOrderByID?orderID=" + params.id, {
        headers: {
          Authorization: "Bearer " + Cookies.get("jwt"),
        },
      })
      .then(function (data) {
        ///console.log(data.response),
        setHasError({ ...hasError, hasError: "" });
        setProduct({
          ...product,
          orderID: data.data.orderID,
          creationDate: data.data.creationDate,
          price: data.data.price,
          status: data.data.status,
          userID: data.data.userID,
          deliveryPlace: data.data.deliveryPlace,
        });
      })
      .catch(function (error) {
        console.log(error),
          setHasError({ ...hasError, hasError: error.response.data.message });
      });
  };

  const getProducts = async (event) => {
    let response = await axios
      .get(
        "https://localhost:7019/order/GetOrderProductsByOrderID?orderID=" +
          params.id,
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("jwt"),
          },
        }
      )
      .then(function (response) {
        ///console.log(data.response),
        setHasError({ ...hasError, hasError: "" });
        setComments(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error),
          setHasError({ ...hasError, hasError: error.response.data.message });
      });
  };

  const [hasSuccess, setHasSuccess] = useState({
    hasSuccess: "",
  });

  const [comments, setComments] = useState("");

  return (
    <div>
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

      <div className="wrapper_product2">
        <div className="name">
          <h2>{product.creationDate}</h2>
        </div>
        <div className="desc"></div>

        <div className="price">
          <h3>Цена: {product.price} руб.</h3>
        </div>

        <div className="quantity">
          <h3>Место доставки: {product.deliveryPlace}</h3>
        </div>
      </div>
      <Formik
        initialValues={{
          text: "",
        }}
        onSubmit={(values) => {
          leaveComment(event, values.text);
        }}
        validationSchema={validationSchemaComment}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="atCenter_register"></div>
          </Form>
        )}
      </Formik>
      <h2>Товары:</h2>
      {comments.length ? (
        <div className="comment_wrapper">
          {comments.map((comment) => (
            <OrderProduct
              parid={params.id}
              product={comment}
              key={comment.orderProductID}
            />
          ))}
        </div>
      ) : (
        <div>
          <h2>Товаров нет.</h2>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
