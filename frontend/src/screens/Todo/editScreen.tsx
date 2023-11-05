import { ThemeProvider } from "@emotion/react";
import { Box, Button, Dialog, Paper, TextField } from "@mui/material";
import { useReducer } from "react";
import { useUpdateTodo } from "../../hooks/useTodosApi";
import { theme } from "../../theme/theme";
import { TodoScreen } from "./TodoScreen";
import styles from "./style.module.css";
import { TodoActionKind, TodoState, addReducer } from "./todoReducer";

type propsParams = {
  update: boolean;
  onClick: any;
  id: number | null;
};
export const AddScreen = ({ update, onClick, id }: propsParams) => {
  const todoInitializer: TodoState = {
    task: null,
  };

  const [state, dispatch] = useReducer(addReducer, todoInitializer);

  const { mutate: updateTodo } = useUpdateTodo();

  const onEditClick = () => {
    onClick();
    updateTodo({ task: state.task, id });
    dispatch({
      type: TodoActionKind.CLEAR,
      payload: null,
    });
    return <TodoScreen />;
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Dialog open={update}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 400,
                height: 200,
              },
            }}
          >
            <Paper elevation={3}>
              <form onSubmit={onEditClick} className={styles.updateTask}>
                <TextField
                  required
                  label="Task"
                  variant="filled"
                  value={state.task}
                  sx={{ width: 400 }}
                  onChange={(e) =>
                    dispatch({
                      type: TodoActionKind.UPDATE,
                      payload: e.target.value,
                    })
                  }
                  className={styles.task}
                />
                <div className={styles.buttonField}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    sx={{ fontPalette: "secondary" }}
                  >
                    Edit
                  </Button>
                </div>
              </form>
            </Paper>
          </Box>
        </Dialog>
      </ThemeProvider>
    </>
  );
};
