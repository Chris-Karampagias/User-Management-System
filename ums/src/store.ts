import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./models/reducer";

const store = configureStore({
  reducer,
});

export default store;
