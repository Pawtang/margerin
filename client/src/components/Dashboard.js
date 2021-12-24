import { React, Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppNav from "./AppNav";
import ProductHasMaterials from "./ProductHasMaterials";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const URL_SERVER = "http://localhost:5000";

  const displayProduct = async (id) => {
    try {
      const response = await fetch(`${URL_SERVER}/product/${id}`);
      if (response.status != 200) {
        throw "response is not 200";
      }
      const jsonData = await response.json();
      console.log(jsonData);
      setProduct(jsonData);
      console.log(product);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getProducts = async () => {
    try {
      const response = await fetch(`${URL_SERVER}/products`);
      if (response.status != 200) {
        throw "response is not 200";
      }
      const jsonData = await response.json();
      // console.log(jsonData);
      setProducts(jsonData);
      setFilteredProducts(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProducts();
    displayProduct();
  }, []);

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

  return (
    <Fragment>
      <div className="navbar-clearance"></div>
      <div className="container-xxl">
        <div className="row ">
          <AppNav></AppNav>
        </div>
        <div className="row shadow rounded-3 bg-white">
          {/* /* ----------------------------- Product Search ----------------------------- */}
          <div className="col-3 border-end">
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
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="row  mx-0 limit-y">
              <div className="row my-1">
                <button className="btn btn-primary">Add New Product</button>
              </div>
              {filteredProducts.map((product) => (
                <div className="row my-1">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => displayProduct(product.product_id)}
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
                            fill-rule="evenodd"
                            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* /* ----------------------------- Product Profile ---------------------------- */}

          <div className="col-9 p-4 gx-5">
            <div className="row mb-5 shadow-sm p-4 rounded-3">
              <div className="col-3 pic-col">
                <div className="square-image mx-auto m-0"></div>
              </div>
              <div className="col-8 ">
                {
                  <div className="row">
                    <h3 className="display-6">{product.product_name}</h3>
                    <p>{product.product_description}</p>
                  </div>
                }
                <div className="row p-4 shadow-sm">
                  <h3>
                    <u>Cost Data</u>
                  </h3>
                  <p>Wholesale Cost:</p>
                  <p>Direct to Customer Cost:</p>
                  <p>Wholesale Cost:</p>
                </div>
              </div>
            </div>

            <ProductHasMaterials />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
