import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import MyProductItem from "../components/MyProductItem";
import CorbaeLink from "../components/UI/Link/Link";
import Hat from "../components/Hat";
import MyOrderItem from "../components/MyOrderItem";

const MyOrdersPage = (props) => {
  useEffect((event) => {
    getMyOrders(event);
  }, []);

  const [myOrders, setMyOrders] = useState([]);

  const getMyOrders = async (event) => {
    let response = await axios
      .get(
        "https://localhost:7019/order/GetOrdersByCustomerID?userId=" +
          Cookies.get("userID"),
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("jwt"),
          },
        }
      )
      .then(function (response) {
        setMyOrders(response.data);
        //console.log(response.data);
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
        <h2>Мои заказы</h2>
        <div></div>
      </div>
      {myOrders.length ? (
        <div className="product_wrapper">
          {myOrders.map((order) => (
            <MyOrderItem product={order} key={order.orderID} />
          ))}
        </div>
      ) : (
        <div>
          <h2>Ваших заказов пока нет!</h2>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
