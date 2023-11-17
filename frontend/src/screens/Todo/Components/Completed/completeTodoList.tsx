import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Checkbox, IconButton, Paper, Typography } from "@mui/material";
import styles from "./style.module.css";

import { useState } from "react";
import {
  useDeleteTodo,
  useFetchTodos,
  useToggleTodo,
} from "../../../../hooks/useTodosApi";
import { Task } from "../TodoList/todoList";

export const CompleteTodoGrid = () => {
  // const [id, setId] = useState("");
  const [task, setTask] = useState<Task>({
    id: null,
    is_completed: false,
    task: "",
    user: null,
    created_at: null,
    description: "",
    schedule_at: null,
  });

  const { data: response, isLoading } = useFetchTodos();
  const data = response?.data;

  const { mutate: toggleTodo } = useToggleTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const [isEditDialogVisible, setEditDialogVisible] = useState(false);

  // const onEditPress = (task: any) => {
  //   setTask(task);
  //   console.log({ task: task });
  //   setEditDialogVisible(true);
  // };

  const onCheckBoxClicked = (id: number, checked: boolean) => {
    console.log(`toggleTodo(id: ${id}, checked: ${!checked} });`);
    toggleTodo({ id, checked: !checked });
  };
  const onDeleteClick = (id: number) => deleteTodo({ id });

  if (isLoading) {
    return <div>Loading Todos...</div>;
  }

  return (
    <>
      <div>
        {data.map((task: any) => (
          <div>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  m: 1,
                  width: 500,
                  height: 50,
                },
              }}
              key={task.id}
            >
              {task.is_completed && (
                <Paper
                  elevation={task.is_completed && 0}
                  className={styles.taskBar}
                  variant={task.is_completed && "outlined"}
                >
                  <Typography
                    variant="subtitle1"
                    className={task.is_completed && styles.strikeText}
                  >
                    {task.task}
                  </Typography>
                  <div>
                    <IconButton onClick={() => onDeleteClick(task.id)}>
                      <DeleteOutlineIcon
                        fontSize="medium"
                        color="primary"
                        titleAccess="Delete"
                      />
                    </IconButton>
                    <Checkbox
                      onClick={() =>
                        onCheckBoxClicked(task.id, task.is_completed)
                      }
                      checked={task.is_completed}
                      color="secondary"
                    />
                    <div>{task.id}</div>
                  </div>
                </Paper>
              )}
            </Box>
          </div>
        ))}
      </div>
      {/* {isEditDialogVisible && (
        // <EditDialog
        //   isEditDialogVisible={isEditDialogVisible}
        //   onClose={() => setEditDialogVisible(false)}
        //   // id={parseInt(id)}
        //   task={task}
        // />
      )} */}
    </>
  );
};
