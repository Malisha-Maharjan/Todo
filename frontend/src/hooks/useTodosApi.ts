import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getToken, getUsername } from "../helpers/sessionStorage";

export const useFetchTodos = () => {
  const username = getUsername();
  const token = getToken();

  return useQuery({
    queryKey: ["todos", username],
    queryFn: async () => {
      const data = await fetch(
        `http://127.0.0.1:8000/api/todo/get/${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.json();
    },
    enabled: !!username,
  });
};

type AddTodoParams = {
  task: string | null;
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  const username = getUsername();
  const token = getToken();
  return useMutation({
    mutationFn: async ({ task }: AddTodoParams) => {
      const data = await fetch("http://127.0.0.1:8000/api/todo/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
  const token = getToken();

  return useMutation({
    mutationFn: async ({ id, checked }: ToggleTodoParams) => {
      const data = await fetch(`http://127.0.0.1:8000/api/todo/toggle/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
  const token = getToken();

  return useMutation({
    mutationFn: async ({ id }: DeleteTodoParams) => {
      const data = await fetch(`http://127.0.0.1:8000/api/todo/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return data.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", username] });
    },
  });
};

type UpdateTodoParams = {
  task: string | null;
  id: number | null;
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const username = getUsername();
  const token = getToken();

  return useMutation({
    mutationFn: async ({ task, id }: UpdateTodoParams) => {
      const data = await fetch(`http://127.0.0.1:8000/api/todo/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ task }),
      });
      console.log("task", task);
      return data.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", username] });
    },
  });
};
