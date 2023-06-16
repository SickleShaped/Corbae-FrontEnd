import { useState } from "react";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/1login";
import Register from "../pages/2register";
import MagazinePage from "../pages/magazine";
import AuthApi from "../API/Auth";
import Cookies from "js-cookie";
import { useEffect } from "react";
import UserPage from "../pages/4user";
import AddMoneyPage from "../pages/6addmoney";
import ReduceMoneyPage from "../pages/7reducemoney";
import EditUserPage from "../pages/5edituser";
import MyProductsPage from "../pages/9myproducts";
import CreateProductPage from "../pages/1createproduct";
import EditProductPage from "../pages/editproduct";
import ProductPage from "../pages/product";
import WishListPage from "../pages/wishlist";
import CartPage from "../pages/cart";
import MyOrdersPage from "../pages/myorders";
import OrderPage from "../pages/order";

function App() {
  const [count, setCount] = useState(0);
  const [auth, setAuth] = useState(false);

  const updateDataCallback = (value) => {
    this.setAuth(value);
  };

  useEffect(() => {
    Cookies.get("jwt") != null ? setAuth(true) : setAuth(false);
  });

  return (
    <div>
      <AuthApi.Provider value={{ auth, setAuth }}>
        {auth ? ( //true
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<MagazinePage value={{ auth, setAuth }} />}
              />
              <Route
                path="/magazine"
                element={<MagazinePage value={{ auth, setAuth }} />}
              />
              <Route
                path="/user"
                element={<UserPage value={{ auth, setAuth }} />}
              />
              <Route
                path="/edituser"
                element={<EditUserPage value={{ auth, setAuth }} />}
              />
              <Route path="/myproducts" element={<MyProductsPage />} />

              <Route path="/createproduct" element={<CreateProductPage />} />

              <Route path="/editproduct/:id" element={<EditProductPage />} />

              <Route path="/productPage/:id" element={<ProductPage />} />

              <Route path="/addMoney" element={<AddMoneyPage />} />

              <Route path="/wish" element={<WishListPage />} />

              <Route path="/cart" element={<CartPage />} />

              <Route path="orders" element={<MyOrdersPage />} />

              <Route path="/order/:id" element={<OrderPage />} />

              <Route path="/reduceMoney" element={<ReduceMoneyPage />} />
              <Route
                path="*"
                element={<MagazinePage value={{ auth, setAuth }} />}
              />
            </Routes>
          </BrowserRouter>
        ) : (
          //false
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<LoginPage value={{ auth, setAuth }} />}
              />
              <Route
                path="/login"
                element={<LoginPage value={{ auth, setAuth }} />}
              />
              <Route path="/register" element={<Register />} />
              <Route
                path="*"
                element={<LoginPage value={{ auth, setAuth }} />}
              />
            </Routes>
          </BrowserRouter>
        )}
      </AuthApi.Provider>
    </div>
  );
}

export default App;
