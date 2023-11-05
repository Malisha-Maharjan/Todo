import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsername } from "../helpers/sessionStorage";

export const useFetchTodos = () => {
  const username = getUsername();

  return useQuery({
    queryKey: ["todos", username],
    queryFn: async () => {
      const token = sessionStorage.getItem("token");
      console.log("token", token);
      const data = await fetch(
        `http://127.0.0.1:8000/api/todo/get/${username}`
      );
      return data.json();
    },
    enabled: !!username,
  });
};

type AddTodoParams = {
  task: string;
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  const username = getUsername();

  return useMutation({
    mutationFn: async ({ task }: AddTodoParams) => {
      const data = await fetch("http://127.0.0.1:8000/api/todo/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, username }),
      });

      return data.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", username] });
    },
  });
};

type ToggleTodoParams = {
  id: number;
  checked: boolean;
};

export const useToggleTodo = () => {
  const queryClient = useQueryClient();
  const username = getUsername();

  return useMutation({
    mutationFn: async ({ id, checked }: ToggleTodoParams) => {
      const data = await fetch(`http://127.0.0.1:8000/api/todo/toggle/${id}`, {
        method: "PUT",
        body: JSON.stringify({ checked }),
      });
      return data.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", username] });
    },
  });
};

type DeleteTodoParams = {
  id: number;
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const username = getUsername();

  return useMutation({
    mutationFn: async ({ id }: DeleteTodoParams) => {
      const data = await fetch(`http://127.0.0.1:8000/api/todo/delete/${id}`, {
        method: "DELETE",
      });
      return data.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", username] });
    },
  });
};
