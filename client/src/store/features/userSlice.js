import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    pushUser: (state, action) => void (state.user = action.payload),

    deleteUser: (state, action) => void (state.user = null),
  },
});

export const { pushUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
