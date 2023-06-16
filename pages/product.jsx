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

const ProductPage = (props) => {
  const params = useParams();

  useEffect((event) => {
    getProduct(event, params.id);
  }, []);

  useEffect((event) => {
    getComments(event, params.id);
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

  const [hasError, setHasError] = useState({
    hasError: "",
  });

  const validationSchemaComment = yup.object().shape({
    text: yup.string().required("Обязательное поле"),
  });

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
          category: data.data.category,
          name: data.data.name,
          price: data.data.price,
          productID: data.data.productID,
          userID: data.data.userID,
          quantityInStock: data.data.quantityInStock,
          description: data.data.description,
        });
      })
      .catch(function (error) {
        console.log(error),
          setHasError({ ...hasError, hasError: error.response.data.message });
      });
  };

  const getComments = async (event, id) => {
    let response = await axios
      .get("https://localhost:7019/comment/GetAllByProductID?productID=" + id, {
        headers: {
          Authorization: "Bearer " + Cookies.get("jwt"),
        },
      })
      .then(function (response) {
        ///console.log(data.response),
        setHasError({ ...hasError, hasError: "" });
        setComments(response.data);
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error),
          setHasError({ ...hasError, hasError: error.response.data.message });
      });
  };

  const leaveComment = async (event, pitext) => {
    event.preventDefault();

    let response = await axios
      .post(
        "https://localhost:7019/comment/LeaveAComment?text=" +
          pitext +
          "&userID=" +
          Cookies.get("userID") +
          "&productID=" +
          params.id,
        {},
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("jwt"),
          },
        }
      )
      .then(function (data) {
        ///console.log(data.response),
        setHasError({ ...hasError, hasError: "" }),
          setHasSuccess({
            ...hasSuccess,
            hasSuccess: "",
          });
      })
      .catch(function (error) {
        //console.log(error.response.data.message),
        setHasError({ ...hasError, hasError: error.response.data.message }),
          setHasSuccess({ ...hasSuccess, hasSuccess: "" });
      });
    getComments(event, params.id);
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

      <div className="wrapper_product">
        <div className="name">
          <h2>{product.name}</h2>
        </div>
        <div className="desc">
          <h3> {product.description}</h3>
        </div>

        <div className="price">
          <h3>Цена: {product.price} руб.</h3>
        </div>

        <div className="quantity">
          <h3>На складе: {product.quantityInStock}</h3>
        </div>

        <div className="category">
          {product.category ? (
            <h3>Категория: {product.category}</h3>
          ) : (
            <h3>Категория: не задано</h3>
          )}
        </div>

        <div className="button1">
          <CorbaeButton type="button">Добавить в корзину</CorbaeButton>
        </div>

        <div className="button2">
          <CorbaeButton type="button">Добавить в желаемое</CorbaeButton>
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
            <div className="atCenter_register">
              <h3>Оставьте комментарий</h3>

              <div className="AtCenter">
                <div className="AtCenter">
                  <fieldset className="fieldset_register">
                    <div className="wrapper_product_commentsss">
                      <div className="field">
                        {errors.text && touched.text && (
                          <div className="justify-left_register">
                            {errors.text}
                          </div>
                        )}
                        <CorbaeField
                          name="text"
                          placeholder="Ваш комментарий"
                        ></CorbaeField>
                      </div>
                      <div className="button5">
                        <CorbaeButton type="submit">Отправить</CorbaeButton>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <h2>Комментарии:</h2>
      {comments.length ? (
        <div className="comment_wrapper">
          {comments.map((comment) => (
            <CommentItem
              func={getComments}
              parid={params.id}
              comment={comment}
              key={comment.commentID}
            />
          ))}
        </div>
      ) : (
        <div>
          <h2>Комментариев пока нет.</h2>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
