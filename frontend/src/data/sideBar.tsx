import AddTaskIcon from "@mui/icons-material/AddTask";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

export const SidebarData = [
  {
    title: "Today",
    path: "/todo/today",
    icon: <CalendarTodayIcon />,
  },
  {
    title: "Todos",
    path: "/todo/todolist/pending",
    icon: <FormatListBulletedIcon />,
  },
  {
    title: "Add Todo",
    path: "/todo/todolist/add",
    icon: <AddTaskIcon />,
  },
  {
    title: "Completed",
    path: "/todo/todolist/completed",
    icon: <FactCheckOutlinedIcon />,
  },
];
