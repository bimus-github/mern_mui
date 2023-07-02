import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "./features/noteSlice";

export const store = configureStore({
  reducer: {
    note: noteSlice,
  },
});
