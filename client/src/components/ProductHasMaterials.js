import { React, Fragment, useState, useEffect } from "react";
import _ from "lodash";
import dayjs from "dayjs";
import AddPropModal from "./AddPropModal";
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
  const productID = props.productID;
  const setProductAverageCost = props.setProductAverageCost;
  const todayDate = new Date().toISOString().split("T")[0];

  const [materials, setMaterials] = useState([]);
  const [units, setUnits] = useState([]);

  //Transaction Modal States
  const [suppliers, setSuppliers] = useState([]);
  const [transactionsForMaterial, setTransactionsForMaterial] = useState([]);
  const [modalMaterial, setModalMaterial] = useState({});
  const [transactionSupplier, setTransactionSupplier] = useState("");
  const [transactionUnit, setTransactionUnit] = useState("1");
  const [transactionCost, setTransactionCost] = useState("0.00");
  const [transactionQuantity, setTransactionQuantity] = useState("0");
  const [transactionDate, setTransactionDate] = useState(todayDate);

  //Product has materials
  const [addMaterial, setAddMaterial] = useState([]);
  const [newUnit, setNewUnit] = useState("1");
  const [newQuantity, setNewQuantity] = useState([]);
  const [materialsForProduct, setMaterialsForProduct] = useState([]);

  //Create new material
  const [newMaterialName, setNewMaterialName] = useState([]);
  const [newMaterialDescription, setNewMaterialDescription] = useState([]);

  /* --------------------------- Transaction Methods -------------------------- */

  const handleAddTransactionForMaterial = async () => {
    console.log("Trying to add transaction");
    let materialID = modalMaterial.material_id;
    const body = {
      transactionSupplier,
      materialID,
      transactionUnit,
      transactionCost,
      transactionQuantity,
      transactionDate,
    };
    await addTransactionForMaterial(body);
    const transactionArray = await retrieveTransactionsForMaterial();
    console.log(transactionArray);
    retrieveTransactionsForMaterial();
    retrieveMaterialsForProduct();
    clearTransactionEntry();
  };

  const retrieveTransactionsForMaterial = async () => {
    if (_.isEmpty(modalMaterial)) return;
    const array = await getTransactionsForMaterial(modalMaterial.material_id);
    setTransactionsForMaterial(array);
  };

  const handleDeleteTransaction = async (transactionID) => {
    const materialID = modalMaterial.material_id;
    await deleteTransactionFromMaterial(materialID, transactionID);
    setTransactionsForMaterial(
      transactionsForMaterial.filter(
        (transaction) => transaction.transaction_id !== transactionID
      )
    );
    retrieveMaterialsForProduct();
  };

  useEffect(() => {
    retrieveTransactionsForMaterial();
  }, [modalMaterial]);

  /* ---------------------------- Material Methods ---------------------------- */

  const handleAddMaterialToProduct = async () => {
    const body = { productID, addMaterial, newUnit, newQuantity };
    await addMaterialToProduct(body);
    const materialArray = await getMaterialsForProduct(productID);
    setMaterialsForProduct(materialArray);
    setAddMaterial("");
    setNewUnit("");
    setNewQuantity("");
    clearMaterialEntry();
  };

  const handleNewMaterial = async (e) => {
    e.preventDefault();
    const body = { newMaterialName, newMaterialDescription };
    await newMaterial(body);
    const materials = await getMaterials();
    setMaterials(materials);
  };

  const handleDeleteMaterial = async (phmID) => {
    await deleteMaterialFromProduct(phmID);
    setMaterialsForProduct(
      materialsForProduct.filter((material) => material.phm_id !== phmID)
    );
    retrieveMaterialsForProduct();
  };

  const clearMaterialEntry = () => {
    setNewMaterialName("");
    setNewMaterialDescription("");
    setModalMaterial({});
  };

  const clearTransactionEntry = () => {
    setTransactionSupplier("");
    setTransactionUnit("");
    setTransactionCost("0.00");
    setTransactionQuantity("0");
    setTransactionDate(todayDate);
  };

  const loadLists = async () => {
    const allMaterials = await getMaterials();
    const unitList = await getUnits();
    const supplierList = await getSuppliers();
    setMaterials(allMaterials);
    setUnits(unitList);
    setSuppliers(supplierList);
  };

  const calculateProductCost = () => {
    if (_.isEmpty(materialsForProduct)) {
      setProductAverageCost("No Cost Data");
      return;
    }
    const accumulator = (acc, material) => {
      return acc + Number(material.avgcost) * material.quantity;
    };
    const calculatedCost = parseFloat(
      materialsForProduct.reduce(accumulator, 0)
    ).toFixed(2);
    console.log("mat", materialsForProduct);
    console.log("CC", calculatedCost);
    setProductAverageCost(calculatedCost);
  };

  useEffect(() => {
    loadLists();
  }, []);

  const retrieveMaterialsForProduct = async () => {
    const array = await getMaterialsForProduct(productID);
    setMaterialsForProduct([...array]);
  };

  useEffect(() => {
    const asyncGet = async () => {
      await retrieveMaterialsForProduct();
    };
    asyncGet();
  }, [productID]);

  useEffect(() => {
    calculateProductCost();
  }, [materialsForProduct]);

  console.log("product's materials:", materialsForProduct);

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
                onClick={() => clearTransactionEntry()}
              ></button>
            </div>

            <div class="modal-body">
              <div className="row row-cols-6 gx-1">
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

              <div className="row row-cols-6 border-bottom py-2 mb-2 gx-1">
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
                    <option disabled selected value="" className="text-muted">
                      Select Unit...
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
                      class="form-control user-select-all"
                      placeholder="0.00"
                      aria-label="cost"
                      step="0.01"
                      min="0"
                      value={transactionCost}
                      onChange={(e) => {
                        setTransactionCost(e.target.value);
                      }}
                      onBlur={() =>
                        setTransactionCost(
                          parseFloat(transactionCost).toFixed(2)
                        )
                      }
                    />
                  </div>
                </div>
                {/* ---------------------------------- Date ---------------------------------- */}
                <div className="col-2">
                  <input
                    type="date"
                    className="form-control user-select-all"
                    value={transactionDate}
                    onChange={(e) => setTransactionDate(e.target.value)}
                  />
                </div>

                {/* --------------------------------- Buttons -------------------------------- */}
                <div className="col-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddTransactionForMaterial()}
                  >
                    Add Transaction
                  </button>
                </div>
              </div>
              {/* --------------------------- Enumerated Existing -------------------------- */}
              {!_.isEmpty(transactionsForMaterial) &&
                transactionsForMaterial.map((transaction) => (
                  <div className="row row-cols-6 border-bottom py-2 mb-2 gx-0">
                    <div className="col-3">
                      <div className="col" key={transaction.transaction_id}>
                        <p className="text-center">
                          {transaction.supplier_name}
                        </p>
                      </div>
                    </div>
                    <div className="col-1">
                      <div className="col" key={transaction.transaction_id}>
                        <p className="text-center">{transaction.quantity}</p>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="col" key={transaction.transaction_id}>
                        <p className="text-center">{transaction.unit_name}</p>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="col" key={transaction.transaction_id}>
                        <p className="text-center">{transaction.cost}</p>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="col" key={transaction.transaction_id}>
                        <p className="text-center">
                          {dayjs(transaction.transaction_date).format(
                            "MMM D, YYYY"
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="col-2 text-center">
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
                          onClick={() => {
                            handleDeleteTransaction(transaction.transaction_id);
                          }}
                        >
                          <i class="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <AddPropModal
        itemType="Material"
        const
        handleAddItem={handleNewMaterial}
        const
        newItemName={newMaterialName}
        const
        newItemDescription={newMaterialDescription}
        const
        setNewItemName={setNewMaterialName}
        const
        setNewItemDescription={setNewMaterialDescription}
        const
        clearEntry={clearMaterialEntry}
      />

      <div className="row mx-auto pt-2 gx-0">
        <div className="row row-cols-6 pt-3 mx-auto gx-1 ">
          <div className="col-3">
            <h6 className="text-center">Material</h6>
          </div>
          <div className="col-1">
            <h6 className="text-center">Quantity</h6>
          </div>
          <div className="col-2">
            <h6 className="text-center">Unit</h6>
          </div>
          <div className="col-2">
            <h6 className="text-center">Per Unit</h6>
          </div>
          <div className="col-2">
            <h6 className="text-center">Cost</h6>
          </div>
          <div className="col-2">
            <h6 className="text-center"></h6>
          </div>
        </div>

        <div className="row row-cols-6 pt-3 mx-auto gx-1 ">
          <div class="col-3">
            <div className="input-group">
              <select
                id="inputMaterialName"
                class="form-select"
                value={addMaterial}
                onChange={(e) => setAddMaterial(e.target.value)}
              >
                <option disabled value="" className="text-muted">
                  Add Material...
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

          <div class="col-1">
            <input
              type="number"
              class="form-control"
              placeholder="0"
              min="0"
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
              <option disabled selected value="" className="text-muted">
                Select Unit...
              </option>
              {units.map((unit) => (
                <option value={unit.unit_id} key={unit.unit_id}>
                  {unit.unit_name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-2 text-center">
            <input
              type="checkbox"
              class="btn-check"
              id="btn-check-outlined"
              autocomplete="off"
            />
            <label class="btn btn-outline-primary" for="btn-check-outlined">
              Per Unit
            </label>
          </div>

          <div className="col-2 text-center text-muted mx-auto ">
            <p className="fw-light fst-italic py-1 mx-auto">Calculated field</p>
          </div>

          <div className="col-2 text-center">
            <button
              className="btn btn-outline-primary"
              onClick={() => handleAddMaterialToProduct()}
            >
              Add Material
            </button>
          </div>
        </div>

        {materialsForProduct.map((material) => (
          <div
            className="row row-cols-6 border-bottom py-1 mx-auto"
            key={material.phm_id}
          >
            <div className="col">
              <p className="text-center my-2">{material.material_name}</p>
            </div>
            <div className="col">
              <p className="text-center my-2">{material.quantity}</p>
            </div>
            <div className="col">
              <p className="text-center my-2">{material.unit_name}</p>
            </div>

            <div className="col-2">
              <p className="text-center my-2">Yes</p>
            </div>
            <div className="col text-center">
              <button
                key="displayAverageCost"
                className={
                  material.avgcost
                    ? `btn btn-outline-success`
                    : `btn btn-outline-secondary`
                }
                data-bs-toggle="modal"
                data-bs-target="#materialTransactionModal"
                onClick={() => {
                  setModalMaterial(material);
                }}
              >
                {material.avgcost
                  ? `$${parseFloat(
                      material.avgcost * material.quantity
                    ).toFixed(2)}`
                  : "$ --.--"}{" "}
                <i class="bi bi-pencil-square"></i>
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
                  onClick={() => handleDeleteMaterial(material.phm_id)}
                >
                  <i class="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ProductHasMaterials;
