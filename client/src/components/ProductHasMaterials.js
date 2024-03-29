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
import { useToasts } from "../contexts/ToastContext";
import { useTokens } from "../contexts/UserContext";

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

  const { token } = useTokens();
  const { addToast } = useToasts();
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

  //Edit materials for product
  const [editMaterial, setEditMaterial] = useState("");
  const [editUnit, setEditUnit] = useState("1");
  const [editQuantity, setEditQuantity] = useState("0");
  const [editIsPerUnit, setEditIsPerUnit] = useState(false);

  //Create new material
  const [newMaterialName, setNewMaterialName] = useState([]);
  const [newMaterialDescription, setNewMaterialDescription] = useState([]);

  const [newSupplierName, setNewSupplierName] = useState([]);
  const [rowToEdit, setRowToEdit] = useState("");

  /* --------------------------- Transaction Methods -------------------------- */
  const retrieveTransactionsForMaterial = async () => {
    if (_.isEmpty(modalMaterial)) return;
    const array = await getTransactionsForMaterial(
      modalMaterial.material_id,
      token
    );
    setTransactionsForMaterial(array);
  };

  const handleAddTransactionForMaterial = async () => {
    try {
      let materialID = modalMaterial.material_id;
      const body = {
        transactionSupplier,
        materialID,
        transactionUnit,
        transactionCost,
        transactionQuantity,
        transactionDate,
      };
      await addTransactionForMaterial(body, token);
      await retrieveTransactionsForMaterial();
      await retrieveMaterialsForProduct();
      clearTransactionEntry();
    } catch (error) {
      addToast({
        title: " Database Error",
        type: "Error",
        body: error.message,
      });
    }
  };

  const handleDeleteTransaction = async (transactionID) => {
    const materialID = modalMaterial.material_id;
    await deleteTransactionFromMaterial(materialID, transactionID, token);
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
    try {
      const body = { productID, addMaterial, newUnit, newQuantity, isPerUnit };
      await addMaterialToProduct(body, token);
      const response = await getMaterialsForProduct(productID, token);
      setMaterialsForProduct(response);
      setAddMaterial("");
      setNewUnit("1");
      setNewQuantity("0");
      addToast({
        title: "",
        type: "Success",
        body: "Material added",
      });
    } catch (error) {
      addToast({
        title: " Database Error",
        type: "Error",
        body: error.message,
      });
    }
  };

  const handleEditProductHasMaterial = async (phmID) => {
    try {
      const body = { editMaterial, editQuantity, editUnit, editIsPerUnit };
      await editProductHasMaterial(phmID, body, token);
      retrieveMaterialsForProduct();
      addToast({
        title: " Success",
        type: "Success",
        body: "Product updated",
      });
    } catch (error) {
      addToast({
        title: " Database Error",
        type: "Error",
        body: error.message,
      });
    }
  };

  const clearEdit = () => {
    setEditMaterial("");
    setEditQuantity("");
    setEditUnit("");
    setEditIsPerUnit(false);
  };

  const handleNewMaterial = async (e) => {
    e.preventDefault();
    try {
      const body = { newMaterialName, newMaterialDescription };
      await newMaterial(body, token);
      const materials = await getMaterials(token);
      setMaterials(materials);
      clearMaterialEntry();
      addToast({
        title: " Success",
        type: "Success",
        body: "Material added",
      });
    } catch (error) {
      addToast({
        title: " Database Error",
        type: "Error",
        body: error.message,
      });
    }
  };

  const handleAddSupplier = async (e) => {
    e.preventDefault();
    try {
      const body = { newSupplierName };
      await newSupplier(body, token);
      const suppliers = await getSuppliers(token);
      setSuppliers(suppliers);
      addToast({
        title: " Success",
        type: "Success",
        body: "Supplier added",
      });
    } catch (error) {
      addToast({
        title: " Database Error",
        type: "Error",
        body: error.message,
      });
    }
  };

  const handleDeleteMaterial = async (phmID) => {
    try {
      await deleteMaterialFromProduct(phmID, token);
      setMaterialsForProduct(
        materialsForProduct.filter((material) => material.phm_id !== phmID)
      );
      retrieveMaterialsForProduct();
      addToast({
        title: " Success",
        type: "Success",
        body: "Material deleted",
      });
    } catch (error) {
      addToast({
        title: " Database Error",
        type: "Error",
        body: error.message,
      });
    }
  };

  const clearMaterialEntry = () => {
    setNewMaterialName("");
    setNewMaterialDescription("");
    setModalMaterial({});
  };

  const clearTransactionEntry = () => {
    setTransactionSupplier("");
    setTransactionUnit("1");
    setTransactionCost("0.00");
    setTransactionQuantity("0");
    setTransactionDate(todayDate);
  };

  const clearSupplierEntry = () => {
    setNewSupplierName("");
  };

  const loadLists = async () => {
    try {
      const allMaterials = await getMaterials(token);
      const unitList = await getUnits(token);
      const supplierList = await getSuppliers(token);
      setMaterials(allMaterials);
      setUnits(unitList);
      setSuppliers(supplierList);
    } catch (error) {
      console.error(error);
      addToast({
        title: `Error`,
        type: "Error",
        body: error.message,
      });
    }
  };

  const calculateProductCost = () => {
    if (_.isEmpty(materialsForProduct)) {
      setProductAverageCost("No Cost Data");
      return;
    }

    const batchAccumulator = (acc, material) => {
      if (material.is_per_unit === false) {
        return acc + Number(material.avgcost) * material.quantity;
      } else return acc;
    };

    const perUnitAccumulator = (acc, material) => {
      if (material.is_per_unit === true) {
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
    const array = await getMaterialsForProduct(productID, token);
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

      <div className="mx-auto pt-2 gx-0 p-2 shadow-sm">
        <h3>Add Materials</h3>
        {/* <div className="row pt-3 mx-auto gx-1 "></div> */}

        <div className="p-3 mx-auto gx-1  mb-2 row">
          <div className="col-12 col-md-3 col-sm-6">
            <HeaderColumn display={""} headerText={"Material"} />
            <SelectWithToggleColumn
              display={"col-12"}
              label={"Material"}
              list={materials}
              itemkey={"material_name"}
              newValue={addMaterial}
              setNewValue={setAddMaterial}
              id={"material_id"}
              modalID={"#newMaterialModal"}
            />
          </div>
          <div className="col-12 col-md-2 col-sm-6">
            <HeaderColumn display={" "} headerText={"Quantity"} />
            <EditColumn
              display={""}
              type={"number"}
              label={"Quantity"}
              newValue={newQuantity}
              setNewValue={setNewQuantity}
              placeholder={"0"}
              min={0}
              step={1}
            />
          </div>
          <div className="col-12 col-md-3 col-sm-6">
            <HeaderColumn display={""} headerText={"Unit"} />
            <SelectColumn
              display={""}
              label={"Units"}
              list={units}
              itemkey={"unit_name"}
              id={"unit_id"}
              currentState={1}
              newValue={newUnit}
              setNewValue={setNewUnit}
            />
          </div>
          {/* Second set */}
          <div className="col-md-1 col-sm-2">
            <HeaderColumn display={""} headerText={""} />
            <IsPerUnitCheck
              display={""}
              id={"new-ipu-check"}
              currentState={false}
              isPerUnit={isPerUnit}
              setIsPerUnit={setIsPerUnit}
            />
          </div>

          <div className="col-md-3 col-sm-4">
            <HeaderColumn display={""} headerText={""} />
            <div className="text-center d-grid">
              <button
                className="btn btn-outline-primary"
                onClick={() => handleAddMaterialToProduct()}
              >
                Add Material
                {/* <i
                  className="bi bi-plus-lg lh-1"
                  style={{ fontSize: "1rem" }}
                ></i> */}
              </button>
            </div>
          </div>
        </div>
        {/* --------------------------- Enumerated Existing -------------------------- */}
        <h3>Bill of Materials</h3>
        {/* Hide table on small */}
        <div className="d-none d-sm-block">
          <div className="p-3 mx-auto gx-1 mb-2 row">
            <div className="col-3">
              <HeaderColumn display={""} headerText={"Material"} />
            </div>
            <div className="col-2">
              <HeaderColumn display={""} headerText={"Quantity"} />
            </div>
            <div className="col-2">
              <HeaderColumn display={""} headerText={"Unit"} />
            </div>
            <div className="col-1">
              <HeaderColumn display={""} headerText={"Per Unit?"} />
            </div>
            <div className="col-2">
              <HeaderColumn display={""} headerText={"Cost"} />
            </div>
            <div className="col-2">
              <HeaderColumn display={""} headerText={"Edit"} />
            </div>
          </div>
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
                <div className="row  border-bottom py-1 mx-auto gx-1">
                  <SelectWithToggleColumn
                    display={"col-3"}
                    label={"Material"}
                    list={materials}
                    itemkey={"material_name"}
                    currentState={material.material_id}
                    newValue={editMaterial}
                    setNewValue={setEditMaterial}
                    id={"material_id"}
                    modalID={"#newMaterialModal"}
                  />
                  <EditColumn
                    display={"col-2"}
                    type={"number"}
                    label={"Quantity"}
                    currentState={material.quantity}
                    newValue={editQuantity}
                    setNewValue={setEditQuantity}
                    placeholder={"0"}
                    min={0}
                    step={1}
                  />
                  <SelectColumn
                    display={"col-2"}
                    label={"Units"}
                    list={units}
                    itemkey={"unit_name"}
                    currentState={material.unit_id}
                    newValue={editUnit}
                    setNewValue={setEditUnit}
                    id={"unit_id"}
                  />
                  <IsPerUnitCheck
                    id={material.phm_id}
                    currentState={material.is_per_unit}
                    isPerUnit={editIsPerUnit}
                    setIsPerUnit={setEditIsPerUnit}
                    display={"col-1"}
                  />
                  <DisplayColumn
                    display={"text-muted text-center border col-2"}
                    content={
                      material.avgcost
                        ? `$${parseFloat(
                            material.avgcost * material.quantity
                          ).toFixed(2)}`
                        : "$ --.--"
                    }
                  />
                  <ButtonAcceptColumn
                    display={"col-2 border d-grid"}
                    editHandler={handleEditProductHasMaterial}
                    resourceID={material.phm_id}
                    setRowToEdit={setRowToEdit}
                    clearEdit={clearEdit}
                  />
                </div>
              );
            })}
        </div>
        <div className="d-block d-sm-none">
          {!_.isEmpty(materialsForProduct) &&
            materialsForProduct.map((material) => {
              return material.phm_id !== rowToEdit ? (
                <div className="card my-4 shadow-sm">
                  <h5 className="card-header">{material.material_name}</h5>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-4">
                        <h6 className="card-title">Quantity</h6>
                        <p className="card-text">{material.quantity}</p>
                      </div>
                      <div className="col-4">
                        <h6 className="card-title">Unit</h6>
                        <p className="card-text">{material.unit_name}</p>
                      </div>
                      <div className="col-4">
                        <h6 className="card-title">Is Per Unit?</h6>
                        <p className="card-text">
                          {material.is_per_unit ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>

                    {/* Edit */}
                    <div className="row">
                      <div className="col-12 mx-auto mt-2">
                        <div className="row mx-1">
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
                      </div>
                    </div>

                    <div className="row mt-2 mx-1 justify-content-around">
                      <div className="col-6">
                        <div className="row">
                          <button
                            className="btn btn-outline-primary"
                            type="button"
                          >
                            Edit <i className="bi bi-pencil-square"></i>
                          </button>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row">
                          <button
                            className="btn btn-outline-danger"
                            type="button"
                            onClick={() => {}}
                          >
                            Delete <i className="bi bi-trash-fill"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card">
                  <div className="card-body">Editing</div>
                </div>
              );
            })}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductHasMaterials;
