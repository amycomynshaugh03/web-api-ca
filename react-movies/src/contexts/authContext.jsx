import { useState, createContext } from "react";
import { login, signup } from "../api/movies-api.jsx";

export const AuthContext = createContext(null); //eslint-disable-line

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [userName, setUserName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(!!existingToken); 
  const [authToken, setAuthToken] = useState(existingToken);

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token)
      setIsAuthenticated(true);
      setUserName(username);
    }
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    return result.success;
  };

  const signout = () => {
    setTimeout(() => setIsAuthenticated(false), 100);
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
