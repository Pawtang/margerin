import { ErrorHandling } from "./ErrorHandling";
const URL_SERVER = "http://localhost:5000";

export const getMaterials = async () => {
  try {
    const response = await fetch(`${URL_SERVER}/materials`);
    if (response.status !== 200) {
      throw new Error("response is not 200");
    }
    return await response.json();
  } catch (err) {
    console.error(err.message);
  }
};

export const getMaterialsForProduct = async (id, addToast) => {
  try {
    const response = await fetch(`${URL_SERVER}/productHasMaterials/${id}`);
    if (response.status !== 200) {
      const res = await response.json();
      throw new Error(ErrorHandling(res.errorCode)); //Throw puts you in catch
    }
    const res = await response.json();
    return res;
  } catch (err) {
    addToast({
      title: "Failed to get materials for product",
      type: "Error",
      body: err.toString(),
    });
  }
};

export const getTransactionsForMaterial = async (id, addToast) => {
  try {
    const response = await fetch(`${URL_SERVER}/materialHasTransactions/${id}`);
    if (response.status !== 200) {
      const res = await response.json();
      throw new Error(ErrorHandling(res.errorCode)); //Throw puts you in catch
    }
    const res = await response.json();
    return res;
  } catch (err) {
    addToast({
      title: "Failed to get transactions for material",
      type: "Error",
      body: err.toString(),
    });
  }
};

export const addMaterialToProduct = async (body, addToast) => {
  try {
    const response = await fetch(`${URL_SERVER}/productHasMaterial`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.status !== 200) {
      const res = await response.json();
      throw new Error(ErrorHandling(res.errorCode)); //Throw puts you in catch
    }
    const res = await response.json();
    return res;
  } catch (err) {
    addToast({
      title: "Failed to add material to product",
      type: "Error",
      body: err.toString(),
    });
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
      throw new Error("response is not 200");
    }
  } catch (err) {
    console.error("Failed to add transaction: ", err.message);
  }
};

export const getUnits = async () => {
  try {
    const response = await fetch(`${URL_SERVER}/units`);
    if (response.status !== 200) {
      throw new Error("response is not 200");
    }
    return response.json();
  } catch (err) {
    console.error(err.message);
  }
};

export const getSuppliers = async () => {
  try {
    const response = await fetch(`${URL_SERVER}/suppliers`);
    if (response.status !== 200) {
      throw new Error("response is not 200");
    }
    return response.json();
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteMaterialFromProduct = async (phmID) => {
  try {
    const response = await fetch(`${URL_SERVER}/productHasMaterial/${phmID}`, {
      method: "DELETE",
    });
    if (response.status !== 200) {
      throw "DELETE not successful";
    }
  } catch (err) {
    console.error("Failed to Delete", err.message);
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
      throw new Error("response is not 200");
    }
  } catch (err) {
    console.error(err.message);
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
      throw new Error("response is not 200");
    }
  } catch (err) {
    console.error(err.message);
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
      throw new Error("response is not 200");
    }
  } catch (err) {
    console.error(err.message);
  }
};
