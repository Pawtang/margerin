import { React, Fragment, useState, useEffect } from "react";
import AppNav from "./AppNav";
import HeaderColumn from "./elements/HeaderColumn";
import DisplayColumn from "./elements/DisplayColumn";
import ButtonsColumn from "./elements/ButtonsColumn";
import ButtonAcceptColumn from "./elements/ButtonAcceptColumn";
import EditColumn from "./elements/EditColumn";
import ManagerCard from "./elements/ManagerCard";
import { getMaterials } from "../middleware/ProductHasMaterialUtils";
import { deleteMaterial, editMaterial } from "../middleware/MaterialUtils";
import { newMaterial } from "../middleware/ProductHasMaterialUtils";
import { useToasts } from "../contexts/ToastContext";
import { useTokens } from "../contexts/UserContext";
import Navbar from "./Navbar";
import _ from "lodash";

const ManagerMaterials = () => {
  const { token } = useTokens();
  const { addToast } = useToasts();
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
    await editMaterial(id, body, token);
    retrieveMaterials();
  };

  const retrieveMaterials = async () => {
    try {
      const array = await getMaterials(token);
      setMaterials(array);
    } catch (err) {
      addToast({
        title: "Failed to load materials",
        type: "Error",
        body: "Failed to edit material",
      });
    }
  };

  const handleAddMaterial = async () => {
    try {
      const body = {
        newMaterialName,
        newMaterialDescription,
      };
      await newMaterial(body, token);
      clearInput();
      retrieveMaterials();
      addToast({
        title: " Success",
        type: "Success",
        body: "Successfully added material",
      });
    } catch (err) {
      addToast({
        title: "Failed to add material",
        type: "Error",
        body: err.message,
      });
    }
  };

  const handleDeleteMaterial = async (materialID) => {
    try {
      await deleteMaterial(materialID, token);
      setMaterials(
        materials.filter((material) => material.material_id !== materialID)
      );
    } catch (err) {
      addToast({
        title: "Failed to delete material",
        type: "Error",
        body: err.message,
      });
    }
  };

  useEffect(() => {
    retrieveMaterials();
  }, [rowToEdit]);

  return (
    <Fragment>
      <Navbar opacity={"nav-opaque"} />

      <div className="container">
        <div className="row">
          <AppNav></AppNav>
        </div>
      </div>

      <div className="container-xxl mb-5">
        <div className="row shadow rounded-3 bg-white px-4">
          <h1 className="my-3">Material Manager</h1>
          <div className="p-3 mx-auto gx-1  mb-2 row ">
            {/* <div className="row row-cols-3 border-bottom py-2 mb-2 gx-2 border"> */}
            <div className="row border-bottom py-2 mb-2 gx-2 ">
              <h3>Add Materials</h3>
              <div className="col-12 col-sm-5">
                <HeaderColumn display={""} headerText={"Material Name"} />
                <EditColumn
                  display={""}
                  type={"text"}
                  label={"Name"}
                  newValue={newMaterialName}
                  setNewValue={setNewMaterialName}
                  placeholder={"Material Name"}
                />
              </div>
              <div className="col-12  col-sm-5">
                <HeaderColumn
                  display={""}
                  headerText={"Material Description"}
                />
                <EditColumn
                  display={""}
                  type={"text"}
                  label={"Description"}
                  newValue={newMaterialDescription}
                  setNewValue={setNewMaterialDescription}
                  placeholder={"Description"}
                />
              </div>
              <div className="col-12 col-sm-2 text-center d-grid">
                <HeaderColumn display={""} headerText={""} />
                <button
                  className="btn btn-outline-primary"
                  onClick={handleAddMaterial}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          {/* --------------------------- Enumerated Existing -------------------------- */}
          <h3>Current Materials</h3>
          <div className="d-none d-sm-block">
            {!_.isEmpty(materials) &&
              materials.map((material) => {
                return material.material_id !== rowToEdit ? (
                  <div
                    className="row row-cols-3 border-bottom py-2 gx-2 highlight"
                    key={material.material_id}
                  >
                    <DisplayColumn
                      display={"col-5"}
                      content={material.material_name}
                    />
                    <DisplayColumn
                      display={"col-5"}
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
                      display={"col-5"}
                      type={"text"}
                      label={"Name"}
                      newValue={editMaterialName}
                      setNewValue={setEditMaterialName}
                      placeholder={"Material Name"}
                      currentState={material.material_name}
                    />
                    <EditColumn
                      display={"col-5"}
                      type={"text"}
                      label={"Description"}
                      newValue={editMaterialDescription}
                      setNewValue={setEditMaterialDescription}
                      placeholder={"Material Description"}
                      currentState={material.material_description}
                    />
                    <ButtonAcceptColumn
                      display={"col-2 d-grid"}
                      setRowToEdit={setRowToEdit}
                      resourceID={material.material_id}
                      editHandler={handleEditMaterial}
                      clearEdit={clearEdit}
                    />
                  </div>
                );
              })}
          </div>
          <div className="d-block d-sm-none">
            {!_.isEmpty(materials) &&
              materials.map((material) => {
                return (
                  <ManagerCard
                    itemtype={"Material"}
                    id={material.material_id}
                    itemName={material.material_name}
                    description={material.material_description}
                    handleDeleteItem={handleDeleteMaterial}
                    setRowToEdit={setRowToEdit}
                    editRow={rowToEdit}
                    editName={editMaterialName}
                    setEditName={setEditMaterialName}
                    editDescription={editMaterialDescription}
                    setEditDescription={setEditMaterialDescription}
                    handleEdit={handleEditMaterial}
                    clearEdit={clearEdit}
                    displayRows={[
                      {
                        label: "Material Description",
                        value: material.material_description,
                      },
                    ]}
                    editRows={[
                      {
                        label: "Description",
                        value: editMaterialDescription,
                        defaultValue: material.material_description,
                        onChange: setEditMaterialDescription,
                      },
                    ]}
                  />
                );
              })}
          </div>
          {/* ----------------------------------- End ---------------------------------- */}
        </div>
      </div>
    </Fragment>
  );
};

export default ManagerMaterials;
