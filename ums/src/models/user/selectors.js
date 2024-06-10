import { slice } from "./slice";

export const userIdSelector = (state) => state[slice.name].id;
