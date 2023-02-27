import React from "react";
import {
  BrowserRouter,
  Link,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import About from "../pages/About";
import Posts from "../pages/Posts";
import NotFound from "../pages/NotFound";
import PostPage from "../pages/PostPage";
import Login from "../pages/startpage";
import { useContext } from "react";
import { AuthContext } from "../context";

const AppRouter = () => {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route exact path="/posts" element={<Posts />}></Route>
      <Route exact path="/posts/:id" element={<PostPage />}></Route>
    </Routes>
  ) : (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
