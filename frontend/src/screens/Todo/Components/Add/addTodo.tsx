import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddTodo } from "../../../../hooks/useTodosApi";
import { TodoActionKind, addReducer } from "../../todoReducer";
import styles from "./add.module.css";

export const AddTodo = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  console.log("add");

  const handleClose = () => {
    setOpen(false);
    navigate("/todo/today");
  };

  const [state, dispatch] = useReducer(addReducer, { task: "" });
  // const username = getUsername();

  const { mutate: addTodo } = useAddTodo();

  const onAddClick = async (event: any) => {
    event.preventDefault();
    if (state.task === "") console.log("fill the form");
    else {
      addTodo({ task: state.task, description, date });
      dispatch({
        type: TodoActionKind.CLEAR,
        payload: "",
      });
    }
    handleClose();
  };

  return (
    <>
      {/* <div>add</div> */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        fullWidth
      >
        <DialogTitle>{"Add New Todo"}</DialogTitle>
        <DialogContent>
          <form className={styles.addForm}>
            <TextField
              label="Add New Task"
              variant="standard"
              value={state.task}
              sx={{ width: 500 }}
              onChange={(e) =>
                dispatch({
                  type: TodoActionKind.INSERT,
                  payload: e.target.value,
                })
              }
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              value={description}
              sx={{ width: 500 }}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div>
              <DatePicker
                value={dayjs(date)}
                onChange={(e: any) => setDate(e)}
              />
            </div>
            {/* <input type="text" placeholder="Description"></input> */}
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            type="submit"
            onClick={onAddClick}
            disabled={state.task === ""}
          >
            Add
          </Button>

          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
