import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Button from "react-bootstrap/Button";

const ToastManager = () => {
  const [showToast, setShowToast] = useState(false);
  const toggleShowToast = () => setShowToast(!showToast);
  return (
    <>
      <ToastContainer className="p-3" position="bottom-end">
        <Toast show={showToast} onClose={toggleShowToast}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default ToastManager;
