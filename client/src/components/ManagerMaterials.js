import { React, Fragment, useState, useEffect } from "react";
import AppNav from "./AppNav";
import HeaderColumn from "./HeaderColumn";
import DisplayColumn from "./DisplayColumn";
import ButtonsColumn from "./ButtonsColumn";
import EditColumn from "./EditColumn";
import { getMaterials } from "../middleware/ProductHasMaterialUtils";
import { deleteMaterial } from "../middleware/MaterialUtils";
import { newMaterial } from "../middleware/ProductHasMaterialUtils";
import _ from "lodash";

const ManagerMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [newMaterialName, setNewMaterialName] = useState("");
  const [newMaterialDescription, setNewMaterialDescription] = useState("");

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
  }, []);

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
              label={"Contact"}
              newValue={newMaterialDescription}
              setNewValue={setNewMaterialDescription}
              placeholder={"Contact Name"}
            />

            <div className="col-2 text-center">
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
            materials.map((material) => (
              <div
                className="row row-cols-3 border-bottom py-2 mb-2 gx-0"
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
                  display={"col-2 text-center"}
                  ID={material.material_id}
                  handleDeleteResource={handleDeleteMaterial}
                />
              </div>
            ))}

          {/* ----------------------------------- End ---------------------------------- */}
        </div>
      </div>
    </Fragment>
  );
};

export default ManagerMaterials;
