const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./db');
const message = require('./routes/message');
const user = require('./routes/user');

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', message);
app.use('/api', user);

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected ...');
  const sql = 'CREATE TABLE IF NOT EXISTS messages (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL, user VARCHAR(255) NOT NULL, posted DATE NOT NULL)';
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    console.log(result);
    console.log('TABLE messages created ...');
  });
  const sql2 = 'CREATE TABLE IF NOT EXISTS users (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE (email))';
  db.query(sql2, (error, result) => {
    if (error) {
      throw error;
    }
    console.log(result);
    console.log('TABLE users created ...');
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is running in ${process.env.HOST} at ${process.env.PORT}`,
  );
});
