import { React, Fragment, useState, useEffect } from "react";
import {
  getMaterials,
  getMaterialsForProduct,
  addMaterialToProduct,
  deleteMaterialFromProduct,
  getUnits,
  newMaterial,
} from "../middleware/ProductHasMaterialUtils";

const ProductHasMaterials = (props) => {
  const [materials, setMaterials] = useState([]);
  const [units, setUnits] = useState([]);
  const [addMaterial, setAddMaterial] = useState([]);
  const [newUnit, setNewUnit] = useState([]);
  const [newQuantity, setNewQuantity] = useState([]);
  const [productHasMaterials, setProductHasMaterials] = useState([]);
  const productID = props.productID;

  const [newMaterialName, setNewMaterialName] = useState([]);
  const [newMaterialDescription, setNewMaterialDescription] = useState([]);

  const handleAddMaterial = () => {
    const body = { productID, addMaterial, newUnit, newQuantity };
    addMaterialToProduct(setProductHasMaterials, body);
    setAddMaterial("");
    setNewUnit("");
    setNewQuantity("");
    getMaterialsForProduct(productID, setProductHasMaterials);
    console.log(addMaterial, newUnit, newQuantity);
  };

  useEffect(() => {
    getMaterials(setMaterials);
    getUnits(setUnits);
  }, []);

  useEffect(() => {
    getMaterialsForProduct(productID, setProductHasMaterials);
  }, [productID]);

  const handleNewMaterial = (e) => {
    e.prevenDefault();
    const body = { newMaterialName, newMaterialDescription };
    newMaterial(body);
  };

  const clearEntry = () => {
    setNewMaterialName("");
    setNewMaterialDescription("");
  };

  return (
    <Fragment>
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
                    onClick={() => clearEntry()}
                  >
                    Add material
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

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
                <button
                  className="btn btn-outline-danger"
                  onClick={() =>
                    deleteMaterialFromProduct(
                      material.material_id,
                      productHasMaterials,
                      setProductHasMaterials
                    )
                  }
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
                  <option value={material.material_id}>
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
