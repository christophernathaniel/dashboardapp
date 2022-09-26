import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.scss";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();

    const response = await fetch(window.getfetch + "api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      navigate("/login");
    }
  }

  return (
    <div className="model--Login">
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <label>
          <span>Name</span>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
        </label>
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

        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;
