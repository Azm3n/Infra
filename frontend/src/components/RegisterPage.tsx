import { AxiosError } from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/config";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRecoveryQuestion, setpasswordRecoveryQuestion] =
    useState<string>("");
  const [passwordRecoveryAnswer, setPasswordRecoveryAnswer] =
    useState<string>("");

  const submitHandler = async () => {
    if (
      nickname.trim() == "" ||
      password.trim() == "" ||
      passwordRecoveryQuestion.trim() == "" ||
      passwordRecoveryAnswer.trim() == ""
    ) {
      toast.error("Prosimy o uzupełnienie pól");
      return;
    }

    try {
      const response = await axiosInstance.post(`/register`, {
        nickname,
        password,
        passwordRecoveryQuestion,
        passwordRecoveryAnswer,
      });
      if (response.status == 201) toast.success("Udało się zarejestrować");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status == 409) {
          toast.error(err.response.statusText);
        }
      } else {
        toast.error("Nie udało się zarejestrować");
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
          onChange={(event) => setNickname(event.currentTarget.value)}
        />
        <input
          className='input'
          placeholder='Hasło'
          type='password'
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <select
          name='verify_questions'
          className='input'
          style={{ width: "50%" }}
          onChange={(event) =>
            setpasswordRecoveryQuestion(event.currentTarget.value)
          }
        >
          <option value=''>Brak</option>
          <option value='animal'>
            Jakie było imie Twojego pierwszego zwierzęcia?
          </option>
          <option value='surname'>Jakie masz nazwisko rodowe?</option>
          <option value='color'>Jaki jest Twój ulubiony kolor?</option>
        </select>
        <input
          className='input'
          placeholder='Odpowiedz'
          type='text'
          value={passwordRecoveryAnswer}
          onChange={(event) =>
            setPasswordRecoveryAnswer(event.currentTarget.value)
          }
        />
        <button className='button' onClick={() => submitHandler()}>
          Zarejestruj się
        </button>
        <div className='redirectContainer'>
          <span className='questionAboutAccount'>Masz już konto?</span>
          <span className='redirect' onClick={() => navigate(`/login`)}>
            Zaloguj się
          </span>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default RegisterPage;
