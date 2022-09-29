const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Card = require("../models/card.model");
const Code = require("../models/code.model");
const Bookmark = require("../models/bookmark.model");
const Subtask = require("../models/subtask.model");
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
      {
        $set: {
          data: req.body.card,
          name: req.body.name,
          totalInAccount: req.body.totalInAccount,
          cardHolderName: req.body.cardHolderName,
          bank: req.body.bank,
          active: req.body.active,
        },
      }
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
      bank: req.body.bank,
      color: req.body.color,
      active: req.body.active,
      cardHolderName: req.body.cardHolderName,
      totalInAccount: req.body.totalInAccount,
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

//**** BOOKMARK ------------------------------------------ */

// Retrieve
router.get("/bookmark", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, secret);
    const uuid = decoded.uuid;
    const bookmark = await Bookmark.find({ user_uuid: uuid });

    console.log("retrieve:" + uuid);

    return res.json({ status: "ok", data: bookmark });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

// Update
router.post("/bookmark/update", async (req, res) => {
  const token = req.headers["x-access-token"];
  const uuid = req.headers["uuid"];

  try {
    const decoded = jwt.verify(token, secret);
    const user_uuid = decoded.uuid;
    await Bookmark.updateOne(
      { uuid: uuid, user_uuid: user_uuid },
      {
        $set: {
          data: req.body.bookmark,
          name: req.body.name,
          category: req.body.category,
          active: req.body.active,
          url: req.body.url,
        },
      }
    );

    console.log(
      "tried to update /bookmark/update:" +
        uuid +
        ":" +
        user_uuid +
        ":" +
        req.body.bookmark
    );

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

// Create
router.post("/bookmark/create", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, secret);
    const user_uuid = decoded.uuid;

    const bookmark = await Bookmark.create({
      uuid: req.body.uuid,
      user_uuid: user_uuid,
      name: req.body.name,
      category: req.body.category,
      color: req.body.color,
      active: req.body.active,
      url: req.body.url,
      data: [],
    });

    console.log(
      "tried to create new:" +
        user_uuid +
        ":" +
        user_uuid +
        ":" +
        req.body.bookmark
    );

    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error" });
  }
});

// DELETE
router.post("/bookmark/delete", async (req, res) => {
  const token = req.headers["x-access-token"];

  console.log("delete request");

  try {
    const decoded = jwt.verify(token, secret);
    const user_uuid = decoded.uuid;

    const bookmark = await Bookmark.deleteOne({
      uuid: req.body.uuid,
      user_uuid: user_uuid,
    });

    console.log("deleted");

    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error" });
  }
});

module.exports = router;

//**** CODE ------------------------------------------ */

// Retrieve
router.get("/code", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, secret);
    const uuid = decoded.uuid;
    const code = await Code.find({ user_uuid: uuid });

    console.log(code);

    console.log("retrieve:" + uuid);

    return res.json({ status: "ok", hello: "world", data: code });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

// Update
router.post("/code/update", async (req, res) => {
  const token = req.headers["x-access-token"];
  const uuid = req.headers["uuid"];

  try {
    const decoded = jwt.verify(token, secret);
    const user_uuid = decoded.uuid;
    await Code.updateOne(
      { uuid: uuid, user_uuid: user_uuid },
      {
        $set: {
          data: req.body.card,
          name: req.body.name,
          totalInAccount: req.body.totalInAccount,
          cardHolderName: req.body.cardHolderName,
          bank: req.body.bank,
          active: req.body.active,
        },
      }
    );

    console.log(
      "tried to update /code/update:" +
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
router.post("/code/create", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, secret);
    const user_uuid = decoded.uuid;

    const card = await Code.create({
      uuid: req.body.uuid,
      user_uuid: user_uuid,
      name: req.body.name,
      bank: req.body.bank,
      color: req.body.color,
      active: req.body.active,
      cardHolderName: req.body.cardHolderName,
      totalInAccount: req.body.totalInAccount,
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
router.post("/code/delete", async (req, res) => {
  const token = req.headers["x-access-token"];

  console.log("delete request");

  try {
    const decoded = jwt.verify(token, secret);
    const user_uuid = decoded.uuid;

    const card = await Code.deleteOne({
      uuid: req.body.uuid,
      user_uuid: user_uuid,
    });

    console.log("deleted");

    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error" });
  }
});

//**** Subtask ------------------------------------------ */

// Retrieve
router.get("/subtask", async (req, res) => {
  const token = req.headers["x-access-token"];
  const taskid = req.headers["x-task-id"];

  try {
    const decoded = jwt.verify(token, secret);
    const uuid = decoded.uuid;
    const subtask = await Subtask.find({ user_uuid: uuid, task_id: taskid });

    console.log(subtask);

    console.log("retrieve subtask:" + uuid + " taskid:" + taskid);

    return res.json({ status: "ok", hello: "world", data: subtask });
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", error: "invalid token" });
  }
});

// Create;
router.post("/subtask/create", async (req, res) => {
  const token = req.headers["x-access-token"];
  const taskid = req.headers["x-task-id"];

  console.log("request-made");
  console.log(req.body);

  try {
    const decoded = jwt.verify(token, secret);
    const user_uuid = decoded.uuid;

    const subtask = await Subtask.create({
      uuid: req.body.uuid,
      user_uuid: user_uuid,
      task_id: req.body.task_id,
      title: req.body.title,
      content: req.body.content,
      data: [],
    });

    console.log("request try complete");

    console.log(
      "tried to create new subtask:" +
        user_uuid +
        ":" +
        taskid +
        ":" +
        req.body.title
    );

    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error" });
  }
});

// DELETE
router.post("/subtask/delete", async (req, res) => {
  const token = req.headers["x-access-token"];

  console.log("delete request");

  try {
    const decoded = jwt.verify(token, secret);
    const user_uuid = decoded.uuid;

    const card = await Subtask.deleteOne({
      uuid: req.body.uuid,
      user_uuid: user_uuid,
    });

    console.log("deleted");

    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error" });
  }
});
