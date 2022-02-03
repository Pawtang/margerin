import { React, Fragment, useState, useEffect } from "react";
import _ from "lodash";
import AppNav from "./AppNav";
import ProductHasMaterials from "./ProductHasMaterials";
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
import Alert from "react-bootstrap/Alert";
// import "../styles/Dashboard.css";

const Dashboard = () => {
  const [displayedProduct, setDisplayedProduct] = useState({});
  const [newProductName, setNewProductName] = useState("");
  const [productYield, setProductYield] = useState("");
  const [newProductDescription, setnewProductDescription] = useState("");
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

      <div className="navbar-clearance"></div>
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
