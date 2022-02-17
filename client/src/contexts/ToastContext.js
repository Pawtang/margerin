import React, { useContext, useState, useEffect } from "react";
import _ from "lodash";

const ToastContext = React.createContext();

export function useToasts() {
  return useContext(ToastContext);
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const toastTimeout = 5000;

  const addToast = (toast) => {
    setToasts((prevToasts) => [...prevToasts, toast]);
  };

  const removeToastFromStack = () => {
    setToasts((prevToasts) => {
      const copyPrevToasts = [...prevToasts];
      copyPrevToasts.shift();
      return copyPrevToasts;
    });
  };

  useEffect(() => {
    console.log("toasts has been updated");
    const interval = setInterval(() => {
      if (toasts && !_.isEmpty(toasts)) {
        removeToastFromStack();
      }
    }, toastTimeout);
    return () => {
      clearInterval(interval);
    };
  }, [toasts]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
