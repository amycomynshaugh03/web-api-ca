import { Link } from "react-router-dom";

const AuthHeader = () => (
  <header style={{ padding: "16px", backgroundColor: "#2196f3", color: "#fff" }}>
    <h1>Movies App</h1>
    <nav>
      <Link to="/login" style={{ marginRight: 10, color: "#fff" }}>Login</Link>
      <Link to="/signup" style={{ color: "#fff" }}>Signup</Link>
    </nav>
  </header>
);

export default AuthHeader;
