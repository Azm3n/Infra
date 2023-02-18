import { AxiosError } from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/config";

const PasswordRecoveryPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [passwordRecoveryQuestion, setpasswordRecoveryQuestion] =
    useState<string>("");
  const [passwordRecoveryAnswer, setPasswordRecoveryAnswer] =
    useState<string>("");

  const submitHandler = async () => {
    if (
      nickname.trim() == "" ||
      passwordRecoveryQuestion.trim() == "" ||
      passwordRecoveryAnswer.trim() == "" ||
      newPassword.trim() == ""
    ) {
      toast.error("Prosimy o uzupełnienie pól");
      return;
    }

    try {
      const response = await axiosInstance.post("/password-recovery", {
        nickname,
        passwordRecoveryQuestion,
        passwordRecoveryAnswer,
        newPassword,
      });

      if (response.status == 204) {
        toast.success("Hasło zostało zmienione");
        navigate("/login");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status == 403) {
          toast.error(err.response.data);
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
          onChange={(event) => setNickname(event.target.value)}
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
        <input
          className='input'
          placeholder='Nowe hasło'
          type='password'
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <div className='redirectContainer'>
          <button
            className='button'
            style={{ width: "200px" }}
            onClick={submitHandler}
          >
            Zrestartuj haslo
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default PasswordRecoveryPage;
