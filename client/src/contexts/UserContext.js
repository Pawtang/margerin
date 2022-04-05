import React, { useContext, useState, useEffect } from "react";
import _ from "lodash";

const UserContext = React.createContext();

export function userStatus() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [userID, setUserID] = useState("");

  return (
    <UserContext.Provider
      value={{
        userID,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
