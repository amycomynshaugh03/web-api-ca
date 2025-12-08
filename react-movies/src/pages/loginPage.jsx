import { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router-dom"; 

const LoginPage = () => {
  const { authenticate, isAuthenticated } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();


  const from = location.state?.from?.pathname || "/home";

  const loginHandler = async () => {
   try {
    await authenticate(userName, password);
    navigate(from, { replace: true });   
    } catch (err) {
    setError("Login failed: " + err.message);
    }
};

if (isAuthenticated) {
  return <Navigate to={from} replace />;
}

  return (
    <>
      <h2>Login page</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>You must log in to view the protected pages </p>
      <input
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={loginHandler}>Log in</button>
      <p>
        Not Registered? <Link to="/signup">Sign Up!</Link>
      </p>
    </>
  );
};

export default LoginPage;
