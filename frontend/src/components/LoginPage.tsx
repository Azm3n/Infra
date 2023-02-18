import { AxiosError } from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/config";

const LoginPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [_, setCookie] = useCookies(["isLogged"]);

  const submitHandler = async () => {
    if (nickname.trim() == "" || password.trim() == "") {
      toast.error("Prosimy o uzupełnienie pól");
    }

    try {
      const result = await axiosInstance.post("/login", { nickname, password });

      if (result.status == 200) {
        toast.success("Udało się zalogować!");
        setCookie("isLogged", true);
        navigate(`/home?id=${result.data?.[0]?.id}`);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(
          "Podane dane nie pasują do żadnego użytkownika w bazie danych",
        );
      } else {
        toast.error("Coś poszło nie tak");
      }
    }
  };

  return (
    <div className='mainContainer'>
      <div className='form'>
        <input
          className='input'
          placeholder='Nazwa użytkownika'
          type='text'
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
        />
        <input
          className='input'
          placeholder='Hasło'
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className='button' onClick={() => submitHandler()}>
          Zaloguj się
        </button>
        <div className='redirectContainer'>
          <span className='questionAboutAccount'>Nie posiadasz konta?</span>
          <span className='redirect' onClick={() => navigate("/register")}>
            Zarejestruj się
          </span>
        </div>
        <div className='redirectContainer'>
          <span className='questionAboutAccount'>Zapomniałeś hasło?</span>
          <span
            className='redirect'
            onClick={() => navigate("/password-recovery")}
          >
            Zrestartuj hasło
          </span>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default LoginPage;
