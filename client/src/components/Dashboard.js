import { React, Fragment, useState, useEffect } from "react";
import _ from "lodash";
import AppNav from "./AppNav";
import ProductSearch from "./ProductSearch";
import AddPropModal from "./AddPropModal";
import ProductProfile from "./ProductProfile";
import {
  addProduct,
  getProducts,
  deleteProduct,
  updatePrice,
  updateYield,
} from "../middleware/DashboardUtils";
import Navbar from "./Navbar";
import { useToasts } from "../contexts/ToastContext";
import { useTokens } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { token, logOut } = useTokens();
  const { addToast } = useToasts();
  const [displayedProduct, setDisplayedProduct] = useState({});
  const [newProductName, setNewProductName] = useState("");
  const [productYield, setProductYield] = useState("");
  const [newProductDescription, setnewProductDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [productPrice, setProductPrice] = useState("");
  const [productAverageCost, setProductAverageCost] = useState("");
  const navigate = useNavigate();
  /* ------------------------------ List Products ----------------------------- */

  //How to trigger rendering?
  const renderProducts = async () => {
    try {
      const productArray = await getProducts(token);
      if (_.isEmpty(productArray)) return; //Maybe?
      setProducts(productArray);
      setDisplayedProduct(productArray[0]);
      setProductYield(productArray[0].yield);
      setProductPrice(productArray[0].price);
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
  };

  useEffect(() => {
    if (!_.isEmpty(token)) {
      renderProducts();
    }
  }, [token]);

  /* ------------------------------- Add Product ------------------------------ */
  const handleAddProduct = async (e) => {
    try {
      e.preventDefault();
      const body = { newProductName, newProductDescription };
      await addProduct(body, token);
      clearEntry();
      renderProducts();
      addToast({
        title: `${newProductName} added!`,
        type: "Success",
        body: "Successfully added product",
      });
    } catch (error) {
      addToast({
        title: " Database Error",
        type: "Error",
        body: error.message,
      });
    }
  };

  const clearEntry = () => {
    setNewProductName("");
    setnewProductDescription("");
  };

  const updateProductYield = async () => {
    try {
      const productID = displayedProduct.product_id;
      const body = { productYield };
      await updateYield(productID, body, token);
    } catch (error) {
      addToast({
        title: "Database error",
        type: "Error",
        body: error.message,
      });
    }
  };

  const updateProductPrice = async () => {
    try {
      const productID = displayedProduct.product_id;
      const body = { productPrice };
      await updatePrice(productID, body, token);
    } catch (error) {
      addToast({
        title: "Database error",
        type: "Error",
        body: error.message,
      });
    }
  };

  // const navigate = useNavigate();

  return (
    <Fragment>
      <Navbar opacity={"nav-opaque"} hamburger={true} />
      <AddPropModal
        itemType="Product"
        handleAddItem={handleAddProduct}
        newItemName={newProductName}
        newItemDescription={newProductDescription}
        setNewItemName={setNewProductName}
        setNewItemDescription={setnewProductDescription}
        clearEntry={clearEntry}
      />
      {/* TODO: Add method to clear NPN and NPD when clicking outside Modal*/}

      {/* <div className="navbar-clearance"></div> */}
      <div className="container">
        <div className="row">
          <AppNav></AppNav>
        </div>
      </div>
      <div className="container-xxl mb-5">
        <div className="row shadow rounded-3 bg-white">
          <ProductSearch
            setDisplayedProduct={setDisplayedProduct}
            products={products}
            setProductYield={setProductYield}
            setProductPrice={setProductPrice}
          />

          <ProductProfile
            renderProducts={renderProducts}
            deleteProduct={deleteProduct}
            displayedProduct={displayedProduct}
            productYield={productYield}
            setProductYield={setProductYield}
            updateProductYield={updateProductYield}
            productPrice={productPrice}
            setProductPrice={setProductPrice}
            updateProductPrice={updateProductPrice}
            productAverageCost={productAverageCost}
            setProductAverageCost={setProductAverageCost}
          />
        </div>
      </div>

      <div className="footer"></div>
    </Fragment>
  );
};

export default Dashboard;
