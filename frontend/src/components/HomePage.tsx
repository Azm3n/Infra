import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/config";

interface UserData {
  id: string;
  nickname: string;
}

const HomePage = () => {
  const location = useLocation();
  const [userData, setUserData] = useState<UserData>();
  const [search, setSearch] = useState<string>("");
  const [_, setCookie] = useCookies(["isLogged"]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const result = await axiosInstance.get(
          `/home?id=${queryParams.get("id")}`,
        );
        setUserData(result.data[0]);
      } catch (err) {
        toast.error("Coś poszło nie tak");
      }
    };

    fetchUserData();
  }, []);

  const logoutHandler = () => {
    setCookie("isLogged", false);
    navigate("/login");
  };

  return (
    <div className='homeContainer'>
      <span style={{ fontSize: "32px" }}>Witamy {userData?.nickname}</span>
      <input
        className='input'
        type='text'
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <Toaster />
      <p>{search}</p>
      <button className='button' onClick={() => logoutHandler()}>
        Wyloguj się
      </button>
    </div>
  );
};

export default HomePage;
