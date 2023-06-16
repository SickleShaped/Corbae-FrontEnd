import React from "react";
import "./componentstyles.css";
import axios from "axios";
import CorbaeButton from "./UI/Button/button";
import CorbaeField from "./UI/Field/Field";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useState } from "react";
import CorbaeLink from "./UI/Link/Link";

const Hat = (props) => {
  return (
    <div className="hat-back">
      <div className="wrapper">
        <h2 className="h2-2">CORBAE</h2>

        <CorbaeLink className="CBLinkBIG" to="/magazine">
          Магазин
        </CorbaeLink>
        <CorbaeLink className="CBLinkBIG" to="/cart">
          Корзина
        </CorbaeLink>
        <CorbaeLink className="CBLinkBIG" to="/user">
          Моя страница
        </CorbaeLink>
      </div>
    </div>
  );
};

export default Hat;
