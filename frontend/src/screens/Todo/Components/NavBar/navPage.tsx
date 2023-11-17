import { Route, Routes } from "react-router-dom";
import { AddTodo } from "../Add/addTodo";
import { AllTodo } from "../AllTodo/allTodo";
import { CompleteTodoGrid } from "../Completed/completeTodoList";
import { TodayField } from "../Today/todayPage";
const NavPage = () => {
  return (
    <>
      <Routes>
        <Route path="/todolist/pending" element={<AllTodo />} />
        <Route path="/todolist/add" element={<AddTodo />} />
        <Route path="/today" element={<TodayField />} />
        <Route path="/todolist/completed" element={<CompleteTodoGrid />} />
      </Routes>
    </>
  );
};

export default NavPage;
