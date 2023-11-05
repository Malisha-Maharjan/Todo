// import { Box, Button, Paper, TextField } from "@mui/material";
// import Dialog from "@mui/material/Dialog";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useContext, useReducer } from "react";
// import { myContext } from "../../context/context";
// import { TodoScreen } from "./TodoScreen";
// import styles from "./style.module.css";
// import { TodoActionKind, TodoState, addReducer } from "./todoReducer";

// export const AddScreen = () => {
//   const todoInitializer: TodoState = {
//     // is_compeleted: false,
//     task: " ",
//   };

//   const add

//   const { open, setOpen } = useContext(myContext);
//   const [state, dispatch] = useReducer(addReducer, todoInitializer);
//   const onClick = (username: string | undefined) => {
//     setOpen(false);
//     addPost({ task: state.task, username });
//     <TodoScreen />;
//   };
//   return (
//     <>
//       <Dialog open={open}>
//         <Box
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             "& > :not(style)": {
//               m: 1,
//               width: 450,
//               height: 200,
//             },
//           }}
//         >
//           <Paper elevation={3} className={styles.addTask}>
//             <TextField
//               required
//               label="Task"
//               variant="filled"
//               value={state.task}
//               onChange={(e) =>
//                 dispatch({
//                   type: TodoActionKind.INSERT,
//                   payload: e.target.value,
//                 })
//               }
//               className={styles.task}
//             />
//             <div className={styles.buttonField}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => onClick(username)}
//               >
//                 Add
//               </Button>
//             </div>
//           </Paper>
//         </Box>
//       </Dialog>
//     </>
//   );
// };
