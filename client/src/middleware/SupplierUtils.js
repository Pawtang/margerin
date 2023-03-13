const URL_SERVER = "http://localhost:5000";

export const deleteSupplier = async (supplierID, token) => {
  try {
    const response = await fetch(`${URL_SERVER}/supplier/${supplierID}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      // console.log("Res:", await response.json());
      throw new Error(response.json());
    }
  } catch (err) {
    if ((err.errorCode = "23503")) {
      throw new Error(
        "Could not delete the supplier because it is referenced in an existing transaction"
      );
    } else {
      throw new Error("Something went wrong!");
    }
  }
};

export const getSuppliers = async (token) => {
  try {
    const response = await fetch(`${URL_SERVER}/suppliers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error(response.json());
    }
    const res = await response.json();
    return res;
  } catch (err) {
    throw new Error("Something went wrong");
  }
};

export const newSupplier = async (body, token) => {
  try {
    // console.log(token);
    const response = await fetch(`${URL_SERVER}/supplier/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(response.json());
    }
  } catch (err) {
    // console.error("err contents", err);
    throw new Error("Something went wrong");
  }
};

export const editSupplier = async (supplierID, body, token) => {
  try {
    console.log(body);
    const response = await fetch(`${URL_SERVER}/supplier/edit/${supplierID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(response.json());
    }
  } catch (err) {
    throw new Error(err.errorCode);
  }
};
