import React, { useEffect } from "react";

// mui
import Masonry from "@mui/lab/Masonry";
import Container from "@material-ui/core/Container";
import NoteCard from "../components/NoteCard";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  deleteNote as deleteNoteAction,
  pushAllNotes,
} from "../store/features/noteSlice";
import { fetchNotes } from "../fetch/fetchNotes";
import { deleteNote } from "../fetch/deleteNote";
import { Navigate } from "react-router-dom";

export default function Notes() {
  const { notes } = useSelector((s) => s?.note);
  const { user } = useSelector((s) => s?.user);
  const dispatch = useDispatch();

  const handleDelete = async (_id) => {
    try {
      const response = await deleteNote(_id);
      const { ok, json } = response;

      if (!ok) return;

      dispatch(deleteNoteAction(json));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const { ok, json } = await fetchNotes();
      if (ok) {
        dispatch(pushAllNotes(json));
      }
    }
    fetchData();
  }, [dispatch]);

  if (!user) return <Navigate to="/login" />;

  return (
    <Container>
      <Masonry columns={{ xs: 1, md: 2, lg: 3 }} spacing={2}>
        {notes.map((note) => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
