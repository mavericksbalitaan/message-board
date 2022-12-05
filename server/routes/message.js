const express = require("express");
const db = require("../db");

let router = express.Router();

router.post("/createmessage", (req, res) => {
  const { text, user, date } = req.body;
  let sql = "INSERT INTO messages (text, user, date) VALUES (?, ?, ?)";
  db.query(sql, [text, user, date], (err, result) => {
    res.send(result);
  });
  res.send("Hello");
});

module.exports = router;
