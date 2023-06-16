import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import MyProductItem from "../components/MyProductItem";
import CorbaeLink from "../components/UI/Link/Link";
import Hat from "../components/Hat";
import WishProduct from "../components/WishProduct";

const WishListPage = (props) => {
  useEffect((event) => {
    getWishProducts(event);
  }, []);

  const [hasSuccess, setHasSuccess] = useState({
    hasSuccess: "",
  });

  const [hasError, setHasError] = useState({
    hasError: "",
  });

  const [wishProducts, setWishProducts] = useState([]);

  const getWishProducts = async (event) => {
    let response = await axios
      .get(
        "https://localhost:7019/wish/GetCartProductsByUserId?userID=" +
          Cookies.get("userID"),
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("jwt"),
          },
        }
      )
      .then(function (response) {
        setWishProducts(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error),
          setHasError({ ...hasError, hasError: error.response.data.message });
      });
  };

  return (
    <div>
      <Hat />
      <div className="userpage_wrapper">
        <h2>Список желаемого</h2>
        <div></div>
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
      {wishProducts.length ? (
        <div className="product_wrapper">
          {wishProducts.map((product) => (
            <WishProduct
              success={{ hasSuccess, setHasSuccess }}
              error={{ hasError, setHasError }}
              product={product}
              func={getWishProducts}
              key={product.wishProductID}
            />
          ))}
        </div>
      ) : (
        <div>
          <h2>Тут пока ничего нет!</h2>
        </div>
      )}
    </div>
  );
};

export default WishListPage;
