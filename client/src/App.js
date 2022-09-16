import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard/Index";
import Card from "./Pages/Card/Index";
import Bill from "./Pages/Bill/Index";
import Site from "./Pages/Site";

const App = () => {
  //window.getfetch = "https://nebula-finance-app.herokuapp.com/";
  window.getfetch = "http://localhost:8081/";

  return (
    <div>
      <BrowserRouter>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/card">Card</Link>

        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/card" element={<Card />} />
          <Route path="/card/*" exact element={<Bill />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
