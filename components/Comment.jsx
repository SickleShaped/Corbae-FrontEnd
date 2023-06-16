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

const CommentItem = (props) => {
  var fun = props.func;
  var pari = props.parid;

  const [hasError, setHasError] = useState({
    hasError: "",
  });

  const deleteproduct = async (event) => {
    let response = await axios
      .delete(
        "https://localhost:7019/comment/DeleteComment?commentID=" +
          props.comment.commentID,
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
    fun(event, pari);
  };

  return (
    <div className="max2">
      <div className="product">
        <div className="wrapper6">
          <div className="title">
            <h3
              style={{
                position: "relative",
                top: "3%",
                left: "1em",
                textAlign: "left",
              }}
            >
              {props.comment.text}
            </h3>
          </div>

          <div className="button2">
            {Cookies.get("userID") == props.comment.userID ? (
              <CorbaeButton
                style={{ position: "relative", top: "10%", left: "5%" }}
                type="button"
                onClick={() => deleteproduct()}
              >
                Удалить
              </CorbaeButton>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
