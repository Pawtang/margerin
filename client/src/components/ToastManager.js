import { useState, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { Transition } from "react-transition-group";
import { useToasts } from "../contexts/ToastContext";

const ToastManager = (props) => {
  const duration = 300;
  const { toasts } = useToasts();
  return (
    <>
      <ToastContainer className="p-3 z-super" position="bottom-end">
        {/* <Toast show={showToast} onClose={console.log("")}> */}
        {toasts.map((toast) => {
          return (
            <Toast animation={"true"} className={"fader"}>
              <Toast.Header closeButton={false}>
                {toast.type == "Success" ? (
                  <i class="bi bi-hand-thumbs-up-fill"></i>
                ) : (
                  <i class="bi bi-exclamation-triangle-fill"></i>
                )}
                <strong className="me-auto"> {toast.title}</strong>
                <small>{toast.type}</small>
              </Toast.Header>
              <Toast.Body>{toast.body}</Toast.Body>
            </Toast>
          );
        })}
      </ToastContainer>
    </>
  );
};

export default ToastManager;
