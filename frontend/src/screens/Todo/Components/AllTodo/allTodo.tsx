import { useFetchTodos } from "../../../../hooks/useTodosApi";
import { TodoGrid } from "../TodoList/todoList";

export const AllTodo = () => {
  const { data: response, isLoading } = useFetchTodos();
  const data = response?.data;
  console.log("data", data);
  if (isLoading) {
    return <div>Loading Todos...</div>;
  }
  return (
    <>
      <div>
        <TodoGrid value={data} />
      </div>
    </>
  );
};
