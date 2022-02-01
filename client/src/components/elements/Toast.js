import React from "react";

const Toast = (props) => {
  const { type, content, key } = props;
  console.log("I'm a toast in Toasts.js");
  return (
    <div className="shadow-sm" style={{ zIndex: 11, width: "300px" }}>
      <div
        id={key}
        className="custom-toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <i class="bi bi-exclamation-circle-fill"></i>
          <strong className="me-auto"> Alert</strong>
        </div>
        <div className="toast-body">{content}</div>
      </div>
    </div>
  );
};

export default Toast;
