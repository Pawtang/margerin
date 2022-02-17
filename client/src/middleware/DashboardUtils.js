import { ErrorHandling } from "./ErrorHandling";

const URL_SERVER = "http://localhost:5000";

export const displayProduct = async (id) => {
  try {
    const response = await fetch(`${URL_SERVER}/product/${id}`);
    if (response.status !== 200) {
      throw new Error("response is not 200");
    }
    return await response.json();
  } catch (err) {
    console.error("displayProduct get /product/:id error:", err.message);
  }
};

export const addProduct = async (body) => {
  try {
    console.log("Front end", body);
    const response = await fetch(`${URL_SERVER}/product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.status !== 200) {
      throw new Error("response is not 200");
    }
  } catch (err) {
    console.error("addProduct POST /product error:", err.message);
  }
};

export const getProducts = async (addToast) => {
  try {
    const response = await fetch(`${URL_SERVER}/products`);
    if (response.status !== 200) {
      const res = await response.json();
      throw new Error(ErrorHandling(res.errorCode)); //Throw puts you in catch
    }
    const res = await response.json();
    return res;
  } catch (err) {
    addToast({
      title: "Failed to get product list",
      type: "Error",
      body: err.toString(),
    });
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${URL_SERVER}/product/${id}`, {
      method: "DELETE",
    });
    if (response.status !== 200) {
      throw new Error("response is not 200");
    }
  } catch (err) {
    console.error("deleteProduct DELETE /product error:", err.message);
  }
};

export const updatePrice = async (id, body) => {
  try {
    console.log("Utilities updatePrice body, : ", body);
    const response = await fetch(`${URL_SERVER}/product/price/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log("updatePrice Response:", response.rows[0]);
    if (response.status !== 200) {
      throw new Error("response is not 200");
    }
  } catch (error) {}
};

export const updateYield = async (id, body) => {
  console.log("Utilities updateYield body, : ", body);
  try {
    const response = await fetch(`${URL_SERVER}/product/yield/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log("updateYield Response:", response.rows[0]);
    if (response.status !== 200) {
      throw new Error("response is not 200");
    }
  } catch (error) {}
};
