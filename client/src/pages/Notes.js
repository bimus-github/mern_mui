import React, { useEffect } from "react";

// mui
import Masonry from "@mui/lab/Masonry";
import Container from "@material-ui/core/Container";
import NoteCard from "../components/NoteCard";

// redux
import { useSelector, useDispatch } from "react-redux";
import { pushAllNotes, deleteNote } from "../store/features/noteSlice";

export default function Notes() {
  const { notes } = useSelector((s) => s?.note);
  const dispatch = useDispatch();

  const handleDelete = async (_id) => {
    const res = await fetch("/api/notes" + _id, {
      method: "DELETE",
    });

    const json = await res.json();

    dispatch(deleteNote(json));
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("/api/notes");
      const json = await response.json();

      console.log(json);
      if (response.ok) {
        dispatch(pushAllNotes(json));
      }
    };

    fetchNotes();
  }, [dispatch]);

  console.log(notes);
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
