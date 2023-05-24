require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorHandling = require("./middleware/errorHandling");

// app.use(cors({ origin: "http://localhost:3000" }));

app.use(
  cors({
    origin: [
      "https://www.marger.in",
      "margerin-client.up.railway.app",
      "https://margerin-server.up.railway.app",
      "https://margerin-server.up.railway.app/register",
    ],
  })
);

app.use(express.json()); //req.body
app.use(errorHandling);
// for local
// const port = process.env.REACT_APP_PORT || 5000;
//  for deploy
const port = process.env.PORT || 3000;

//ROUTES//
/* ----------------------------- Authentication ----------------------------- */

const authenticateToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1]; //undefined or token, split after "Bearer"
  if (token == null || token == "") {
    return res.status(401).json("Authentication Failed");
    // return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, user) => {
    if (error) {
      console.error(error);
      if (error.name == "TokenExpiredError") {
        await pool
          .query(`DELETE FROM web_sessions WHERE token = '$1'`, [token])
          .catch((error) => console.error(error));
      }
      return res.status(401).json("Authorization expired, please log back in");
    }
    const checkExists = await pool.query(
      `SELECT * FROM web_sessions WHERE token = '${token}'`
    );
    if (checkExists.rowCount == 0) {
      return res.status(401).json("Authorization expired, please log back in");
    }
    req.user = user;
    next();
  });
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 10000,
  });
};

app.get("/tokentest", authenticateToken, async (req, res, next) => {
  try {
    res.status(200);
  } catch (error) {
    next(error);
  }
});

app.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashbrowns = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      `INSERT INTO users (username, email, hash) VALUES($1, $2, $3) RETURNING *`,
      [username, email, hashbrowns]
    );
    const userid = newUser.rows[0].id;

    const accessToken = createToken(userid);
    const postSession = await pool.query(
      `INSERT INTO web_sessions (userid, token) VALUES($1, $2) RETURNING *`,
      [userid, accessToken]
    );
    res.status(200).json(postSession.rows[0]);
  } catch (error) {
    // console.error(error);
    if (error.code == "23505") {
      res.status(409).json("Email is already in use");
    } else next(error);
  }
});

app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const databaseHash = await pool.query(
      `SELECT * FROM users WHERE (users.email = $1)`,
      [email]
    );
    const id = databaseHash.rows[0].id;
    const validation = await validate(password, databaseHash.rows[0].hash);
    if (validation) {
      const accessToken = createToken(id);
      const postSession = await pool.query(
        `INSERT INTO web_sessions (userid, token) VALUES($1, $2) RETURNING *`,
        [id, accessToken]
      );
      res
        .status(200)
        .json({ accessToken: accessToken, message: "Login successful" });
    } else {
      throw new Error("Incorrect password");
    }
  } catch (error) {
    next(error);
  }
});

const validate = async (password, hash) => {
  const validation = await bcrypt.compare(password, hash);
  return validation;
};

/* ----------------------------- CREATE METHODS ----------------------------- */
//create a product
app.post("/product", authenticateToken, async (req, res, next) => {
  try {
    const { newProductName, newProductDescription } = req.body;

    const newProduct = await pool.query(
      `INSERT INTO product (product_name, product_description, userid) VALUES($1, $2, $3) RETURNING *`,
      [newProductName, newProductDescription, req.user.id]
    );

    res.status(200).json(newProduct.rows);
  } catch (error) {
    next(error);
  }
});

//create a material
app.post("/material", authenticateToken, async (req, res, next) => {
  try {
    const { newMaterialName, newMaterialDescription } = req.body;
    const newMaterial = await pool.query(
      `INSERT INTO material (material_name, material_description, userid) VALUES($1, $2, $3) RETURNING *`,
      [newMaterialName, newMaterialDescription, req.user.id]
    );
    res.status(200).json(newMaterial.rows);
  } catch (error) {
    next(error);
  }
});

//create a supplier
app.post("/supplier", authenticateToken, async (req, res, next) => {
  try {
    const { newSupplierName } = req.body;
    const newSupplier = await pool.query(
      `INSERT INTO supplier (supplier_name, userid) VALUES($1, $2) RETURNING *`,
      [newSupplierName, req.user.id]
    );
    res.status(200).json(newSupplier.rows[0]);
  } catch (error) {
    next(error);
  }
});

//create a supplier detailed
app.post("/supplier/new", authenticateToken, async (req, res, next) => {
  try {
    const { newSupplierName, newSupplierContactName, newSupplierphone } =
      req.body;
    const newSupplier = await pool.query(
      `INSERT INTO supplier (supplier_name, contact_name, supplier_phone, userid) VALUES($1, $2, $3, $4) RETURNING *`,
      [newSupplierName, newSupplierContactName, newSupplierphone, req.user.id]
    );
    res.status(200).json(newSupplier.rows[0]);
  } catch (error) {
    next(error);
  }
});

//Add a material to a product
app.post("/productHasMaterial", authenticateToken, async (req, res, next) => {
  try {
    const { productID, addMaterial, newUnit, newQuantity, isPerUnit } =
      req.body;
    const productHasMaterial = await pool.query(
      `INSERT INTO product_has_material (product_id, material_id, unit_id, quantity, is_per_unit, userid) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
      [productID, addMaterial, newUnit, newQuantity, isPerUnit, req.user.id]
    );
    res.status(200).json(productHasMaterial.rows);
  } catch (error) {
    next(error);
  }
});

//add a transaction to a material
app.post(
  "/materialHasTransaction",
  authenticateToken,
  async (req, res, next) => {
    try {
      const {
        transactionSupplier,
        materialID,
        transactionUnit,
        transactionCost,
        transactionQuantity,
        transactionDate,
      } = req.body;
      const productHasMaterial = await pool.query(
        `INSERT INTO transaction (supplier_id, material_id, unit_id, cost, quantity, transaction_date, userid) VALUES($1, $2, $3, $4, $5, TO_DATE($6, 'YYYY-MM-DD'), $7) RETURNING *`,
        [
          transactionSupplier,
          materialID,
          transactionUnit,
          transactionCost,
          transactionQuantity,
          transactionDate,
          req.user.id,
        ]
      );
      res.status(200).json(productHasMaterial.rows);
    } catch (error) {
      next(error);
    }
  }
);

//add a transaction to a material
app.post("/transaction", authenticateToken, async (req, res, next) => {
  try {
    const {
      newTransactionDate,
      newTransactionMaterial,
      newTransactionSupplier,
      newTransactionUnit,
      newTransactionCost,
      newTransactionQuantity,
    } = req.body;
    const newTransaction = await pool.query(
      `INSERT INTO transaction (supplier_id, material_id, unit_id, cost, quantity, transaction_date, userid) VALUES($1, $2, $3, $4, $5, TO_DATE($6, 'YYYY-MM-DD'), $7) RETURNING *`,
      [
        newTransactionSupplier,
        newTransactionMaterial,
        newTransactionUnit,
        newTransactionCost,
        newTransactionQuantity,
        newTransactionDate,
        req.user.id,
      ]
    );
    res.status(200).json(newTransaction.rows);
  } catch (error) {
    next(error);
  }
});

/* ----------------------------- UPDATE METHODS ----------------------------- */

//Update price of an item
app.put("/product/price/:id", authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productPrice } = req.body;
    const updatePrice = await pool.query(
      `UPDATE product SET price = $1 WHERE product_id = $2`,
      [productPrice, id]
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

app.put("/product/yield/:id", authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productYield } = req.body;

    const updateYield = await pool.query(
      `UPDATE product SET yield = $1 WHERE product_id = $2`,
      [productYield, id]
    );
    res.status(200).json(updateYield.rows);
  } catch (error) {
    next(error);
  }
});

app.put("/supplier/edit/:id", authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { editSupplierName, editSupplierContactName, editSupplierPhone } =
      req.body;
    const updateSupplier = await pool.query(
      `UPDATE supplier SET supplier_name = $1, contact_name = $2, supplier_phone = $3 WHERE supplier_id = $4`,
      [editSupplierName, editSupplierContactName, editSupplierPhone, id]
    );
    res.status(200).json(updateSupplier.rows);
  } catch (error) {
    next(error);
  }
});

app.put("/transaction/edit/:id", authenticateToken, async (req, res, next) => {
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
    next(error);
  }
});

app.put("/material/edit/:id", authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { editMaterialName, editMaterialDescription } = req.body;
    const updateMaterial = await pool.query(
      `UPDATE material SET material_name = '${editMaterialName}', material_description = '${editMaterialDescription}' WHERE material_id = ${id}`
    );
    res.status(200).json(updateMaterial.rows);
  } catch (error) {
    next(error);
  }
});

app.put(
  "/productHasMaterial/edit/:id",
  authenticateToken,
  async (req, res, next) => {
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
      next(error);
    }
  }
);

/* ------------------------------- GET METHODS ------------------------------ */
//Get all products
app.get("/products", authenticateToken, async (req, res, next) => {
  try {
    const getAllProducts = await pool.query(
      `SELECT * FROM product WHERE userid = ${req.user.id} ORDER BY product_name ASC`
    );
    res.status(200).json(getAllProducts.rows);
  } catch (error) {
    next(error);
  }
});

//Get all materials
app.get("/materials", authenticateToken, async (req, res, next) => {
  try {
    const getAllMaterials = await pool.query(
      `SELECT * FROM material WHERE userid = ${req.user.id} ORDER BY material_name ASC`
    );
    res.status(200).json(getAllMaterials.rows);
  } catch (error) {
    next(error);
  }
});

//Get all units
app.get("/units", authenticateToken, async (req, res, next) => {
  try {
    const getAllUnits = await pool.query(`SELECT * FROM unit`);
    res.status(200).json(getAllUnits.rows);
  } catch (error) {
    next(error);
  }
});

//Get all suppliers
app.get("/suppliers", authenticateToken, async (req, res, next) => {
  try {
    const getAllSuppliers = await pool.query(
      `SELECT * FROM supplier WHERE userid = ${req.user.id} ORDER BY supplier_name ASC`
    );
    res.status(200).json(getAllSuppliers.rows);
  } catch (error) {
    next(error);
  }
});

//get a product
app.get("/product/:id", authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const getProduct = await pool.query(
      `SELECT * FROM product WHERE product_id = ${id} AND userid = ${req.user.id}`
    );
    res.status(200).json(getProduct.rows[0]);
  } catch (error) {
    next(error);
  }
});

//Get all materials for product
// TODO: Get the average as part of this function?
app.get(
  "/productHasMaterials/:id",
  authenticateToken,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const relatedMaterials = await pool.query(
        `SELECT  m.material_id, m.material_name, phm.quantity, phm.is_per_unit, u.unit_name, u.unit_id, phm.phm_id FROM material m 
      INNER JOIN product_has_material phm ON (m.material_id = phm.material_id) 
      INNER JOIN unit u ON (u.unit_id = phm.unit_id) WHERE (product_id = ${id}) AND phm.userid = ${req.user.id} ORDER BY m.material_name ASC;`
      );
      const reformattedArray = await Promise.all(
        relatedMaterials.rows.map(async (material) => {
          const returned = await pool.query(
            `SELECT SUM(cost::numeric / quantity::numeric) / COUNT(cost) AS avgcost FROM transaction WHERE material_id = '${material.material_id}' AND unit_id = '${material.unit_id}' AND transaction.userid = ${req.user.id}`
          );

          return {
            ...material,
            avgcost: Number(parseFloat(returned.rows[0].avgcost).toFixed(2)),
          };
        })
      );
      res.status(200).json(reformattedArray);
    } catch (error) {
      next(error);
    }
  }
);

//Get all transactions for material
app.get(
  "/materialHasTransactions/:id",
  authenticateToken,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const relatedTransactions = await pool.query(
        `SELECT  t.transaction_id, t.cost, t.quantity, t.transaction_date, s.supplier_name, s.supplier_id, u.unit_name, u.unit_id FROM transaction t 
      INNER JOIN supplier s ON (t.supplier_id = s.supplier_id) 
      INNER JOIN unit u ON (t.unit_id = u.unit_id) WHERE (material_id = ${id});`
      );
      res.status(200).json(relatedTransactions.rows);
    } catch (error) {
      next(error);
    }
  }
);

app.get("/transaction", authenticateToken, async (req, res, next) => {
  try {
    const transactionData = await pool.query(
      `SELECT t.transaction_id, t.cost, t.quantity, t.transaction_date, u.unit_id, u.unit_name, s.supplier_id, s.supplier_name, m.material_id, m.material_name FROM transaction t INNER JOIN unit u ON (t.unit_id = u.unit_id) INNER JOIN supplier s ON (t.supplier_id = s.supplier_id) INNER JOIN material m ON (t.material_id = m.material_id) WHERE t.userid = $1 ORDER BY t.transaction_date DESC`,
      [req.user.id]
    );
    res.status(200).json(transactionData.rows);
  } catch (error) {
    next(error);
  }
});

/* ----------------------------- DELETE METHODS ----------------------------- */

//TODO: Delete all product_id's from phm table
app.delete("/product/:id", authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProduct = await pool.query(
      `DELETE FROM product WHERE product_id = ${id}
      `
    );
    res.status(200).json("Product deleted!");
  } catch (error) {
    next(error);
  }
});

app.delete(
  "/productHasMaterial/:phmID",
  authenticateToken,
  async (req, res) => {
    try {
      const { phmID } = req.params;
      const deleteMaterial = await pool.query(
        `DELETE FROM product_has_material WHERE phm_id = ${phmID}`
      );
      res.status(200).json("Material deleted!");
    } catch (error) {
      next(error);
    }
  }
);

app.delete(
  "/supplier/:supplierID",
  authenticateToken,
  async (req, res, next) => {
    try {
      const { supplierID } = req.params;
      const deleteSupplier = await pool.query(
        `DELETE FROM supplier WHERE supplier_id = ${supplierID}`
      );
      res.status(200).json("Supplier deleted!");
    } catch (error) {
      next(error);
    }
  }
);

app.delete(
  "/material/:materialID",
  authenticateToken,
  async (req, res, next) => {
    try {
      const { materialID } = req.params;
      const deleteMaterial = await pool.query(
        `DELETE FROM material WHERE material_id = ${materialID}`
      );
      res.status(200).json("Material deleted!");
    } catch (error) {
      next(error);
    }
  }
);

app.delete(
  "/materialHasTransaction/:materialID/:transactionID",
  authenticateToken,
  async (req, res, next) => {
    try {
      const { materialID, transactionID } = req.params;
      const deleteTransaction = await pool.query(
        `DELETE FROM transaction WHERE material_id = ${materialID} AND transaction_id = ${transactionID}`
      );
      res.status(200).json("Transaction deleted!");
    } catch (error) {
      next(error);
    }
  }
);

app.delete(
  "/transaction/:transactionID",
  authenticateToken,
  async (req, res, next) => {
    try {
      const { transactionID } = req.params;
      const deleteTransaction = await pool.query(
        `DELETE FROM transaction WHERE transaction_id = ${transactionID}`
      );
      res.status(200).json("Transaction deleted!");
    } catch (error) {
      next(error);
    }
  }
);

app.delete("/logout", authenticateToken, async (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1]; //undefined or token, split after "Bearer"

  try {
    const { userID } = req.user.id.toString();
    const logoutres = await pool.query(
      `DELETE FROM web_sessions WHERE token = $1`,
      [token]
    );

    res.status(200).json("Logged out");
  } catch (error) {
    next(error);
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

app.listen(port, "0.0.0.0", () => {
  console.log(`server has started on port ${port}`);
});
