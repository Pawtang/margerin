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
    const { newMaterialName, newMaterialDescription } = req.body;
    const newMaterial = await pool.query(
      `INSERT INTO material (material_name, material_description) VALUES('${newMaterialName}', '${newMaterialDescription}') RETURNING *`
    );
    res.json(newMaterial.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//create a supplier
app.post("/supplier", async (req, res) => {
  try {
    const { newSupplierName } = req.body;
    const newSupplier = await pool.query(
      `INSERT INTO supplier (supplier_name) VALUES('${newSupplierName}') RETURNING *`
    );
    res.status(201).json(newSupplier.rows[0]);
  } catch (err) {
    console.error(err.message);
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
    res.status(201).json(newSupplier.rows[0]);
  } catch (err) {
    console.error(err.message);
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
    res.status(201).json(productHasMaterial.rows);
  } catch (err) {
    console.error("Index: productHasMaterial POST: ", err.message);
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
    res.status(201).json(newTransaction.rows);
  } catch (err) {
    console.error(err.message);
  }
});

/* ----------------------------- UPDATE METHODS ----------------------------- */

//Update price of an item
app.put("/product/price/:id", async (req, res) => {
  console.log("Accessed index price");
  try {
    const { id } = req.params;
    const { productPrice } = req.body;
    const updatePrice = await pool.query(
      `UPDATE product SET price = '${productPrice}' WHERE product_id = ${id}`
    );
    res.status(200).json(updatePrice.rows);
  } catch (error) {
    res.status(400).json({ errorCode: "1003", error: error.message });
    console.error(error);
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
    res.status(400).json({ errorCode: "1003", error: error.message });
    console.error(error);
  }
});

app.put("/supplier/edit/:id", async (req, res) => {
  console.log("index req, body:", req.params, req.body);
  try {
    const { id } = req.params;
    const { editSupplierName, editSupplierContactName, editSupplierPhone } =
      req.body;
    const updateSupplier = await pool.query(
      `UPDATE supplier SET supplier_name = '${editSupplierName}', contact_name = '${editSupplierContactName}', supplier_phone = '${editSupplierPhone}' WHERE supplier_id = ${id}`
    );
    res.status(200).json(updateSupplier.rows);
  } catch (error) {
    res.status(400).json({ errorCode: "1003", error: error.message });
    console.error(error);
  }
});

app.put("/transaction/edit/:id", async (req, res) => {
  console.log("index req, body:", req.params, req.body);
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
    res.status(400).json({ errorCode: "1003", error: error.message });
    console.error(error);
  }
});

app.put("/material/edit/:id", async (req, res) => {
  console.log("index req, body:", req.params, req.body);
  try {
    const { id } = req.params;
    const { editMaterialName, editMaterialDescription } = req.body;
    const updateMaterial = await pool.query(
      `UPDATE material SET material_name = '${editMaterialName}', material_description = '${editMaterialDescription}' WHERE material_id = ${id}`
    );
    res.status(200).json(updateMaterial.rows);
  } catch (error) {
    res.status(400).json({ errorCode: "1003", error: error.message });
    console.error(error);
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
    const getAllMaterials = await pool.query(
      `SELECT * FROM material ORDER BY material_name ASC`
    );
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
    const getAllSuppliers = await pool.query(
      `SELECT * FROM supplier ORDER BY supplier_name ASC`
    );
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
      `SELECT  m.material_id, m.material_name, phm.quantity, phm.is_per_unit, u.unit_name, u.unit_id, phm.phm_id FROM material m 
      INNER JOIN product_has_material phm ON (m.material_id = phm.material_id) 
      INNER JOIN unit u ON (u.unit_id = phm.unit_id) WHERE (product_id = ${id});`
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
    res.json(reformattedArray);
  } catch (err) {
    console.error("Error source productHasMaterials", err.message);
  }
});

//Get all transactions for material
app.get("/materialHasTransactions/:id", async (req, res) => {
  try {
    const { id } = req.params;

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

app.get("/transaction", async (req, res) => {
  try {
    const transactionData = await pool.query(
      `SELECT t.transaction_id, t.cost, t.quantity, t.transaction_date, u.unit_name, s.supplier_name, m.material_name FROM transaction t INNER JOIN unit u ON (t.unit_id = u.unit_id) INNER JOIN supplier s ON (t.supplier_id = s.supplier_id) INNER JOIN material m ON (t.material_id = m.material_id) ORDER BY t.transaction_date DESC`
    );
    res.json(transactionData.rows);
  } catch (err) {
    console.error("Get all transaction data", err.message);
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
    res.json("Product deleted!");
  } catch (error) {
    res.status(400).json({ errorCode: "1002", error: error.message });
    console.error(error);
  }
});

app.delete("/productHasMaterial/:phmID", async (req, res) => {
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

app.delete("/supplier/:supplierID", async (req, res) => {
  try {
    const { supplierID } = req.params;
    const deleteSupplier = await pool.query(
      `DELETE FROM supplier WHERE supplier_id = ${supplierID}`
    );
    res.json("Supplier deleted!");
  } catch (error) {
    console.error("DELETE error in Index", error);
  }
});

app.delete("/material/:materialID", async (req, res) => {
  try {
    const { materialID } = req.params;
    const deleteMaterial = await pool.query(
      `DELETE FROM material WHERE material_id = ${materialID}`
    );
    res.json("Material deleted!");
  } catch (error) {
    console.error("DELETE error in Index", error);
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
      res.json("Transaction deleted!");
    } catch (error) {
      console.error("DELETE error in Index", error);
    }
  }
);

app.delete("/transaction/:transactionID", async (req, res) => {
  try {
    const { transactionID } = req.params;
    const deleteTransaction = await pool.query(
      `DELETE FROM transaction WHERE transaction_id = ${transactionID}`
    );
    res.json("Transaction deleted!");
  } catch (error) {
    console.error("DELETE error in Index", error);
  }
});

/* ------------------------------- END METHODS ------------------------------ */

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
