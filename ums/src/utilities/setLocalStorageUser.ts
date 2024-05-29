import { IuserData } from "../api";

export default function setLocalStorageUser(user: IuserData) {
  const stringified_user = JSON.stringify(user);
  localStorage.setItem("user", stringified_user);
}
