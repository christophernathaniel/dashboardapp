import React from "react";
import { NavLink } from "react-router-dom";

function Site() {
  return (
    <div>
      <h1>Hello World!</h1>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </div>
  );
}

export default Site;
