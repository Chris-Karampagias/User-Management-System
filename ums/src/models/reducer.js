// import { combineReducers } from "redux";
import { slice as userSlice } from "./user/slice";

export const reducer = {
  [userSlice.name]: userSlice.reducer
};