const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcryptjs");
// const { Router } = require("express");

//middleware
app.use(cors());
app.use(express.json()); //req.body

const saltRounds = 10;
// const hashThisPass(plaintext) => {
//   bcrypt.hash(plaintext, saltRounds, function(err, hash) {
//     return
//   })
// }

app.post("/user", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashed = hashThisPass(password);
    console.log("back end", req.body);
    const newUser = await pool.query(
      `INSERT INTO user (userID, email, password) VALUES($1, $2) RETURNING *`,
      [email, password]
    );
    // console.log(newProduct);
    res.json(newProduct.rows);
  } catch (err) {
    console.error(err.message);
  }
});
