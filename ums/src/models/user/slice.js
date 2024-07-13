import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: "",
    username: "",
    password: "",
    fullName: "",
    age: 0,
    isPasswordSafe: false,
    role: "regular",
  }
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
       state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = initialState;
    },
  },
});
