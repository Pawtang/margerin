const URL_SERVER = "http://localhost:5000";

export const getMaterials = async () => {
  try {
    const response = await fetch(`${URL_SERVER}/materials`);
    if (response.status !== 200) {
      throw "response is not 200";
    }
    return await response.json();
  } catch (err) {
    console.error(err.message);
  }
};

export const getMaterialsForProduct = async (id) => {
  try {
    const response = await fetch(`${URL_SERVER}/productHasMaterials/${id}`);
    if (response.status !== 200) {
      throw "response is not 200";
    }
    return await response.json();
  } catch (err) {
    console.error(err.message);
  }
};

export const addMaterialToProduct = async (body) => {
  try {
    const response = await fetch(`${URL_SERVER}/productHasMaterial`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.status !== 200) {
      throw "response is not 200";
    }
  } catch (err) {
    console.error("Failed to add material: ", err.message);
  }
};

export const getUnits = async () => {
  try {
    const response = await fetch(`${URL_SERVER}/units`);
    if (response.status !== 200) {
      throw "response is not 200";
    }
    return response.json();
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteMaterialFromProduct = async (productID, materialID) => {
  try {
    const response = await fetch(
      `${URL_SERVER}/productHasMaterial/${productID}/${materialID}`,
      {
        method: "DELETE",
      }
    );
    if (response.status !== 200) {
      throw "DELETE not successful";
    }
  } catch (err) {
    console.error("Failed to Delete", err.message);
  }
};

export const newMaterial = async (body) => {
  try {
    const response = await fetch(`${URL_SERVER}/material`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.status !== 200) {
      throw "response is not 200";
    }
  } catch (err) {
    console.error(err.message);
  }
};
