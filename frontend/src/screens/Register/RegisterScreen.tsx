import { Alert, Button, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken, saveUsername } from "../../helpers/sessionStorage";
import { useRegister } from "../../hooks/useUsersApi";
import styles from "./style.module.css";

export const RegisterScreen = () => {
  const [username, setUserName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { isError, error, mutateAsync: register } = useRegister();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const result = await register({
      username,
      password,
      first_name: firstname,
      last_name: lastname,
      email,
    });
    console.log({ result });
    console.log(isError);
    saveUsername(username);
    saveToken(result.data);

    navigate("/todo");
  };

  return (
    <div className={styles.registerForm}>
      <Card variant="outlined" sx={{ minWidth: 350, minHeight: 600 }}>
        <Typography variant="h4" className={styles.heading} color={"#f2f6ff"}>
          Register Now!
        </Typography>
        <form onSubmit={handleSubmit} className={styles.registerForm}>
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
            type="email"
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
            sx={{ margin: 2 }}
            className={styles.registerButton}
          >
            Register
          </Button>
          {error !== null && (
            <Alert severity="error" className={styles.alertBox}>
              {error.message}
            </Alert>
          )}
        </form>
      </Card>
    </div>
  );
};
