import { IuserData } from "../api/types";

export default function checkUserExists(users: IuserData[], id: string) {
  return users.some((user) => user.id === id);
}
