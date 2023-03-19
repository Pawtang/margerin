import { React } from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div className="container-fluid position-relative bottom-0 end-0 bg-none my-4 text-center">
      <div className="justify-between">
        <span className="mx-3">©2023 Ben Dibuz</span>
        <span className="mx-3">ben.dibuz@gmail.com</span>
      </div>
    </div>
  );
};

export default Footer;
