import { useNavigate } from "react-router-dom";

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")}>Register</button>
    </div>
  );
};
