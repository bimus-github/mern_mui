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

    deleteNote: (state, action) => {
      const note = action.payload;
      const updatedNotes = [...state.notes].filter((n) => n?._id !== note?._id);

      state.notes = updatedNotes;
    },

    deleteAllNotes: (state) => void (state.notes = []),

    pushPublicNotes: (state, action) => {
      const notes = action.payload;
      state.notes = notes;
    },
  },
});
export const {
  pushAllNotes,
  creatNote,
  deleteNote,
  deleteAllNotes,
  pushPublicNotes,
} = noteSlice.actions;

export default noteSlice.reducer;
