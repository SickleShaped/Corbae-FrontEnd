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

const OrderProduct = (props) => {
  var success = props.success;
  var errors = props.error;
  var fun = props.func;

  return (
    <div className="max">
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
          <div className="button2"></div>

          <div className="button3"></div>

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

export default OrderProduct;
