import { React, Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppNav from "./AppNav";
import {
  getMaterials,
  getMaterialsForProduct,
  addMaterialToProduct,
  getUnits,
} from "../middleware/ProductHasMaterialUtils";

const ProductHasMaterials = (props) => {
  const [materials, setMaterials] = useState([]);
  const [units, setUnits] = useState([]);
  const [newMaterial, setNewMaterial] = useState([]);
  const [newUnit, setNewUnit] = useState([]);
  const [newQuantity, setNewQuantity] = useState([]);
  const [productHasMaterials, setProductHasMaterials] = useState([]);
  const productID = props.productID;

  const handleAddMaterial = () => {
    const body = { productID, newMaterial, newUnit, newQuantity };
    addMaterialToProduct(setProductHasMaterials, body);
    setNewMaterial("");
    setNewUnit("");
    setNewQuantity("");
    getMaterialsForProduct(productID, setProductHasMaterials);
    console.log(newMaterial, newUnit, newQuantity);
  };

  useEffect(() => {
    getMaterials(setMaterials);
    getUnits(setUnits);
  }, []);

  useEffect(() => {
    getMaterialsForProduct(productID, setProductHasMaterials);
  }, [productID]);

  // console.log("material state:", productHasMaterials);

  return (
    // <div className="container  ">
    <Fragment>
      <div className="row shadow-sm mx-auto">
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

        {productHasMaterials.map((material) => (
          <div className="row row-cols-5 border-bottom py-2 mx-auto">
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
              <button className="btn btn-outline-primary">
                $7.99{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </button>
            </div>
            <div className="col text-center">
              <div
                className="btn-group"
                role="group"
                aria-label="update delete"
              >
                <button className="btn btn-outline-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </button>
                <button className="btn btn-outline-danger">
                  <i class="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="row row-cols-5 my-2 mx-auto">
          <div class="col">
            <select
              id="inputMaterialName"
              class="form-select"
              value={newMaterial}
              onChange={(e) => setNewMaterial(e.target.value)}
            >
              <option disabled value="">
                Material
              </option>
              {materials.map((material) => (
                <option value={material.material_id}>
                  {material.material_name}
                </option>
              ))}
            </select>
          </div>
          <div class="col">
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

          <div className="col">
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
                <option value={unit.unit_id}>{unit.unit_name}</option>
              ))}
            </select>
          </div>
          <div className="col text-center text-muted">
            <p className="fw-light fst-italic py-1">Calculated field</p>
          </div>
          <div className="col text-center">
            <button
              className="btn btn-outline-primary"
              onClick={() => handleAddMaterial()}
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
