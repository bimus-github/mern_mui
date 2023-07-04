import { Container } from "@material-ui/core";
import Masonry from "@mui/lab/Masonry";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import { fetchPublicNotes } from "../fetch/fetchPublicNotes";
import { pushPublicNotes } from "../store/features/noteSlice";

function PublicPage() {
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.note);
  const { user } = useSelector((s) => s?.user);

  useEffect(() => {
    async function FetchData() {
      const { ok, data } = await fetchPublicNotes();

      if (!ok) return;

      dispatch(pushPublicNotes(data));
    }

    FetchData();
  }, [dispatch]);

  console.log(notes);

  if (!user) return <Navigate to="/login" />;

  return (
    <Container>
      <Masonry columns={{ xs: 1, md: 2, lg: 3 }} spacing={2}>
        {notes.map((note) => (
          <div key={note.id}>
            <NoteCard note={note} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
}

export default PublicPage;
