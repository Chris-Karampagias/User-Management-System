import { IuserData } from "./types/types";

export default function createUser(userData: IuserData) {
  return fetch(`${import.meta.env.VITE_STACKPRINT_BASE_URL}users/`, {
    method: "POST",
    headers: {
      "API-Key": import.meta.env.VITE_STACKPRINT_API_KEY,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then((response) => response.json());
}
