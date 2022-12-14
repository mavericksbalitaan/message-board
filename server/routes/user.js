const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const user = {
    name,
    email,
    password,
  };
  const sql = 'SELECT COUNT(*) AS cnt FROM users WHERE email = ?';
  db.query(sql, email, (error, result) => {
    if (error) {
      res.sendStatus(400);
    }
    if (result.length && result[0].cnt > 0) {
      res.send({
        message: 'Email already exists. Please try again.',
      });
    }

    const sql2 = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql2, [name, email, password], () => {
      jwt.sign({ user }, 'secret_key', (err, token) => {
        if (err) {
          console.log(err);
        }
        res.json({
          user,
          token,
        });
      });
    });
    console.log(result);
  });
});

module.exports = router;
