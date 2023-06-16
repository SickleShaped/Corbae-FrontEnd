import CorbaeButton from "../components/UI/Button/button";
import CorbaeLink from "../components/UI/Link/Link.jsx";
import CorbaeInput from "../components/UI/Input/Input";
import "../components/Ui/Link/Link.css";
import React, { useMemo, useState } from "react";
import * as yup from "yup";
import "../components/Ui/Link/Link.css";
import "./pagestyles.css";
import UserService from "../API/UserService";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import CorbaeField from "../components/UI/Field/Field";
import Cookies from "js-cookie";
import { Component } from "react";
import Hat from "../components/Hat";
import { useEffect } from "react";
import MagazineProductItem from "../components/MagazineProductItem";

const MagazinePage = (props) => {
  var prop = props.value;
  useEffect((event) => {
    getAllProducts(event);
  }, []);

  const [allProducts, setallProducts] = useState([]);

  const getAllProducts = async (event) => {
    let response = await axios
      .get("https://localhost:7019/product/GetAll", {
        headers: {
          Authorization: "Bearer " + Cookies.get("jwt"),
        },
      })
      .then(function (response) {
        setallProducts(response.data);
        //console.log(response.data);
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

  const [search, setSearch] = useState("");

  const sortedProducts = useMemo(() => {
    return allProducts.filter((allProduct) =>
      allProduct.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, allProducts]);

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          login(event);
        }}
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
            <div className="search">
              <CorbaeInput
                placeholder="Поиск..."
                onChange={(e) => setSearch(e.target.value)}
              ></CorbaeInput>
            </div>

            {sortedProducts.length ? (
              <div className="product_wrapper">
                {sortedProducts.map((product) => (
                  <MagazineProductItem
                    success={{ hasSuccess, setHasSuccess }}
                    error={{ hasError, setHasError }}
                    product={product}
                    key={product.productID}
                  />
                ))}
              </div>
            ) : (
              <div>
                <h2>Товары не найдены</h2>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MagazinePage;
