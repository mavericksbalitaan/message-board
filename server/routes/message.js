const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/messages', (req, res) => {
  const sql = 'SELECT title, text, userid, posted FROM messages';
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

module.exports = router;
