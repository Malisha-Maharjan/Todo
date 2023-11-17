import { useFetchTodayTodos } from "../../../../hooks/useTodosApi";
import { TodoGrid } from "../TodoList/todoList";

export const TodayField = () => {
  const { data: response, isLoading } = useFetchTodayTodos();
  const data = response?.data;
  console.log(data);
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
