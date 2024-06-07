import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  id: "",
  username: "",
  password: "",
  fullName: "",
  age: 0,
  isPasswordSafe: false,
  role: "regular",
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: initialUserState,
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = initialUserState;
    },
  },
});

export const { updateUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
