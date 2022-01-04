import { React, Fragment, useState, useEffect } from "react";
import _ from "lodash";
import AppNav from "./AppNav";
import ProductHasMaterials from "./ProductHasMaterials";
import ProductSearch from "./ProductSearch";
import {
  addProduct,
  getProducts,
  deleteProduct,
} from "../middleware/DashboardUtils";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [displayedProduct, setDisplayedProduct] = useState({});
  const [newProductName, setNewProductName] = useState([]);
  const [newProductDescription, setnewProductDescription] = useState([]);
  const [products, setProducts] = useState([]);

  /* ------------------------------ List Products ----------------------------- */
  useEffect(() => {
    const loadProductList = async () => {
      const productArray = await getProducts();
      setProducts(productArray);
      setDisplayedProduct(productArray[0]);
    };
    loadProductList();
  }, []);

  //How to trigger rendering?
  const renderProducts = async () => {
    const productArray = await getProducts();
    setProducts(productArray);
    setDisplayedProduct(productArray[0].product_id);
  };

  /* ------------------------------- Add Product ------------------------------ */
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const body = { newProductName, newProductDescription };
    await addProduct(body);
  };

  const clearEntry = () => {
    setNewProductName("");
    setnewProductDescription("");
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
          <ProductSearch
            setDisplayedProduct={setDisplayedProduct}
            products={products}
          />
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
