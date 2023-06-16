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

const MyOrderItem = (props) => {
  let navigate = useNavigate();

  return (
    <div className="max">
      <div className="product">
        <div className="wrapper33">
          <div className="title3">
            <h3
              style={{
                position: "relative",
                top: "3%",
                left: "1em",
                textAlign: "left",
              }}
            >
              {props.product.creationDate}
            </h3>
          </div>

          <div className="button3">
            <CorbaeButton
              style={{ position: "relative", top: "10%", left: "5%" }}
              type="button"
              onClick={() => navigate("/order/" + props.product.orderID)}
            >
              Открыть страницу
            </CorbaeButton>
          </div>

          <div className="quantity2">
            <h3 style={{ position: "relative", top: "15%", left: "2em" }}>
              Место доставки: {props.product.deliveryPlace}
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

export default MyOrderItem;
