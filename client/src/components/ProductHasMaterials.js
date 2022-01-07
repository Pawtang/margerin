import { React, Fragment, useState, useEffect } from "react";
import _ from "lodash";
import {
  getMaterials,
  getMaterialsForProduct,
  addMaterialToProduct,
  addTransactionForMaterial,
  deleteMaterialFromProduct,
  deleteTransactionFromMaterial,
  getUnits,
  getSuppliers,
  newMaterial,
  getTransactionsForMaterial,
} from "../middleware/ProductHasMaterialUtils";

const ProductHasMaterials = (props) => {
  //General Purpose
  const [materials, setMaterials] = useState([]);
  const [units, setUnits] = useState([]);

  //Transaction Modal States
  const [suppliers, setSuppliers] = useState([]);
  const [transactionsForMaterial, setTransactionsForMaterial] = useState([]);
  const [modalMaterial, setModalMaterial] = useState({});
  const [transactionSupplier, setTransactionSupplier] = useState("");
  const [transactionUnit, setTransactionUnit] = useState("");
  const [transactionCost, setTransactionCost] = useState("0.00");
  const [transactionQuantity, setTransactionQuantity] = useState("0");
  const [transactionDate, setTransactionDate] = useState("");

  //Product has materials
  const [addMaterial, setAddMaterial] = useState([]);
  const [newUnit, setNewUnit] = useState([]);
  const [newQuantity, setNewQuantity] = useState([]);
  const [materialsForProduct, setMaterialsForProduct] = useState([]);

  //Create new material
  const [newMaterialName, setNewMaterialName] = useState([]);
  const [newMaterialDescription, setNewMaterialDescription] = useState([]);

  const productID = props.productID;

  const handleAddMaterialToProduct = async () => {
    const body = { productID, addMaterial, newUnit, newQuantity };
    await addMaterialToProduct(body);
    const materialArray = await getMaterialsForProduct(productID);
    setMaterialsForProduct(materialArray);
    setAddMaterial("");
    setNewUnit("");
    setNewQuantity("");
  };

  const handleNewMaterial = async (e) => {
    e.preventDefault();
    const body = { newMaterialName, newMaterialDescription };
    await newMaterial(body);
    getMaterials();
  };

  const handleDeleteMaterial = async (materialID) => {
    await deleteMaterialFromProduct(productID, materialID);
    setMaterialsForProduct(
      materialsForProduct.filter(
        (material) => material.material_id !== materialID
      )
    );
    getMaterialsForProduct(productID);
  };

  const clearEntry = () => {
    setNewMaterialName("");
    setNewMaterialDescription("");
  };

  useEffect(() => {
    const loadLists = async () => {
      const allMaterials = await getMaterials();
      const unitList = await getUnits();
      const supplierList = await getSuppliers();
      setMaterials(allMaterials);
      setUnits(unitList);
      setSuppliers(supplierList);
    };
    loadLists();
  }, []);

  useEffect(() => {
    const retrieveMaterialsForProduct = async () => {
      const array = await getMaterialsForProduct(productID);
      setMaterialsForProduct(array);
    };
    retrieveMaterialsForProduct();
  }, [productID]);

  useEffect(() => {
    const retrieveTransactionsForMaterial = async () => {
      console.log("material ID front end: ", modalMaterial.material_id);
      const array = await getTransactionsForMaterial(modalMaterial.material_id);
      console.log("response from back: ", array);
      setTransactionsForMaterial(array);
    };
    retrieveTransactionsForMaterial();
  }, [modalMaterial]);

  return (
    <Fragment>
      {/* ---------------------------- Transaction Modal --------------------------- */}
      <div class="modal fade" tabindex="-1" id="materialTransactionModal">
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                Recent Transactions for {modalMaterial.material_name}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => clearEntry()}
              ></button>
            </div>

            <div class="modal-body">
              <div className="row row-cols-6">
                <div className="col-3">
                  <h6 className="text-center">Supplier</h6>
                </div>
                <div className="col-1">
                  <h6 className="text-center">Quantity</h6>
                </div>
                <div className="col-2">
                  <h6 className="text-center">Unit</h6>
                </div>
                <div className="col-2">
                  <h6 className="text-center">Total Cost</h6>
                </div>
                <div className="col-2">
                  <h6 className="text-center">Date</h6>
                </div>
                <div className="col-2">
                  <h6 className="text-center"></h6>
                </div>
              </div>

              <div className="row row-cols-6 border-bottom py-2 mb-2">
                {/* --------------------------------- Inputs --------------------------------- */}
                {/* -------------------------------- Supplier -------------------------------- */}
                <div className="col-3">
                  <div className="input-group">
                    <select
                      id="inputSupplier"
                      class="form-select"
                      value={transactionSupplier}
                      onChange={(e) => setTransactionSupplier(e.target.value)}
                    >
                      <option disabled value="">
                        Supplier
                      </option>
                      {suppliers.map((supplier) => (
                        <option
                          value={supplier.supplier_id}
                          key={supplier.supplier_id}
                        >
                          {supplier.supplier_name}
                        </option>
                      ))}
                    </select>
                    <button
                      className="btn btn-outline-secondary"
                      data-bs-toggle="modal"
                      data-bs-target="#newMaterialModal"
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* -------------------------------- Quantity -------------------------------- */}
                <div className="col-1">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="0"
                    aria-label="Quantity"
                    value={transactionQuantity}
                    onChange={(e) => {
                      setTransactionQuantity(e.target.value);
                    }}
                  />
                </div>
                {/* ---------------------------------- Unit ---------------------------------- */}
                <div className="col-2">
                  <select
                    id="inputUnits"
                    class="form-select"
                    value={transactionUnit}
                    onChange={(e) => {
                      setTransactionUnit(e.target.value);
                    }}
                  >
                    <option disabled value="">
                      Unit
                    </option>
                    {units.map((unit) => (
                      <option value={unit.unit_id} key={unit.unit_id}>
                        {unit.unit_name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* ---------------------------------- Cost ---------------------------------- */}
                <div className="col-2">
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="0.00"
                      aria-label="cost"
                      step="0.01"
                      value={transactionCost}
                      onChange={(e) => {
                        setTransactionCost(e.target.value);
                      }}
                    />
                  </div>
                </div>
                {/* ---------------------------------- Date ---------------------------------- */}
                <div className="col-2">
                  <input
                    type="date"
                    className="form-control"
                    value={transactionDate}
                    onChange={(e) => setTransactionDate(e.target.value)}
                  />
                </div>

                {/* --------------------------------- Buttons -------------------------------- */}
                <div className="col-2">
                  <button className="btn btn-primary">Add Transaction</button>
                </div>
              </div>
              {/* --------------------------- Enumerated Existing -------------------------- */}
              <div className="row row-cols-6 border-bottom py-2">
                <div className="col">
                  {!_.isEmpty(transactionsForMaterial) &&
                    transactionsForMaterial.map((transaction) => (
                      <div className="col" key={transaction.transaction_id}>
                        <p className="text-center">
                          {transaction.supplier_name}
                        </p>
                      </div>
                    ))}
                </div>
                <div className="col">
                  {!_.isEmpty(transactionsForMaterial) &&
                    transactionsForMaterial.map((transaction) => (
                      <div className="col" key={transaction.transaction_id}>
                        <p className="text-center">{transaction.quantity}</p>
                      </div>
                    ))}
                </div>
                <div className="col">
                  {!_.isEmpty(transactionsForMaterial) &&
                    transactionsForMaterial.map((transaction) => (
                      <div className="col" key={transaction.transaction_id}>
                        <p className="text-center">{transaction.unit_name}</p>
                      </div>
                    ))}
                </div>
                <div className="col">
                  {!_.isEmpty(transactionsForMaterial) &&
                    transactionsForMaterial.map((transaction) => (
                      <div className="col" key={transaction.transaction_id}>
                        <p className="text-center">{transaction.cost}</p>
                      </div>
                    ))}
                </div>
                <div className="col">
                  {!_.isEmpty(transactionsForMaterial) &&
                    transactionsForMaterial.map((transaction) => (
                      <div className="col" key={transaction.transaction_id}>
                        <p className="text-center">
                          {transaction.transaction_date}
                        </p>
                      </div>
                    ))}
                </div>
                <div className="col text-center">
                  {!_.isEmpty(transactionsForMaterial) &&
                    transactionsForMaterial.map((transaction) => (
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="update delete"
                        key={transaction.transaction_id}
                      >
                        <button className="btn btn-outline-primary">
                          <i class="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => {}}
                        >
                          <i class="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------- Material Modal ----------------------------- */}
      <div class="modal fade" tabindex="-1" id="newMaterialModal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add New Material</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => clearEntry()}
              ></button>
            </div>
            <div class="modal-body">
              <form action="" onSubmit={handleNewMaterial}>
                <label for="productName" class="form-label">
                  Material Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="productName"
                  value={newMaterialName}
                  onChange={(e) => setNewMaterialName(e.target.value)}
                />
                <label for="productDescription" class="form-label">
                  Material Description
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="productDescription"
                  value={newMaterialDescription}
                  onChange={(e) => setNewMaterialDescription(e.target.value)}
                />
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => clearEntry()}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Add material
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row shadow-sm mx-auto pt-2">
        <div className="row row-cols-5 mx-auto">
          <div className="col">
            <h6 className="text-center">Material</h6>
          </div>
          <div className="col">
            <h6 className="text-center">Quantity</h6>
          </div>
          <div className="col">
            <h6 className="text-center">Unit</h6>
          </div>
          <div className="col">
            <h6 className="text-center">Cost</h6>
          </div>
          <div className="col">
            <h6 className="text-center">Edit</h6>
          </div>
        </div>

        {materialsForProduct.map((material) => (
          <div
            className="row row-cols-5 border-bottom py-2 mx-auto"
            key={material.material_id}
          >
            <div className="col">
              <p className="text-center">{material.material_name}</p>
            </div>
            <div className="col">
              <p className="text-center">{material.quantity}</p>
            </div>
            <div className="col">
              <p className="text-center">{material.unit_name}</p>
            </div>
            <div className="col text-center">
              <button
                className="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#materialTransactionModal"
                onClick={() => {
                  setModalMaterial(material);
                }}
              >
                $7.99 <i class="bi bi-pencil-square"></i>
              </button>
            </div>
            <div className="col text-center">
              <div
                className="btn-group"
                role="group"
                aria-label="update delete"
              >
                <button className="btn btn-outline-primary">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDeleteMaterial(material.material_id)}
                >
                  <i class="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="row row-cols-5 my-2 mx-auto">
          <div class="col-3">
            <div className="input-group">
              <select
                id="inputMaterialName"
                class="form-select"
                value={addMaterial}
                onChange={(e) => setAddMaterial(e.target.value)}
              >
                <option disabled value="">
                  Material
                </option>
                {materials.map((material) => (
                  <option
                    value={material.material_id}
                    key={material.material_id}
                  >
                    {material.material_name}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target="#newMaterialModal"
              >
                +
              </button>
            </div>
          </div>
          <div class="col-2">
            <input
              type="number"
              class="form-control"
              placeholder="Quantity"
              aria-label="Quantity"
              value={newQuantity}
              onChange={(e) => {
                setNewQuantity(e.target.value);
              }}
            />
          </div>

          <div className="col-2">
            <select
              id="inputUnits"
              class="form-select"
              value={newUnit}
              onChange={(e) => setNewUnit(e.target.value)}
            >
              <option disabled value="">
                Unit
              </option>
              {units.map((unit) => (
                <option value={unit.unit_id} key={unit.unit_id}>
                  {unit.unit_name}
                </option>
              ))}
            </select>
          </div>
          <div className="col text-center text-muted">
            <p className="fw-light fst-italic py-1">Calculated field</p>
          </div>
          <div className="col text-center">
            <button
              className="btn btn-outline-primary"
              onClick={() => handleAddMaterialToProduct()}
            >
              Add Material
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductHasMaterials;
