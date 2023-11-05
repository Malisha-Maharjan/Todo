import { useMutation } from "@tanstack/react-query";

type RegisterParams = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
};
export const useRegister = () => {
  return useMutation({
    mutationFn: async (dataPost: RegisterParams) => {
      const data = await fetch("http://127.0.0.1:8000/api/register", {
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
