import { IuserData } from "./types/types";

export default function createUser(userData: IuserData) {
  return fetch("https://apis.stackprint.io/ums-api/users/", {
    method: "POST",
    headers: {
      "API-Key": import.meta.env.VITE_STACKPRINT_API_KEY,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then((response) => response.json());
}
