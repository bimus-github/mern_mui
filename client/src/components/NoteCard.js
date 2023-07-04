import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { yellow, green, pink, blue } from "@material-ui/core/colors";
import { getUserById } from "../fetch/getUserById";

// react-router-dom
import { useLocation } from "react-router-dom";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.category === "work") {
        return yellow[700];
      }
      if (note.category === "money") {
        return green[500];
      }
      if (note.category === "todos") {
        return pink[500];
      }
      return blue[500];
    },
  },
});

export default function NoteCard({ note, handleDelete }) {
  const location = useLocation();
  const [createdUser, setCreatedUser] = useState();
  const classes = useStyles(note);

  useEffect(() => {
    async function fetchData() {
      const { ok, data } = await getUserById(note.user_id);

      if (!ok) return;

      setCreatedUser(data);
    }
    fetchData();
  }, [note.user_id, setCreatedUser]);

  console.log(note);

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(note._id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          {location.pathname === "/publicNotes" ? (
            <Typography variant="body2" color="#000">
              Created by : {createdUser?.user?.email}
            </Typography>
          ) : (
            ""
          )}
          <Typography sx={{ mb: 1.5 }} variant="body2" color="textSecondary">
            {note.details}
          </Typography>
          <Typography color="text.secondary" variant="overline">
            {note.type}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
