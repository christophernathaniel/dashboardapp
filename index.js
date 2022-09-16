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

const jwt = require("jsonwebtoken");
const path = require("path");
const PORT = process.env.PORT || 8081;
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../client/build")));

// app.get("*", function (request, response) {
//   response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
// });

// if (
//   process.env.NODE_ENV === "production" ||
//   process.env.NODE_ENV === "staging"
// ) {

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get(
  ["/", "/login", "/register", "/dashboard", "/card", "/bill"],
  (request, response) => {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  }
);
//}

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

const routes = require("./routes/api");
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
