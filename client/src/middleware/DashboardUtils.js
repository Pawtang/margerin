const URL_SERVER = "http://localhost:5000";

export const displayProduct = async (id) => {
  try {
    const response = await fetch(`${URL_SERVER}/product/${id}`);
    if (response.status !== 200) {
      throw "response is not 200";
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
      throw "response is not 200";
    }
  } catch (err) {
    console.error("addProduct POST /product error:", err.message);
  }
};

export const getProducts = async () => {
  try {
    const response = await fetch(`${URL_SERVER}/products`);
    if (response.status !== 200) {
      throw "response is not 200";
    }
    return await response.json();
  } catch (err) {
    console.error("getProducts GET /products error:", err.message);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${URL_SERVER}/product/${id}`, {
      method: "DELETE",
    });
    if (response.status !== 200) {
      throw "response is not 200";
    }
  } catch (err) {
    console.error("deleteProduct DELETE /product error:", err.message);
  }
};
