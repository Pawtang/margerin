import { displayProduct } from "../middleware/DashboardUtils";
import { React, useState } from "react";
import { useTokens } from "../contexts/UserContext";
import { useToasts } from "../contexts/ToastContext";
import { useNavigate } from "react-router-dom";

export const ProductSearch = (props) => {
  const { addToast } = useToasts();
  const { token, logOut } = useTokens();
  const [search, setSearch] = useState("");
  const { setDisplayedProduct, products, setProductYield, setProductPrice } =
    props;

  const navigate = useNavigate();

  return (
    <div className="col-12 col-md-3 border-end">
      <div className="row my-4 ">
        <div className="col-12  align-self-center">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
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
        <div className="row my-1 d-grid g-0 mx-0">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#newProductModal"
          >
            Add New Product
          </button>
        </div>
        {/* --------------------------- Render Product List -------------------------- */}

        {products &&
          products
            .filter((product) =>
              product.product_name.toLowerCase().includes(search.toLowerCase())
            )
            .map((product) => (
              <div className="row my-1 d-grid g-0" key={product.product_id}>
                <button
                  className="btn btn-outline-primary"
                  onClick={async () => {
                    try {
                      const productData = await displayProduct(
                        product.product_id,
                        token
                      );
                      setDisplayedProduct(productData);
                      setProductYield(productData.yield);
                      setProductPrice(productData.price);
                      setSearch("");
                    } catch (error) {
                      if (error.message === "401") {
                        logOut();
                        navigate("/");
                      }
                      addToast({
                        title: " Database Error",
                        type: "Error",
                        body: error.message,
                      });
                    }
                  }}
                >
                  <div className="row">
                    <div className="col-10 text-start">
                      {product.product_name}
                    </div>
                    {/* <div className="col">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-arrow-right-circle"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                        />
                      </svg>
                    </div> */}
                  </div>
                </button>
              </div>
            ))}
        {/* ----------------------------- End Render List ---------------------------- */}
      </div>
    </div>
  );
};

export default ProductSearch;
