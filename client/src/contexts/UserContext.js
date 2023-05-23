import React, { useContext, useState } from "react";
import _ from "lodash";
import { useLocalStorage } from "../components/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext();
const URL_SERVER = process.env.REACT_APP_URL;

export function useTokens() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", "");
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  const checkToken = async () => {
    if (!_.isEmpty(token)) {
      try {
        const response = await fetch(`${URL_SERVER}/tokentest`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response !== 200) {
          setToken("");
          navigate("/");
          throw new Error("You are not logged in");
        }
      } catch (err) {
        console.error(err);
        // throw new Error("Failed to check token");
      }
    }
  };

  const logOut = async () => {
    try {
      await deleteSession(token);
    } catch (err) {}
    setUser("");
    setToken("");
  };

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        logOut,
        checkToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const deleteSession = async (token) => {
  try {
    const response = await fetch(`${URL_SERVER}/logout`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to sign out");
  }
};
