const URL_SERVER = "http://localhost:5000";

export const getMaterials = async (setMaterials) => {
  try {
    const response = await fetch(`${URL_SERVER}/materials`);
    if (response.status !== 200) {
      throw "response is not 200";
    }
    const allMaterials = await response.json();
    setMaterials(allMaterials);
  } catch (err) {
    console.error(err.message);
  }
};

export const getMaterialsForProduct = async (id, setProductHasMaterials) => {
  try {
    console.log("Getting Mats");
    const response = await fetch(`${URL_SERVER}/productHasMaterials/${id}`);
    if (response.status !== 200) {
      throw "response is not 200";
    }
    const materialArray = await response.json();
    console.log("response from API:", materialArray);
    setProductHasMaterials(materialArray);
  } catch (err) {
    console.error(err.message);
  }
};

export const addMaterialToProduct = async (setProductHasMaterials, body) => {
  // e.preventDefault();
  try {
    console.log(body);
    const response = await fetch(`${URL_SERVER}/productHasMaterial`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log(response);
    if (response.status !== 200) {
      throw "response is not 200";
    }
    getMaterialsForProduct(body.productID, setProductHasMaterials);
  } catch (err) {
    console.error(err.message);
  }
};

export const getUnits = async (setUnits) => {
  try {
    const response = await fetch(`${URL_SERVER}/units`);
    if (response.status !== 200) {
      throw "response is not 200";
    }
    const jsonData = await response.json();
    setUnits(jsonData);
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteMaterialFromProduct = async (
  id,
  productHasMaterials,
  setProductHasMaterials
) => {
  try {
    console.log(`deleting material with id ${id}`);
    const deleteMaterial = await fetch(
      `${URL_SERVER}/productHasMaterial/${id}`,
      {
        method: "DELETE",
      }
    );
    setProductHasMaterials(
      productHasMaterials.filter((material) => material.material_id !== id)
    );
    getMaterialsForProduct();
  } catch (err) {
    console.error(err.message);
  }
};

export const newMaterial = async (body) => {
  try {
    console.log("Front end", body);
    const response = await fetch(`${URL_SERVER}/material`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.status !== 200) {
      throw "response is not 200";
    }
    getMaterials();
  } catch (err) {
    console.error(err.message);
  }
};
