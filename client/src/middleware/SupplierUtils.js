import { ErrorHandling } from "./ErrorHandling";
const URL_SERVER = "http://localhost:5000";

export const deleteSupplier = async (supplierID) => {
  try {
    const response = await fetch(`${URL_SERVER}/supplier/${supplierID}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(response.message);
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete supplier");
  }
};

export const getSuppliers = async () => {
  try {
    const response = await fetch(`${URL_SERVER}/suppliers`);
    if (!response.ok) {
      throw new Error(response.message);
    }
    const res = await response.json();
    return res;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to load suppliers");
  }
};

export const newSupplier = async (body) => {
  try {
    const response = await fetch(`${URL_SERVER}/supplier/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(response.message);
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to add supplier");
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
    if (!response.ok) {
      throw new Error(response.message);
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to add supplier");
  }
};
