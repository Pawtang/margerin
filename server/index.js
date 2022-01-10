const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
// const { Router } = require("express");

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
    console.log("--------------->BODY:", req.body);
    const { newMaterialName, newMaterialDescription } = req.body;
    console.log("Back-end name, desc", newMaterialName, newMaterialDescription);
    const newMaterial = await pool.query(
      `INSERT INTO material (material_name, material_description) VALUES('${newMaterialName}', '${newMaterialDescription}') RETURNING *`
    );
    res.json(newMaterial.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Add a material to a product
app.post("/productHasMaterial", async (req, res) => {
  try {
    const { productID, addMaterial, newUnit, newQuantity } = req.body;
    const productHasMaterial = await pool.query(
      `INSERT INTO product_has_material (product_id, material_id, unit_id, quantity) VALUES(${productID}, ${addMaterial}, ${newUnit}, ${newQuantity}) RETURNING *`
    );
    res.status(201).json(productHasMaterial.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//add a transaction to a material
app.post("/materialHasTransaction", async (req, res) => {
  try {
    console.log("Request body for materialHasTransaction:", req.body);
    const {
      transactionSupplier,
      materialID,
      transactionUnit,
      transactionCost,
      transactionQuantity,
      transactionDate,
    } = req.body;
    const productHasMaterial = await pool.query(
      `INSERT INTO transaction (supplier_id, material_id, unit_id, cost, quantity, transaction_date) VALUES(${transactionSupplier}, ${materialID}, ${transactionUnit}, ${transactionCost},${transactionQuantity}, TO_DATE('${transactionDate}', 'YYYY-MM-DD') ) RETURNING *`
    );
    res.status(201).json(productHasMaterial.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//create a supplier
app.post("/suppliers", async (req, res) => {
  try {
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
    res.status(200).json(getAllProducts.rows);
  } catch (err) {
    console.error("Get all products", err.message);
  }
});

//Get all materials
app.get("/materials", async (req, res) => {
  try {
    const getAllMaterials = await pool.query(`SELECT * FROM material`);
    res.status(200).json(getAllMaterials.rows);
  } catch (err) {
    console.error("Get all materials", err.message);
  }
});

//Get all units
app.get("/units", async (req, res) => {
  try {
    const getAllUnits = await pool.query(`SELECT * FROM unit`);
    res.status(200).json(getAllUnits.rows);
  } catch (err) {
    console.error("Get all units", err.message);
  }
});

//Get all suppliers
app.get("/suppliers", async (req, res) => {
  try {
    const getAllSuppliers = await pool.query(`SELECT * FROM supplier`);
    res.status(200).json(getAllSuppliers.rows);
  } catch (err) {
    console.error("Get all suppliers", err.message);
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
    console.error("Get a product", err.message);
  }
});

//Get all materials for product
// TODO: Get the average as part of this function?
app.get("/productHasMaterials/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const relatedMaterials = await pool.query(
      `SELECT  m.material_id, m.material_name, phm.quantity, u.unit_name, u.unit_id, phm.phm_id FROM material m 
      INNER JOIN product_has_material phm ON (m.material_id = phm.material_id) 
      INNER JOIN unit u ON (u.unit_id = phm.unit_id) WHERE (product_id = ${id});`
    );
    const reformattedArray = await Promise.all(
      relatedMaterials.rows.map(async (material) => {
        const returned = await pool.query(
          `SELECT SUM(cost::numeric / quantity::numeric) / COUNT(cost) AS avgcost FROM transaction WHERE material_id = '${material.material_id}' AND unit_id = '${material.unit_id}'`
        );
        console.log("returned from ProductHasMats: ", returned.rows[0]);
        return {
          ...material,
          avgcost: Number(parseFloat(returned.rows[0].avgcost).toFixed(2)),
        };
      })
    );
    res.json(reformattedArray);
    console.log("reformatted array:", reformattedArray);
  } catch (err) {
    console.error("Error source productHasMaterials", err.message);
  }
});

//Get all transactions for material
app.get("/materialHasTransactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID for transactions", id);
    const relatedTransactions = await pool.query(
      `SELECT  t.transaction_id, t.cost, t.quantity, t.transaction_date, s.supplier_name, u.unit_name FROM transaction t 
      INNER JOIN supplier s ON (t.supplier_id = s.supplier_id) 
      INNER JOIN unit u ON (t.unit_id = u.unit_id) WHERE (material_id = ${id});`
    );
    res.json(relatedTransactions.rows);
  } catch (err) {
    console.error("Get all transactions for materials", err.message);
  }
});

// // Get average cost of transaction for material
// app.get(
//   "/materialHasTransactions/averageCost/:materialID/:unitID",
//   async (req, res) => {
//     try {
//       const { materialID, unitID } = req.params;
//       console.log(materialID, unitID);
//       const averageCost = await pool.query(
//         `SELECT AVG(regexp_replace(cost::text, '[$,]', '', 'g')::numeric)::numeric(10,2) FROM transaction WHERE material_id = '${materialID}' AND unit_id = '${unitID}'`
//       );
//       console.log(averageCost.rows[0]);
//       res.json(averageCost.rows[0]);
//     } catch (err) {
//       console.error(err.message);
//     }
//   }
// );

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
      `DELETE FROM product WHERE product_id = ${id}
      `
    );
    res.json("Product deleted!");
  } catch (error) {
    res.status(400).json({ errorCode: "1002", error: error.message });
    console.error(error);
  }
});

app.delete("/productHasMaterial/:phmID", async (req, res) => {
  console.log("Back-end:", req.params);
  try {
    const { phmID } = req.params;
    const deleteMaterial = await pool.query(
      `DELETE FROM product_has_material WHERE phm_id = ${phmID}`
    );
    res.json("Material deleted!");
  } catch (error) {
    console.error("DELETE error in Index", error);
  }
});

app.delete(
  "/materialHasTransaction/:materialID/:transactionID",
  async (req, res) => {
    console.log("Back-end:", req.params);
    try {
      const { materialID, transactionID } = req.params;
      const deleteTransaction = await pool.query(
        `DELETE FROM transaction WHERE material_id = ${materialID} AND transaction_id = ${transactionID}`
      );
      res.json("Transaction deleted!");
    } catch (error) {
      console.error("DELETE error in Index", error);
    }
  }
);

/* ------------------------------- END METHODS ------------------------------ */

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
