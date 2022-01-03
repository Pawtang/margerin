import { React, Fragment, useState, useEffect } from "react";
import _ from "lodash";
import AppNav from "./AppNav";
import ProductHasMaterials from "./ProductHasMaterials";
import ProductSearch from "./ProductSearch";
import {
  displayProduct,
  addProduct,
  getProducts,
  deleteProduct,
} from "../middleware/DashboardUtils";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [displayedProduct, setDisplayedProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [newProductName, setNewProductName] = useState([]);
  const [newProductDescription, setnewProductDescription] = useState([]);

  /* ------------------------------ List Products ----------------------------- */
  useEffect(() => {
    const loadProductList = async () => {
      const productArray = await getProducts();
      setProducts(productArray);
      setFilteredProducts(productArray);
      setDisplayedProduct(productArray[0]);
    };
    loadProductList();
  }, []);

  /* ------------------------ Filter Products by Search ----------------------- */
  useEffect(() => {
    let newFilteredProducts;
    if (search && search !== "") {
      newFilteredProducts = products.filter((product) =>
        product.product_name.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      newFilteredProducts = products;
    }
    setFilteredProducts(newFilteredProducts);
  }, [search]);

  /* ------------------------------- Add Product ------------------------------ */
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const body = { newProductName, newProductDescription };
    await addProduct(body);
    renderProducts();
  };

  const clearEntry = () => {
    setNewProductName("");
    setnewProductDescription("");
  };

  const renderProducts = async () => {
    const productArray = await getProducts();
    setProducts(productArray);
    setFilteredProducts(productArray);
    setDisplayedProduct(productArray[0].product_id);
  };

  return (
    <Fragment>
      {/* TODO: Add method to clear NPN and NPD when clicking outside Modal*/}
      {/* ---------------------------------- Modal --------------------------------- */}
      <div class="modal fade" tabindex="-1" id="newProductModal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add New Product</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => clearEntry()}
              ></button>
            </div>
            <div class="modal-body">
              <form action="" onSubmit={handleAddProduct}>
                <label for="productName" class="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="productName"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                />
                <label for="productDescription" class="form-label">
                  Product Description
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="productDescription"
                  value={newProductDescription}
                  onChange={(e) => setnewProductDescription(e.target.value)}
                />
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => clearEntry()}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                    // onClick={() => clearEntry()}
                  >
                    Add product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* --------------------------------- Navbar --------------------------------- */}
      <div className="navbar-clearance"></div>
      <div className="container-xxl">
        <div className="row ">
          <AppNav></AppNav>
        </div>
        <div className="row shadow rounded-3 bg-white">
          {/* /* ----------------------------- Product Search ----------------------------- */}
          <div className="col-5 col-md-3 border-end">
            <div className="row my-4">
              <div className="col-11">
                <div class="input-group">
                  <span class="input-group-text" id="basic-addon1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search products..."
                    aria-label="Search products..."
                    aria-describedby="search-products"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="row  mx-0 limit-y">
              <div className="row my-1">
                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#newProductModal"
                >
                  Add New Product
                </button>
              </div>
              {/* --------------------------- Render Product List -------------------------- */}
              {filteredProducts.map((product) => (
                <div className="row my-1" key={product.product_id}>
                  <button
                    className="btn btn-outline-primary"
                    onClick={async () => {
                      const productData = await displayProduct(
                        product.product_id
                      );
                      setDisplayedProduct(productData);
                      setSearch("");
                    }}
                  >
                    <div className="row">
                      <div className="col-10 text-start">
                        {product.product_name}
                      </div>
                      <div className="col">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-arrow-right-circle"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
              {/* ----------------------------- End Render List ---------------------------- */}
            </div>
          </div>
          {/* --------------------------- End Product Search --------------------------- */}
          {/* /* ----------------------------- Product Profile ---------------------------- */}

          <div className="col-7 col-md-9 p-4 gx-5">
            <div className="row mb-5 shadow-sm p-4 rounded-3">
              <div className="col-3 pic-col">
                <div className="square-image mx-auto">
                  <img src="/assets/mango.jpg" class="img-fluid" alt="" />
                </div>
                <div class="row p-4 gy-2">
                  <button class="btn btn-primary" type="button">
                    Edit
                  </button>
                  <button
                    class="btn btn-danger"
                    type="button"
                    onClick={async () => {
                      await deleteProduct(displayedProduct.product_id);
                      renderProducts();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="col-8 ">
                {!_.isEmpty(displayedProduct) && (
                  <div className="row">
                    <h1>{displayedProduct.product_name}</h1>
                    <p>{displayedProduct.product_description}</p>
                  </div>
                )}
                <h3>Cost Data</h3>
                <p>Wholesale Cost:</p>
                <p>Direct to Customer Cost:</p>
                <p>Wholesale Cost:</p>
              </div>
            </div>

            {!_.isEmpty(displayedProduct) && (
              <ProductHasMaterials productID={displayedProduct.product_id} />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
