import { ErrorHandling } from "./ErrorHandling";
const URL_SERVER = "http://localhost:5000";

export const getMaterials = async () => {
  try {
    const response = await fetch(`${URL_SERVER}/materials`);
    if (response.status !== 200) {
      const res = await response.json();
      throw new Error(res.message);
    }
    return await response.json();
  } catch (err) {
    throw new Error(err.errorCode);
  }
};

export const getMaterialsForProduct = async (id) => {
  try {
    const response = await fetch(`${URL_SERVER}/productHasMaterials/${id}`);
    if (response.status !== 200) {
      const res = await response.json();
      throw new Error(res.message);
    }
    const res = await response.json();
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const getTransactionsForMaterial = async (id) => {
  try {
    const response = await fetch(`${URL_SERVER}/materialHasTransactions/${id}`);
    if (response.status !== 200) {
      const res = await response.json();
      throw new Error(res.message);
    }
    const res = await response.json();
    return res;
  } catch (err) {
    throw new Error(err.errorCode);
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
    console.log("middle response status:", response.status);
    if (response.status !== 200) {
      console.log("reached error block in utils");
      const res = await response.json(); //is this really needed? Try skipping this
      throw new Error(res.message);
    }
    const res = await response.json();
    console.log("res", res);
    return res;
  } catch (err) {
    throw new Error("Failed to add material to product");
  }
};

export const addTransactionForMaterial = async (body) => {
  try {
    const response = await fetch(`${URL_SERVER}/materialHasTransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.status !== 200) {
      const res = await response.json();
      throw new Error(res.message);
    }
    return response.json();
  } catch (err) {
    throw new Error("Failed to add transaction");
  }
};

export const getUnits = async () => {
  try {
    const response = await fetch(`${URL_SERVER}/units`);
    if (response.status !== 200) {
      const res = await response.json();
      throw new Error(res.message);
    }
    return response.json();
  } catch (err) {
    throw new Error(err.errorCode);
  }
};

export const getSuppliers = async () => {
  try {
    const response = await fetch(`${URL_SERVER}/suppliers`);
    if (response.status !== 200) {
      const res = await response.json();
      throw new Error(res.message);
    }
    return response.json();
  } catch (err) {
    throw new Error(err.errorCode);
  }
};

export const deleteMaterialFromProduct = async (phmID) => {
  try {
    const response = await fetch(`${URL_SERVER}/productHasMaterial/${phmID}`, {
      method: "DELETE",
    });
    if (response.status !== 200) {
      const res = await response.json();
      throw new Error(res.message);
    }
  } catch (err) {
    throw new Error(err.errorCode);
  }
};

export const editProductHasMaterial = async (phmID, body) => {
  try {
    const response = await fetch(
      `${URL_SERVER}/productHasMaterial/edit/${phmID}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    console.log(phmID, body);
    if (response.status !== 200) {
      const res = await response.json();
      throw new Error(res.message);
    }
  } catch (err) {
    throw new Error(err.errorCode);
  }
};

export const deleteTransactionFromMaterial = async (
  materialID,
  transactionID
) => {
  try {
    const response = await fetch(
      `${URL_SERVER}/materialHasTransaction/${materialID}/${transactionID}`,
      {
        method: "DELETE",
      }
    );
    if (response.status !== 200) {
      const res = await response.json();
      throw new Error(res.message);
    }
  } catch (err) {
    throw new Error(err.errorCode);
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
      console.log("Error in PHMUtils");
      const res = await response.json();
      throw new Error(res.message);
    }
  } catch (err) {
    throw new Error(err.errorCode);
  }
};

export const newSupplier = async (body) => {
  try {
    const response = await fetch(`${URL_SERVER}/supplier`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.status !== 200) {
      const res = await response.json();
      throw new Error(res.message);
    }
  } catch (err) {
    throw new Error(err.errorCode);
  }
};
