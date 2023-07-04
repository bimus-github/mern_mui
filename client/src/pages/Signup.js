import { Button, makeStyles } from "@material-ui/core";
import { Container, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useState } from "react";
import { signup } from "../fetch/signup";
import LoadingPage from "../components/LoadingPage";
import { pushUser } from "../store/features/userSlice";
import { Navigate } from "react-router-dom";

const sxField = {
  width: { xs: "150px", sm: "200px", md: "300px", lg: "400px" },
  marginTop: 1,
  marginBottom: 1,
};

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [visiblePassword1, setVisiblePassword1] = useState(false);
  const [visiblePassword2, setVisiblePassword2] = useState(false);
  const [imgUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password1 !== password2) return setError("Passwords did not match");

    setIsLoading(true);
    setError(null);

    const data = { email, password: password1, imgUrl };

    const { ok, json } = await signup(data);

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
        <Typography variant="h4">Sign up</Typography>
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
          value={password1}
          variant="outlined"
          required
          color="secondary"
          type={visiblePassword1 ? "text" : "password"}
          endIcon={
            visiblePassword1 ? (
              <VisibilityOffIcon
                onClick={() => setVisiblePassword1((p) => !p)}
              />
            ) : (
              <VisibilityIcon onClick={() => setVisiblePassword1((p) => !p)} />
            )
          }
          label="Password"
          onChange={(e) => setPassword1(e.target.value)}
        />
        <TextField
          sx={sxField}
          value={password2}
          variant="outlined"
          required
          color="secondary"
          type={visiblePassword2 ? "text" : "password"}
          label="Password"
          endIcon={
            visiblePassword2 ? (
              <VisibilityOffIcon
                onClick={() => setVisiblePassword2((p) => !p)}
              />
            ) : (
              <VisibilityIcon onClick={() => setVisiblePassword2((p) => !p)} />
            )
          }
          onChange={(e) => setPassword2(e.target.value)}
        />

        <TextField
          sx={sxField}
          value={imgUrl}
          label="Image URL"
          type="url"
          variant="outlined"
          color="secondary"
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <Button
          color="primary"
          type="submit"
          variant="outlined"
          endIcon={<VpnKeyIcon />}
          width={100}
          size="large"
        >
          Submit
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
