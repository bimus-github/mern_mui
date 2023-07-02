import { Button, makeStyles } from "@material-ui/core";
import { Container, TextField, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { useState } from "react";

const sxField = {
  width: { xs: "150px", sm: "200px", md: "300px", lg: "400px" },
  marginTop: 1,
  marginBottom: 1,
};

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password1 !== password2) return setError("Passwords did not match");

    setError(null);

    const data = { email, password: password1 };

    console.log(data);
  };

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
          type="password"
          label="Password"
          onChange={(e) => setPassword1(e.target.value)}
        />
        <TextField
          sx={sxField}
          value={password2}
          variant="outlined"
          required
          color="secondary"
          type="password"
          label="Password"
          onChange={(e) => setPassword2(e.target.value)}
        />

        <Button
          color="primary"
          type="submit"
          variant="outlined"
          endIcon={<KeyboardArrowRightIcon />}
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
