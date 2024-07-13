import { slice } from "./slice";

export const userIdSelector = (state) => state[slice.name].user.id;

export const userSelector = (state) => state[slice.name].user;

export const isUserAdminSelector = (state) => state[slice.name].user.role === 'admin';
