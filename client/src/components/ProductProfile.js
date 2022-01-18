import React, { Fragment } from "react";
import _ from "lodash";
import ProductHasMaterials from "./ProductHasMaterials";

const ProductProfile = (props) => {
  const {
    renderProducts,
    deleteProduct,
    displayedProduct,
    productYield,
    setProductYield,
    updateProductYield,
    productPrice,
    setProductPrice,
    updateProductPrice,
    productAverageCost,
    setProductAverageCost,
  } = props;
  return (
    <Fragment>
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
                        setProductPrice(parseFloat(productPrice).toFixed(2));
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
    </Fragment>
  );
};

export default ProductProfile;
