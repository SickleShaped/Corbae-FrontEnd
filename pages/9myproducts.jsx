import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import MyProductItem from "../components/MyProductItem";
import CorbaeLink from "../components/UI/Link/Link";
import Hat from "../components/Hat";

const MyProductsPage = (props) => {
  useEffect((event) => {
    getMyProducts(event);
  }, []);

  const [myProducts, setMyProducts] = useState([]);

  const getMyProducts = async (event) => {
    let response = await axios
      .get(
        "https://localhost:7019/product/GetAllByUser?userId=" +
          Cookies.get("userID"),
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("jwt"),
          },
        }
      )
      .then(function (response) {
        setMyProducts(response.data);
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
        <h2>Мои товары</h2>
        <div></div>
        <div className="atReallyRight">
          <CorbaeLink className="CBLink" to="/createproduct">
            Создать товар
          </CorbaeLink>
        </div>
      </div>
      {myProducts.length ? (
        <div className="product_wrapper">
          {myProducts.map((product) => (
            <MyProductItem
              func={getMyProducts}
              product={product}
              key={product.productID}
            />
          ))}
        </div>
      ) : (
        <div>
          <h2>Ваших товаров пока нет!</h2>
        </div>
      )}
    </div>
  );
};

export default MyProductsPage;
