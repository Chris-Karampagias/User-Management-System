import { IuserData } from "../api/types";

export default function getNextUserId(users: IuserData[]) {
  return Number(users[users.length - 1].id) + 1;
}
