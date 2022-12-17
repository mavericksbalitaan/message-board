const express = require('express');
const db = require('../db');

const router = express.Router();

router.post('/messages', (req, res) => {
  const { userid } = req.body;
  const sql = `SELECT * FROM messages WHERE userid = ${userid} ORDER BY posted DESC`;
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    res.send(result);
  });
});

router.post('/createmessage', (req, res) => {
  const {
    title, text, userid, posted,
  } = req.body;
  const sql = 'INSERT INTO messages (title, text, userid, posted) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, text, userid, posted], (err, result) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
    res.send(result);
  });
});

router.post('/deletemessage', (req, res) => {
  const { id } = req.body;
  const sql = `DELETE FROM messages WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
    res.send(result);
  });
});

module.exports = router;
