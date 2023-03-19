const URL_SERVER = "http://localhost:5000";

export const displayProduct = async (id, token) => {
  try {
    const response = await fetch(`${URL_SERVER}/product/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res);
    }
    return await response.json();
  } catch (err) {
    if (parseInt(err.message) === 401) {
      throw new Error(err.message);
    } else {
      throw new Error("Failed to display product");
    }
  }
};

export const addProduct = async (body, token) => {
  try {
    const response = await fetch(`${URL_SERVER}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.json());
    }
  } catch (err) {
    throw new Error("Something went wrong");
  }
};

export const getProducts = async (token) => {
  try {
    const response = await fetch(`${URL_SERVER}/products`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.json());
    }
    const res = await response.json();
    return res;
  } catch (err) {
    if (parseInt(err.message) === 401) {
      throw new Error(err.message);
    } else {
      throw new Error("Failed to get products");
    }
  }
};

export const deleteProduct = async (id, token) => {
  try {
    const response = await fetch(`${URL_SERVER}/product/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete product");
  }
};

export const updatePrice = async (id, body, token) => {
  try {
    const response = await fetch(`${URL_SERVER}/product/price/${id}`, {
      method: "PUT",
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
    console.error(err);
    throw new Error("Failed to update price");
  }
};

export const updateYield = async (id, body, token) => {
  try {
    const response = await fetch(`${URL_SERVER}/product/yield/${id}`, {
      method: "PUT",
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
    console.error(err);
    throw new Error("Failed to update yield");
  }
};
