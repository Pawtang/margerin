import { React, Fragment, useState, useEffect } from "react";
import AppNav from "./AppNav";
import HeaderColumn from "./elements/HeaderColumn";
import DisplayColumn from "./elements/DisplayColumn";
import ButtonsColumn from "./elements/ButtonsColumn";
import ButtonAcceptColumn from "./elements/ButtonAcceptColumn";
import EditColumn from "./elements/EditColumn";
import { getMaterials } from "../middleware/ProductHasMaterialUtils";
import { deleteMaterial, editMaterial } from "../middleware/MaterialUtils";
import { newMaterial } from "../middleware/ProductHasMaterialUtils";
import _ from "lodash";

const ManagerMaterials = () => {
  const [materials, setMaterials] = useState([]);
  /* ------------------------------ New Material ------------------------------ */
  const [newMaterialName, setNewMaterialName] = useState("");
  const [newMaterialDescription, setNewMaterialDescription] = useState("");

  /* ------------------------------ Edit Existing ----------------------------- */
  const [rowToEdit, setRowToEdit] = useState("");
  const [editMaterialName, setEditMaterialName] = useState("");
  const [editMaterialDescription, setEditMaterialDescription] = useState("");

  const clearEdit = () => {
    setEditMaterialName("");
    setEditMaterialDescription("");
  };

  const clearInput = () => {
    setNewMaterialName("");
    setNewMaterialDescription("");
  };

  const handleEditMaterial = async (id) => {
    const body = {
      editMaterialName,
      editMaterialDescription,
    };
    await editMaterial(id, body);
    retrieveMaterials();
  };

  const retrieveMaterials = async () => {
    const array = await getMaterials();
    setMaterials(array);
  };

  const handleAddMaterial = async () => {
    const body = {
      newMaterialName,
      newMaterialDescription,
    };
    await newMaterial(body);
    clearInput();
    retrieveMaterials();
  };

  const handleDeleteMaterial = async (materialID) => {
    await deleteMaterial(materialID);
    setMaterials(
      materials.filter((material) => material.material_id !== materialID)
    );
    retrieveMaterials();
  };

  useEffect(() => {
    retrieveMaterials();
  }, [rowToEdit]);

  return (
    <Fragment>
      <div className="navbar-clearance"></div>
      <div className="container">
        <div className="row">
          <AppNav></AppNav>
        </div>
      </div>

      <div className="container-xxl mb-5">
        <div className="row shadow rounded-3 bg-white px-4">
          <h1 className="my-3">Material Manager</h1>
          <div className="row row-cols-5 gx-1 mt-4">
            <HeaderColumn colWidth={"col-5"} headerText={"Material Name"} />
            <HeaderColumn
              colWidth={"col-5"}
              headerText={"Material Description"}
            />
            <HeaderColumn colWidth={"col-2"} headerText={""} />
          </div>

          <div className="row row-cols-3 border-bottom py-2 mb-2 gx-2">
            <EditColumn
              colWidth={"col-5"}
              type={"text"}
              label={"Name"}
              newValue={newMaterialName}
              setNewValue={setNewMaterialName}
              placeholder={"Material Name"}
            />
            <EditColumn
              colWidth={"col-5"}
              type={"text"}
              label={"Description"}
              newValue={newMaterialDescription}
              setNewValue={setNewMaterialDescription}
              placeholder={"Description"}
            />

            <div className="col-2 text-center d-grid">
              <button
                className="btn btn-outline-primary"
                onClick={handleAddMaterial}
              >
                Add
              </button>
            </div>
          </div>
          {/* --------------------------- Enumerated Existing -------------------------- */}
          {!_.isEmpty(materials) &&
            materials.map((material) => {
              return material.material_id !== rowToEdit ? (
                <div
                  className="row row-cols-3 border-bottom py-2 gx-2 highlight"
                  key={material.material_id}
                >
                  <DisplayColumn
                    colWidth={"col-5"}
                    content={material.material_name}
                  />
                  <DisplayColumn
                    colWidth={"col-5"}
                    content={material.material_description}
                  />
                  <ButtonsColumn
                    display={"col-2 text-center d-grid"}
                    ID={material.material_id}
                    handleDeleteResource={handleDeleteMaterial}
                    setRowToEdit={setRowToEdit}
                  />
                </div>
              ) : (
                <div
                  className="row row-cols-5 border-bottom py-2 mb-2 gx-2"
                  key={material.material_id}
                >
                  <EditColumn
                    colWidth={"col-5"}
                    type={"text"}
                    label={"Name"}
                    newValue={editMaterialName}
                    setNewValue={setEditMaterialName}
                    placeholder={"Material Name"}
                    currentState={material.material_name}
                  />
                  <EditColumn
                    colWidth={"col-5"}
                    type={"text"}
                    label={"Description"}
                    newValue={editMaterialDescription}
                    setNewValue={setEditMaterialDescription}
                    placeholder={"Material Description"}
                    currentState={material.material_description}
                  />
                  <ButtonAcceptColumn
                    setRowToEdit={setRowToEdit}
                    resourceID={material.material_id}
                    editHandler={handleEditMaterial}
                    clearEdit={clearEdit}
                  />
                </div>
              );
            })}

          {/* ----------------------------------- End ---------------------------------- */}
        </div>
      </div>
    </Fragment>
  );
};

export default ManagerMaterials;
