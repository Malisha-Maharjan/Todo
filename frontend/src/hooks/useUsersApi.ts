import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../helpers/baseURL";
import { saveToken, saveUsername } from "../helpers/sessionStorage";

type RegisterParams = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
};

export const useRegister = () => {
  console.log({ baseURL });
  return useMutation({
    mutationFn: async (dataPost: RegisterParams) => {
      const data = await fetch(`${baseURL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPost),
      });
      const response = await data.json();
      if (data.status !== 200) throw new Error(response.message);
      return response;
    },
  });
};

type LoginCredential = {
  username: string;
  password: string;
};

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (credentials: LoginCredential) => {
      const data = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const response = await data.json();
      console.log({ response: response.status });
      if (data.status !== 200) throw new Error(response.message);
      return response;
    },
    onSuccess: (response) => {
      // setContextUsername(username);
      console.log("i am logged in");
      console.log(response);
      saveToken(response.data);
      saveUsername(response.username);
      navigate("/todo/today");
    },
  });
};
