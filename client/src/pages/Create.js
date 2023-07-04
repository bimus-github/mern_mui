import React, { useState } from "react";

// mui
import {
  Typography,
  Button,
  Container,
  makeStyles,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import Stack from "@mui/material/Stack";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

// redux
import { useDispatch, useSelector } from "react-redux";
import { creatNote } from "../store/features/noteSlice";

// router-dom
import { Navigate, useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export default function Create() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("public");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("money");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    const note = { title, details, category, type };

    const res = await fetch("./api/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
      setTitle(true);
      setDetailsError(true);
    }

    if (res.ok) {
      setTitle("");
      setDetails("");
      setCategory("");
      setTitleError(false);
      setDetailsError(false);
      setError(null);

      dispatch(creatNote(json));

      navigate("/");
    }
  };

  if (!user) return <Navigate to="/login" />;

  return (
    <Container size="sm">
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Note
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          onChange={(e) => setTitle(e.target.value)}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          className={classes.field}
          onChange={(e) => setDetails(e.target.value)}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />

        <Stack direction={"row"} spacing={5} marginY={3}>
          <FormControl>
            <FormLabel>Note Category</FormLabel>
            <RadioGroup
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <FormControlLabel
                value="money"
                control={<Radio />}
                label="Money"
              />
              <FormControlLabel
                value="todos"
                control={<Radio />}
                label="Todos"
              />
              <FormControlLabel
                value="reminders"
                control={<Radio />}
                label="Reminders"
              />
              <FormControlLabel value="work" control={<Radio />} label="Work" />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Public/Private</FormLabel>
            <RadioGroup value={type} onChange={(e) => setType(e.target.value)}>
              <FormControlLabel
                value="public"
                control={<Radio />}
                label="Public"
              />
              <FormControlLabel
                value="private"
                control={<Radio />}
                label="Private"
              />
            </RadioGroup>
          </FormControl>
        </Stack>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
      {/* // erorr */}
      {error && (
        <Typography variant="budy2" color="error">
          {error}
        </Typography>
      )}
    </Container>
  );
}
