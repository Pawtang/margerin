import { React, Fragment, useState, useEffect } from "react";
import _ from "lodash";
import AppNav from "./AppNav";
import ProductHasMaterials from "./ProductHasMaterials";
import ProductSearch from "./ProductSearch";
import AddPropModal from "./AddPropModal";
import {
  addProduct,
  getProducts,
  deleteProduct,
  updatePrice,
  updateYield,
} from "../middleware/DashboardUtils";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [displayedProduct, setDisplayedProduct] = useState({});
  const [newProductName, setNewProductName] = useState([]);
  const [productYield, setProductYield] = useState("");
  const [newProductDescription, setnewProductDescription] = useState([]);
  const [products, setProducts] = useState([]);
  const [productPrice, setProductPrice] = useState("");
  const [productAverageCost, setProductAverageCost] = useState("");

  /* ------------------------------ List Products ----------------------------- */

  //How to trigger rendering?
  const renderProducts = async () => {
    const productArray = await getProducts();
    if (_.isEmpty(productArray)) return; //Maybe?
    setProducts(productArray);
    setDisplayedProduct(productArray[0]);
    setProductYield(productArray[0].yield);
    setProductPrice(productArray[0].price);
  };

  useEffect(() => {
    renderProducts();
  }, []);

  /* ------------------------------- Add Product ------------------------------ */
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const body = { newProductName, newProductDescription };
    await addProduct(body);
    clearEntry("productModal");
    renderProducts();
  };

  const clearEntry = () => {
    setNewProductName("");
    setnewProductDescription("");
  };

  const updateProductYield = async () => {
    const productID = displayedProduct.product_id;
    const body = { productYield };
    await updateYield(productID, body);
  };

  const updateProductPrice = async () => {
    const productID = displayedProduct.product_id;
    const body = { productPrice };
    await updatePrice(productID, body);
  };

  return (
    <Fragment>
      <AddPropModal
        itemType="Product"
        handleAddItem={handleAddProduct}
        newItemName={newProductName}
        setNewItemName={setNewProductName}
        clearEntry={clearEntry}
      />
      {/* TODO: Add method to clear NPN and NPD when clicking outside Modal*/}

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
            setProductYield={setProductYield}
            setProductPrice={setProductPrice}
          />
          {/* --------------------------- End Product Search --------------------------- */}
          {/* /* ----------------------------- Product Profile ---------------------------- */}

          <div className="col-12 col-md-9 p-4 gx-5">
            <div className="row mb-5 shadow-sm p-4 rounded-3 ">
              <div className="d-flex flex-row-reverse">
                <div className="btn-group">
                  <button class="btn btn-primary" type="button">
                    Edit <i class="bi bi-pencil-square"></i>
                  </button>
                  <button
                    class="btn btn-outline-danger"
                    type="button"
                    onClick={async () => {
                      await deleteProduct(displayedProduct.product_id);
                      renderProducts();
                    }}
                  >
                    Delete <i class="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
              {/* <div className="col-3 pic-col">
                <div className="square-image mx-auto">
                  <img src="/assets/mango.jpg" class="img-fluid" alt="" />
                </div>
                <div class="row p-4 gy-2"></div>
              </div> */}
              <div className="col">
                {!_.isEmpty(displayedProduct) && (
                  <div className="row">
                    <h1>{displayedProduct.product_name}</h1>
                    <p>{displayedProduct.product_description}</p>
                  </div>
                )}
                <h3>Cost Data</h3>
                <p>
                  <div className="row">
                    <div className="col-12 col-md-3 col-sm-6">
                      <label for="exampleFormControlInput1" class="form-label">
                        Yield Per Recipe
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">#</span>
                        <input
                          type="number"
                          class="form-control text-center"
                          id="YPR"
                          value={productYield}
                          onChange={(e) => {
                            setProductYield(e.target.value);
                            updateProductPrice();
                          }}
                          onBlur={updateProductYield}
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-6">
                      <label htmlFor="" class="form-label">
                        Cost Per Unit
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                          class="form-control text-center"
                          type="text"
                          value={productAverageCost}
                          aria-label="Product Unit Cost"
                          readonly
                          id="ProductCost"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-6">
                      <label for="exampleFormControlInput1" class="form-label">
                        Sales Price
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                          type="number"
                          class="form-control text-center"
                          id="salesPrice"
                          step="0.01"
                          placeholder="0.00"
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                          onBlur={() => {
                            setProductPrice(
                              parseFloat(productPrice).toFixed(2)
                            );
                            updateProductPrice();
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-6">
                      <label htmlFor="" class="form-label">
                        Profit Per Unit
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                          class="form-control text-center"
                          type="text"
                          // value={`$${}`}
                          aria-label="Product Unit Cost"
                          readonly
                          id="ProductCost"
                          value={
                            !isNaN(productAverageCost)
                              ? parseFloat(
                                  productPrice - productAverageCost
                                ).toFixed(2)
                              : "No Data"
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col"></div>
                    <div className="col"></div>
                  </div>
                </p>
              </div>
            </div>

            {!_.isEmpty(displayedProduct) && (
              <ProductHasMaterials
                productID={displayedProduct.product_id}
                setProductAverageCost={setProductAverageCost}
                productYield={productYield}
              />
            )}
          </div>
        </div>
      </div>

      <div className="footer"></div>
    </Fragment>
  );
};

export default Dashboard;
