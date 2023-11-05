import { Button, TextField, ThemeProvider, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import { saveUsername } from "../../helpers/sessionStorage";
import { theme } from "../../theme/theme";
import styles from "./style.module.css";

export const RegisterScreen = () => {
  const [username, setUserName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { setUsername: setContextUsername } = useUserContext();

  type registerData = {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
  };

  const registerApi = async (dataPost: registerData) => {
    const data = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    });
    return data.json();
  };
  const { mutate: register } = useMutation({
    mutationFn: registerApi,
    onSuccess: (response) => {
      setContextUsername(username);
      saveUsername(username);
    },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (email === "" || password === "" || username === "" || email === "") {
      console.log("Please fill the form");
    } else {
      register({
        username,
        password,
        first_name: firstname,
        last_name: lastname,
        email,
      });
      navigate("/todo");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.registerForm}>
        <Card
          variant="outlined"
          sx={{ maxWidth: 900 }}
          className={styles.registerCard}
        >
          <Typography variant="h4" className={styles.heading} color={"#f2f6ff"}>
            Register Now!
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              className={styles.outlinedBasic}
              label="First Name"
              variant="outlined"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              // margin="normal"
            />
            <TextField
              required
              className={styles.outlinedBasic}
              label="Last Name"
              variant="outlined"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              required
              className={styles.outlinedBasic}
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              className={styles.outlinedBasic}
              label="User Name"
              variant="outlined"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              required
              className={styles.outlinedBasic}
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              // onClick={handleOnClick}
              // className={styles.registerButton}
            >
              Register
            </Button>
          </form>
        </Card>
      </div>
    </ThemeProvider>
  );
};
