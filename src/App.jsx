import { useState } from "react";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
