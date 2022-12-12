const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const sql = 'SELECT text, user, posted FROM messages';
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    res.send(result);
  });
});

router.post('/createmessage', (req, res) => {
  const { text, user, posted } = req.body;
  const sql = 'INSERT INTO messages (text, user, posted) VALUES (?, ?, ?)';
  db.query(sql, [text, user, posted], (err, result) => {
    res.send(result);
  });
  res.send('Hello');
});

module.exports = router;
