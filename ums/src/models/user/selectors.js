import { slice } from "./slice";

export const userIdSelector = (state) => state[slice.name].id;

export const userSelector = (state) => state[slice.name];
