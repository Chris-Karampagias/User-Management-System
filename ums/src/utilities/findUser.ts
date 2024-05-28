import { IuserData } from "../api/types";

export default function findUser(users: IuserData[], username: string) {
  const foundUsers = users.filter((user) => user.username === username);
  if (foundUsers.length > 1) {
    return { user: foundUsers[0], duplicates: true };
  }
  return { user: foundUsers[0], duplicates: false };
}
