import { useState } from "react";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/startpage";
import NotFound from "../pages/NotFound";
import StartPage from "../pages/startpage";
import Register from "../pages/register";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
