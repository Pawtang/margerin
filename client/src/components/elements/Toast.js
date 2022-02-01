import React from "react";

const Toast = (props) => {
  const { type, content, key } = props;
  console.log("I'm a toast in Toasts.js");
  return (
    <div className="" style={{ zIndex: 11, width: "300px" }}>
      <div
        id={key}
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-bs-delay="5000"
      >
        <div className="toast-header">
          <img src="..." className="rounded me-2" alt="..." />
          <strong className="me-auto">{alert}!</strong>
        </div>
        <div className="toast-body">{content}</div>
      </div>
    </div>
  );
};

export default Toast;
