import { useState, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import dayjs from "dayjs";

const ToastManager = (props) => {
  const { toastStack } = props;

  // const toastTimer = () => {
  //   setTimeout(() => {
  //     setShowToast(false);
  //   }, 3000);
  // };

  // useEffect(() => {
  //   setShowToast(true);
  //   toastTimer();
  // }, []);

  return (
    <>
      <ToastContainer className="p-3" position="bottom-end">
        {/* <Toast show={showToast} onClose={console.log("")}> */}
        {toastStack.map((toast) => {
          {
            console.log("toast");
          }
          <Toast show={true}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{toast.title}</strong>
              <small>{toast.type}</small>
            </Toast.Header>
            <Toast.Body>{toast.body}</Toast.Body>
          </Toast>;
        })}
      </ToastContainer>
    </>
  );
};

export default ToastManager;
