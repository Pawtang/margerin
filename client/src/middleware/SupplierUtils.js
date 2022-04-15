import { ErrorHandling } from "./ErrorHandling";
const URL_SERVER = "http://localhost:5000";

export const deleteSupplier = async (supplierID, token) => {
  try {
    const response = await fetch(`${URL_SERVER}/supplier/${supplierID}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error(response.message);
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete supplier");
  }
};

export const getSuppliers = async (token) => {
  try {
    const response = await fetch(`${URL_SERVER}/suppliers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
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

export const newSupplier = async (body, token) => {
  try {
    const response = await fetch(`${URL_SERVER}/supplier/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

export const editSupplier = async (supplierID, body, token) => {
  try {
    const response = await fetch(`${URL_SERVER}/supplier/edit/${supplierID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
