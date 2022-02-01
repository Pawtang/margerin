import React from "react";
import Toast from "./Toast";

const ToastContainer = (props) => {
  const { toasts } = props;
  console.log("container has: ", toasts);

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      {toasts.map((toast) => {
        return (
          <Toast type={toast.type} content={toast.content} key={toast.id} />
        );
      })}
    </div>
  );
};

export default ToastContainer;
