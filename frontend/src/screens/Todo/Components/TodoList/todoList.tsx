import AddTaskIcon from "@mui/icons-material/AddTask";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Box, Checkbox, IconButton, Paper, Typography } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";

import dayjs from "dayjs";
import { useState } from "react";
import {
  useDeleteTodo,
  useDragDropTodo,
  useToggleTodo,
} from "../../../../hooks/useTodosApi";
import { Description } from "../DescriptionAndEdit/description";
// import { EditDialog } from "../Edit/editScreen";

export type Task = {
  id: number | null;
  is_completed: boolean;
  task: string;
  user: number | null;
  created_at: Date | null;
  description: string | null;
  schedule_at: string | null;
};

export const TodoGrid = (value: any) => {
  const [task, setTask] = useState<Task>({
    id: null,
    is_completed: false,
    task: "",
    user: null,
    created_at: null,
    description: "",
    schedule_at: null,
  });
  const navigate = useNavigate();
  // const { data: response, isLoading } = useFetchTodos();
  console.log(value);
  const data = value.value;
  console.log(data);
  const { mutate: toggleTodo } = useToggleTodo();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: dragDropTodo } = useDragDropTodo();

  const [isDescriptionDialogVisible, setDescriptionDialogVisible] =
    useState(false);
  console.log("incompleted");

  const handleDragDrop = (results: any) => {
    const { source, destination } = results;
    if (!destination || !source) return;
    const sourceIndex = source.index;
    const destinationIndex = destination.index;
    const [removedList] = data.splice(sourceIndex, 1);

    data.splice(destinationIndex, 0, removedList);
    console.log(data);
    dragDropTodo({ data });
  };

  const onPress = (task: Task) => {
    setTask(task);
    console.log({ task: task });
    setDescriptionDialogVisible(true);
  };

  const onAddClick = () => {
    {
      navigate("/todo/todolist/add");
    }
  };

  const onCheckBoxClicked = (id: number, checked: boolean) => {
    console.log(`toggleTodo(id: ${id}, checked: ${!checked} });`);
    toggleTodo({ id, checked: !checked });
  };
  const onDeleteClick = (id: number) => deleteTodo({ id });

  // if (isLoading) {
  //   return <div>Loading Todos...</div>;
  // }

  return (
    <>
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {data.map((task: any, index: any) => (
                <Draggable
                  draggableId={task.id.toString()}
                  key={task.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
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
                        {!task.is_completed && (
                          <Paper
                            elevation={task.is_completed ? 0 : 24}
                            className={styles.paperBar}
                            variant={
                              task.is_completed ? "outlined" : "elevation"
                            }
                          >
                            <div
                              onClick={() => onPress(task)}
                              className={styles.taskBar}
                            >
                              <Typography
                                variant="subtitle1"
                                style={{ fontSize: 25 }}
                              >
                                {task.task}
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                style={{
                                  fontSize: 14,
                                  color: "#b53128",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <ScheduleIcon fontSize="small" />

                                {dayjs(task.schedule_at).format("MMM D")}
                              </Typography>
                            </div>
                            <div style={{ display: "flex" }}>
                              <IconButton
                                onClick={() => onDeleteClick(task.id)}
                              >
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
                            </div>
                          </Paper>
                        )}
                      </Box>
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {isDescriptionDialogVisible && (
        <Description
          isDescriptionDialogVisible={isDescriptionDialogVisible}
          onClose={() => setDescriptionDialogVisible(false)}
          task={task}
        />
      )}
      {data.length === 0 && <div> No Todos</div>}
      <div className={styles.content} onClick={onAddClick}>
        {/* <Link to="todo/todolist/add" className={styles.content}> */}
        <IconButton className={styles.addButton}>{<AddTaskIcon />}</IconButton>
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          Add Todo
        </div>
        {/* </Link> */}
      </div>
    </>
  );
};
