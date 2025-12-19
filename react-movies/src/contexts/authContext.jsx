import { useState, createContext } from "react";
import { login, signup } from "../api/movies-api.jsx";

export const AuthContext = createContext(null); //eslint-disable-line

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [userName, setUserName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(!!existingToken); 
  const [authToken, setAuthToken] = useState(existingToken);

  
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token);
      setIsAuthenticated(true);
      setUserName(username);
      return true;
    }
    return false;
  };

const register = async (username, password) => {
  const result = await signup(username, password);
  if (result.success) {
    return true;
  } else {
    return result.msg;
  }
};

  const signout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setIsAuthenticated(false);
    setUserName("");
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName,
        authToken
      }}
    >
      {props.children} {/* eslint-disable-line */}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
