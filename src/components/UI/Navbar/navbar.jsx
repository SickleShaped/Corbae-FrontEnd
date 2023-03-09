import React from "react";
import {
  BrowserRouter,
  Link,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link className="navbar__buttons" to="/profile">
        Профиль
      </Link>
      <Link className="navbar__buttons" to="/magazine">
        Лента
      </Link>
      <Link className="navbar__buttons" to="/cart">
        Корзина
      </Link>
    </div>
  );
};

//export default Navbar;
