import { useNavigate } from "react-router-dom";


const StartPage = () => {
  const navigate = useNavigate();

  return (
    <>
  
      <div style={{ padding: 20 }}>
        <h2>Welcome to Movies App!</h2>
        <p>Explore the app or log in to save your favorites.</p>
        <button onClick={() => navigate("/login")} style={{ marginRight: 10 }}>Login</button>
        <button onClick={() => navigate("/signup")}>Signup</button>
      </div>
    </>
  );
};

export default StartPage;
