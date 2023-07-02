import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    pushAllNotes: (state, action) => void (state.notes = action.payload),

    creatNote: (state, action) => void state.notes.push(action.payload),

    deleteNote: (state, action) =>
      void state.notes.filter((note) => note?._id !== action.payload?._id),
  },
});
export const { pushAllNotes, creatNote, deleteNote } = noteSlice.actions;

export default noteSlice.reducer;
