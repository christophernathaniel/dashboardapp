import { useState } from "react";

import "./Login.scss";
import Logo from "./Dashboard/Logo.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch(window.getfetch + "api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.user) {
      localStorage.setItem("token", data.user);

      alert("Login successful");
      window.location.href = "/dashboard";
    } else {
      alert("Please check your username and password");
    }

    console.log(data);
  }

  return (
    <div className="model--Login">
      <img className="logo" src={Logo} alt="Creative Nebula Logo" />
      <form onSubmit={loginUser}>
        <label>
          <span>Email</span>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
        </label>
        <label>
          <span>Password</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </label>
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
}

export default Login;
