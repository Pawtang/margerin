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
                  <i
                    className="bi bi-hand-thumbs-up-fill text-success me-2"
                    style={{ fontSize: "1.2rem" }}
                  ></i>
                ) : (
                  <i
                    className="bi bi-exclamation-triangle-fill text-danger me-2"
                    style={{ fontSize: "1.2rem" }}
                  ></i>
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
