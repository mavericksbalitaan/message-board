const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

function verifyToken(req, res, next) {
  const bearerHeaders = req.headers.authorization;
  const bearer = bearerHeaders.split(' ');
  const bearerToken = bearer[1];
  req.token = bearerToken;
  next();
}

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT COUNT(*) AS cnt, id, name FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (error, result) => {
    if (error) {
      console.log(error);
    }

    if (result.length && result[0].cnt === 0) {
      res.json({
        message: 'Credentials not found. Please try again.',
      });
    }

    const user = {
      id: result[0].id,
      name: result[0].name,
      email,
      password,
    };

    jwt.sign({ user }, 'secret_key', (err, token) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ user, token, message: 'Login successfully.' });
      }
    });
  });
});

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
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
    db.query(sql2, [name, email, password], (error1, result1) => {
      if (error1) {
        res.sendStatus(400);
      }
      res.status(201).json({
        message: 'User account registered successfully.',
      });
      console.log(result1);
    });
  });
});

module.exports = router;
