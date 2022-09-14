// MERN = Mongo + Express + React + Node

// Development = Node.js server + React server

// E - Express

// npm install express
// npm install nodemon
// npm install cors
// npm install mongoose

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../client/build")));

// app.get("*", function (request, response) {
//   response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
// });

mongoose
  .connect(
    "mongodb+srv://christophernathaniel:EKSoP1SOpfCrVVqV@cluster0.3v6wz.mongodb.net/dashboard?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));

app.post("/api/register", async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }

  res.json({ status: "ok" });
});

app.get("/api/dashboard", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    console.log(user);

    return res.json({ status: "ok", dashboard: user.dashboard });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.post("/api/dashboard", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    await User.updateOne(
      { email: email },
      { $set: { dashboard: req.body.dashboard } }
    );

    console.log("tried to update:" + email + ":" + req.body.dashboard);

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
