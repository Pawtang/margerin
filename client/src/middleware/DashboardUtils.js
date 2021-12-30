const URL_SERVER = "http://localhost:5000";

export const displayProduct = async (id, setProduct) => {
  try {
    const response = await fetch(`${URL_SERVER}/product/${id}`);
    if (response.status !== 200) {
      throw "response is not 200";
    }
    const productData = await response.json();
    setProduct(productData);
  } catch (err) {
    console.error(err.message);
  }
};

export const addProduct = async (body) => {
  // e.preventDefault();
  try {
    // const body = { newProductName, newProductDescription };
    console.log("Front end", body);
    const response = await fetch(`${URL_SERVER}/product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.status !== 200) {
      throw "response is not 200";
    }
    getProducts();
  } catch (err) {
    console.error(err.message);
  }
};

export const getProducts = async (
  setProducts,
  setFilteredProducts,
  setProduct
) => {
  try {
    const response = await fetch(`${URL_SERVER}/products`);
    if (response.status !== 200) {
      throw "response is not 200";
    }
    const productArray = await response.json();
    console.log(productArray);
    setProducts(productArray);
    setFilteredProducts(productArray);
    setProduct(productArray[0]);
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteProduct = async (id, products, setProducts) => {
  try {
    const deleteProduct = await fetch(`${URL_SERVER}/product/${id}`, {
      method: "DELETE",
    });
    setProducts(products.filter((product) => product.product_id !== id));
    getProducts();
    displayProduct(products[0].product_id);
  } catch (err) {
    console.error(err.message);
  }
};
