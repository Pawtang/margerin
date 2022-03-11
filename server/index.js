require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
// const { dirname, join } = require("path");
// const { fileURLToPath } = require("url");

// dotenv.config();
// const __dirname = dirname(fileURLToPath(import.meta.url));

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//
/* ----------------------------- Authentication ----------------------------- */

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; //undefined or token
  if (token == null) return res.status(401).json("Authentication Failed");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403);
    req.user = user;
    next();
  });
};

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashbrowns = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      `INSERT INTO users (email, hash) VALUES($1, $2) RETURNING *`,
      [email, hashbrowns]
    );
    res.status(200).json(newUser.rows[0]);
  } catch (error) {
    console.error(error);
    if (error.code == "23505") {
      res.status(409).json("Email is already in use");
    } else res.status(400).json("Registration failed");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
  try {
    const databaseHash = await pool.query(
      `SELECT users.hash FROM users WHERE (users.email = '${email}')`
    );
    const validation = await validate(password, databaseHash.rows[0].hash);
    if (validation) {
      res
        .status(200)
        .json({ accessToken: accessToken, message: "Login successful" });
    } else {
      throw new Error("Incorrect password");
    }
  } catch (error) {
    console.error(error.message);
    res.status(401).json("Login failed");
  }
});

const validate = async (password, hash) => {
  const validation = await bcrypt.compare(password, hash);
  return validation;
};

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
    res.status(200).json(newProduct.rows);
  } catch (error) {
    res.status(400).json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    console.error(error.message);
    res.status(400).json("Failed to create a new product");
  }
});

//create a material
app.post("/material", async (req, res) => {
  try {
    const { newMaterialName, newMaterialDescription } = req.body;
    const newMaterial = await pool.query(
      `INSERT INTO material (material_name, material_description) VALUES('${newMaterialName}', '${newMaterialDescription}') RETURNING *`
    );
    res.status(200).json(newMaterial.rows);
  } catch (error) {
    res.status(400).json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    res.status(400).json("Failed to create a new material");
    console.error(error.message);
  }
});

//create a supplier
app.post("/supplier", async (req, res) => {
  try {
    const { newSupplierName } = req.body;
    const newSupplier = await pool.query(
      `INSERT INTO supplier (supplier_name) VALUES('${newSupplierName}') RETURNING *`
    );
    res.status(200).json(newSupplier.rows[0]);
  } catch (error) {
    res.status(400).json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    res.status(400).json("Failed to create a new supplier");
    console.error(error.message);
  }
});

//create a supplier detailed
app.post("/supplier/new", async (req, res) => {
  try {
    const {
      newSupplierName,
      newSupplierContactName,
      newSupplierphone,
      newSupplierRating,
    } = req.body;
    const newSupplier = await pool.query(
      `INSERT INTO supplier (supplier_name, contact_name, supplier_phone, supplier_rating) VALUES('${newSupplierName}', '${newSupplierContactName}', '${newSupplierphone}', '${newSupplierRating}') RETURNING *`
    );
    res.status(200).json(newSupplier.rows[0]);
  } catch (error) {
    res.status(400).json("Failed to create a new supplier");
    console.error(error.message);
  }
});

//Add a material to a product
app.post("/productHasMaterial", async (req, res) => {
  try {
    const { productID, addMaterial, newUnit, newQuantity, isPerUnit } =
      req.body;
    const productHasMaterial = await pool.query(
      `INSERT INTO product_has_material (product_id, material_id, unit_id, quantity, is_per_unit) VALUES('${productID}', '${addMaterial}', '${newUnit}', '${newQuantity}', '${isPerUnit}') RETURNING *`
    );
    res.status(200).json(productHasMaterial.rows);
  } catch (error) {
    res.status(400);
    res.json({
      errorCode: error.code,
      errorMessage: error.message,
    });
    console.error("Index: productHasMaterial POST: ", error.message);
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
    res.status(200).json(productHasMaterial.rows);
  } catch (error) {
    res.status(400);
    res.json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    console.error("Error in index, materialHasTransaction:", error.message);
  }
});

//add a transaction to a material
app.post("/transaction", async (req, res) => {
  try {
    console.log("Request body for materialHasTransaction:", req.body);
    const {
      newTransactionDate,
      newTransactionMaterial,
      newTransactionSupplier,
      newTransactionUnit,
      newTransactionCost,
      newTransactionQuantity,
    } = req.body;
    const newTransaction = await pool.query(
      `INSERT INTO transaction (supplier_id, material_id, unit_id, cost, quantity, transaction_date) VALUES(${newTransactionSupplier}, ${newTransactionMaterial}, ${newTransactionUnit}, ${newTransactionCost},${newTransactionQuantity}, TO_DATE('${newTransactionDate}', 'YYYY-MM-DD') ) RETURNING *`
    );
    res.status(200).json(newTransaction.rows);
  } catch (error) {
    res.status(400).json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    console.error(error.message);
  }
});

/* ----------------------------- UPDATE METHODS ----------------------------- */

//Update price of an item
app.put("/product/price/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { productPrice } = req.body;
    const updatePrice = await pool.query(
      `UPDATE product SET price = '${productPrice}' WHERE product_id = ${id}`
    );
    res.status(200).json(updatePrice.rows);
  } catch (error) {
    res.status(400).json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    console.error(error.message);
  }
});

app.put("/product/yield/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { productYield } = req.body;
    console.log("id, yield: ", id, productYield);
    const updateYield = await pool.query(
      `UPDATE product SET yield = '${productYield}' WHERE product_id = ${id}`
    );
    res.status(200).json(updateYield.rows);
  } catch (error) {
    res.status(400).json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    console.error(error.message);
  }
});

app.put("/supplier/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { editSupplierName, editSupplierContactName, editSupplierPhone } =
      req.body;
    const updateSupplier = await pool.query(
      `UPDATE supplier SET supplier_name = '${editSupplierName}', contact_name = '${editSupplierContactName}', supplier_phone = '${editSupplierPhone}' WHERE supplier_id = ${id}`
    );
    res.status(200).json(updateSupplier.rows);
  } catch (error) {
    res.status(400).json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    console.error(error.message);
  }
});

app.put("/transaction/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      editTransactionMaterial,
      editTransactionSupplier,
      editTransactionUnit,
      editTransactionCost,
      editTransactionQuantity,
      editTransactionDate,
    } = req.body;
    const updateTransaction = await pool.query(
      `UPDATE transaction SET material_id = '${editTransactionMaterial}', supplier_id = '${editTransactionSupplier}', unit_id = '${editTransactionUnit}', cost = '${editTransactionCost}', quantity = '${editTransactionQuantity}', transaction_date = '${editTransactionDate}' WHERE transaction_id = ${id}`
    );
    res.status(200).json(updateTransaction.rows);
  } catch (error) {
    res.status(400).json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    console.error(error.message);
  }
});

app.put("/material/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { editMaterialName, editMaterialDescription } = req.body;
    const updateMaterial = await pool.query(
      `UPDATE material SET material_name = '${editMaterialName}', material_description = '${editMaterialDescription}' WHERE material_id = ${id}`
    );
    res.status(200).json(updateMaterial.rows);
  } catch (error) {
    res.status(400).json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    console.error(
      res.json({
        "error code": errorCode,
        "error message": errorMessage,
      })
    );
  }
});

app.put("/productHasMaterial/edit/:id", async (req, res) => {
  console.log("index req, body:", req.params, req.body);
  try {
    const { id } = req.params;
    const { editMaterial, editUnit, editQuantity, editIsPerUnit } = req.body;
    const updateMaterial = await pool.query(
      `UPDATE product_has_material SET material_id = '${editMaterial}', 
      unit_id = '${editUnit}', 
      quantity =  '${editQuantity}',
      is_per_unit = '${editIsPerUnit}'
      WHERE phm_id = ${id}`
    );
    res.status(200).json(updateMaterial.rows);
  } catch (error) {
    res.status(400).json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    console.error(error.message);
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
  } catch (error) {
    res.status(400);
    res.json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    console.error("Get all products", error.message);
  }
});

//Get all materials
app.get("/materials", async (req, res) => {
  try {
    const getAllMaterials = await pool.query(
      `SELECT * FROM material ORDER BY material_name ASC`
    );
    res.status(200).json(getAllMaterials.rows);
  } catch (error) {
    res.status(400);
    res.json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    console.error("Get all materials", error.message);
  }
});

//Get all units
app.get("/units", async (req, res) => {
  try {
    const getAllUnits = await pool.query(`SELECT * FROM unit`);
    res.status(200).json(getAllUnits.rows);
  } catch (error) {
    res.status(400);
    res.json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    console.error("Get all units", error.message);
  }
});

//Get all suppliers
app.get("/suppliers", async (req, res) => {
  try {
    const getAllSuppliers = await pool.query(
      `SELECT * FROM supplier ORDER BY supplier_name ASC`
    );
    res.status(200).json(getAllSuppliers.rows);
  } catch (error) {
    res.status(400);
    res.json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    console.error("Get all suppliers", error.message);
  }
});

//get a product
app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getProduct = await pool.query(
      `SELECT * FROM product WHERE product_id = ${id}`
    );
    res.status(200).json(getProduct.rows[0]);
  } catch (error) {
    res.status(400);
    res.json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    console.error("Get a product", error.message);
  }
});

//Get all materials for product
// TODO: Get the average as part of this function?
app.get("/productHasMaterials/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const relatedMaterials = await pool.query(
      `SELECT  m.material_id, m.material_name, phm.quantity, phm.is_per_unit, u.unit_name, u.unit_id, phm.phm_id FROM material m 
      INNER JOIN product_has_material phm ON (m.material_id = phm.material_id) 
      INNER JOIN unit u ON (u.unit_id = phm.unit_id) WHERE (product_id = ${id}) ORDER BY m.material_name ASC;`
    );
    const reformattedArray = await Promise.all(
      relatedMaterials.rows.map(async (material) => {
        const returned = await pool.query(
          `SELECT SUM(cost::numeric / quantity::numeric) / COUNT(cost) AS avgcost FROM transaction WHERE material_id = '${material.material_id}' AND unit_id = '${material.unit_id}'`
        );

        return {
          ...material,
          avgcost: Number(parseFloat(returned.rows[0].avgcost).toFixed(2)),
        };
      })
    );
    res.status(200).json(reformattedArray);
  } catch (error) {
    res.status(400);
    res.json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    console.error("Error source productHasMaterials", error.message);
  }
});

//Get all transactions for material
app.get("/materialHasTransactions/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const relatedTransactions = await pool.query(
      `SELECT  t.transaction_id, t.cost, t.quantity, t.transaction_date, s.supplier_name, s.supplier_id, u.unit_name, u.unit_id FROM transaction t 
      INNER JOIN supplier s ON (t.supplier_id = s.supplier_id) 
      INNER JOIN unit u ON (t.unit_id = u.unit_id) WHERE (material_id = ${id});`
    );
    res.status(200).json(relatedTransactions.rows);
  } catch (error) {
    res.status(400);
    res.json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    console.error("Get all transactions for materials", error.message);
  }
});

app.get("/transaction", async (req, res) => {
  try {
    const transactionData = await pool.query(
      `SELECT t.transaction_id, t.cost, t.quantity, t.transaction_date, u.unit_id, u.unit_name, s.supplier_id, s.supplier_name, m.material_id, m.material_name FROM transaction t INNER JOIN unit u ON (t.unit_id = u.unit_id) INNER JOIN supplier s ON (t.supplier_id = s.supplier_id) INNER JOIN material m ON (t.material_id = m.material_id) ORDER BY t.transaction_date DESC`
    );
    res.status(200).json(transactionData.rows);
  } catch (error) {
    res.status(400);
    res.json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    console.error("Get all transaction data", error.message);
  }
});

/* ----------------------------- DELETE METHODS ----------------------------- */

//TODO: Delete all product_id's from phm table
app.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await pool.query(
      `DELETE FROM product WHERE product_id = ${id}
      `
    );
    res.status(200).json("Product deleted!");
  } catch (error) {
    res.status(400);
    res.json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    res.status(400).json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    console.error(error.message);
  }
});

app.delete("/productHasMaterial/:phmID", async (req, res) => {
  try {
    const { phmID } = req.params;
    const deleteMaterial = await pool.query(
      `DELETE FROM product_has_material WHERE phm_id = ${phmID}`
    );
    res.status(200).json("Material deleted!");
  } catch (error) {
    res.status(400).json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    console.error(error.message);
  }
});

app.delete("/supplier/:supplierID", async (req, res) => {
  try {
    const { supplierID } = req.params;
    const deleteSupplier = await pool.query(
      `DELETE FROM supplier WHERE supplier_id = ${supplierID}`
    );
    res.status(200).json("Supplier deleted!");
  } catch (error) {
    res.status(400).json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    console.error(error.message);
  }
});

app.delete("/material/:materialID", async (req, res) => {
  try {
    const { materialID } = req.params;
    const deleteMaterial = await pool.query(
      `DELETE FROM material WHERE material_id = ${materialID}`
    );
    res.status(200).json("Material deleted!");
  } catch (error) {
    res.status(400);
    res.json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
  }
});

app.delete(
  "/materialHasTransaction/:materialID/:transactionID",
  async (req, res) => {
    try {
      const { materialID, transactionID } = req.params;
      const deleteTransaction = await pool.query(
        `DELETE FROM transaction WHERE material_id = ${materialID} AND transaction_id = ${transactionID}`
      );
      res.status(200).json("Transaction deleted!");
    } catch (error) {
      res.status(400);
      res.json({
        errorCode: error.code,
        errorMessage: error.detail,
      });
      console.error(error.message);
    }
  }
);

app.delete("/transaction/:transactionID", async (req, res) => {
  try {
    const { transactionID } = req.params;
    const deleteTransaction = await pool.query(
      `DELETE FROM transaction WHERE transaction_id = ${transactionID}`
    );
    res.status(200).json("Transaction deleted!");
  } catch (error) {
    res.status(400);
    res.json({
      errorCode: error.code,
      errorMessage: error.detail,
    });
    console.error("DELETE error in Index", error);
  }
});

/* ------------------------------- END METHODS ------------------------------ */

// app.use((req, res, next) => {
//   const error = new Error("Not found");
//   error.status(404);
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message,
//     },
//   });
// });

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
