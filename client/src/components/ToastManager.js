import { useState, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const ToastManager = (props) => {
  const { toastState } = props;
  const [showToast, setShowToast] = useState(true);

  const toastTimer = () => {
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // useEffect(() => {
  //   setShowToast(true);
  //   toastTimer();
  // }, []);

  return (
    <>
      <ToastContainer className="p-3" position="bottom-end">
        <Toast show={showToast} onClose={setShowToast(false)}>
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
