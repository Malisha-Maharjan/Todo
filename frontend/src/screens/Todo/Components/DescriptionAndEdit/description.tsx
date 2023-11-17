import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";
import { useEditTodo } from "../../../../hooks/useTodosApi";
import { Task } from "../TodoList/todoList";
import styles from "./description.module.css";

type propsParams = {
  onClose: () => void;
  task: Task;
  isDescriptionDialogVisible: boolean;
};

export const Description = ({
  onClose,
  task,
  isDescriptionDialogVisible,
}: propsParams) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [todo, setTask] = useState(task.task);
  const [description, setDescription] = useState(task.description);
  const [schedule_at, setDate] = useState(task.schedule_at);

  const { mutate: onEdit } = useEditTodo();

  const onEditClick = () => {
    onClose();
    onEdit({ task: todo, id: task.id, description, schedule_at: schedule_at });
  };
  return (
    <>
      {/* <div>add</div> */}
      <Dialog
        fullScreen={fullScreen}
        open={isDescriptionDialogVisible}
        fullWidth
      >
        {/* <DialogTitle>{{}}</DialogTitle> */}

        <DialogContent>
          <form className={styles.descriptionForm}>
            <TextField
              // variant="standard"
              value={todo}
              sx={{ width: 500 }}
              onChange={(e) => setTask(e.target.value)}
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
                value={dayjs(schedule_at)}
                onChange={(e: any) => setDate(e)}
              />
            </div>
            {/* <input type="text" placeholder="Description"></input> */}
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onEditClick}>
            Save
          </Button>

          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
