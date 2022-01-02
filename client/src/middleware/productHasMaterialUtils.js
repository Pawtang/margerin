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
    console.log("body:", body);
    if (response.status !== 200) {
      throw "response is not 200";
    }
  } catch (err) {
    console.error(err.message);
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

export const deleteMaterialFromProduct = async (id) => {
  try {
    console.log(`deleting material with id ${id}`);
    return await fetch(`${URL_SERVER}/productHasMaterial/${id}`, {
      method: "DELETE",
    });
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
