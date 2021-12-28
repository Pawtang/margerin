const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { Router } = require("express");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//
/* ----------------------------- CREATE METHODS ----------------------------- */
//create a product
app.post("/product", async (req, res) => {
  try {
    const { newProductName, newProductDescription } = req.body;
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

//create a material - rarely used
app.post("/material", async (req, res) => {
  try {
    console.log(req.body);
    // const { description } = req.body;
    const newMaterial = await pool.query(
      `INSERT INTO material (material_name, material_description, material_image_path) VALUES(${material_name}, ${material_description}, ${material_image_path}) RETURNING *`
    );
    res.json(newMaterial.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Create a material in context of product - primary method
app.post("/productHasMaterial", async (req, res) => {
  try {
    console.log(req.body);
    // const { description } = req.body;
    const productHasMaterial = await pool.query(
      `INSERT INTO product_has_material (product_id, material_id, unit_id, quantity) VALUES(${product_id}, ${material_id}, ${unit_id}, ${quantity})`
    );
    res.json(productHasMaterial.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a supplier
app.post("/suppliers", async (req, res) => {
  try {
    console.log(req.body);
    // const { description } = req.body;
    const newSupplier = await pool.query(
      `INSERT INTO supplier (supplier_name, supplier_description, supplier_rating, supplier_image_path) VALUES(${material_name}, ${material_description}, ${material_image_path}) RETURNING *`
    );
    res.status(201).json(newSupplier.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Create a transaction

//Create

/* ------------------------------- GET METHODS ------------------------------ */
//Get all products
app.get("/products", async (req, res) => {
  try {
    const getAllProducts = await pool.query(`SELECT * FROM product`);
    // console.log(getAllProducts.rows);
    res.status(200).json(getAllProducts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a product
app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getProduct = await pool.query(
      `SELECT * FROM product WHERE product_id = ${id}`
    );
    res.json(getProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Get all materials for product
app.post("/productHasMaterials", async (req, res) => {
  try {
    console.log(req.body);
    // const { description } = req.body;
    const productHasMaterial = await pool.query(`SELECT FROM `); //TODO: Build SQL query to get all materials for product
    res.json(productHasMaterial.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo
// app.get("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
//       id,
//     ]);
//     res.json(todo.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

//get all todos
// app.get("/todos", async (req, res) => {
//   try {
//     const allTodos = await pool.query("SELECT * FROM todo");
//     res.json(allTodos.rows);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

/* ----------------------------- UPDATE METHODS ----------------------------- */

// //update a todo
// app.put("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { description } = req.body;
//     const updateTodo = await pool.query(
//       "UPDATE todo SET description = $1 WHERE todo_id = $2",
//       [description, id]
//     );

//     res.json("Todo was updated!");
//   } catch (err) {
//     console.error(err.message);
//   }
// });

/* ----------------------------- DELETE METHODS ----------------------------- */

app.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await pool.query(
      `DELETE FROM product WHERE product_id = ${id}`
    );
    res.json("Product deleted!");
  } catch (error) {
    console.error(error);
  }
});

// //delete a todo
// app.delete("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
//       id,
//     ]);
//     res.json("Todo was deleted!");
//   } catch (err) {
//     console.error(err.message);
//   }
// });

/* ------------------------------- END METHODS ------------------------------ */

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
