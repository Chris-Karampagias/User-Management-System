import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  password: "",
  fullName: "",
  age: 0,
  isPasswordSafe: false,
  role: "regular",
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (_state, action) => {
      return action.payload;
    },
    clearUser: () => {
      return initialState;
    },
  },
});
