const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const db = require("./db");
const message = require("./routes/message");

dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use("/message", message);

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected ...");
  let sql =
    "CREATE TABLE IF NOT EXISTS messages (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL, user VARCHAR(255) NOT NULL, posted DATE NOT NULL)";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    console.log("TABLE messages created ...");
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is running in ${process.env.HOST} at ${process.env.PORT}`
  );
});
