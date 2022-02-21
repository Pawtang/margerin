import React, { useContext, useState, useEffect } from "react";
import _ from "lodash";

const UserContext = React.createContext();

export function userStatus() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider
      value={{
        toasts,
        addToast,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
