const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
// const { Router } = require("express");

//middleware
app.use(cors());
app.use(express.json()); //req.body

app.post("/user", async (req, res) => {
  try {
    const { email, newProductDescription } = req.body;
    console.log("back end", req.body);
    const newProduct = await pool.query(
      `INSERT INTO product (product_name, product_description) VALUES('${newProductName}', '${newProductDescription}') RETURNING *`
    );
    // console.log(newProduct);
    res.json(newProduct.rows);
  } catch (err) {
    console.error(err.message);
  }
});
