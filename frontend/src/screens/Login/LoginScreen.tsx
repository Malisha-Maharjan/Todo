import { Button, TextField, ThemeProvider, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken, saveUsername } from "../../helpers/sessionStorage";
import { theme } from "../../theme/theme";
import styles from "./style.module.css";

type LoginCredential = {
  username: string;
  password: string;
};

export const LoginScreen = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  sessionStorage.clear();
  const loginApi = async (credentials: LoginCredential) => {
    const data = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (data.status === 200) {
      setIsLogin(true);
    }
    return data.json();
  };

  const { mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: (response) => {
      setMessage(response.message);
      // setContextUsername(username);
      console.log("i am logged in");
      console.log(response.data);
      saveToken(response.data);
      saveUsername(username);
    },
  });

  const HandleOnClick = (event: any) => {
    event.preventDefault();
    login({ username: username, password });
  };

  return (
    <>
      {/* <UserContext.Provider value={userName}>
        <TodoScreen />
      </UserContext.Provider> */}
      <ThemeProvider theme={theme}>
        <div className={styles.main}>
          <Card
            variant="outlined"
            sx={{ maxWidth: 300 }}
            className={styles.cardField}
          >
            <Typography variant="h4" color="info" className={styles.heading}>
              Welcome
            </Typography>
            <img
              src="../public/images/Varicon-logo.png.webp"
              width="150"
              height={"150"}
              className={styles.logo}
            ></img>
            <TextField
              required
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              required
              label="Password"
              type="password"
              value={password}
              size="medium"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className={styles.buttonField}>
              <Button
                variant="contained"
                type="reset"
                color="secondary"
                onClick={HandleOnClick}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate(`/signUp`)}
              >
                Sign Up
              </Button>
            </div>
            {isLogin ? (
              <>{navigate("/todo")}</>
            ) : (
              <p className={styles.errorMessage}>{message}</p>
            )}
          </Card>
        </div>
      </ThemeProvider>
    </>
  );
};
