import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getToken, getUsername } from "../helpers/sessionStorage";

import { baseURL } from "../helpers/baseURL";

export const useFetchTodos = () => {
  const username = getUsername();
  const token = getToken();

  return useQuery({
    queryKey: ["todos", username],
    queryFn: async () => {
      const data = await fetch(`${baseURL}/api/todo/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await data.json();
      if (data.status !== 200) {
        console.log(response);
        throw new Error(response.message);
      }
      return response;
    },
    enabled: !!username,
  });
};

export const useFetchTodayTodos = () => {
  const username = getUsername();
  const token = getToken();

  return useQuery({
    queryKey: ["todos", username],
    queryFn: async () => {
      const data = await fetch(`${baseURL}/api/todo/get/today`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await data.json();
      if (data.status !== 200) {
        console.log(response);
        throw new Error(response.message);
      }
      return response;
    },
    enabled: !!username,
  });
};

type AddTodoParams = {
  task: string | null;
  description: any;
  date: Date | null;
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  const username = getUsername();
  const token = getToken();
  return useMutation({
    mutationFn: async ({ task, description, date }: AddTodoParams) => {
      const data = await fetch(`${baseURL}/api/todo/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ task, description, username, date }),
      });
      const response = await data.json();
      if (data.status !== 200) throw new Error(response.message);
      return response;
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
      const data = await fetch(`${baseURL}/api/todo/toggle/${id}`, {
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
      const data = await fetch(`${baseURL}/api/todo/delete/${id}`, {
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

type EditTodoParams = {
  task: string | null;
  id: number | null;
  description: string | null;
  schedule_at: string | null;
};

export const useEditTodo = () => {
  const queryClient = useQueryClient();
  const username = getUsername();
  const token = getToken();

  return useMutation({
    mutationFn: async (value: EditTodoParams) => {
      const data = await fetch(`${baseURL}/api/todo/edit/${value.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value),
      });
      console.log("task", value);
      return data.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", username] });
    },
  });
};

export const useDragDropTodo = () => {
  const token = getToken();

  return useMutation({
    mutationFn: async (dragAndDrop: any) => {
      const data = await fetch(`${baseURL}/api/todo/drag/drop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dragAndDrop),
      });
      return data.json();
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["todos", username] });
    // },
  });
};
