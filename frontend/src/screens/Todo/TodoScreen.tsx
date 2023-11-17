// import LogoutIcon from "@mui/icons-material/Logout";
// import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
// import { Button, Card, TextField, Typography } from "@mui/material";
// import IconButton from "@mui/material/IconButton";
// import { useReducer } from "react";
// import { useNavigate } from "react-router-dom";
// import { getUsername } from "../../helpers/sessionStorage";
// import { useAddTodo } from "../../hooks/useTodosApi";
import { useLocation } from "react-router-dom";
import { NavBar } from "./Components/NavBar/navBar";
import NavPage from "./Components/NavBar/navPage";
import styles from "./style.module.css";
// import { TodoGrid } from "./todoList";
// import { TodoActionKind, addReducer } from "./todoReducer";

export const TodoScreen = () => {
  const current = new Date();
  const date = new Date(
    current.getFullYear(),
    current.getMonth(),
    current.getDate()
  );
  const month = date.toLocaleString("default", { month: "short" });
  const week = date.toLocaleString("default", { weekday: "short" });
  const day = date.toLocaleString("default", { day: "numeric" });
  const location = useLocation();
  console.log(location.pathname);
  // const navigate = useNavigate();
  // const [state, dispatch] = useReducer(addReducer, { task: "" });
  // const username = getUsername();

  // const { mutate: addTodo } = useAddTodo();

  // const onAddClick = async (event: any) => {
  //   event.preventDefault();
  //   if (state.task === "") console.log("fill the form");
  //   else {
  //     addTodo({ task: state.task });
  //     dispatch({
  //       type: TodoActionKind.CLEAR,
  //       payload: "",
  //     });
  //   }
  // };

  return (
    <div className={styles.mainField}>
      <NavBar />
      <div className={styles.contentField}>
        <div>
          <span style={{ fontWeight: "bold", fontSize: 30 }}>Today</span>
          <span
            style={{ fontWeight: "lighter", color: "gray", marginLeft: 10 }}
          >
            {week} {day} {month}{" "}
          </span>
        </div>

        <NavPage />
      </div>
      {/* {(location.pathname === "/todo" ||
        location.pathname === "/todo/todolist/add") && (
        <>
          <TodayField />
        </>
      )} */}
    </div>
  );
};
