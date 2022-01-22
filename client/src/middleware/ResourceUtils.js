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
    console.error("Failed to Delete", err.message);
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

export const newSupplier = async (body) => {
  try {
    const response = await fetch(`${URL_SERVER}/newsupplier`, {
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
