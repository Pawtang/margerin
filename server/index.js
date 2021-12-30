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

//create a material
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
    const { productID, newMaterial, newUnit, newQuantity } = req.body;
    const productHasMaterial = await pool.query(
      `INSERT INTO product_has_material (product_id, material_id, unit_id, quantity) VALUES(${productID}, ${newMaterial}, ${newUnit}, ${newQuantity}) RETURNING *`
    );
    res.json(productHasMaterial.rows);
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

/* ------------------------------- GET METHODS ------------------------------ */
//Get all products
app.get("/products", async (req, res) => {
  try {
    const getAllProducts = await pool.query(
      `SELECT * FROM product ORDER BY product_name ASC`
    );
    // console.log(getAllProducts.rows);
    res.status(200).json(getAllProducts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get all materials
app.get("/materials", async (req, res) => {
  try {
    const getAllMaterials = await pool.query(`SELECT * FROM material`);
    // console.log(getAllProducts.rows);
    res.status(200).json(getAllMaterials.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get all units
app.get("/units", async (req, res) => {
  try {
    const getAllUnits = await pool.query(`SELECT * FROM unit`);
    res.status(200).json(getAllUnits.rows);
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
app.get("/productHasMaterials/:id", async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const relatedMaterials = await pool.query(
      `SELECT m.material_name, phm.quantity, u.unit_name FROM material m 
      INNER JOIN product_has_material phm ON (m.material_id = phm.material_id) 
      INNER JOIN unit u ON (u.unit_id = phm.unit_id) WHERE (product_id = ${id});`
    );
    res.json(relatedMaterials.rows);
    console.log(relatedMaterials.rows);
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

//TODO: Delete all product_id's from phm table
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
