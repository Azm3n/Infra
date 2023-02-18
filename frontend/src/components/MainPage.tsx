import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className='mainContainer'>
      <div className='buttonsContainer'>
        <button className='input' onClick={() => navigate("/login")}>
          Login
        </button>
        <button className='input' onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
};

export default MainPage;
