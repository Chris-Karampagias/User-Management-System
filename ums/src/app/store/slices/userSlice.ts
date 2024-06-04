import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorageUser } from "../../../utilities";

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
      setLocalStorageUser(action.payload);
      state.user = action.payload;
    },
    clearUser: (state) => {
      localStorage.clear();
      state.user = initialUserState;
    },
  },
});

export const { updateUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
