import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import { useUser } from "./hooks/useUser";
import { ThemeProvider } from "@emotion/react";
import { LoginScreen } from "./screens/Login/LoginScreen";
import { RegisterScreen } from "./screens/Register/RegisterScreen";
import { TodoScreen } from "./screens/Todo/TodoScreen";
import { theme } from "./theme/theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true, // default: true
    },
  },
});

function App() {
  // const user = useUser();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        {/* <UserContextProvider value={user}> */}
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginScreen />} />
              <Route path="/signUp" element={<RegisterScreen />} />
              <Route path="/todo" element={<TodoScreen />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
        {/* </UserContextProvider> */}
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
