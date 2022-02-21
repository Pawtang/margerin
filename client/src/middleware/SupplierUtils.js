import { ErrorHandling } from "./ErrorHandling";
const URL_SERVER = "http://localhost:5000";

export const deleteSupplier = async (supplierID) => {
  try {
    const response = await fetch(`${URL_SERVER}/supplier/${supplierID}`, {
      method: "DELETE",
    });
    if (response.status !== 200) {
      throw "DELETE not successful";
    }
  } catch (err) {
    throw err;
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
    throw err;
  }
};

export const newSupplier = async (body) => {
  try {
    const response = await fetch(`${URL_SERVER}/supplier/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.status !== 200) {
      throw new Error("response is not 200");
    }
  } catch (err) {
    throw err;
  }
};

export const editSupplier = async (supplierID, body) => {
  try {
    const response = await fetch(`${URL_SERVER}/supplier/edit/${supplierID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log("");
    if (response.status !== 200) {
      throw new Error("response is not 200");
    }
  } catch (err) {
    throw err;
  }
};
