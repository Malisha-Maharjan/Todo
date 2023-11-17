import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import { useUser } from "./hooks/useUser";
import { ThemeProvider } from "@emotion/react";
import { LoginScreen } from "./screens/Login/LoginScreen";
import { RegisterScreen } from "./screens/Register/RegisterScreen";
import { TodoScreen } from "./screens/Todo/TodoScreen";
// import NavPage from "./screens/Todo/navPage";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { theme } from "./theme/theme";

import dayjs from "dayjs";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true, // default: true
    },
  },
});

function App() {
  // const user = useUser();

  const date = new Date();
  console.log(dayjs(date).format("MMM D"));

  return (
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <UserContextProvider value={user}> */}
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginScreen />} />
              <Route path="/signUp" element={<RegisterScreen />} />
              <Route path="/todo/*" element={<TodoScreen />} />
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
      {/* </UserContextProvider> */}
    </QueryClientProvider>
    // </React.StrictMode>
  );
}

export default App;
