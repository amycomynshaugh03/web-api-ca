import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const SignUpPage = () => {
  const context = useContext(AuthContext);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const register = async () => {
    if (password !== passwordAgain) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const result = await context.register(username, password);
    if (result === true) {
      setRegistered(true);
    } else {
      setErrorMessage(result); 
    }
  };

  if (registered) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <h2>SignUp page</h2>
      <p>You must register a username and password to log in </p>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <input
        value={username}
        placeholder="user name"
        onChange={(e) => setUserName(e.target.value)}
      /><br />
      <input
        value={password}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <input
        value={passwordAgain}
        type="password"
        placeholder="password again"
        onChange={(e) => setPasswordAgain(e.target.value)}
      /><br />
      <button onClick={register}>Register</button>
    </>
  );
};

export default SignUpPage;