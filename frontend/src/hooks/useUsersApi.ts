import { useMutation } from "@tanstack/react-query";
import { baseURL } from "../helpers/baseURL";

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
