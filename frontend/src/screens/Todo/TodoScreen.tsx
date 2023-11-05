import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import UpgradeRoundedIcon from "@mui/icons-material/UpgradeRounded";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsername } from "../../helpers/sessionStorage";
import {
  useAddTodo,
  useDeleteTodo,
  useFetchTodos,
  useToggleTodo,
} from "../../hooks/useTodos";
import { theme } from "../../theme/theme";
import styles from "./style.module.css";
import { TodoActionKind, addReducer } from "./todoReducer";
export const TodoScreen = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(addReducer, { task: "" });
  const [update, setUpdate] = useState(false);
  const username = getUsername();

  const { data, isLoading } = useFetchTodos();
  const { mutate: addTodo } = useAddTodo();
  const { mutate: toggleTodo } = useToggleTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const onCheckBoxClicked = (id: number, checked: boolean) =>
    toggleTodo({ id, checked: !checked });
  const onDeleteClick = (id: number) => deleteTodo({ id });

  const onAddClick = (event: any) => {
    event.preventDefault();
    if (state.task === "") console.log("fill the form");
    else {
      addTodo({ task: state.task });
      dispatch({
        type: TodoActionKind.CLEAR,
        payload: "",
      });
    }
  };

  if (isLoading) return <div>Loading Todos...</div>;

  return (
    <>
      <div className={styles.mainField}>
        <Card
          variant="outlined"
          sx={{ maxWidth: 900 }}
          className={styles.cardField}
        >
          <ThemeProvider theme={theme}>
            <div className={styles.topBar}>
              <Typography variant="h4" color="info" margin={"20px"}>
                Welcome {username}
              </Typography>
              <IconButton onClick={() => navigate("/")}>
                <LogoutIcon fontSize="large" color="secondary" />
              </IconButton>
            </div>
            <div className={styles.addForm}>
              <form onSubmit={onAddClick}>
                <TextField
                  label="Add New Task"
                  variant="outlined"
                  value={state.task}
                  onChange={(e) =>
                    dispatch({
                      type: TodoActionKind.INSERT,
                      payload: e.target.value,
                    })
                  }
                />
                <Button
                  variant="contained"
                  type="submit"
                  startIcon={<PostAddOutlinedIcon />}
                >
                  Add
                </Button>
              </form>
            </div>

            <div className={styles.todoCard}>
              {data.data.map((task: any) => (
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
                  <Paper
                    elevation={task.is_completed ? 0 : 24}
                    className={styles.taskBar}
                    variant={task.is_completed ? "outlined" : "elevation"}
                  >
                    <Typography
                      variant="subtitle1"
                      className={task.is_completed && styles.strikeText}
                    >
                      {task.task}
                    </Typography>
                    <p>{task.id}</p>
                    <div>
                      <IconButton>
                        <UpgradeRoundedIcon
                          fontSize="medium"
                          color="primary"
                          onClick={() => {
                            setUpdate(true);
                          }}
                        />
                      </IconButton>
                      <IconButton>
                        <DeleteOutlineIcon
                          fontSize="medium"
                          color="primary"
                          onClick={() => onDeleteClick(task.id)}
                        />
                      </IconButton>
                      <Checkbox
                        onClick={() =>
                          onCheckBoxClicked(task.id, task.is_completed)
                        }
                        defaultChecked={task.is_completed}
                        color="secondary"
                      />
                    </div>
                  </Paper>
                </Box>
              ))}
            </div>
          </ThemeProvider>
        </Card>
      </div>
    </>
  );
};
