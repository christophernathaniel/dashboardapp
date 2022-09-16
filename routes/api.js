const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Card = require("../models/card.model");
const Bill = require("../models/bill.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const secret = "c722cc4c-3501-11ed-a261-0242ac120002";

//**** Register ------------------------------------------ */
router.post("/register", async (req, res) => {
  try {
    const userUuid = crypto.randomUUID();
    const user = await User.create({
      uuid: userUuid,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error" });
  }
});

//**** Login ------------------------------------------ */
router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        uuid: user.uuid,
      },
      secret
    );

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }

  res.json({ status: "ok" });
});

//**** Dashboard ------------------------------------------ */
router.get("/dashboard", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, secret);
    const uuid = decoded.uuid;
    const user = await User.findOne({ uuid: uuid });

    console.log(user);

    console.log("retrieve:");

    return res.json({ status: "ok", dashboard: user.dashboard });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

router.post("/dashboard", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, secret);
    const uuid = decoded.uuid;
    await User.updateOne(
      { uuid: uuid },
      { $set: { dashboard: req.body.dashboard } }
    );

    console.log("tried to update:" + uuid + ":" + req.body.dashboard);

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

//**** CARD ------------------------------------------ */

// Retrieve
router.get("/card", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, secret);
    const uuid = decoded.uuid;
    const card = await Card.find({ user_uuid: uuid });

    console.log(card);

    console.log("retrieve:" + uuid);

    return res.json({ status: "ok", hello: "world", data: card });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

// Update
router.post("/card/update", async (req, res) => {
  const token = req.headers["x-access-token"];
  const uuid = req.headers["uuid"];

  try {
    const decoded = jwt.verify(token, secret);
    const user_uuid = decoded.uuid;
    await Card.updateOne(
      { uuid: uuid, user_uuid: user_uuid },
      { $set: { data: req.body.card, name: req.body.name } }
    );

    console.log(
      "tried to update /card/update:" +
        uuid +
        ":" +
        user_uuid +
        ":" +
        req.body.card
    );

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

// Create
router.post("/card/create", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, secret);
    const user_uuid = decoded.uuid;

    const card = await Card.create({
      uuid: req.body.uuid,
      user_uuid: user_uuid,
      name: req.body.name,
      data: [],
    });

    console.log(
      "tried to create new:" + user_uuid + ":" + user_uuid + ":" + req.body.card
    );

    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error" });
  }
});

// DELETE
router.post("/card/delete", async (req, res) => {
  const token = req.headers["x-access-token"];

  console.log("delete request");

  try {
    const decoded = jwt.verify(token, secret);
    const user_uuid = decoded.uuid;

    const card = await Card.deleteOne({
      uuid: req.body.uuid,
      user_uuid: user_uuid,
    });

    console.log("deleted");

    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error" });
  }
});

/*** BILL --------------------------------------------- */

// Retrieve
router.get("/bill", async (req, res) => {
  const token = req.headers["x-access-token"];
  const card_uuid = req.headers["uuid"];

  try {
    const decoded = jwt.verify(token, secret);
    const uuid = decoded.uuid;
    const card = await Card.findOne({ uuid: card_uuid, user_uuid: uuid });

    console.log(card);

    console.log("retrieve:" + uuid + ":" + card_uuid);

    return res.json({ status: "ok", hello: "world", data: card });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

// Create - Redundent???
router.post("/bill/create", async (req, res) => {
  const token = req.headers["x-access-token"];
  const card_uuid = req.headers["uuid"];

  try {
    const decoded = jwt.verify(token, secret);
    const uuid = decoded.uuid;
    await Card.updateOne(
      { uuid: card_uuid, user_uuid: uuid },
      { $set: { data: req.body.card } }
    );

    console.log(
      "tried to update:" + uuid + ":" + card_uuid + ":" + req.body.card
    );

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

module.exports = router;
