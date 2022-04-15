import { ErrorHandling } from "./ErrorHandling";
const URL_SERVER = "http://localhost:5000";

export const getMaterials = async (token) => {
  try {
    const response = await fetch(`${URL_SERVER}/materials`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    throw new Error(err.errorCode);
  }
};

export const getMaterialsForProduct = async (id, token) => {
  try {
    console.log("get Materials token", token);
    const response = await fetch(`${URL_SERVER}/productHasMaterials/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get materials");
  }
};

export const getTransactionsForMaterial = async (id, token) => {
  try {
    const response = await fetch(
      `${URL_SERVER}/materialHasTransactions/${id}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get transactions for material");
  }
};

export const addMaterialToProduct = async (body, token) => {
  try {
    const response = await fetch(`${URL_SERVER}/productHasMaterial`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const res = await response.json(); //is this really needed? Try skipping this
      throw new Error(res.message);
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to add material to product");
  }
};

export const addTransactionForMaterial = async (body, token) => {
  try {
    const response = await fetch(`${URL_SERVER}/materialHasTransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to add transaction");
  }
};

export const getUnits = async (token) => {
  try {
    const response = await fetch(`${URL_SERVER}/units`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to load units");
  }
};

export const getSuppliers = async (token) => {
  try {
    const response = await fetch(`${URL_SERVER}/suppliers`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
    return response.json();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to load suppliers");
  }
};

export const deleteMaterialFromProduct = async (phmID, token) => {
  try {
    const response = await fetch(`${URL_SERVER}/productHasMaterial/${phmID}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to remove material from product");
  }
};

export const editProductHasMaterial = async (phmID, body, token) => {
  try {
    const response = await fetch(
      `${URL_SERVER}/productHasMaterial/edit/${phmID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );
    console.log(phmID, body);
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
  } catch (err) {
    throw new Error(err.errorCode);
  }
};

export const deleteTransactionFromMaterial = async (
  materialID,
  transactionID,
  token
) => {
  try {
    const response = await fetch(
      `${URL_SERVER}/materialHasTransaction/${materialID}/${transactionID}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
  } catch (err) {
    throw new Error(err.errorCode);
  }
};

export const newMaterial = async (body, token) => {
  try {
    const response = await fetch(`${URL_SERVER}/material`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      console.log("Error in PHMUtils");
      const res = await response.json();
      throw new Error(res.message);
    }
  } catch (err) {
    throw new Error(err.errorCode);
  }
};

export const newSupplier = async (body, token) => {
  try {
    const response = await fetch(`${URL_SERVER}/supplier`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
  } catch (err) {
    throw new Error(err.errorCode);
  }
};
