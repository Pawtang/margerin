import { React, Fragment } from "react";
import Navbar from "./Navbar";

const Contact = () => {
  return (
    <Fragment>
      <Navbar opacity={"nav-opaque"} />
      <div className="container">
        <div className="app-space">
          <h1>Contact</h1>
        </div>
      </div>
    </Fragment>
  );
};

export default Contact;
