import { createSlice, configureStore } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: "",
      username: "",
      password: "",
      fullName: "",
      age: 0,
      isPasswordSafe: false,
      role: "regular",
    },
  },
  reducers: {
    update: (state, action) => {
      state.user = action.payload;
    },
    clear: (state) => {
      state.user = {
        id: "",
        username: "",
        password: "",
        fullName: "",
        age: 0,
        isPasswordSafe: false,
        role: "regular",
      };
    },
  },
});

export const { update, clear } = userSlice.actions;

const store = configureStore({
  reducer: userSlice.reducer,
});

export default store;
