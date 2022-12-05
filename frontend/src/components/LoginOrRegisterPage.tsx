import React from "react";
import { FC, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/config";

interface LoginOrRegisterPageProps {
  endpoint: string;
  submitButtonContent: string;
  question: string;
  redirectContent: string;
  redirectEndpoint: string;
}

export const LoginOrRegisterPage: FC<LoginOrRegisterPageProps> = ({
  endpoint,
  submitButtonContent,
  question,
  redirectContent,
  redirectEndpoint,
}) => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitHandler = async () => {
    if (nickname.trim() == "" || password.trim() == "") {
      toast.error("Input fields can't be empty.");
    }

    try {
      await axiosInstance.post(`/${endpoint}`, { nickname, password });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mainContainer">
      <div className="form">
        <input
          className="input"
          placeholder="Nickname"
          type="text"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
        />
        <input
          className="input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="button" onClick={submitHandler}>
          {submitButtonContent}
        </button>
        <div className="redirectContainer">
          <span className="questionAboutAccount">{question}</span>
          <span
            className="redirect"
            onClick={() => navigate(`/${redirectEndpoint}`)}
            //TODO state doesn't reset after register / login redirection
          >
            {redirectContent}
          </span>
        </div>
      </div>
      <Toaster />
    </div>
  );
};
