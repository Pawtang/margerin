import React, { useContext, useState } from "react";
import _ from "lodash";
import { useLocalStorage } from "../components/hooks/useLocalStorage";

const UserContext = React.createContext();

export function useTokens() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", "");
  const [user, setUser] = useState("");

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
