import React, { Fragment } from "react";
import Navbar from "./Navbar";

function About() {
  return (
    <Fragment>
      <Navbar opacity={"nav-opaque"} />

      <div className="container-xxl mb-5">
        <div className="row shadow rounded-3 bg-white p-5 justify-content-center">
          <h1>About</h1>
          <p>
            The purpose of Margerin is to provide a better understanding of your
            production costs. It uses data from your past transactions to
            provide an accurate and up-to-date average product cost, and based
            on your pricing, the profit per product.
          </p>
          <p>
            Margerin is built on a model of products, materials, recipes,
            transactions, and suppliers. For non-food projects, this can also be
            understood as assemblies, materials, BOMs, transaction, and
            suppliers.
          </p>
          <p>
            Transaction data is aggregated over a recent timeframe to build the
            product recipe cost. Because one recipe often makes multiple
            products, a yield per recipe field is included that acts as the
            divisor for the total cost.
          </p>
          <p>
            The dashboard allows in-context editing of products, while the
            material manager tabs allow you to quickly create/edit/delete
            resources such as materials, transactions, and suppliers.
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default About;
