import { React, Fragment, useState, useEffect } from "react";
import _ from "lodash";
import AddPropModal from "./AddPropModal";
import TransactionModal from "./TransactionModal";
import DisplayColumn from "./elements/DisplayColumn";
import ButtonAcceptColumn from "./elements/ButtonAcceptColumn";
import ButtonsColumn from "./elements/ButtonsColumn";
import EditColumn from "./elements/EditColumn";
import SelectColumn from "./elements/SelectColumn";
import HeaderColumn from "./elements/HeaderColumn";
import SelectWithToggleColumn from "./elements/SelectWithToggleColumn";
import IsPerUnitCheck from "./elements/IsPerUnitCheck";

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
  newSupplier,
  getTransactionsForMaterial,
  editProductHasMaterial,
} from "../middleware/ProductHasMaterialUtils";

const ProductHasMaterials = (props) => {
  //General Purpose

  const productID = props.productID;
  const productYield = props.productYield;
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
  const [addMaterial, setAddMaterial] = useState("");
  const [newUnit, setNewUnit] = useState("1");
  const [newQuantity, setNewQuantity] = useState("0");
  const [isPerUnit, setIsPerUnit] = useState(false);
  const [materialsForProduct, setMaterialsForProduct] = useState([]);

  //Create new material
  const [newMaterialName, setNewMaterialName] = useState([]);
  const [newMaterialDescription, setNewMaterialDescription] = useState([]);

  const [newSupplierName, setNewSupplierName] = useState([]);
  const [rowToEdit, setRowToEdit] = useState("");

  /* --------------------------- Transaction Methods -------------------------- */

  const handleAddTransactionForMaterial = async () => {
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
    await retrieveTransactionsForMaterial();
    await retrieveMaterialsForProduct();
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
    const body = { productID, addMaterial, newUnit, newQuantity, isPerUnit };
    await addMaterialToProduct(body);
    const materialArray = await getMaterialsForProduct(productID);
    setMaterialsForProduct(materialArray);
    setAddMaterial("");
    setNewUnit("1");
    setNewQuantity("0");
  };

  const handleEditProductHasMaterial = async (phmID) => {
    const body = await editProductHasMaterial(phmID);
  };

  const clearEdit = () => {};

  const handleNewMaterial = async (e) => {
    e.preventDefault();
    const body = { newMaterialName, newMaterialDescription };
    await newMaterial(body);
    const materials = await getMaterials();
    setMaterials(materials);
    clearMaterialEntry();
  };

  const handleAddSupplier = async (e) => {
    e.preventDefault();
    const body = { newSupplierName };
    await newSupplier(body);
    const suppliers = await getSuppliers();
    setSuppliers(suppliers);
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

  const clearSupplierEntry = () => {
    setNewSupplierName("");
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

    const batchAccumulator = (acc, material) => {
      if (material.is_per_unit == false) {
        return acc + Number(material.avgcost) * material.quantity;
      } else return acc;
    };

    const perUnitAccumulator = (acc, material) => {
      if (material.is_per_unit == true) {
        return acc + Number(material.avgcost) * material.quantity;
      } else return acc;
    };

    const batchCost = parseFloat(
      materialsForProduct.reduce(batchAccumulator, 0)
    ).toFixed(2);

    const perUnitCost = parseFloat(
      materialsForProduct.reduce(perUnitAccumulator, 0)
    ).toFixed(2);

    const calculatedCost = parseFloat(
      Number(batchCost) / Number(productYield) + Number(perUnitCost)
    ).toFixed(2);

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
  }, [materialsForProduct, productYield]);

  return (
    <Fragment>
      {/* ---------------------------- Transaction Modal --------------------------- */}

      <TransactionModal
        units={units}
        clearTransactionEntry={clearTransactionEntry}
        handleAddTransactionForMaterial={handleAddTransactionForMaterial}
        handleDeleteTransaction={handleDeleteTransaction}
        modalMaterial={modalMaterial}
        suppliers={suppliers}
        transactionsForMaterial={transactionsForMaterial}
        transactionSupplier={transactionSupplier}
        setTransactionSupplier={setTransactionSupplier}
        transactionQuantity={transactionQuantity}
        setTransactionQuantity={setTransactionQuantity}
        transactionUnit={transactionUnit}
        setTransactionUnit={setTransactionUnit}
        transactionCost={transactionCost}
        setTransactionCost={setTransactionCost}
        transactionDate={transactionDate}
        setTransactionDate={setTransactionDate}
        retrieveTransactionsForMaterial={retrieveTransactionsForMaterial}
      />

      <AddPropModal
        itemType="Material"
        handleAddItem={handleNewMaterial}
        newItemName={newMaterialName}
        newItemDescription={newMaterialDescription}
        setNewItemName={setNewMaterialName}
        setNewItemDescription={setNewMaterialDescription}
        clearEntry={clearMaterialEntry}
      />

      <AddPropModal
        itemType="Supplier"
        handleAddItem={handleAddSupplier}
        newItemName={newSupplierName}
        setNewItemName={setNewSupplierName}
        clearEntry={clearSupplierEntry}
      />

      <div className="row mx-auto pt-2 gx-0">
        <div className="row row-cols-6 pt-3 mx-auto gx-1 ">
          <HeaderColumn display={"col-3"} headerText={"Material"} />
          <HeaderColumn display={"col-2"} headerText={"Quantity"} />
          <HeaderColumn display={"col-2"} headerText={"Unit"} />
          <HeaderColumn display={"col-1"} headerText={"Per Unit"} />
          <HeaderColumn display={"col-2"} headerText={"Cost"} />
          <HeaderColumn display={"col-2"} headerText={""} />
        </div>

        <div className="row row-cols-6 pt-3 mx-auto gx-1 shadow-sm mb-2">
          <SelectWithToggleColumn
            display={"col-3"}
            label={"Material"}
            list={materials}
            itemkey={"material_name"}
            newValue={addMaterial}
            setNewValue={setAddMaterial}
            id={"material_id"}
            modalID={"#newMaterialModal"}
          />
          <EditColumn
            display={"col-2"}
            type={"number"}
            label={"Quantity"}
            newValue={newQuantity}
            setNewValue={setNewQuantity}
            placeholder={"0"}
            min={0}
            step={1}
          />
          <SelectColumn
            display={"col-2"}
            label={"Units"}
            list={units}
            itemkey={"unit_name"}
            newValue={newUnit}
            setNewValue={setNewUnit}
            id={"unit_id"}
          />

          <div className="col-1 text-center">
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check-outlined"
              autoComplete="off"
              value={isPerUnit}
              onClick={() => {
                setIsPerUnit((prevCheck) => !prevCheck);
              }}
            />
            <label
              className="btn btn-outline-secondary"
              htmlFor="btn-check-outlined"
            >
              {isPerUnit ? <i className="bi bi-check"></i> : "--"}
            </label>
          </div>

          {/* Cost */}
          <div className="col-2 text-center text-muted mx-auto ">
            <p className="py-1 mx-auto">
              <i
                className="bi bi-currency-dollar"
                style={{ fontSize: "1.2rem" }}
              ></i>
            </p>
          </div>

          <div className="col-2 text-center d-grid pb-4">
            <button
              className="btn btn-outline-primary"
              onClick={() => handleAddMaterialToProduct()}
            >
              Add Material
            </button>
          </div>
        </div>
        {/* --------------------------- Enumerated Existing -------------------------- */}
        {!_.isEmpty(materialsForProduct) &&
          materialsForProduct.map((material) => {
            return material.phm_id !== rowToEdit ? (
              <div
                className="row row-cols-6 border-bottom py-1 mx-auto gx-1 highlight"
                key={material.phm_id}
              >
                <DisplayColumn
                  display={"col-3 text-center "}
                  content={material.material_name}
                />
                <DisplayColumn
                  display={"col-2 text-center "}
                  content={material.quantity}
                />
                <DisplayColumn
                  display={"col-2 text-center"}
                  content={material.unit_name}
                />
                <DisplayColumn
                  display={"col-1 text-center"}
                  content={material.is_per_unit ? "Yes" : "No"}
                />

                <div className="col-2 d-grid  text-center ">
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
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </div>

                <ButtonsColumn
                  display={"col-2 d-grid"}
                  ID={material.phm_id}
                  handleDeleteResource={handleDeleteMaterial}
                  setRowToEdit={setRowToEdit}
                />
              </div>
            ) : (
              <div className="row row-cols-6 border-bottom py-1 mx-auto gx-1">
                <SelectWithToggleColumn
                  display={"col-3"}
                  label={"Material"}
                  list={materials}
                  itemkey={"material_name"}
                  newValue={addMaterial}
                  setNewValue={setAddMaterial}
                  id={"material_id"}
                  modalID={"#newMaterialModal"}
                />
                <EditColumn
                  display={"col-2"}
                  type={"number"}
                  label={"Quantity"}
                  newValue={newQuantity}
                  setNewValue={setNewQuantity}
                  placeholder={"0"}
                  min={0}
                  step={1}
                />
                <SelectColumn
                  display={"col-2"}
                  label={"Units"}
                  list={units}
                  itemkey={"unit_name"}
                  newValue={newUnit}
                  setNewValue={setNewUnit}
                  id={"unit_id"}
                />

                <IsPerUnitCheck
                  isPerUnit={isPerUnit}
                  setIsPerUnit={setIsPerUnit}
                />
                <DisplayColumn display={"col-2"} />
                <ButtonAcceptColumn
                  display={"col-2 d-grid"}
                  editHandler={handleEditProductHasMaterial}
                  resourceID={material.phm_id}
                  setRowToEdit={setRowToEdit}
                  clearEdit={clearEdit}
                />
              </div>
            );
          })}
      </div>
    </Fragment>
  );
};

export default ProductHasMaterials;
