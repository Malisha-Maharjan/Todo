import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginScreen } from "./screen/Login/LoginScreen";
import { RegisterScreen } from "./screen/Register/RegisterScreen";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/signUp" element={<RegisterScreen />} />
      </Routes>
      {/* <LoginScreen /> */}
    </>
  );
}

export default App;
