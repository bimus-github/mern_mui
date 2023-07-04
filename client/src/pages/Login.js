import { useState } from "react";
import { Container, TextField, Typography } from "@mui/material";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import { login } from "../fetch/login";
import { useDispatch, useSelector } from "react-redux";
import { pushUser } from "../store/features/userSlice";
import LoadingPage from "../components/LoadingPage";
import { Navigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const classes = useStyles();

  const sxField = {
    width: { xs: "150px", sm: "200px", md: "300px", lg: "400px" },
    marginTop: 1,
    marginBottom: 1,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    const user = { email, password };
    const { ok, json } = await login(user);

    if (!ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch(pushUser(json));

      // update loading state
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingPage />;

  if (user) return <Navigate to="/" />;

  return (
    <Container>
      <form
        className={classes?.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h4">Sign in</Typography>
        <TextField
          sx={sxField}
          value={email}
          variant="outlined"
          required
          color="secondary"
          type="email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={sxField}
          value={password}
          variant="outlined"
          required
          color="secondary"
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          color="primary"
          type="submit"
          variant="outlined"
          endIcon={<ExitToAppIcon />}
          width={100}
          size="large"
        >
          Enter
        </Button>

        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </form>
    </Container>
  );
}

const useStyles = makeStyles({
  form: {
    width: "100%",

    height: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
