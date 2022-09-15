import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Site from "./Pages/Site";

const App = () => {
  window.getfetch = "https://nebula-finance-app.herokuapp.com/";
  //window.getfetch = "http://localhost:8080/";

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" exact element={<Site />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
