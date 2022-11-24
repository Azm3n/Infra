import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="mainContainer">
      <div className="form">
        <input
          className="loginInput"
          placeholder="Nickname"
          type="text"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
        />
        <input
          className="loginInput"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="loginButton" onClick={() => navigate(`/login`)}>
          Login
        </button>
        <div className="registerRedirectContainer">
          <span className="accountExistenceCheck">Nie posiadasz konta?</span>
          <span
            className="registerRedirect"
            onClick={() => navigate("/register")}
          >
            Zarejestruj się
          </span>
        </div>
      </div>
    </div>
  );
};
